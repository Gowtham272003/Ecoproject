package com.ecobazaar.backend.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.ecobazaar.backend.service.SellerAnalyticsService;

@RestController
@RequestMapping("/api/seller/analytics")
@CrossOrigin(origins = "*")
public class SellerAnalyticsController {

    @Autowired
    private SellerAnalyticsService service;

    // Product-wise carbon data
    @GetMapping("/products/{sellerId}")
    public List<Map<String, Object>> getSellerAnalytics(
            @PathVariable Long sellerId) {
        return service.getSellerAnalytics(sellerId);
    }

    // Summary data
    @GetMapping("/summary/{sellerId}")
    public Map<String, Object> getSellerSummary(
            @PathVariable Long sellerId) {
        return service.getSellerSummary(sellerId);
    }
}