package com.ecobazaar.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import com.ecobazaar.backend.dto.LeaderboardDTO;
import com.ecobazaar.backend.service.ReportService;

@RestController
@RequestMapping("/api/reports") // ⚠ changed to plural
@CrossOrigin
public class ReportController {

    @Autowired
    private ReportService reportService;

    // ✅ LEADERBOARD
    @GetMapping("/leaderboard")
    public List<LeaderboardDTO> getLeaderboard() {
        return reportService.getLeaderboard();
    }

    // ✅ PDF DOWNLOAD
    @GetMapping("/pdf/{userId}")
    public ResponseEntity<byte[]> downloadPdf(@PathVariable Long userId) {

        byte[] pdf = reportService.generateUserPDF(userId);

        return ResponseEntity.ok()
            .header(HttpHeaders.CONTENT_DISPOSITION,
                "attachment; filename=carbon-report.pdf")
            .contentType(MediaType.APPLICATION_PDF)
            .body(pdf);
    }

    // ✅ CSV DOWNLOAD
    @GetMapping("/csv")
    public ResponseEntity<String> downloadCsv() {

        String csv = reportService.generateCSV();

        return ResponseEntity.ok()
            .header(HttpHeaders.CONTENT_DISPOSITION,
                "attachment; filename=carbon-report.csv")
            .contentType(MediaType.TEXT_PLAIN)
            .body(csv);
    }
}