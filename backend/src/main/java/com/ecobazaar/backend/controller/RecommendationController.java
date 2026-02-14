package com.ecobazaar.backend.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.ecobazaar.backend.model.Product;
import com.ecobazaar.backend.repository.ProductRepository;

@RestController
@RequestMapping("/api/recommendations")
@CrossOrigin
public class RecommendationController {

    @Autowired
    private ProductRepository repo;

    @GetMapping("/green")
    public List<Product> recommend(@RequestParam double carbon) {
        return repo.findAll()
                .stream()
                .filter(Product::isEcoCertified)
                .filter(p -> p.getCarbonImpact() < carbon)
                .limit(3)
                .toList();
    }
}
