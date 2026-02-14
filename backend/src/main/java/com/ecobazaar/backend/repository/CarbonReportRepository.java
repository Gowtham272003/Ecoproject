package com.ecobazaar.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ecobazaar.backend.dto.LeaderboardDTO;
import com.ecobazaar.backend.model.Order;

public interface CarbonReportRepository extends JpaRepository<Order, Long> {

    @Query("""
        SELECT new com.ecobazaar.backend.dto.LeaderboardDTO(
            CAST(o.userId AS string),
            SUM(o.carbonSaved)
        )
        FROM Order o
        GROUP BY o.userId
        ORDER BY SUM(o.carbonSaved) DESC
    """)
    List<LeaderboardDTO> getLeaderboard();
}