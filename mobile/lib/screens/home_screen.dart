import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../services/mock_data_engine.dart';
import '../theme/app_theme.dart';
import 'restaurant_app_screen.dart';
import 'ngo_app_screen.dart';
import 'buyer_app_screen.dart';
import 'delivery_app_screen.dart';
import 'admin_app_screen.dart';
import 'wallet_screen.dart';
import 'profile_screen.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int _bottomNavIdx = 0;

  Widget _getRoleScreen(String role) {
    switch (role) {
      case 'RESTAURANT':
        return const RestaurantAppScreen();
      case 'NGO':
        return const NgoAppScreen();
      case 'BUYER':
        return const BuyerAppScreen();
      case 'DELIVERY_PARTNER':
        return const DeliveryAppScreen();
      case 'OWNER_ADMIN':
        return const AdminAppScreen();
      default:
        return const BuyerAppScreen();
    }
  }

  @override
  Widget build(BuildContext context) {
    final engine = Provider.of<MockDataEngine>(context);

    final List<Widget> pages = [
      _getRoleScreen(engine.activeRole),
      const WalletScreen(),
      const ProfileScreen(),
    ];

    return Scaffold(
      appBar: AppBar(
        title: Row(
          children: [
            Container(
              padding: const EdgeInsets.all(6),
              decoration: BoxDecoration(color: AppTheme.primaryTeal, borderRadius: BorderRadius.circular(10)),
              child: const Text("🌱", style: TextStyle(fontSize: 16)),
            ),
            const SizedBox(width: 8),
            const Text("FoodBridge", style: TextStyle(fontWeight: FontWeight.extrabold, fontSize: 18)),
          ],
        ),
        actions: [
          // Role Switcher Popup Button
          PopupMenuButton<String>(
            onSelected: (role) => engine.switchRole(role),
            itemBuilder: (context) => [
              const PopupMenuItem(value: 'RESTAURANT', child: Text('Restaurant Portal')),
              const PopupMenuItem(value: 'NGO', child: Text('NGO Rescue Portal')),
              const PopupMenuItem(value: 'BUYER', child: Text('Buyer Marketplace')),
              const PopupMenuItem(value: 'DELIVERY_PARTNER', child: Text('Delivery Partner App')),
              const PopupMenuItem(value: 'OWNER_ADMIN', child: Text('Platform Admin Panel')),
            ],
            child: Container(
              margin: const EdgeInsets.only(right: 12),
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
              decoration: BoxDecoration(
                color: AppTheme.primaryTeal.withOpacity(0.1),
                borderRadius: BorderRadius.circular(20),
              ),
              child: Row(
                children: [
                  Text(
                    engine.activeRole,
                    style: const TextStyle(color: AppTheme.primaryTeal, fontWeight: FontWeight.bold, fontSize: 11),
                  ),
                  const Icon(Icons.arrow_drop_down, color: AppTheme.primaryTeal, size: 18),
                ],
              ),
            ),
          )
        ],
      ),

      body: IndexedStack(
        index: _bottomNavIdx,
        children: pages,
      ),

      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _bottomNavIdx,
        onTap: (idx) => setState(() => _bottomNavIdx = idx),
        selectedItemColor: AppTheme.primaryTeal,
        unselectedItemColor: Colors.grey,
        type: BottomNavigationBarType.fixed,
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.storefront_outlined), activeIcon: Icon(Icons.storefront), label: 'Marketplace'),
          BottomNavigationBarItem(icon: Icon(Icons.account_balance_wallet_outlined), activeIcon: Icon(Icons.account_balance_wallet), label: 'Wallet'),
          BottomNavigationBarItem(icon: Icon(Icons.person_outline), activeIcon: Icon(Icons.person), label: 'Profile'),
        ],
      ),
    );
  }
}
