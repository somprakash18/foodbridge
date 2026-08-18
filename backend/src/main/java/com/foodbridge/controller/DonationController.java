package com.foodbridge.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequestMapping("/api/v1/donations")
@CrossOrigin(origins = "*")
public class DonationController {

    private final Map<Long, Map<String, Object>> donationsStore = new ConcurrentHashMap<>();

    public DonationController() {
        // Initialize with default surplus donations
        initDefaultDonations();
    }

    private void initDefaultDonations() {
        Map<String, Object> item1 = new HashMap<>();
        item1.put("id", 1L);
        item1.put("title", "Royal Hyderabadi Chicken Biryani Combo");
        item1.put("restaurantName", "The Grand Palace Hotel");
        item1.put("category", "MEALS");
        item1.put("dietaryType", "NON_VEG");
        item1.put("servings", 35);
        item1.put("originalPrice", 5200);
        item1.put("discountedPrice", 99);
        item1.put("isFreeDonation", false);
        item1.put("status", "AVAILABLE");
        item1.put("distanceKm", 1.2);
        item1.put("aiSafetyScore", 0.98);
        item1.put("pickupDeadline", "2 Hours");
        item1.put("image", "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80");
        donationsStore.put(1L, item1);

        Map<String, Object> item2 = new HashMap<>();
        item2.put("id", 2L);
        item2.put("title", "Shahi Paneer & Jeera Rice Bulk Meal");
        item2.put("restaurantName", "Haldiram Sweets & Dining");
        item2.put("category", "MEALS");
        item2.put("dietaryType", "VEG");
        item2.put("servings", 30);
        item2.put("originalPrice", 3000);
        item2.put("discountedPrice", 0);
        item2.put("isFreeDonation", true);
        item2.put("status", "AVAILABLE");
        item2.put("distanceKm", 2.4);
        item2.put("aiSafetyScore", 0.96);
        item2.put("pickupDeadline", "2.5 Hours");
        item2.put("image", "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80");
        donationsStore.put(2L, item2);
    }

    @GetMapping
    public ResponseEntity<?> getAllDonations(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String priceTag,
            @RequestParam(required = false, defaultValue = "500") Integer maxPrice
    ) {
        List<Map<String, Object>> result = new ArrayList<>();
        for (Map<String, Object> don : donationsStore.values()) {
            Integer discPrice = (Integer) don.getOrDefault("discountedPrice", 0);
            if (discPrice <= maxPrice) {
                result.add(don);
            }
        }
        return ResponseEntity.ok(Map.of(
                "status", 200,
                "count", result.size(),
                "donations", result
        ));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getDonationById(@PathVariable Long id) {
        Map<String, Object> don = donationsStore.get(id);
        if (don == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(don);
    }

    @PostMapping
    public ResponseEntity<?> createDonation(@RequestBody Map<String, Object> payload) {
        Long newId = System.currentTimeMillis();
        payload.put("id", newId);
        payload.put("status", "PUBLISHED");
        payload.put("aiSafetyScore", 0.98);
        donationsStore.put(newId, payload);

        return ResponseEntity.ok(Map.of(
                "status", 201,
                "success", true,
                "message", "Surplus food donation successfully published!",
                "donation", payload
        ));
    }

    @PostMapping("/{id}/reserve")
    public ResponseEntity<?> reserveDonation(@PathVariable Long id, @RequestBody(required = false) Map<String, Object> body) {
        Map<String, Object> don = donationsStore.get(id);
        if (don == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Donation listing not found"));
        }
        don.put("status", "RESERVED");

        String orderId = "FB-ORD-" + (100000 + (long)(Math.random() * 900000));
        return ResponseEntity.ok(Map.of(
                "status", 200,
                "success", true,
                "orderNumber", orderId,
                "message", "Order confirmed! Pickup details generated.",
                "donation", don
        ));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestBody Map<String, String> statusReq) {
        Map<String, Object> don = donationsStore.get(id);
        if (don == null) {
            return ResponseEntity.notFound().build();
        }
        String newStatus = statusReq.get("status");
        don.put("status", newStatus);
        return ResponseEntity.ok(Map.of("success", true, "donation", don));
    }
}
