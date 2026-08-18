package com.foodbridge.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/v1/tax-receipts")
@CrossOrigin(origins = "*")
public class TaxReceiptController {

    @GetMapping("/{id}")
    public ResponseEntity<?> getTaxReceipt(@PathVariable String id) {
        Map<String, Object> receipt = Map.of(
                "receiptNumber", "80G-FB-2026-" + id,
                "donationId", id,
                "donorName", "Rahul & Priya Wedding",
                "ngoName", "Food Relief Foundation (Regd 80G)",
                "ngo80gNumber", "AABTF1092F20214",
                "estimatedValueInr", 3600,
                "taxExemptionInr", 3600,
                "date", "18-Aug-2026",
                "status", "OFFICIALLY_VERIFIED"
        );
        return ResponseEntity.ok(Map.of("status", 200, "receipt", receipt));
    }
}
