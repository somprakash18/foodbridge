package com.foodbridge.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "food_listings")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FoodListing {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "restaurant_id", nullable = false)
    private Long restaurantId;

    @Column(nullable = false, length = 150)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Category category;

    @Enumerated(EnumType.STRING)
    @Column(name = "dietary_type", nullable = false)
    private DietaryType dietaryType;

    @Column(name = "quantity_kg", nullable = false, precision = 8, scale = 2)
    private BigDecimal quantityKg;

    @Column(nullable = false)
    private Integer servings;

    @Column(name = "original_price", nullable = false, precision = 10, scale = 2)
    private BigDecimal originalPrice;

    @Column(name = "discounted_price", nullable = false, precision = 10, scale = 2)
    private BigDecimal discountedPrice = BigDecimal.ZERO;

    @Column(name = "is_free_donation")
    private Boolean isFreeDonation = false;

    @Column(name = "preparation_time", nullable = false)
    private LocalDateTime preparationTime;

    @Column(name = "expiry_time", nullable = false)
    private LocalDateTime expiryTime;

    @Column(name = "pickup_deadline", nullable = false)
    private LocalDateTime pickupDeadline;

    @Enumerated(EnumType.STRING)
    @Column(name = "storage_temp")
    private StorageTemp storageTemp = StorageTemp.ROOM_TEMP;

    @Enumerated(EnumType.STRING)
    @Column(name = "packaging_status")
    private PackagingStatus packagingStatus = PackagingStatus.PACKED_BOX;

    @Column(name = "ai_safety_score", precision = 3, scale = 2)
    private BigDecimal aiSafetyScore;

    @Enumerated(EnumType.STRING)
    @Column(name = "ai_recommendation")
    private AiRecommendation aiRecommendation = AiRecommendation.SELL_NOW;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status = Status.AVAILABLE;

    @Column(name = "qr_code_hash", unique = true)
    private String qrCodeHash;

    public enum Category { MEALS, BAKERY, FRUITS_VEG, DAIRY, BEVERAGES, PACKAGED }
    public enum DietaryType { VEG, NON_VEG, VEGAN, EGG }
    public enum StorageTemp { HOT, COLD, ROOM_TEMP, FROZEN }
    public enum PackagingStatus { SEALED_CONTAINER, PACKED_BOX, LOOSE_FOIL }
    public enum AiRecommendation { DONATE_NOW, SELL_NOW, UNSAFE }
    public enum Status { AVAILABLE, RESERVED, PICKED_UP, EXPIRED, CANCELLED }
}
