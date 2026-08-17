import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class AdminAppScreen extends StatelessWidget {
  const AdminAppScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text("Platform Owner Command", style: TextStyle(fontSize: 22, fontWeight: FontWeight.extrabold)),
          const SizedBox(height: 12),
          Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(color: Theme.of(context).cardColor, borderRadius: BorderRadius.circular(20)),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: const [
                Text("Total Revenue Generated", style: TextStyle(fontSize: 12, color: Colors.grey)),
                SizedBox(height: 4),
                Text("₹68,40,000", style: TextStyle(fontSize: 28, fontWeight: FontWeight.extrabold, color: AppTheme.primaryTeal)),
                SizedBox(height: 12),
                Text("Meals Saved: 18,450 • CO2 Diverted: 46,125 kg", style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold)),
              ],
            ),
          )
        ],
      ),
    );
  }
}
