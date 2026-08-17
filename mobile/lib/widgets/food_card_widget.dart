import 'package:flutter/material.dart';
import '../models/food_listing_model.dart';
import '../theme/app_theme.dart';

class FoodCardWidget extends StatelessWidget {
  final FoodListingModel item;
  final VoidCallback onTap;

  const FoodCardWidget({
    Key? key,
    required this.item,
    required this.onTap,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Container(
      margin: const EdgeInsets.only(bottom: 16),
      decoration: BoxDecoration(
        color: isDark ? AppTheme.cardDark : Colors.white,
        borderRadius: BorderRadius.circular(24),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.05),
            blurRadius: 15,
            offset: const Offset(0, 5),
          )
        ],
        border: Border.all(
          color: isDark ? Colors.white10 : Colors.slate.shade100,
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Top Image Stack
          Stack(
            children: [
              ClipRRect(
                borderRadius: const BorderRadius.vertical(top: Radius.circular(24)),
                child: Image.network(
                  item.imageUrl,
                  height: 160,
                  width: double.infinity,
                  fit: BoxFit.cover,
                ),
              ),
              // Dietary Badge
              Positioned(
                top: 12,
                left: 12,
                child: Container(
                  padding: const EdgeInsets.horizontal(10, vertical: 4),
                  decoration: BoxDecoration(
                    color: item.dietaryType == 'VEG' ? AppTheme.emeraldGreen : AppTheme.roseAlert,
                    borderRadius: BorderRadius.circular(20),
                  ),
                  child: Text(
                    item.dietaryType,
                    style: const TextStyle(color: Colors.white, fontSize: 10, fontWeight: FontWeight.extrabold),
                  ),
                ),
              ),
              // AI Safety Score Badge
              Positioned(
                top: 12,
                right: 12,
                child: Container(
                  padding: const EdgeInsets.horizontal(10, vertical: 4),
                  decoration: BoxDecoration(
                    color: Colors.black87,
                    borderRadius: BorderRadius.circular(20),
                  ),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      const Icon(Icons.shield_outlined, color: AppTheme.emeraldGreen, size: 12),
                      const SizedBox(width: 4),
                      Text(
                        "${(item.aiSafetyScore * 100).toInt()}% Safe",
                        style: const TextStyle(color: Colors.white, fontSize: 10, fontWeight: FontWeight.bold),
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),

          // Content Details
          Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  item.restaurantName,
                  style: TextStyle(color: Colors.grey.shade500, fontSize: 11, fontWeight: FontWeight.w600),
                ),
                const SizedBox(height: 2),
                Text(
                  item.title,
                  style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                ),
                const SizedBox(height: 6),
                Row(
                  children: [
                    Icon(Icons.location_on_outlined, size: 14, color: AppTheme.primaryTeal),
                    const SizedBox(width: 4),
                    Text("${item.distanceKm} km away", style: const TextStyle(fontSize: 12, color: Colors.grey)),
                    const Spacer(),
                    Icon(Icons.access_time, size: 14, color: AppTheme.softOrange),
                    const SizedBox(width: 4),
                    Text("Expires in ${item.expiryHours}h", style: TextStyle(fontSize: 12, color: AppTheme.softOrange, fontWeight: FontWeight.bold)),
                  ],
                ),
                const Divider(height: 24),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    item.isFreeDonation
                        ? const Text(
                            "FREE NGO DONATION",
                            style: TextStyle(color: AppTheme.emeraldGreen, fontWeight: FontWeight.extrabold, fontSize: 12),
                          )
                        : Row(
                            children: [
                              Text(
                                "₹${item.discountedPrice.toInt()}",
                                style: const TextStyle(fontSize: 20, fontWeight: FontWeight.extrabold, color: AppTheme.primaryTeal),
                              ),
                              const SizedBox(width: 6),
                              Text(
                                "₹${item.originalPrice.toInt()}",
                                style: const TextStyle(fontSize: 12, color: Colors.grey, decoration: TextDecoration.lineThrough),
                              ),
                            ],
                          ),
                    ElevatedButton(
                      onPressed: onTap,
                      style: ElevatedButton.styleFrom(
                        backgroundColor: item.isFreeDonation ? AppTheme.emeraldGreen : AppTheme.primaryTeal,
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                        elevation: 0,
                      ),
                      child: Text(
                        item.isFreeDonation ? "Claim Free" : "Buy Now",
                        style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 12),
                      ),
                    )
                  ],
                )
              ],
            ),
          )
        ],
      ),
    );
  }
}
