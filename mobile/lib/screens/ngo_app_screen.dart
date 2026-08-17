import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../services/mock_data_engine.dart';
import '../theme/app_theme.dart';

class NgoAppScreen extends StatelessWidget {
  const NgoAppScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final engine = Provider.of<MockDataEngine>(context);
    final freeDonations = engine.listings.where((l) => l.isFreeDonation).toList();

    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text("NGO Rescue Portal", style: TextStyle(fontSize: 22, fontWeight: FontWeight.extrabold)),
          const SizedBox(height: 12),
          Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              color: AppTheme.emeraldGreen.withOpacity(0.1),
              borderRadius: BorderRadius.circular(20),
              border: Border.all(color: AppTheme.emeraldGreen.withOpacity(0.3)),
            ),
            child: Row(
              children: const [
                Icon(Icons.handshake_outlined, color: AppTheme.emeraldGreen, size: 36),
                SizedBox(width: 16),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text("Food Relief Foundation", style: TextStyle(fontWeight: FontWeight.extrabold, fontSize: 16)),
                      Text("Capacity: 1,200 meals/day • 14,200 served", style: TextStyle(fontSize: 11, color: Colors.grey)),
                    ],
                  ),
                )
              ],
            ),
          ),
          const SizedBox(height: 24),
          const Text("Free Surplus Donations Available", style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
          const SizedBox(height: 12),
          ...freeDonations.map((item) => Card(
            margin: const EdgeInsets.only(bottom: 12),
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(item.restaurantName, style: const TextStyle(fontSize: 11, color: Colors.grey)),
                  Text(item.title, style: const TextStyle(fontWeight: FontWeight.extrabold, fontSize: 16)),
                  const SizedBox(height: 8),
                  Text("${item.quantityKg} kg (${item.servings} meals) • ${item.distanceKm} km away", style: const TextStyle(fontSize: 12)),
                  const SizedBox(height: 12),
                  ElevatedButton.icon(
                    onPressed: () {
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(content: Text("Free donation '${item.title}' reserved for Food Relief Foundation!")),
                      );
                    },
                    style: ElevatedButton.styleFrom(
                      backgroundColor: AppTheme.emeraldGreen,
                      minimumSize: const Size(double.infinity, 44),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                    ),
                    icon: const Icon(Icons.check, color: Colors.white),
                    label: const Text("Reserve Free Donation", style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
                  )
                ],
              ),
            ),
          )).toList()
        ],
      ),
    );
  }
}
