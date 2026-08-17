import 'package:flutter/foundation.dart';
import '../models/food_listing_model.dart';

class MockDataEngine extends ChangeNotifier {
  String _activeRole = 'BUYER';
  double _walletBalance = 14250.00;

  String get activeRole => _activeRole;
  double get walletBalance => _walletBalance;

  final UserModel currentUser = UserModel(
    id: 1,
    name: "Domino's Pizza Center",
    email: "partner@dominos.com",
    phone: "+91 98765 43210",
    role: "RESTAURANT",
    avatarUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=200&q=80",
    coverUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
    isVerified: true,
    verificationBadge: "GOLD_PARTNER",
    referralCode: "DOMINOS2026",
  );

  final List<FoodListingModel> _listings = [
    FoodListingModel(
      id: 1,
      restaurantId: 1,
      restaurantName: "Domino's Pizza Center",
      restaurantLogo: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=200&q=80",
      title: "Surplus Veg Supreme & Garlic Bread",
      description: "Freshly baked evening surplus pizzas packed in thermal boxes.",
      category: "MEALS",
      dietaryType: "VEG",
      quantityKg: 4.5,
      servings: 12,
      originalPrice: 1200,
      discountedPrice: 350,
      isFreeDonation: false,
      prepTime: "1 Hour Ago",
      expiryHours: 3.5,
      pickupDeadline: "2 Hours",
      storageTemp: "HOT",
      packagingStatus: "PACKED_BOX",
      aiSafetyScore: 0.98,
      aiRecommendation: "SELL_NOW",
      status: "AVAILABLE",
      distanceKm: 1.2,
      imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
      qrCode: "FOODBRIDGE-QR-001",
    ),
    FoodListingModel(
      id: 2,
      restaurantId: 2,
      restaurantName: "Haldiram Sweets & Dining",
      restaurantLogo: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=200&q=80",
      title: "Shahi Paneer & Jeera Rice Bulk Meal",
      description: "Hygienically stored buffet surplus prepared in pure ghee kitchen.",
      category: "MEALS",
      dietaryType: "VEG",
      quantityKg: 12.0,
      servings: 30,
      originalPrice: 3000,
      discountedPrice: 0,
      isFreeDonation: true,
      prepTime: "1.5 Hours Ago",
      expiryHours: 4.0,
      pickupDeadline: "2.5 Hours",
      storageTemp: "HOT",
      packagingStatus: "SEALED_CONTAINER",
      aiSafetyScore: 0.96,
      aiRecommendation: "DONATE_NOW",
      status: "AVAILABLE",
      distanceKm: 2.4,
      imageUrl: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80",
      qrCode: "FOODBRIDGE-QR-002",
    ),
    FoodListingModel(
      id: 3,
      restaurantId: 3,
      restaurantName: "The Grand Palace Hotel",
      restaurantLogo: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=200&q=80",
      title: "Royal Hyderabadi Chicken Biryani Pot",
      description: "Premium hotel buffet surplus cooked with aromatic basmati rice.",
      category: "MEALS",
      dietaryType: "NON_VEG",
      quantityKg: 15.0,
      servings: 35,
      originalPrice: 5200,
      discountedPrice: 1250,
      isFreeDonation: false,
      prepTime: "2 Hours Ago",
      expiryHours: 3.0,
      pickupDeadline: "2 Hours",
      storageTemp: "HOT",
      packagingStatus: "SEALED_CONTAINER",
      aiSafetyScore: 0.94,
      aiRecommendation: "SELL_NOW",
      status: "AVAILABLE",
      distanceKm: 3.1,
      imageUrl: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
      qrCode: "FOODBRIDGE-QR-003",
    ),
    FoodListingModel(
      id: 4,
      restaurantId: 4,
      restaurantName: "BakeHouse Artisanal Bakery",
      restaurantLogo: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=200&q=80",
      title: "Artisanal Sourdough & Croissant Assortment Box",
      description: "Crispy sourdough loaves, butter croissants, and fresh muffins.",
      category: "BAKERY",
      dietaryType: "VEG",
      quantityKg: 5.0,
      servings: 20,
      originalPrice: 1800,
      discountedPrice: 450,
      isFreeDonation: false,
      prepTime: "4 Hours Ago",
      expiryHours: 12.0,
      pickupDeadline: "6 Hours",
      storageTemp: "ROOM_TEMP",
      packagingStatus: "PACKED_BOX",
      aiSafetyScore: 0.99,
      aiRecommendation: "SELL_NOW",
      status: "AVAILABLE",
      distanceKm: 1.8,
      imageUrl: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80",
      qrCode: "FOODBRIDGE-QR-004",
    )
  ];

  List<FoodListingModel> get listings => List.unmodifiable(_listings);

  void switchRole(String role) {
    _activeRole = role;
    notifyListeners();
  }

  void buyListing(int id) {
    int index = _listings.indexWhere((item) => item.id == id);
    if (index != -1) {
      _walletBalance -= _listings[index].discountedPrice;
      notifyListeners();
    }
  }

  void addListing(FoodListingModel listing) {
    _listings.insert(0, listing);
    notifyListeners();
  }
}
