package com.foodbridge.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequestMapping("/api/v1/pickups")
@CrossOrigin(origins = "*")
public class PickupController {

    private final Map<String, Map<String, Object>> pickupsStore = new ConcurrentHashMap<>();

    public PickupController() {
        Map<String, Object> pickup1 = new HashMap<>();
        pickup1.put("id", "DEL-101");
        pickup1.put("listingTitle", "Royal Hyderabadi Chicken Biryani Combo");
        pickup1.put("pickupAddress", "The Grand Palace Hotel, Connaught Place, New Delhi");
        pickup1.put("dropoffAddress", "Food Relief Foundation Shelter, Sector 4");
        pickup1.put("distanceKm", 2.4);
        pickup1.put("earnings", 45.0);
        pickup1.put("status", "RIDER_ASSIGNED");
        pickup1.put("driverName", "Vikram Singh");
        pickup1.put("vehicle", "EV Scooter #4092");
        pickup1.put("eta", "6 mins away");
        pickup1.put("qrCode", "FOODBRIDGE-QR-9012");
        pickupsStore.put("DEL-101", pickup1);
    }

    @GetMapping
    public ResponseEntity<?> getAvailablePickups() {
        return ResponseEntity.ok(Map.of(
                "status", 200,
                "pickups", pickupsStore.values()
        ));
    }

    @PostMapping("/{id}/accept")
    public ResponseEntity<?> acceptPickup(@PathVariable String id, @RequestBody(required = false) Map<String, String> body) {
        Map<String, Object> pickup = pickupsStore.get(id);
        if (pickup == null) {
            pickup = new HashMap<>();
            pickup.put("id", id);
            pickup.put("listingTitle", "Surplus Food Rescue Task");
            pickup.put("pickupAddress", "Central Dining Kitchen, New Delhi");
            pickup.put("dropoffAddress", "Community Shelter #12");
            pickup.put("distanceKm", 1.8);
            pickup.put("earnings", 45.0);
            pickupsStore.put(id, pickup);
        }
        pickup.put("status", "RIDER_ASSIGNED");
        pickup.put("driverName", body != null ? body.getOrDefault("driverName", "Assigned Volunteer") : "Assigned Volunteer");
        pickup.put("eta", "8 mins away");

        return ResponseEntity.ok(Map.of(
                "status", 200,
                "success", true,
                "message", "Rescue pickup accepted! En route to venue.",
                "pickup", pickup
        ));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updatePickupStatus(@PathVariable String id, @RequestBody Map<String, String> body) {
        Map<String, Object> pickup = pickupsStore.get(id);
        if (pickup == null) {
            return ResponseEntity.notFound().build();
        }
        String newStatus = body.get("status");
        pickup.put("status", newStatus);
        return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Pickup status updated to " + newStatus,
                "pickup", pickup
        ));
    }
}
