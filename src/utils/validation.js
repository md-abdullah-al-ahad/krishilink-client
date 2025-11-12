export const validatePassword = (password) => {
  const errors = [];

  if (password.length < 6) {
    errors.push("Password must be at least 6 characters long");
  }

  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter");
  }

  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const getUserDisplayName = (user) => {
  if (!user) return "Guest";
  return user.displayName || user.email?.split("@")[0] || "User";
};

export const getUserAvatar = (user) => {
  if (!user) return null;
  return user.photoURL || null;
};

export const getAuthErrorMessage = (errorCode) => {
  const errorMessages = {
    "auth/email-already-in-use": "This email is already registered",
    "auth/invalid-email": "Invalid email address",
    "auth/operation-not-allowed": "Operation not allowed",
    "auth/weak-password": "Password is too weak",
    "auth/user-disabled": "This account has been disabled",
    "auth/user-not-found": "No account found with this email",
    "auth/wrong-password": "Incorrect password",
    "auth/too-many-requests": "Too many attempts. Please try again later",
    "auth/network-request-failed":
      "Network error. Please check your connection",
    "auth/popup-closed-by-user": "Sign-in popup was closed",
    "auth/cancelled-popup-request":
      "Only one popup request is allowed at a time",
  };

  return errorMessages[errorCode] || "An error occurred. Please try again";
};
