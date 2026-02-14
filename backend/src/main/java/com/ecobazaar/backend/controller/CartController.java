package com.ecobazaar.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ecobazaar.backend.dto.CartRequest;
import com.ecobazaar.backend.model.CartItem;
import com.ecobazaar.backend.service.CartService;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "http://localhost:3000")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    // ✅ ADD TO CART (USER ID OPTIONAL)
    @PostMapping("/add")
    public ResponseEntity<?> addToCart(@RequestBody CartRequest request) {

        try {
            // 🔥 TEMP USER (until JWT extraction)
            Long userId = request.getUserId() != null ? request.getUserId() : 1L;

            if (request.getProductId() == null) {
                return ResponseEntity.badRequest().body("productId missing");
            }

            int quantity = request.getQuantity() != null ? request.getQuantity() : 1;

            cartService.addToCart(userId, request.getProductId(), quantity);

            return ResponseEntity.ok("Added to cart");

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Failed to add to cart");
        }
    }

    // ✅ GET CART
    @GetMapping("/{userId}")
    public ResponseEntity<List<CartItem>> getCart(@PathVariable Long userId) {
        return ResponseEntity.ok(cartService.getCart(userId));
    }
  
    // ✅ REMOVE ITEM
    @DeleteMapping("/remove/{userId}/{productId}")
    public ResponseEntity<?> remove(
            @PathVariable Long userId,
            @PathVariable Long productId) {

        cartService.remove(userId, productId);
        return ResponseEntity.ok("Removed");
    }
}