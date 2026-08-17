package com.foodbridge.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 120)
    private String name;

    @Column(nullable = false, unique = true, length = 150)
    private String email;

    @Column(unique = true, length = 20)
    private String phone;

    @Column(name = "password_hash")
    private String passwordHash;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @Column(name = "avatar_url", length = 500)
    private String avatarUrl;

    @Column(name = "cover_url", length = 500)
    private String coverUrl;

    @Column(name = "is_verified")
    private Boolean isVerified = false;

    @Column(name = "verification_badge", length = 50)
    private String verificationBadge = "UNVERIFIED";

    @Column(name = "google_id", length = 100)
    private String googleId;

    @Column(name = "referral_code", unique = true, length = 30)
    private String referralCode;

    @Column(name = "referred_by", length = 30)
    private String referredBy;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public enum Role {
        RESTAURANT, NGO, BUYER, DELIVERY_PARTNER, OWNER_ADMIN
    }
}
