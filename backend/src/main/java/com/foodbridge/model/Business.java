package com.foodbridge.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "businesses")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Business {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "owner_id", nullable = false)
    private Long ownerId;

    @Column(name = "donor_type", length = 50)
    private String donorType; // RESTAURANT, WEDDING, HOTEL, HOSTEL, PARTY, COLLEGE, CORPORATE_EVENT, CATERER, COMMUNITY_EVENT, OTHER

    @Column(name = "business_name", nullable = false, length = 150)
    private String businessName;

    @Column(name = "event_name", length = 150)
    private String eventName;

    @Column(name = "venue_name", length = 150)
    private String venueName;

    @Column(name = "establishment_type", length = 50)
    private String establishmentType;

    @Column(name = "fssai_license", length = 80)
    private String fssaiLicense;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String address;

    @Column(nullable = false)
    private Double latitude;

    @Column(nullable = false)
    private Double longitude;

    @Column(nullable = false, length = 80)
    private String city;

    @Column(name = "food_type", length = 50)
    private String foodType; // VEG, NON_VEG, BOTH

    @Column(name = "estimated_servings")
    private Integer estimatedServings;

    @Column(name = "storage_condition", length = 50)
    private String storageCondition;

    @Column(name = "available_until", length = 50)
    private String availableUntil;

    @Column(name = "verification_status", length = 50)
    private String verificationStatus = "PENDING";

    @Column(name = "tax_information", length = 100)
    private String taxInformation = "Sec 80G Eligible (IT Act 1961)";

    @Column(name = "total_donations")
    private Integer totalDonations = 0;

    @Column(name = "total_tax_saved_inr")
    private BigDecimal totalTaxSavedInr = BigDecimal.ZERO;

    @Column(name = "shelters_helped_count")
    private Integer sheltersHelpedCount = 0;

    @Column(name = "logo_url", columnDefinition = "TEXT")
    private String logoUrl;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
}
