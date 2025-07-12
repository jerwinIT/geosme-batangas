import bcrypt from "bcryptjs";
import { findUserByEmail } from "./user-queries";
import type { User } from "./types";

// Verify user password during login
export async function verifyUserPassword(
  email: string,
  password: string
): Promise<User | null> {
  const foundUser = await findUserByEmail(email);

  if (!foundUser || !foundUser.passwordHash) {
    return null;
  }

  const isPasswordValid = await bcrypt.compare(
    password,
    foundUser.passwordHash
  );
  return isPasswordValid ? foundUser : null;
}

// Check if password meets security requirements
export function isPasswordSecure(password: string): boolean {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return (
    password.length >= minLength &&
    hasUpperCase &&
    hasLowerCase &&
    hasNumbers &&
    hasSpecialChar
  );
}

// Generate secure password hash
export async function hashUserPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 12);
}

// Verify backup code format
export function isBackupCodeValid(code: string): boolean {
  // Backup codes are 9-character uppercase alphanumeric strings
  const backupCodePattern = /^[A-Z0-9]{9}$/;
  return backupCodePattern.test(code);
}
