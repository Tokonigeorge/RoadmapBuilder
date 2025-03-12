// Helper function to convert Firebase error codes to user-friendly messages
export function getAuthErrorMessage(errorCode: string): string {
  switch (errorCode) {
    // Email/Password Authentication Errors
    case 'auth/email-already-in-use':
      return 'This email is already registered. Please use a different email or try logging in.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/user-disabled':
      return 'This account has been disabled. Please contact support.';
    case 'auth/user-not-found':
      return 'No account found with this email. Please check your email or sign up.';
    case 'auth/wrong-password':
      return 'Incorrect password. Please try again or reset your password.';
    case 'auth/too-many-requests':
      return 'Too many unsuccessful login attempts. Please try again later or reset your password.';
    case 'auth/weak-password':
      return 'Password is too weak. Please use a stronger password (at least 6 characters).';

    // Google Sign In Errors
    case 'auth/account-exists-with-different-credential':
      return 'An account already exists with the same email but different sign-in credentials. Try signing in using a different method.';
    case 'auth/cancelled-popup-request':
      return 'The authentication request was cancelled. Please try again.';
    case 'auth/popup-blocked':
      return 'Authentication popup was blocked by your browser. Please allow popups for this site and try again.';
    case 'auth/popup-closed-by-user':
      return 'Authentication was cancelled. Please try again and complete the sign-in process.';

    // Other common errors
    case 'auth/network-request-failed':
      return 'Network error. Please check your internet connection and try again.';
    case 'auth/timeout':
      return 'The request timed out. Please try again.';
    case 'auth/invalid-credential':
      return 'The authentication credential is invalid. Please try again.';

    default:
      return 'An error occurred during authentication. Please try again.';
  }
}
