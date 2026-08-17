import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../services/mock_data_engine.dart';
import '../theme/app_theme.dart';

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final engine = Provider.of<MockDataEngine>(context);
    final user = engine.currentUser;

    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        children: [
          CircleAvatar(
            radius: 50,
            backgroundImage: NetworkImage(user.avatarUrl),
          ),
          const SizedBox(height: 12),
          Text(user.name, style: const TextStyle(fontSize: 20, fontWeight: FontWeight.extrabold)),
          Text(user.email, style: const TextStyle(fontSize: 12, color: Colors.grey)),
          const SizedBox(height: 8),
          Chip(
            label: Text(user.verificationBadge),
            backgroundColor: AppTheme.emeraldGreen.withOpacity(0.2),
          ),
          const SizedBox(height: 24),
          ListTile(
            leading: const Icon(Icons.share),
            title: const Text("Refer & Earn ₹50"),
            subtitle: Text("Referral Code: ${user.referralCode}"),
          ),
          ListTile(
            leading: const Icon(Icons.security),
            title: const Text("FSSAI Safety Compliance"),
            subtitle: const Text("License: FSSAI-10019011000123"),
          ),
        ],
      ),
    );
  }
}
