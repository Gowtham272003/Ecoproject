package com.ecobazaar.backend.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecobazaar.backend.model.CartItem;
import com.ecobazaar.backend.model.Order;
import com.ecobazaar.backend.repository.CartRepository;
import com.ecobazaar.backend.repository.OrderRepository;

@Service
public class OrderService {

    @Autowired
    private CartRepository cartRepo;

    @Autowired
    private OrderRepository orderRepo;

    // ✅ CHECKOUT
    public void checkout(Long userId) {

        List<CartItem> cart =
                cartRepo.findByUserIdAndOrderIdIsNull(userId);

        if (cart.isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }

        for (CartItem item : cart) {

            Order order = new Order();

            order.setUserId(userId);

            // 🔥 VERY IMPORTANT
            order.setProductId(item.getProductId());

            double itemTotalPrice =
                    item.getPrice() * item.getQuantity();

            double itemTotalCarbon =
                    item.getCarbonImpact() * item.getQuantity();

            order.setTotalPrice(itemTotalPrice);
            order.setTotalCarbon(itemTotalCarbon);

            // ✅ Carbon Saved Calculation
            double baselineCarbon = 5.0;
            double carbonSaved =
                    baselineCarbon - itemTotalCarbon;

            if (carbonSaved < 0) carbonSaved = 0;

            order.setCarbonSaved(carbonSaved);
            order.setOrderDate(LocalDateTime.now());

            orderRepo.save(order);

            // attach order id to cart
            item.setOrderId(order.getId());
        }

        cartRepo.saveAll(cart);
    }
}