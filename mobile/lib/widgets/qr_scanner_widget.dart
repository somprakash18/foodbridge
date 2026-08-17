import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class QrScannerWidget extends StatefulWidget {
  final Function(String code) onScanComplete;

  const QrScannerWidget({Key? key, required this.onScanComplete}) : super(key: key);

  @override
  State<QrScannerWidget> createState() => _QrScannerWidgetState();
}

class _QrScannerWidgetState extends State<QrScannerWidget> {
  bool _isScanning = false;

  void _simulateScan() {
    setState(() => _isScanning = true);
    Future.delayed(const Duration(seconds: 2), () {
      if (mounted) {
        setState(() => _isScanning = false);
        widget.onScanComplete("FOODBRIDGE-QR-4092");
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Dialog(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(28)),
      child: Padding(
        padding: const EdgeInsets.all(24),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            const Icon(Icons.qr_code_scanner, size: 48, color: AppTheme.primaryTeal),
            const SizedBox(height: 12),
            const Text("Scan Pickup QR", style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
            const SizedBox(height: 4),
            const Text("Align restaurant or delivery QR within frame", style: TextStyle(fontSize: 12, color: Colors.grey)),
            const SizedBox(height: 20),
            Container(
              height: 180,
              width: 180,
              decoration: BoxDecoration(
                color: Colors.black87,
                borderRadius: BorderRadius.circular(20),
                border: Border.all(color: AppTheme.emeraldGreen, width: 3),
              ),
              child: Center(
                child: _isScanning
                    ? const CircularProgressIndicator(color: AppTheme.emeraldGreen)
                    : const Icon(Icons.camera_alt_outlined, color: Colors.white54, size: 40),
              ),
            ),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: _simulateScan,
              style: ElevatedButton.styleFrom(
                backgroundColor: AppTheme.primaryTeal,
                minimumSize: const Size(double.infinity, 48),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
              ),
              child: Text(
                _isScanning ? "Verifying..." : "Simulate QR Scan",
                style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
              ),
            )
          ],
        ),
      ),
    );
  }
}
