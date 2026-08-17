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

    @Column(name = "owner_id", nullable = false, unique = true)
    private Long ownerId;

    @Column(name = "business_name", nullable = false, length = 150)
    private String businessName;

    @Column(name = "establishment_type", length = 50)
    private String establishmentType;

    @Column(name = "fssai_license", nullable = false, length = 80)
    private String fssaiLicense;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String address;

    @Column(nullable = false)
    private Double latitude;

    @Column(nullable = false)
    private Double longitude;

    @Column(nullable = false, length = 80)
    private String city;

    @Column(name = "verification_status", length = 50)
    private String verificationStatus = "VERIFIED";

    @Column(name = "tax_information", length = 100)
    private String taxInformation = "Sec 80G Eligible (IT Act 1961)";

    @Column(name = "total_donations")
    private Integer totalDonations = 26;

    @Column(name = "total_tax_saved_inr")
    private BigDecimal totalTaxSavedInr = new BigDecimal("8750.00");

    @Column(name = "shelters_helped_count")
    private Integer sheltersHelpedCount = 18;

    @Column(name = "logo_url", length = 500)
    private String logoUrl;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
}
