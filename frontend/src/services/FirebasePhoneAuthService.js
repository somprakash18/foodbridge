import { apiClient } from './apiClient';

/**
 * Production Real Phone OTP Authentication Service
 * Strictly calls backend SMS provider endpoint.
 * Zero OTP generation or logging in frontend JavaScript.
 */
export class FirebasePhoneAuthService {
  /**
   * Normalize phone number to E.164 format (+91XXXXXXXXXX)
   */
  static normalizePhone(phone) {
    let clean = phone.replace(/[^0-9+]/g, '');
    if (!clean.startsWith('+91') && clean.length === 10) {
      clean = '+91' + clean;
    }
    return clean;
  }

  /**
   * Validate Indian E.164 phone format (+91 followed by 10 digits starting with 6-9)
   */
  static isValidPhone(phone) {
    const clean = this.normalizePhone(phone);
    return /^\+91[6-9]\d{9}$/.test(clean);
  }

  /**
   * Request real SMS OTP from server / provider
   */
  static async requestPhoneOtp(phone) {
    const cleanPhone = this.normalizePhone(phone);

    if (!this.isValidPhone(cleanPhone)) {
      throw new Error("Unable to send OTP. Invalid phone number. Please enter a 10-digit number (+91XXXXXXXXXX).");
    }

    try {
      const res = await apiClient.post('/auth/phone/send-otp', { phone: cleanPhone });
      return {
        success: true,
        message: res.message || `OTP sent to +91******${cleanPhone.slice(-4)}`
      };
    } catch (err) {
      const serverError = err.response?.data?.error;
      throw new Error(serverError || "Unable to send OTP. Please check your phone number and try again.");
    }
  }

  /**
   * Verify Phone OTP code with backend verification
   */
  static async verifyPhoneOtp(phone, otpCode, role = 'BUYER') {
    const cleanPhone = this.normalizePhone(phone);
    const cleanOtp = otpCode.trim();

    if (!cleanOtp || cleanOtp.length !== 6) {
      throw new Error("Please enter a valid 6-digit SMS OTP code.");
    }

    try {
      const res = await apiClient.post('/auth/phone/verify-otp', {
        phone: cleanPhone,
        otp: cleanOtp,
        role: role
      });

      return {
        success: true,
        user: res.user,
        token: res.token
      };
    } catch (err) {
      const serverError = err.response?.data?.error;
      throw new Error(serverError || "Invalid OTP code entered. Please check your SMS and try again.");
    }
  }
}
