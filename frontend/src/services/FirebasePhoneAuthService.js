// Firebase Phone Authentication Service
export class FirebasePhoneAuthService {
  static sendPhoneOtp(phoneNumber, callback) {
    console.log(`[Firebase Phone Auth] Sending SMS OTP to ${phoneNumber}...`);
    // Simulated production SMS dispatcher (e.g., Firebase Auth recaptchaVerifier)
    setTimeout(() => {
      const mockVerificationId = `VERIFY_SMS_${Math.floor(100000 + Math.random() * 900000)}`;
      callback({
        success: true,
        verificationId: mockVerificationId,
        message: `6-Digit SMS OTP dispatched to ${phoneNumber}. (Test Code: 123456)`
      });
    }, 1200);
  }

  static verifyPhoneOtp(otpCode, verificationId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (otpCode === '123456' || otpCode.length === 6) {
          resolve({
            success: true,
            userPhone: "+91 98765 43210",
            verifiedToken: `FIREBASE_AUTH_TOKEN_${Date.now()}`
          });
        } else {
          reject(new Error("Invalid 6-Digit OTP code. Please check SMS and try again."));
        }
      }, 1000);
    });
  }
}
