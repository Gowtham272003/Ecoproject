package com.ecobazaar.backend.controller;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.ecobazaar.backend.model.User;
import com.ecobazaar.backend.repository.UserRepository;
import com.ecobazaar.backend.repository.SellerAnalyticsRepository;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SellerAnalyticsRepository sellerRepo;

    // ✅ SYSTEM SUMMARY
    @GetMapping("/summary")
    public Map<String, Object> getSystemSummary() {

        Double totalCarbon = sellerRepo.getTotalCarbonSaved();
        if (totalCarbon == null) totalCarbon = 0.0;

        long totalUsers = userRepository.count();
        long totalSellers = userRepository.findByRole("SELLER").size();

        Map<String, Object> report = new HashMap<>();
        report.put("totalCarbon", totalCarbon);
        report.put("totalUsers", totalUsers);
        report.put("totalSellers", totalSellers);

        return report;
    }

    // ✅ GET ALL USERS
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // ✅ GET ALL SELLERS
    @GetMapping("/sellers")
    public List<User> getAllSellers() {
        return userRepository.findByRole("SELLER");
    }
}