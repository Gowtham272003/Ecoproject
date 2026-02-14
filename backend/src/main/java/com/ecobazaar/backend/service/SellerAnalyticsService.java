package com.ecobazaar.backend.service;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecobazaar.backend.repository.SellerAnalyticsRepository;
import com.ecobazaar.backend.repository.ProductRepository;

@Service
public class SellerAnalyticsService {

    @Autowired
    private SellerAnalyticsRepository repository;

    @Autowired
    private ProductRepository productRepository;

    // ✅ Product-wise carbon data
    public List<Map<String, Object>> getSellerAnalytics(Long sellerId) {

        List<Object[]> data = repository.getSellerCarbonImpact(sellerId);
        List<Map<String, Object>> result = new ArrayList<>();

        if (data != null) {
            for (Object[] row : data) {
                Map<String, Object> map = new HashMap<>();
                map.put("productName", row[0]);
                map.put("carbonSaved",
                        row[1] != null ? ((Number) row[1]).doubleValue() : 0.0);
                result.add(map);
            }
        }

        return result;
    }

    // ✅ FIXED Seller Summary
    public Map<String, Object> getSellerSummary(Long sellerId) {

        // ✅ FIX: Use Long
        Long totalProducts =
                productRepository.countBySellerId(sellerId);

        if (totalProducts == null) totalProducts = 0L;

        Double revenue = repository.getSellerRevenue(sellerId);
        if (revenue == null) revenue = 0.0;

        List<Object[]> data = repository.getSellerCarbonImpact(sellerId);
        double totalCarbonSaved = 0;

        if (data != null) {
            for (Object[] row : data) {
                if (row[1] != null)
                    totalCarbonSaved += ((Number) row[1]).doubleValue();
            }
        }

        Map<String, Object> summary = new HashMap<>();
        summary.put("totalProducts", totalProducts);
        summary.put("totalRevenue", revenue);
        summary.put("carbonSaved", totalCarbonSaved);

        return summary;
    }
}