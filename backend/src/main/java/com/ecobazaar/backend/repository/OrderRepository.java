package com.ecobazaar.backend.repository;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ecobazaar.backend.model.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {

    // ================= USER ANALYTICS =================
    @Query(value = """
        SELECT 
            MONTH(order_date) AS month,
            SUM(total_carbon) AS carbon
        FROM orders
        WHERE user_id = :userId
        GROUP BY MONTH(order_date)
        ORDER BY MONTH(order_date)
    """, nativeQuery = true)
    List<Map<String, Object>> getMonthlyCarbonByUser(
            @Param("userId") Long userId
    );

    // ================= ADMIN =================
    @Query("SELECT SUM(o.totalCarbon) FROM Order o")
    Double getTotalCarbon();

    @Query("SELECT SUM(o.totalPrice) FROM Order o")
    Double getTotalRevenue();

    @Query("SELECT COUNT(DISTINCT o.userId) FROM Order o")
    Long getActiveUserCount();

    // ================= SELLER FIXED =================

    @Query("""
        SELECT SUM(o.totalPrice)
        FROM Order o
        JOIN Product p ON o.productId = p.id
        WHERE p.sellerId = :sellerId
    """)
    Double getRevenueBySeller(@Param("sellerId") Long sellerId);

    @Query("""
        SELECT SUM(o.carbonSaved)
        FROM Order o
        JOIN Product p ON o.productId = p.id
        WHERE p.sellerId = :sellerId
    """)
    Double getCarbonSavedBySeller(@Param("sellerId") Long sellerId);

    // ================= USER TOTAL SAVED =================
    @Query("""
        SELECT SUM(o.carbonSaved)
        FROM Order o
        WHERE o.userId = :userId
    """)
    Double getTotalCarbonSavedByUser(@Param("userId") Long userId);
}