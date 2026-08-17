import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../services/mock_data_engine.dart';
import '../theme/app_theme.dart';

class WalletScreen extends StatelessWidget {
  const WalletScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final engine = Provider.of<MockDataEngine>(context);

    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            padding: const EdgeInsets.all(24),
            width: double.infinity,
            decoration: BoxDecoration(
              gradient: const LinearGradient(colors: [AppTheme.primaryTeal, AppTheme.emeraldGreen]),
              borderRadius: BorderRadius.circular(24),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text("FoodBridge Wallet Balance", style: TextStyle(color: Colors.white70, fontSize: 12, fontWeight: FontWeight.bold)),
                const SizedBox(height: 8),
                Text("₹${engine.walletBalance.toStringAsFixed(2)}", style: const TextStyle(color: Colors.white, fontSize: 36, fontWeight: FontWeight.extrabold)),
                const SizedBox(height: 16),
                ElevatedButton(
                  onPressed: () => ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text("Bank withdrawal request submitted!"))),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.white,
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                  ),
                  child: const Text("Withdraw Funds", style: TextStyle(color: AppTheme.primaryTeal, fontWeight: FontWeight.bold)),
                )
              ],
            ),
          ),
          const SizedBox(height: 24),
          const Text("Recent Wallet Transactions", style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
          const SizedBox(height: 12),
          Card(
            child: ListTile(
              leading: const CircleAvatar(backgroundColor: Colors.greenAccent, child: Icon(Icons.arrow_downward, color: Colors.black)),
              title: const Text("Surplus Food Sales Payout", style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
              subtitle: const Text("Today, 10:30 AM", style: TextStyle(fontSize: 11)),
              trailing: const Text("+₹14,250", style: TextStyle(color: AppTheme.emeraldGreen, fontWeight: FontWeight.extrabold)),
            ),
          )
        ],
      ),
    );
  }
}
