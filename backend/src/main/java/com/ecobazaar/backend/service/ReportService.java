package com.ecobazaar.backend.service;

import java.io.ByteArrayOutputStream;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecobazaar.backend.dto.LeaderboardDTO;
import com.ecobazaar.backend.model.Order;
import com.ecobazaar.backend.repository.CarbonReportRepository;
import com.lowagie.text.Document;
import com.lowagie.text.Paragraph;
import com.lowagie.text.pdf.PdfWriter;

@Service
public class ReportService {

    @Autowired
    private CarbonReportRepository carbonReportRepository;

    // ==================================
    // ✅ LEADERBOARD
    // ==================================
    public List<LeaderboardDTO> getLeaderboard() {
        return carbonReportRepository.getLeaderboard();
    }

    // ==================================
    // ✅ GENERATE USER PDF REPORT
    // ==================================
    public byte[] generateUserPDF(Long userId) {

        try {
            ByteArrayOutputStream out = new ByteArrayOutputStream();

            Document document = new Document();
            PdfWriter.getInstance(document, out);

            document.open();

            document.add(new Paragraph("EcoBazaar Carbon Report"));
            document.add(new Paragraph("Generated On: " + LocalDateTime.now()));
            document.add(new Paragraph(" "));

            List<Order> orders = carbonReportRepository.findAll();

            double totalCarbon = 0;

            for (Order order : orders) {
                if (order.getUserId().equals(userId)) {

                    document.add(new Paragraph(
                        "Order ID: " + order.getId()
                        + " | Carbon Saved: "
                        + order.getCarbonSaved() + " kg"
                    ));

                    totalCarbon += order.getCarbonSaved();
                }
            }

            document.add(new Paragraph(" "));
            document.add(new Paragraph("Total Carbon Saved: " + totalCarbon + " kg"));

            document.close();

            return out.toByteArray();

        } catch (Exception e) {
            throw new RuntimeException("Error generating PDF", e);
        }
    }

    // ==================================
    // ✅ GENERATE SYSTEM CSV REPORT
    // ==================================
    public String generateCSV() {

        StringBuilder sb = new StringBuilder();
        sb.append("UserName,TotalCarbonSaved\n");

        List<LeaderboardDTO> leaderboard = carbonReportRepository.getLeaderboard();

        for (LeaderboardDTO data : leaderboard) {

            sb.append(data.getUserName())      // ✅ FIXED
              .append(",")
              .append(data.getCarbonSaved())  // ✅ FIXED
              .append("\n");
        }

        return sb.toString();
    }
}