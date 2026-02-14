package com.ecobazaar.backend.dto;

public class LeaderboardDTO {

    private String userName;
    private Double carbonSaved;

    // ✅ Constructor (must match query order)
    public LeaderboardDTO(String userName, Double carbonSaved) {
        this.userName = userName;
        this.carbonSaved = carbonSaved;
    }

    // ✅ Getter for username
    public String getUserName() {
        return userName;
    }

    // ✅ Getter for total carbon saved
    public Double getCarbonSaved() {
        return carbonSaved;
    }

    // Optional setters (not required but good practice)

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public void setCarbonSaved(Double carbonSaved) {
        this.carbonSaved = carbonSaved;
    }
}