package com.foodbridge.controller;

import com.foodbridge.model.Business;
import com.foodbridge.model.User;
import com.foodbridge.model.Role;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/onboarding")
@CrossOrigin(origins = "*")
public class OnboardingController {

    /**
     * RESTAURANT ONBOARDING ENDPOINT
     * Creates new business record mapped to authenticated owner with PENDING verification & 0 stats.
     */
    @PostMapping("/business")
    public ResponseEntity<?> createBusinessOnboarding(
            @RequestBody Map<String, String> request,
            @RequestHeader(value = "X-User-Id", defaultValue = "1") Long userId
    ) {
        String restaurantName = request.getOrDefault("restaurantName", "New Restaurant Entity");
        String address = request.getOrDefault("address", "Delhi, India");
        String fssaiLicense = request.getOrDefault("fssaiLicense", "100" + System.currentTimeMillis());

        Business newBusiness = Business.builder()
                .id(System.currentTimeMillis())
                .ownerId(userId)
                .businessName(restaurantName)
                .establishmentType("RESTAURANT")
                .fssaiLicense(fssaiLicense)
                .address(address)
                .latitude(28.6139)
                .longitude(77.2090)
                .city("New Delhi")
                .verificationStatus("PENDING") // Default status for brand new accounts!
                .taxInformation("Sec 80G Application Pending")
                .totalDonations(0) // Brand new accounts start with ZERO stats!
                .totalTaxSavedInr(BigDecimal.ZERO)
                .sheltersHelpedCount(0)
                .logoUrl(request.getOrDefault("logoUrl", "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=200&q=80"))
                .build();

        return ResponseEntity.ok(Map.of(
                "status", 200,
                "success", true,
                "message", "Restaurant onboarding submitted successfully. Verification pending.",
                "business", newBusiness
        ));
    }

    /**
     * NGO / SHELTER ONBOARDING ENDPOINT
     */
    @PostMapping("/ngo")
    public ResponseEntity<?> createNgoOnboarding(
            @RequestBody Map<String, String> request,
            @RequestHeader(value = "X-User-Id", defaultValue = "1") Long userId
    ) {
        String orgName = request.getOrDefault("orgName", "New Relief NGO");
        String orgType = request.getOrDefault("orgType", "NGO");

        return ResponseEntity.ok(Map.of(
                "status", 200,
                "success", true,
                "message", "Organization onboarding submitted successfully.",
                "organization", Map.of(
                        "id", System.currentTimeMillis(),
                        "ownerId", userId,
                        "name", orgName,
                        "type", orgType,
                        "verificationStatus", "PENDING"
                )
        ));
    }
}
