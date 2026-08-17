import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../services/mock_data_engine.dart';
import '../models/food_listing_model.dart';
import 'home_screen.dart';

class AuthScreen extends StatefulWidget {
  const AuthScreen({super.key});

  @override
  State<AuthScreen> createState() => _AuthScreenState();
}

class _AuthScreenState extends State<AuthScreen> {
  UserRole _selectedRole = UserRole.RESTAURANT;
  bool _isSignUp = true;
  int _currentStep = 1; // 1: Form, 2: Phone OTP, 3: Verified

  final _nameController = TextEditingController();
  final _emailController = TextEditingController();
  final _phoneController = TextEditingController(text: "+91 98765 43210");
  final _fssaiController = TextEditingController();
  final _ngoRegController = TextEditingController();
  final _otpController = TextEditingController();

  String _vehicleType = "ELECTRIC_SCOOTER";

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF0F172A),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              const SizedBox(height: 20),
              
              // App Logo & Header
              Center(
                child: Column(
                  children: [
                    Container(
                      width: 70,
                      height: 70,
                      decoration: BoxDecoration(
                        gradient: const LinearGradient(
                          colors: [Color(0xFF0F766E), Color(0xFF10B981)],
                        ),
                        borderRadius: BorderRadius.circular(24),
                        boxShadow: [
                          BoxShadow(
                            color: const Color(0xFF10B981).withOpacity(0.3),
                            blurRadius: 15,
                            spreadRadius: 2,
                          )
                        ],
                      ),
                      child: const Icon(Icons.restaurant, color: Colors.white, size: 36),
                    ),
                    const SizedBox(height: 16),
                    const Text(
                      "FoodBridge",
                      style: TextStyle(
                        fontSize: 28,
                        fontWeight: FontWeight.bold,
                        color: Colors.white,
                      ),
                    ),
                    const SizedBox(height: 4),
                    const Text(
                      "Save Food. Feed People. Reduce Waste.",
                      style: TextStyle(color: Colors.white70, fontSize: 13),
                    ),
                  ],
                ),
              ),

              const SizedBox(height: 32),

              // Role Selector Chips
              if (_currentStep == 1) ...[
                const Text(
                  "SELECT ACCOUNT ROLE",
                  style: TextStyle(color: Colors.white54, fontSize: 11, fontWeight: FontWeight.bold, letterSpacing: 1.2),
                ),
                const SizedBox(height: 10),
                SingleChildScrollView(
                  scrollDirection: Axis.horizontal,
                  child: Row(
                    children: [
                      _roleChip(UserRole.RESTAURANT, "Restaurant", Icons.storefront),
                      _roleChip(UserRole.NGO, "NGO", Icons.favorite),
                      _roleChip(UserRole.BUYER, "Buyer", Icons.shopping_bag),
                      _roleChip(UserRole.DELIVERY_PARTNER, "Rider", Icons.two_wheeler),
                    ],
                  ),
                ),
                const SizedBox(height: 24),
              ],

              // STEP 1: Registration Form
              if (_currentStep == 1) ...[
                _inputField(
                  controller: _nameController,
                  label: _selectedRole == UserRole.RESTAURANT
                      ? "Restaurant / Hotel Name"
                      : _selectedRole == UserRole.NGO
                          ? "NGO Organization Name"
                          : "Full Name",
                  icon: Icons.person_outline,
                ),
                const SizedBox(height: 14),
                _inputField(
                  controller: _emailController,
                  label: "Email Address",
                  icon: Icons.email_outlined,
                  keyboardType: TextInputType.emailAddress,
                ),
                const SizedBox(height: 14),
                _inputField(
                  controller: _phoneController,
                  label: "Phone Number (SMS Verification)",
                  icon: Icons.phone_android,
                  keyboardType: TextInputType.phone,
                ),
                const SizedBox(height: 14),

                if (_selectedRole == UserRole.RESTAURANT) ...[
                  _inputField(
                    controller: _fssaiController,
                    label: "FSSAI License Number",
                    icon: Icons.verified_user_outlined,
                  ),
                  const SizedBox(height: 14),
                ],

                if (_selectedRole == UserRole.NGO) ...[
                  _inputField(
                    controller: _ngoRegController,
                    label: "NGO Registration Number",
                    icon: Icons.assignment_turned_in_outlined,
                  ),
                  const SizedBox(height: 14),
                ],

                if (_selectedRole == UserRole.DELIVERY_PARTNER) ...[
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
                    decoration: BoxDecoration(
                      color: const Color(0xFF1E293B),
                      borderRadius: BorderRadius.circular(16),
                      border: Border.all(color: Colors.white10),
                    ),
                    child: DropdownButtonHideUnderline(
                      child: DropdownButton<String>(
                        value: _vehicleType,
                        dropdownColor: const Color(0xFF1E293B),
                        style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
                        items: const [
                          DropdownMenuItem(value: "ELECTRIC_SCOOTER", child: Text("Electric Scooter")),
                          DropdownMenuItem(value: "BICYCLE", child: Text("Bicycle")),
                          DropdownMenuItem(value: "MOTORCYCLE", child: Text("Motorcycle")),
                        ],
                        onChanged: (val) {
                          if (val != null) setState(() => _vehicleType = val);
                        },
                      ),
                    ),
                  ),
                  const SizedBox(height: 14),
                ],

                ElevatedButton.icon(
                  onPressed: () {
                    setState(() => _currentStep = 2);
                  },
                  icon: const Icon(Icons.sms),
                  label: const Text("SEND FIREBASE SMS OTP"),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFF10B981),
                    foregroundColor: Colors.white,
                    padding: const EdgeInsets.all(16),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                  ),
                ),
              ],

              // STEP 2: Phone OTP Verification
              if (_currentStep == 2) ...[
                Container(
                  padding: const EdgeInsets.all(20),
                  decoration: BoxDecoration(
                    color: const Color(0xFF1E293B),
                    borderRadius: BorderRadius.circular(20),
                    border: Border.all(color: const Color(0xFF10B981).withOpacity(0.4)),
                  ),
                  child: Column(
                    children: [
                      const Icon(Icons.mark_email_read, color: Color(0xFF10B981), size: 48),
                      const SizedBox(height: 12),
                      const Text(
                        "Enter 6-Digit SMS OTP",
                        style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        "Firebase OTP sent to ${_phoneController.text}\n(Test Code: 123456)",
                        textAlign: TextAlign.center,
                        style: const TextStyle(color: Colors.white60, fontSize: 12),
                      ),
                      const SizedBox(height: 20),
                      TextField(
                        controller: _otpController,
                        textAlign: TextAlign.center,
                        maxLength: 6,
                        style: const TextStyle(color: Colors.white, fontSize: 24, letterSpacing: 8, fontWeight: FontWeight.bold),
                        decoration: InputDecoration(
                          hintText: "123456",
                          hintStyle: TextStyle(color: Colors.white30),
                          filled: true,
                          fillColor: const Color(0xFF0F172A),
                          border: OutlineInputBorder(borderRadius: BorderRadius.circular(16)),
                        ),
                      ),
                      const SizedBox(height: 16),
                      ElevatedButton(
                        onPressed: () {
                          final dataEngine = Provider.of<MockDataEngine>(context, listen: false);
                          dataEngine.switchRole(_selectedRole);
                          Navigator.pushReplacement(
                            context,
                            MaterialPageRoute(builder: (_) => const HomeScreen()),
                          );
                        },
                        style: ElevatedButton.styleFrom(
                          backgroundColor: const Color(0xFF0F766E),
                          foregroundColor: Colors.white,
                          minimumSize: const Size(double.infinity, 50),
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                        ),
                        child: const Text("VERIFY OTP & ACTIVATE PORTAL"),
                      ),
                    ],
                  ),
                ),
              ],
            ],
          ),
        ),
      ),
    );
  }

  Widget _roleChip(UserRole role, String label, IconData icon) {
    final isSelected = _selectedRole == role;
    return Padding(
      padding: const EdgeInsets.only(right: 8.0),
      child: ChoiceChip(
        avatar: Icon(icon, size: 16, color: isSelected ? Colors.white : Colors.white60),
        label: Text(label),
        selected: isSelected,
        selectedColor: const Color(0xFF0F766E),
        backgroundColor: const Color(0xFF1E293B),
        labelStyle: TextStyle(color: isSelected ? Colors.white : Colors.white70, fontWeight: FontWeight.bold, fontSize: 12),
        onSelected: (selected) {
          if (selected) setState(() => _selectedRole = role);
        },
      ),
    );
  }

  Widget _inputField({
    required TextEditingController controller,
    required String label,
    required IconData icon,
    TextInputType keyboardType = TextInputType.text,
  }) {
    return TextField(
      controller: controller,
      keyboardType: keyboardType,
      style: const TextStyle(color: Colors.white, fontSize: 14),
      decoration: InputDecoration(
        labelText: label,
        labelStyle: const TextStyle(color: Colors.white60, fontSize: 13),
        prefixIcon: Icon(icon, color: const Color(0xFF10B981), size: 20),
        filled: true,
        fillColor: const Color(0xFF1E293B),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(16),
          borderSide: BorderSide.none,
        ),
      ),
    );
  }
}
