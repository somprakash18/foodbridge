import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../services/mock_data_engine.dart';
import '../widgets/food_card_widget.dart';
import '../theme/app_theme.dart';

class BuyerAppScreen extends StatelessWidget {
  const BuyerAppScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final engine = Provider.of<MockDataEngine>(context);

    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Banner
          Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              gradient: const LinearGradient(colors: [AppTheme.primaryTeal, AppTheme.emeraldGreen]),
              borderRadius: BorderRadius.circular(24),
            ),
            child: Row(
              children: [
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: const [
                      Text("50-80% OFF Surplus Food", style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.extrabold)),
                      SizedBox(height: 4),
                      Text("Fresh gourmet surplus from top local restaurants", style: TextStyle(color: Colors.white70, fontSize: 11)),
                    ],
                  ),
                ),
                const Text("🍕", style: TextStyle(fontSize: 40)),
              ],
            ),
          ),
          const SizedBox(height: 20),
          const Text("Surplus Food Near You", style: TextStyle(fontSize: 18, fontWeight: FontWeight.extrabold)),
          const SizedBox(height: 12),

          ListView.builder(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            itemCount: engine.listings.length,
            itemBuilder: (context, idx) {
              final item = engine.listings[idx];
              return FoodCardWidget(
                item: item,
                onTap: () {
                  engine.buyListing(item.id);
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(content: Text("Purchased '${item.title}'! Razorpay payment authorized.")),
                  );
                },
              );
            },
          )
        ],
      ),
    );
  }
}
