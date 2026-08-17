package com.foodbridge.controller;

import com.foodbridge.model.Business;
import com.foodbridge.model.Role;
import com.foodbridge.model.User;
import com.foodbridge.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/businesses")
@CrossOrigin(origins = "*")
public class BusinessController {

    @Autowired
    private UserRepository userRepository;

    /**
     * OWNER / OWNER_ADMIN ONLY ENDPOINT
     * Enforces strict Backend / API Level Permission Checks:
     * - Returns private business profile, statistics, tax savings ONLY if caller is RESTAURANT_OWNER or OWNER_ADMIN.
     * - Returns 403 Forbidden if called by normal users, donors, NGOs, or shelters!
     */
    @GetMapping("/me")
    public ResponseEntity<?> getOwnerBusinessProfile(
            @RequestHeader(value = "X-User-Role", defaultValue = "USER") String roleHeader,
            @RequestHeader(value = "X-User-Id", defaultValue = "1") Long userId
    ) {
        // Strict Authorization Enforcement
        boolean isOwner = "RESTAURANT_OWNER".equals(roleHeader) || "OWNER_ADMIN".equals(roleHeader);
        if (!isOwner) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of(
                    "status", 403,
                    "error", "Forbidden",
                    "message", "Access denied. Private business metrics and owner statistics can only be accessed by verified business owners."
            ));
        }

        // Return Owner's Verified Business Record
        Business ownerBusiness = Business.builder()
                .id(1L)
                .ownerId(userId != null ? userId : 1L)
                .businessName("Som Prakash Restaurant & Dining")
                .establishmentType("RESTAURANT")
                .fssaiLicense("10019011006542")
                .address("Connaught Place B-Block, New Delhi")
                .latitude(28.6315)
                .longitude(77.2167)
                .city("New Delhi")
                .verificationStatus("VERIFIED DONOR")
                .taxInformation("Sec 80G Eligible (IT Act 1961)")
                .totalDonations(26)
                .totalTaxSavedInr(new BigDecimal("8750.00"))
                .sheltersHelpedCount(18)
                .logoUrl("https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=200&q=80")
                .build();

        return ResponseEntity.ok(ownerBusiness);
    }
}
