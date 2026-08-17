package com.foodbridge;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class FoodBridgeApplication {

    public static void main(String[] args) {
        SpringApplication.run(FoodBridgeApplication.class, args);
        System.out.println("=================================================");
        System.out.println("   FoodBridge Production Backend Started!      ");
        System.out.println("   Swagger UI: http://localhost:8080/api/v1/swagger-ui.html ");
        System.out.println("=================================================");
    }
}
