package com.ecobazaar.backend.service;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.ecobazaar.backend.model.Product;
import com.ecobazaar.backend.model.User;
import com.ecobazaar.backend.repository.ProductRepository;
import com.ecobazaar.backend.repository.UserRepository;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public ProductService(ProductRepository productRepository,
                          UserRepository userRepository) {
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    // ================= SELLER =================

    // ➕ Add product (AUTO SET SELLER ID)
    public Product addProduct(Product product) {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String username = authentication.getName();

        User seller = userRepository.findByUsername(username)
                .orElseThrow(() ->
                        new RuntimeException("Seller not found"));

        product.setSellerId(seller.getId());

        return productRepository.save(product);
    }

    // ================= ADMIN =================

    // ✅ Approve Eco Product (ADMIN ONLY)
    public Product approveEcoProduct(Long id) {

        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        product.setEcoCertified(true);
        product.setEcoVerified(true); // if using this field

        return productRepository.save(product);
    }

    // ================= OTHER METHODS =================

    public Product updateProduct(Long id, Product product) {
        Product existing = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        existing.setName(product.getName());
        existing.setDescription(product.getDescription());
        existing.setPrice(product.getPrice());
        existing.setCarbonImpact(product.getCarbonImpact());
        existing.setEcoCertified(product.isEcoCertified());
        existing.setEcoRating(product.getEcoRating());

        return productRepository.save(existing);
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }

    public List<Product> searchByName(String name) {
        return productRepository.findByNameContainingIgnoreCase(name);
    }

    public List<Product> filterByEcoRating(String rating) {
        return productRepository.findByEcoRating(rating);
    }

    public List<Product> sortByCarbon() {
        return productRepository.findAllByOrderByCarbonImpactAsc();
    }
}