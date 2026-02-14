package com.ecobazaar.backend.model;

import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "product_id")   // ✅ NEW
    private Long productId;

    @Column(name = "total_price")
    private double totalPrice;

    @Column(name = "total_carbon")
    private double totalCarbon;

    @Column(name = "carbon_saved")
    private Double carbonSaved;

    @Column(name = "order_date")
    private LocalDateTime orderDate;

    // ===== Getters & Setters =====

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public Long getProductId() { return productId; }   // ✅ NEW
    public void setProductId(Long productId) { this.productId = productId; }

    public double getTotalPrice() { return totalPrice; }
    public void setTotalPrice(double totalPrice) { this.totalPrice = totalPrice; }

    public double getTotalCarbon() { return totalCarbon; }
    public void setTotalCarbon(double totalCarbon) { this.totalCarbon = totalCarbon; }

    public Double getCarbonSaved() { return carbonSaved; }
    public void setCarbonSaved(Double carbonSaved) { this.carbonSaved = carbonSaved; }

    public LocalDateTime getOrderDate() { return orderDate; }
    public void setOrderDate(LocalDateTime orderDate) { this.orderDate = orderDate; }
}