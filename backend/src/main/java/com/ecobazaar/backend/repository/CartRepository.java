package com.ecobazaar.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;

import com.ecobazaar.backend.model.CartItem;

public interface CartRepository extends JpaRepository<CartItem, Long> {

    // 🛒 GET CART ITEMS
    List<CartItem> findByUserIdAndOrderIdIsNull(Long userId);

    // 🛒 CHECK IF ITEM EXISTS
    Optional<CartItem> findByUserIdAndProductIdAndOrderIdIsNull(
            Long userId,
            Long productId
    );

    // 🗑 REMOVE FROM CART (🔥 REQUIRED ANNOTATIONS)
    @Modifying
    @Transactional
    void deleteByUserIdAndProductIdAndOrderIdIsNull(
            Long userId,
            Long productId
    );
}