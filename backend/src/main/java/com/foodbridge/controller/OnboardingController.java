package com.foodbridge.controller;

import com.foodbridge.model.Business;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "*")
public class OnboardingController {

    /**
     * MULTI-DONOR TYPE ONBOARDING ENDPOINT
     * Supports Restaurants, Weddings, Hotels, Hostels, Parties, Colleges, Corporate Events, Caterers, and Community Events.
     */
    @PostMapping("/onboarding/food-donor")
    public ResponseEntity<?> createFoodDonorOnboarding(
            @RequestBody Map<String, String> request,
            @RequestHeader(value = "X-User-Id", defaultValue = "1") Long userId
    ) {
        String donorType = request.getOrDefault("donorType", "RESTAURANT");
        String name = request.getOrDefault("name", request.getOrDefault("restaurantName", "Surplus Food Donor"));
        String eventName = request.getOrDefault("eventName", null);
        String venueName = request.getOrDefault("venueName", null);
        String address = request.getOrDefault("address", "New Delhi, India");
        String fssaiLicense = request.getOrDefault("fssaiLicense", null);

        Business newDonor = Business.builder()
                .id(System.currentTimeMillis())
                .ownerId(userId)
                .donorType(donorType)
                .businessName(name)
                .eventName(eventName)
                .venueName(venueName)
                .establishmentType(donorType)
                .fssaiLicense(fssaiLicense)
                .address(address)
                .latitude(28.6139)
                .longitude(77.2090)
                .city("New Delhi")
                .foodType(request.getOrDefault("foodType", "BOTH"))
                .estimatedServings(Integer.parseInt(request.getOrDefault("estimatedServings", "50")))
                .storageCondition(request.getOrDefault("storageCondition", "ROOM_TEMPERATURE"))
                .availableUntil(request.getOrDefault("availableUntil", "11:30 PM"))
                .verificationStatus("PENDING")
                .totalDonations(0)
                .totalTaxSavedInr(BigDecimal.ZERO)
                .sheltersHelpedCount(0)
                .logoUrl(request.getOrDefault("logoUrl", "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=200&q=80"))
                .build();

        return ResponseEntity.ok(Map.of(
                "status", 200,
                "success", true,
                "message", donorType + " food donor registration created successfully.",
                "donor", newDonor
        ));
    }

    /**
     * QUICK EMERGENCY "DONATE LEFTOVER FOOD NOW" ENDPOINT
     */
    @PostMapping("/donations/request-emergency")
    public ResponseEntity<?> requestEmergencyDonation(
            @RequestBody Map<String, Object> request,
            @RequestHeader(value = "X-User-Id", defaultValue = "1") Long userId
    ) {
        String requestId = "DON-REQ-" + (int)((Math.random() * 9000) + 1000);
        String address = (String) request.getOrDefault("address", "Grand Palace Banquet Hall, Delhi");
        String servings = String.valueOf(request.getOrDefault("servings", "120"));
        String foodType = (String) request.getOrDefault("foodType", "Vegetarian");

        Map<String, Object> matchedPartners = Map.of(
                "count", 3,
                "partners", List.of(
                        Map.of("id", 1, "name", "Food Relief Foundation", "distance", "1.2 km", "type", "NGO"),
                        Map.of("id", 2, "name", "Hope Shelter Delhi", "distance", "2.4 km", "type", "SHELTER"),
                        Map.of("id", 3, "name", "Robin Hood Army Delhi Squad", "distance", "3.1 km", "type", "VOLUNTEER")
                )
        );

        return ResponseEntity.ok(Map.of(
                "status", 200,
                "success", true,
                "message", "Food donation request created successfully.",
                "requestId", requestId,
                "pickupLocation", address,
                "estimatedServings", servings,
                "foodType", foodType,
                "pickupStatus", "SEARCHING_FOR_PICKUP",
                "assignedVolunteer", "Volunteer Searching...",
                "matchedPartners", matchedPartners
        ));
    }
}
