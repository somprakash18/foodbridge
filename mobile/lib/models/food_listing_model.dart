class FoodListingModel {
  final int id;
  final int restaurantId;
  final String restaurantName;
  final String restaurantLogo;
  final String title;
  final String description;
  final String category; // MEALS, BAKERY, FRUITS_VEG, DAIRY
  final String dietaryType; // VEG, NON_VEG
  final double quantityKg;
  final int servings;
  final double originalPrice;
  final double discountedPrice;
  final bool isFreeDonation;
  final String prepTime;
  final double expiryHours;
  final String pickupDeadline;
  final String storageTemp;
  final String packagingStatus;
  final double aiSafetyScore;
  final String aiRecommendation;
  final String status; // AVAILABLE, RESERVED, PICKED_UP
  final double distanceKm;
  final String imageUrl;
  final String qrCode;

  FoodListingModel({
    required this.id,
    required this.restaurantId,
    required this.restaurantName,
    required this.restaurantLogo,
    required this.title,
    required this.description,
    required this.category,
    required this.dietaryType,
    required this.quantityKg,
    required this.servings,
    required this.originalPrice,
    required this.discountedPrice,
    required this.isFreeDonation,
    required this.prepTime,
    required this.expiryHours,
    required this.pickupDeadline,
    required this.storageTemp,
    required this.packagingStatus,
    required this.aiSafetyScore,
    required this.aiRecommendation,
    required this.status,
    required this.distanceKm,
    required this.imageUrl,
    required this.qrCode,
  });

  factory FoodListingModel.fromJson(Map<String, dynamic> json) {
    return FoodListingModel(
      id: json['id'],
      restaurantId: json['restaurantId'],
      restaurantName: json['restaurantName'],
      restaurantLogo: json['restaurantLogo'],
      title: json['title'],
      description: json['description'],
      category: json['category'],
      dietaryType: json['dietaryType'],
      quantityKg: (json['quantityKg'] as num).toDouble(),
      servings: json['servings'],
      originalPrice: (json['originalPrice'] as num).toDouble(),
      discountedPrice: (json['discountedPrice'] as num).toDouble(),
      isFreeDonation: json['isFreeDonation'],
      prepTime: json['prepTime'],
      expiryHours: (json['expiryHours'] as num).toDouble(),
      pickupDeadline: json['pickupDeadline'],
      storageTemp: json['storageTemp'],
      packagingStatus: json['packagingStatus'],
      aiSafetyScore: (json['aiSafetyScore'] as num).toDouble(),
      aiRecommendation: json['aiRecommendation'],
      status: json['status'],
      distanceKm: (json['distanceKm'] as num).toDouble(),
      imageUrl: json['imageUrl'],
      qrCode: json['qrCode'],
    );
  }
}

class UserModel {
  final int id;
  final String name;
  final String email;
  final String phone;
  final String role; // RESTAURANT, NGO, BUYER, DELIVERY_PARTNER, OWNER_ADMIN
  final String avatarUrl;
  final String coverUrl;
  final bool isVerified;
  final String verificationBadge;
  final String referralCode;

  UserModel({
    required this.id,
    required this.name,
    required this.email,
    required this.phone,
    required this.role,
    required this.avatarUrl,
    required this.coverUrl,
    required this.isVerified,
    required this.verificationBadge,
    required this.referralCode,
  });
}
