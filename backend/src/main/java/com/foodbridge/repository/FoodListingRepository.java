package com.foodbridge.repository;

import com.foodbridge.model.FoodListing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface FoodListingRepository extends JpaRepository<FoodListing, Long> {
    List<FoodListing> findByStatus(FoodListing.Status status);
    List<FoodListing> findByRestaurantId(Long restaurantId);
    List<FoodListing> findByIsFreeDonationTrue();
}
