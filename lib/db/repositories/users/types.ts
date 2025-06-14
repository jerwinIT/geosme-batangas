import type {
  User,
  NewUser,
  User2FA,
  NewUser2FA,
  LoginAttempt,
  AuditLog,
} from "../../schema";

export interface CreateUserData {
  username: string;
  email: string;
  password?: string;
  googleId?: string;
  avatarUrl?: string;
  firstName?: string;
  lastName?: string;
}

export interface UpdateUserProfileData {
  firstName?: string;
  lastName?: string;
  bio?: string;
  location?: string;
  avatarUrl?: string;
}

export interface LoginAttemptData {
  email: string;
  success: boolean;
  userId?: string;
  failureReason?: string;
  ipAddress?: string;
  userAgent?: string;
}

export interface AuditEventData {
  userId: string;
  action: string;
  details?: any;
  ipAddress?: string;
  userAgent?: string;
}

// Re-export schema types for convenience
export type { User, NewUser, User2FA, NewUser2FA, LoginAttempt, AuditLog };
