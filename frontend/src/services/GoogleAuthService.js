// Google OAuth2 Authentication Service
export class GoogleAuthService {
  static signInWithGoogle(role = 'BUYER') {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          user: {
            id: Date.now(),
            name: "Verified Google User",
            email: "user.google@gmail.com",
            avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
            role,
            isVerified: true,
            jwtToken: `FOODBRIDGE_JWT_${Date.now()}`
          }
        });
      }, 1000);
    });
  }
}
