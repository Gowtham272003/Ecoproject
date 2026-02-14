package com.ecobazaar.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ecobazaar.backend.model.Order;

public interface SellerAnalyticsRepository extends JpaRepository<Order, Long> {

    // 🔹 Count total products added by seller
    @Query(value = "SELECT COUNT(*) FROM products WHERE seller_id = :sellerId", nativeQuery = true)
    Integer getTotalProducts(@Param("sellerId") Long sellerId);

    // 🔹 Product-wise carbon saved (from orders)
    @Query(value = """
        SELECT p.name, COALESCE(SUM(o.carbon_saved), 0)
        FROM orders o
        JOIN products p ON o.product_id = p.id
        WHERE p.seller_id = :sellerId
        GROUP BY p.name
    """, nativeQuery = true)
    List<Object[]> getSellerCarbonImpact(@Param("sellerId") Long sellerId);

    // 🔹 Seller total revenue (from orders)
    @Query(value = """
        SELECT COALESCE(SUM(o.total_price), 0)
        FROM orders o
        JOIN products p ON o.product_id = p.id
        WHERE p.seller_id = :sellerId
    """, nativeQuery = true)
    Double getSellerRevenue(@Param("sellerId") Long sellerId);

    // 🔹 Admin total carbon saved
    @Query("SELECT COALESCE(SUM(o.carbonSaved), 0) FROM Order o")
    Double getTotalCarbonSaved();
}