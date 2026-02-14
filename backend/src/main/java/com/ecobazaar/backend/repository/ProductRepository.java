package com.ecobazaar.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ecobazaar.backend.model.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByNameContainingIgnoreCase(String name);

    List<Product> findByEcoRating(String ecoRating);

    List<Product> findAllByOrderByCarbonImpactAsc();

    List<Product> findByCarbonImpactLessThan(double carbonImpact);

    // ✅ Seller Product Count
    @Query("SELECT COUNT(p) FROM Product p WHERE p.sellerId = :sellerId")
    Long countBySellerId(@Param("sellerId") Long sellerId);

    // ✅ Seller Total Revenue
    @Query("SELECT COALESCE(SUM(p.price), 0) FROM Product p WHERE p.sellerId = :sellerId")
    Double getTotalRevenueBySeller(@Param("sellerId") Long sellerId);

    // ✅ Seller Total Carbon Impact
    @Query("SELECT COALESCE(SUM(p.carbonImpact), 0) FROM Product p WHERE p.sellerId = :sellerId")
    Double getTotalCarbonBySeller(@Param("sellerId") Long sellerId);
}