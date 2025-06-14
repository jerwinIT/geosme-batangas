import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { db } from "../../drizzle";
import { users, user2FA, loginAttempts, auditLogs } from "../../schema";
import type {
  User,
  NewUser,
  User2FA,
  NewUser2FA,
  CreateUserData,
  UpdateUserProfileData,
  LoginAttemptData,
  AuditEventData,
} from "./types";

// Create a new user
export async function createUser(userData: CreateUserData): Promise<User> {
  const {
    username,
    email,
    password,
    googleId,
    avatarUrl,
    firstName,
    lastName,
  } = userData;

  // Hash password if provided
  let hashedPassword = null;
  if (password) {
    hashedPassword = await bcrypt.hash(password, 12);
  }

  const newUserData: NewUser = {
    username,
    email,
    passwordHash: hashedPassword,
    googleId,
    avatarUrl,
    firstName,
    lastName,
  };

  const [createdUser] = await db.insert(users).values(newUserData).returning();
  return createdUser;
}

// Update user's last login timestamp
export async function updateUserLastLogin(userId: string): Promise<void> {
  await db
    .update(users)
    .set({
      lastLogin: new Date(),
      updatedAt: new Date(),
    })
    .where(eq(users.id, userId));
}

// Update user profile information
export async function updateUserProfile(
  userId: string,
  profileData: UpdateUserProfileData
): Promise<User> {
  const [updatedUser] = await db
    .update(users)
    .set({
      ...profileData,
      updatedAt: new Date(),
    })
    .where(eq(users.id, userId))
    .returning();

  return updatedUser;
}

// Deactivate user account (soft delete)
export async function deactivateUserAccount(userId: string): Promise<void> {
  await db
    .update(users)
    .set({
      isActive: false,
      updatedAt: new Date(),
    })
    .where(eq(users.id, userId));
}

// Mark user email as verified
export async function verifyUserEmail(userId: string): Promise<void> {
  await db
    .update(users)
    .set({
      emailVerified: true,
      emailVerifiedAt: new Date(),
      updatedAt: new Date(),
    })
    .where(eq(users.id, userId));
}

// Create or update 2FA for user
export async function setupUserTwoFactorAuth(
  userId: string,
  secret: string
): Promise<User2FA> {
  // Generate backup codes
  const generatedBackupCodes = Array.from({ length: 5 }, () =>
    Math.random().toString(36).substr(2, 9).toUpperCase()
  );

  const twoFactorData: NewUser2FA = {
    userId,
    secret,
    backupCodes: generatedBackupCodes,
  };

  const [createdTwoFA] = await db
    .insert(user2FA)
    .values(twoFactorData)
    .onConflictDoUpdate({
      target: user2FA.userId,
      set: {
        secret,
        backupCodes: generatedBackupCodes,
        updatedAt: new Date(),
      },
    })
    .returning();

  return createdTwoFA;
}

// Enable 2FA for user
export async function enableUserTwoFactorAuth(userId: string): Promise<void> {
  await db
    .update(user2FA)
    .set({
      isEnabled: true,
      enabledAt: new Date(),
      updatedAt: new Date(),
    })
    .where(eq(user2FA.userId, userId));
}

// Disable 2FA for user
export async function disableUserTwoFactorAuth(userId: string): Promise<void> {
  await db
    .update(user2FA)
    .set({
      isEnabled: false,
      updatedAt: new Date(),
    })
    .where(eq(user2FA.userId, userId));
}

// Log login attempt
export async function recordLoginAttempt(
  attemptData: LoginAttemptData
): Promise<void> {
  await db.insert(loginAttempts).values(attemptData);
}

// Log audit event
export async function recordAuditEvent(
  eventData: AuditEventData
): Promise<void> {
  await db.insert(auditLogs).values(eventData);
}
