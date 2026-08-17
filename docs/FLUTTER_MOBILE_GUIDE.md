# FoodBridge - Cross-Platform Mobile Application Guide (Android & iOS)

This guide provides complete instructions for building, running, and deploying the **FoodBridge** mobile application built with **Flutter 3.x** and **Material 3**.

---

## 📱 Mobile Architecture

```
mobile/
├── lib/
│   ├── main.dart
│   ├── theme/
│   │   └── app_theme.dart          # Deep Teal (#0F766E) & Emerald (#10B981) Material 3 Theme
│   ├── models/
│   │   └── food_listing_model.dart  # FoodListingModel, UserModel, OrderModel
│   ├── services/
│   │   └── mock_data_engine.dart   # Provider Reactive State Engine & AI Matching
│   ├── widgets/
│   │   ├── food_card_widget.dart
│   │   ├── order_timeline_widget.dart
│   │   └── qr_scanner_widget.dart   # Camera QR Scanner Widget
│   └── screens/
│       ├── splash_screen.dart       # Animated Logo Splash Screen
│       ├── onboarding_screen.dart   # 3 Slide Onboarding Flow
│       ├── auth_screen.dart         # 4-Role Registration & Firebase Phone Auth OTP
│       ├── home_screen.dart         # Bottom Navigation & Role Switcher
│       ├── restaurant_app_screen.dart # Restaurant FSSAI Upload & Surplus Manager
│       ├── ngo_app_screen.dart      # NGO Live Map & Claim Station
│       ├── buyer_app_screen.dart    # Discount Buyer Marketplace & Checkout
│       ├── delivery_app_screen.dart # Delivery Partner Pickup & Camera QR Scanner
│       ├── admin_app_screen.dart    # Owner System Analytics
│       ├── wallet_screen.dart       # Digital Wallet & Ledger
│       └── profile_screen.dart      # User Profile & Verification Badge
└── pubspec.yaml
```

---

## 🚀 Running the App Locally

### Prerequisites
1. Install [Flutter SDK 3.x+](https://storage.googleapis.com/flutter_infra_release/releases/stable/windows/flutter_windows_3.19.0-stable.zip).
2. Configure Android Studio / VS Code with Flutter extension.
3. Start an Android Emulator, iOS Simulator, or connect a physical phone via USB debugging.

### Execution Commands
```powershell
cd C:\Users\A2Z MEHTA\.gemini\antigravity\scratch\foodbridge\mobile

# Install Dependencies
flutter pub get

# Run on active device/emulator
flutter run
```

---

## 📦 Production Builds

### Android Release APK & App Bundle (AAB)
```powershell
# Build Standalone Release APK
flutter build apk --release

# Build Google Play Store App Bundle (AAB)
flutter build appbundle --release
```
- **Output Location**: `mobile/build/app/outputs/flutter-apk/app-release.apk`

### iOS Release Archive (IPA)
```powershell
flutter build ipa --release
```
- **Output Location**: `mobile/build/ios/archive/`

---

## 🔒 Firebase Phone Auth Setup (Android & iOS)

1. Add your Android `google-services.json` to `mobile/android/app/`.
2. Add your iOS `GoogleService-Info.plist` to `mobile/ios/Runner/`.
3. Enable **Phone Authentication** in the Firebase Console.
4. Add Test Phone Numbers (e.g. `+91 98765 43210` with code `123456`) for instant testing!
