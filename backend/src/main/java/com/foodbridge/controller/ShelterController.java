package com.foodbridge.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequestMapping("/api/v1/shelters")
@CrossOrigin(origins = "*")
public class ShelterController {

    private final List<Map<String, Object>> shelterRequests = new ArrayList<>();

    public ShelterController() {
        Map<String, Object> req1 = new HashMap<>();
        req1.put("id", 101L);
        req1.put("orgName", "Food Relief Foundation");
        req1.put("peopleCount", 120);
        req1.put("foodPreference", "VEG");
        req1.put("requiredTime", "8:30 PM Today");
        req1.put("location", "Connaught Place, New Delhi");
        req1.put("urgency", "HIGH");
        shelterRequests.add(req1);
    }

    @GetMapping("/nearby")
    public ResponseEntity<?> getNearbyShelters() {
        List<Map<String, Object>> shelters = List.of(
                Map.of("id", 1, "name", "Food Relief Shelter #1", "address", "Sector 4 Connaught Place", "contact", "+91 9876543210", "lat", 28.6315, "lng", 77.2167, "capacity", 150),
                Map.of("id", 2, "name", "Hope Community Kitchen", "address", "Lajpat Nagar, New Delhi", "contact", "+91 9811223344", "lat", 28.5700, "lng", 77.2400, "capacity", 200)
        );
        return ResponseEntity.ok(Map.of("status", 200, "shelters", shelters));
    }

    @PostMapping("/requests")
    public ResponseEntity<?> createFoodRequest(@RequestBody Map<String, Object> body) {
        Long newId = System.currentTimeMillis();
        body.put("id", newId);
        body.put("status", "ACTIVE");
        shelterRequests.add(body);

        return ResponseEntity.ok(Map.of(
                "status", 201,
                "success", true,
                "message", "Urgent food requirement broadcasted to nearby food donors!",
                "request", body
        ));
    }
}
