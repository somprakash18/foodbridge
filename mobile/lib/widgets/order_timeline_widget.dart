import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class OrderTimelineWidget extends StatelessWidget {
  final String currentStatus; // PLACED, PICKUP, TRANSIT, DELIVERED

  const OrderTimelineWidget({Key? key, required this.currentStatus}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final steps = ['Placed', 'Pickup', 'In Transit', 'Delivered'];

    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Theme.of(context).cardColor,
        borderRadius: BorderRadius.circular(20),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text("Live Order Tracking", style: TextStyle(fontWeight: FontWeight.extrabold, fontSize: 14)),
          const SizedBox(height: 16),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: steps.map((step) {
              final isDone = true; // Active milestone
              return Column(
                children: [
                  CircleAvatar(
                    radius: 12,
                    backgroundColor: isDone ? AppTheme.emeraldGreen : Colors.grey.shade300,
                    child: const Icon(Icons.check, size: 14, color: Colors.white),
                  ),
                  const SizedBox(height: 4),
                  Text(step, style: const TextStyle(fontSize: 10, fontWeight: FontWeight.bold)),
                ],
              );
            }).toList(),
          ),
        ],
      ),
    );
  }
}
