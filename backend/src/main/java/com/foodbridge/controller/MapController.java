package com.foodbridge.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/v1/map")
@CrossOrigin(origins = "*")
public class MapController {

    @GetMapping("/nearby")
    public ResponseEntity<Map<String, Object>> getNearbyPlaces(
            @RequestParam(defaultValue = "28.6315") double lat,
            @RequestParam(defaultValue = "77.2167") double lng,
            @RequestParam(defaultValue = "5.0") double radiusKm) {

        List<Map<String, Object>> places = new ArrayList<>();

        // 1. Domino's Pizza
        Map<String, Object> r1 = new HashMap<>();
        r1.put("id", "R1");
        r1.put("name", "Domino's Pizza Center");
        r1.put("type", "RESTAURANT");
        r1.put("rating", 4.85);
        r1.put("lat", 28.6315);
        r1.put("lng", 77.2167);
        r1.put("address", "Connaught Place, Block B, New Delhi");
        r1.put("fssai", "FSSAI-10019011000123");
        r1.put("isOpen", true);
        r1.put("surplusCount", 3);
        places.add(r1);

        // 2. Haldiram Sweets
        Map<String, Object> r2 = new HashMap<>();
        r2.put("id", "R2");
        r2.put("name", "Haldiram Sweets & Dining");
        r2.put("type", "RESTAURANT");
        r2.put("rating", 4.90);
        r2.put("lat", 28.6506);
        r2.put("lng", 77.2303);
        r2.put("address", "Chandni Chowk Main Rd, Delhi");
        r2.put("fssai", "FSSAI-10019011000456");
        r2.put("isOpen", true);
        r2.put("surplusCount", 5);
        places.add(r2);

        // 3. The Grand Palace Hotel
        Map<String, Object> r3 = new HashMap<>();
        r3.put("id", "H1");
        r3.put("name", "The Grand Palace Hotel");
        r3.put("type", "HOTEL");
        r3.put("rating", 4.95);
        r3.put("lat", 28.5910);
        r3.put("lng", 77.1925);
        r3.put("address", "Diplomatic Enclave, Chanakyapuri");
        r3.put("isOpen", true);
        r3.put("surplusCount", 8);
        places.add(r3);

        // 4. BakeHouse Artisanal Bakery
        Map<String, Object> r4 = new HashMap<>();
        r4.put("id", "B1");
        r4.put("name", "BakeHouse Artisanal Bakery");
        r4.put("type", "BAKERY");
        r4.put("rating", 4.80);
        r4.put("lat", 28.6000);
        r4.put("lng", 77.2270);
        r4.put("address", "Khan Market, New Delhi");
        r4.put("isOpen", true);
        r4.put("surplusCount", 4);
        places.add(r4);

        // 5. Food Relief Foundation NGO
        Map<String, Object> n1 = new HashMap<>();
        n1.put("id", "N1");
        n1.put("name", "Food Relief Foundation");
        n1.put("type", "NGO");
        n1.put("capacity", "1200 meals/day");
        n1.put("lat", 28.5918);
        n1.put("lng", 77.2274);
        n1.put("address", "Lodhi Road Community Center, New Delhi");
        n1.put("isVerified", true);
        places.add(n1);

        Map<String, Object> response = new HashMap<>();
        response.put("status", "SUCCESS");
        response.put("centerLat", lat);
        response.put("centerLng", lng);
        response.put("placesCount", places.size());
        response.put("places", places);

        return ResponseEntity.ok(response);
    }
}
