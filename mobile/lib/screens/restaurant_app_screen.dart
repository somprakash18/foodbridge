import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../services/mock_data_engine.dart';
import '../models/food_listing_model.dart';
import '../theme/app_theme.dart';

class RestaurantAppScreen extends StatefulWidget {
  const RestaurantAppScreen({Key? key}) : super(key: key);

  @override
  State<RestaurantAppScreen> createState() => _RestaurantAppScreenState();
}

class _RestaurantAppScreenState extends State<RestaurantAppScreen> {
  final TextEditingController _titleController = TextEditingController();

  void _showAddDialog() {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(28))),
      builder: (context) => Padding(
        padding: EdgeInsets.only(
          left: 24, right: 24, top: 24,
          bottom: MediaQuery.of(context).viewInsets.bottom + 24,
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text("Upload Surplus Food", style: TextStyle(fontSize: 20, fontWeight: FontWeight.extrabold)),
            const SizedBox(height: 16),
            TextField(
              controller: _titleController,
              decoration: InputDecoration(
                hintText: "Surplus Food Title (e.g. Fresh Veg Supreme Pizza Batch)",
                filled: true,
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(16), borderSide: BorderSide.none),
              ),
            ),
            const SizedBox(height: 16),
            ElevatedButton(
              onPressed: () {
                if (_titleController.text.isNotEmpty) {
                  final engine = Provider.of<MockDataEngine>(context, listen: false);
                  engine.addListing(
                    FoodListingModel(
                      id: DateTime.now().millisecondsSinceEpoch,
                      restaurantId: 1,
                      restaurantName: "Domino's Pizza Center",
                      restaurantLogo: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=200&q=80",
                      title: _titleController.text,
                      description: "Fresh surplus meal prepared by kitchen.",
                      category: "MEALS",
                      dietaryType: "VEG",
                      quantityKg: 5.0,
                      servings: 15,
                      originalPrice: 1500,
                      discountedPrice: 400,
                      isFreeDonation: false,
                      prepTime: "Just now",
                      expiryHours: 4.0,
                      pickupDeadline: "2.5 Hours",
                      storageTemp: "HOT",
                      packagingStatus: "PACKED_BOX",
                      aiSafetyScore: 0.98,
                      aiRecommendation: "SELL_NOW",
                      status: "AVAILABLE",
                      distanceKm: 1.0,
                      imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
                      qrCode: "FOODBRIDGE-QR-NEW",
                    ),
                  );
                  Navigator.pop(context);
                  _titleController.clear();
                }
              },
              style: ElevatedButton.styleFrom(
                backgroundColor: AppTheme.primaryTeal,
                minimumSize: const Size(double.infinity, 50),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
              ),
              child: const Text("Publish Listing", style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
            )
          ],
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final engine = Provider.of<MockDataEngine>(context);

    return Scaffold(
      floatingActionButton: FloatingActionButton.extended(
        onPressed: _showAddDialog,
        backgroundColor: AppTheme.primaryTeal,
        icon: const Icon(Icons.add, color: Colors.white),
        label: const Text("Upload Food", style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text("Restaurant Dashboard", style: TextStyle(fontSize: 22, fontWeight: FontWeight.extrabold)),
            const SizedBox(height: 12),
            Row(
              children: [
                Expanded(
                  child: Container(
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(color: Theme.of(context).cardColor, borderRadius: BorderRadius.circular(20)),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: const [
                        Text("Food Saved", style: TextStyle(fontSize: 10, color: Colors.grey)),
                        SizedBox(height: 4),
                        Text("120.5 kg", style: TextStyle(fontSize: 20, fontWeight: FontWeight.extrabold, color: AppTheme.primaryTeal)),
                      ],
                    ),
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Container(
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(color: Theme.of(context).cardColor, borderRadius: BorderRadius.circular(20)),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text("Recovered", style: TextStyle(fontSize: 10, color: Colors.grey)),
                        const SizedBox(height: 4),
                        Text("₹${engine.walletBalance.toInt()}", style: const TextStyle(fontSize: 20, fontWeight: FontWeight.extrabold, color: AppTheme.emeraldGreen)),
                      ],
                    ),
                  ),
                )
              ],
            ),
            const SizedBox(height: 24),
            const Text("Your Active Surplus Uploads", style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
            const SizedBox(height: 12),
            ...engine.listings.map((l) => Card(
              margin: const EdgeInsets.only(bottom: 12),
              child: ListTile(
                leading: ClipRRect(
                  borderRadius: BorderRadius.circular(10),
                  child: Image.network(l.imageUrl, width: 50, height: 50, fit: BoxFit.cover),
                ),
                title: Text(l.title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
                subtitle: Text("Expires in ${l.expiryHours}h • ${l.quantityKg} kg", style: const TextStyle(fontSize: 12)),
                trailing: Text("₹${l.discountedPrice.toInt()}", style: const TextStyle(fontWeight: FontWeight.extrabold, color: AppTheme.primaryTeal)),
              ),
            )).toList()
          ],
        ),
      ),
    );
  }
}
