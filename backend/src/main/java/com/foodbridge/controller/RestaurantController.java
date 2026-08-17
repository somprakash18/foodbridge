package com.foodbridge.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/v1/restaurants")
@CrossOrigin(origins = "*")
public class RestaurantController {

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> registerRestaurant(@RequestBody Map<String, Object> request) {
        String businessName = (String) request.get("businessName");
        String fssaiLicense = (String) request.get("fssaiLicense");
        String address = (String) request.get("address");

        Map<String, Object> response = new HashMap<>();
        response.put("status", "SUCCESS");
        response.put("message", "Restaurant registered successfully. FSSAI verification pending approval.");
        response.put("restaurantId", System.currentTimeMillis());
        response.put("businessName", businessName);
        response.put("fssaiLicense", fssaiLicense);
        response.put("latitude", 28.6315);
        response.put("longitude", 77.2167);

        return ResponseEntity.ok(response);
    }
}
