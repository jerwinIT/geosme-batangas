import { eq, and, desc } from "drizzle-orm";
import { db } from "../../drizzle";
import { users, user2FA, loginAttempts, auditLogs } from "../../schema";
import type { User, User2FA, LoginAttempt, AuditLog } from "./types";

// Find user by email
export async function findUserByEmail(email: string): Promise<User | null> {
  const [foundUser] = await db
    .select()
    .from(users)
    .where(and(eq(users.email, email), eq(users.isActive, true)))
    .limit(1);

  return foundUser || null;
}

// Find user by username
export async function findUserByUsername(
  username: string
): Promise<User | null> {
  const [foundUser] = await db
    .select()
    .from(users)
    .where(and(eq(users.username, username), eq(users.isActive, true)))
    .limit(1);

  return foundUser || null;
}

// Find user by ID
export async function findUserById(userId: string): Promise<User | null> {
  const [foundUser] = await db
    .select()
    .from(users)
    .where(and(eq(users.id, userId), eq(users.isActive, true)))
    .limit(1);

  return foundUser || null;
}

// Find user by Google ID
export async function findUserByGoogleId(
  googleId: string
): Promise<User | null> {
  const [foundUser] = await db
    .select()
    .from(users)
    .where(and(eq(users.googleId, googleId), eq(users.isActive, true)))
    .limit(1);

  return foundUser || null;
}

// Get 2FA settings for user
export async function getUserTwoFactorAuth(
  userId: string
): Promise<User2FA | null> {
  const [foundTwoFA] = await db
    .select()
    .from(user2FA)
    .where(eq(user2FA.userId, userId))
    .limit(1);

  return foundTwoFA || null;
}

// Check if user has 2FA enabled
export async function hasUserTwoFactorEnabled(
  userId: string
): Promise<boolean> {
  const userTwoFA = await getUserTwoFactorAuth(userId);
  return userTwoFA?.isEnabled ?? false;
}

// Get user's recent login attempts
export async function getUserRecentLoginAttempts(
  email: string,
  attemptLimit: number = 10
): Promise<LoginAttempt[]> {
  return await db
    .select()
    .from(loginAttempts)
    .where(eq(loginAttempts.email, email))
    .orderBy(desc(loginAttempts.attemptedAt))
    .limit(attemptLimit);
}

// Get user's audit logs
export async function getUserAuditHistory(
  userId: string,
  logLimit: number = 50
): Promise<AuditLog[]> {
  return await db
    .select()
    .from(auditLogs)
    .where(eq(auditLogs.userId, userId))
    .orderBy(desc(auditLogs.createdAt))
    .limit(logLimit);
}

// Check if username is available
export async function isUsernameAvailable(username: string): Promise<boolean> {
  const existingUser = await findUserByUsername(username);
  return !existingUser;
}

// Check if email is available
export async function isEmailAvailable(email: string): Promise<boolean> {
  const existingUser = await findUserByEmail(email);
  return !existingUser;
}
