import 'package:flutter/material.dart';
import '../widgets/qr_scanner_widget.dart';
import '../theme/app_theme.dart';

class DeliveryAppScreen extends StatefulWidget {
  const DeliveryAppScreen({Key? key}) : super(key: key);

  @override
  State<DeliveryAppScreen> createState() => _DeliveryAppScreenState();
}

class _DeliveryAppScreenState extends State<DeliveryAppScreen> {
  bool _online = true;

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: const [
                  Text("Vikram Singh (Rider)", style: TextStyle(fontSize: 20, fontWeight: FontWeight.extrabold)),
                  Text("EV Scooter: DL-01-EV-4092", style: TextStyle(fontSize: 12, color: Colors.grey)),
                ],
              ),
              Switch(
                value: _online,
                onChanged: (val) => setState(() => _online = val),
                activeColor: AppTheme.emeraldGreen,
              )
            ],
          ),
          const SizedBox(height: 20),

          // Pickup Request Card
          Card(
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24)),
            child: Padding(
              padding: const EdgeInsets.all(20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: const [
                      Text("Assigned Pickup #DEL-101", style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
                      Text("₹45.00 Base", style: TextStyle(color: AppTheme.emeraldGreen, fontWeight: FontWeight.extrabold)),
                    ],
                  ),
                  const SizedBox(height: 8),
                  const Text("Pickup: Domino's Pizza Connaught Place", style: TextStyle(fontSize: 12, color: Colors.grey)),
                  const Text("Dropoff: Vasant Kunj Sector C (4.2 km)", style: TextStyle(fontSize: 12, color: Colors.grey)),
                  const SizedBox(height: 16),
                  ElevatedButton.icon(
                    onPressed: () {
                      showDialog(
                        context: context,
                        builder: (context) => QrScannerWidget(
                          onScanComplete: (code) {
                            Navigator.pop(context);
                            ScaffoldMessenger.of(context).showSnackBar(
                              const SnackBar(content: Text("QR Verification Complete! Wallet credited +₹45.00.")),
                            );
                          },
                        ),
                      );
                    },
                    style: ElevatedButton.styleFrom(
                      backgroundColor: AppTheme.primaryTeal,
                      minimumSize: const Size(double.infinity, 48),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                    ),
                    icon: const Icon(Icons.qr_code_scanner, color: Colors.white),
                    label: const Text("Scan Pickup QR Code", style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
                  )
                ],
              ),
            ),
          )
        ],
      ),
    );
  }
}
