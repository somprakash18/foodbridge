import { apiClient } from './apiClient';

/**
 * Production Real Phone OTP Authentication Service
 * Strictly calls backend SMS provider endpoint.
 * Zero OTP generation or logging in frontend JavaScript.
 */
export class FirebasePhoneAuthService {
  /**
   * Normalize Indian phone number to E.164 format (+917563045006)
   * Handles: 7563045006, 07563045006, 917563045006, +917563045006, +91 75630 45006
   */
  static normalizePhone(phone) {
    if (!phone) return '';
    let digits = phone.replace(/[^0-9]/g, '');

    // Strip leading zero if 11 digits (e.g. 07563045006)
    if (digits.startsWith('0') && digits.length === 11) {
      digits = digits.substring(1);
    }

    // If 10 digits, prepend +91
    if (digits.length === 10) {
      return '+91' + digits;
    }

    // If 12 digits starting with 91, prepend +
    if (digits.length === 12 && digits.startsWith('91')) {
      return '+' + digits;
    }

    return '+91' + digits;
  }

  /**
   * Validate Indian E.164 mobile format (+91 followed by 10 digits starting with 6-9)
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
      throw new Error("Please enter a valid 10-digit Indian mobile number (+91XXXXXXXXXX).");
    }

    try {
      const res = await apiClient.post('/auth/phone/send-otp', { phone: cleanPhone });
      return {
        success: true,
        message: res.message || `OTP sent to +91******${cleanPhone.slice(-4)}.`
      };
    } catch (err) {
      const status = err.response?.status;
      const serverError = err.response?.data?.error;

      if (status === 429) {
        throw new Error(serverError || "Too many OTP requests. Please wait a few minutes and try again.");
      }

      if (serverError) {
        throw new Error(serverError);
      }

      // Actionable diagnostic feedback for network / connection errors
      throw new Error("SMS service is temporarily unavailable. Please try again later.");
    }
  }

  /**
   * Verify Phone OTP code with backend verification
   */
  static async verifyPhoneOtp(phone, otpCode, role = 'BUYER') {
    const cleanPhone = this.normalizePhone(phone);
    const cleanOtp = otpCode ? otpCode.trim() : '';

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
