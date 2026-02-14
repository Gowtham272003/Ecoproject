package com.ecobazaar.backend.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ecobazaar.backend.service.OrderService;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin
public class OrderController {

    private final OrderService service;

    public OrderController(OrderService service) {
        this.service = service;
    }

    // ✅ FRONTEND: POST /api/orders/checkout { userId }
    @PostMapping("/checkout")
    public ResponseEntity<?> checkout(@RequestBody Map<String, Long> body) {

        Long userId = body.get("userId");

        if (userId == null) {
            return ResponseEntity.badRequest().body("userId missing");
        }

        service.checkout(userId);

        return ResponseEntity.ok("Order placed successfully");
    }
}