package com.ecobazaar.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ecobazaar.backend.model.CartItem;
import com.ecobazaar.backend.model.Product;
import com.ecobazaar.backend.repository.CartRepository;
import com.ecobazaar.backend.repository.ProductRepository;

@Service
public class CartService {

    private final CartRepository cartRepo;
    private final ProductRepository productRepo;

    public CartService(CartRepository cartRepo,
                       ProductRepository productRepo) {
        this.cartRepo = cartRepo;
        this.productRepo = productRepo;
    }

    // ✅ GET CART
    public List<CartItem> getCart(Long userId) {
        return cartRepo.findByUserIdAndOrderIdIsNull(userId);
    }

    // ✅ ADD TO CART
    public void addToCart(Long userId, Long productId, int quantity) {

        Product product = productRepo.findById(productId)
                .orElseThrow(() ->
                        new RuntimeException("Product not found with id: " + productId)
                );

        CartItem item = cartRepo
                .findByUserIdAndProductIdAndOrderIdIsNull(userId, productId)
                .orElse(null);

        if (item == null) {
            item = new CartItem();
            item.setUserId(userId);
            item.setProductId(productId);
            item.setProductName(product.getName());
            item.setPrice(product.getPrice());
            item.setCarbonImpact(product.getCarbonImpact());
            item.setQuantity(quantity);
            item.setOrderId(null); // 🔥 important
        } else {
            item.setQuantity(item.getQuantity() + quantity);
        }

        cartRepo.save(item);
    }

    // ✅ REMOVE FROM CART (🔥 TRANSACTION REQUIRED)
    @Transactional
    public void remove(Long userId, Long productId) {
        cartRepo.deleteByUserIdAndProductIdAndOrderIdIsNull(userId, productId);
    }
}