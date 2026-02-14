package com.ecobazaar.backend.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.ecobazaar.backend.repository.OrderRepository;
import com.ecobazaar.backend.repository.ProductRepository;

@RestController
@RequestMapping("/api/analytics")
@CrossOrigin(origins = "*")
public class AnalyticsController {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductRepository productRepository;

    // =========================
    // USER ANALYTICS
    // =========================
    @GetMapping("/user/{userId}")
    public List<Map<String, Object>> getUserAnalytics(
            @PathVariable Long userId) {

        return orderRepository.getMonthlyCarbonByUser(userId);
    }

    // =========================
    // USER TOTAL CARBON SAVED
    // =========================
    @GetMapping("/user/{userId}/total-saved")
    public Map<String, Object> getTotalCarbonSaved(
            @PathVariable Long userId) {

        Double saved = orderRepository.getTotalCarbonSavedByUser(userId);

        return Map.of(
            "userId", userId,
            "totalCarbonSaved", saved != null ? saved : 0
        );
    }

    // =========================
    // ADMIN OVERVIEW
    // =========================
    @GetMapping("/admin/overview")
    public Map<String, Object> getAdminOverview() {

        Double totalCarbon = orderRepository.getTotalCarbon();
        Double totalRevenue = orderRepository.getTotalRevenue();
        Long totalUsers = orderRepository.getActiveUserCount();

        return Map.of(
            "totalCarbon", totalCarbon != null ? totalCarbon : 0,
            "totalRevenue", totalRevenue != null ? totalRevenue : 0,
            "totalUsers", totalUsers != null ? totalUsers : 0
        );
    }

    // =========================
    // ✅ UPDATED SELLER ANALYTICS
    // =========================
    @GetMapping("/seller-summary/{sellerId}")
    public Map<String, Object> getSellerSummary(
            @PathVariable Long sellerId) {

        // ✅ FIXED: Use Long
        Long totalProducts =
                productRepository.countBySellerId(sellerId);

        if (totalProducts == null) totalProducts = 0L;

        Double totalRevenue =
                orderRepository.getRevenueBySeller(sellerId);

        if (totalRevenue == null) totalRevenue = 0.0;

        Double carbonSaved =
                orderRepository.getCarbonSavedBySeller(sellerId);

        if (carbonSaved == null) carbonSaved = 0.0;

        return Map.of(
            "totalProducts", totalProducts,
            "totalRevenue", totalRevenue,
            "carbonSaved", carbonSaved
        );
    }
}