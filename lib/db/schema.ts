import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  boolean,
  inet,
  jsonb,
  index,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

// Users table
export const users = pgTable(
  "users",
  {
    id: uuid("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    username: varchar("username", { length: 30 }).notNull().unique(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    passwordHash: varchar("password_hash", { length: 255 }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
    emailVerified: boolean("email_verified").default(false),
    emailVerifiedAt: timestamp("email_verified_at", { withTimezone: true }),
    isActive: boolean("is_active").default(true),
    lastLogin: timestamp("last_login", { withTimezone: true }),
    // OAuth fields
    googleId: varchar("google_id", { length: 255 }).unique(),
    avatarUrl: text("avatar_url"),
    // Profile fields
    firstName: varchar("first_name", { length: 100 }),
    lastName: varchar("last_name", { length: 100 }),
    bio: text("bio"),
    location: varchar("location", { length: 255 }),
  },
  (table) => ({
    emailIdx: index("idx_users_email").on(table.email),
    usernameIdx: index("idx_users_username").on(table.username),
    googleIdIdx: index("idx_users_google_id").on(table.googleId),
    createdAtIdx: index("idx_users_created_at").on(table.createdAt),
  })
);

// Two-Factor Authentication table
export const user2FA = pgTable(
  "user_2fa",
  {
    id: uuid("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    secret: varchar("secret", { length: 255 }).notNull(),
    isEnabled: boolean("is_enabled").default(false),
    enabledAt: timestamp("enabled_at", { withTimezone: true }),
    backupCodes: text("backup_codes").array(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  },
  (table) => ({
    userIdIdx: index("idx_user_2fa_user_id").on(table.userId),
  })
);

// Login attempts table
export const loginAttempts = pgTable(
  "login_attempts",
  {
    id: uuid("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }),
    email: varchar("email", { length: 255 }).notNull(),
    ipAddress: inet("ip_address"),
    userAgent: text("user_agent"),
    success: boolean("success").notNull(),
    failureReason: varchar("failure_reason", { length: 100 }),
    attemptedAt: timestamp("attempted_at", { withTimezone: true }).defaultNow(),
  },
  (table) => ({
    userIdIdx: index("idx_login_attempts_user_id").on(table.userId),
    emailIdx: index("idx_login_attempts_email").on(table.email),
    attemptedAtIdx: index("idx_login_attempts_attempted_at").on(
      table.attemptedAt
    ),
  })
);

// Password reset tokens
export const passwordResetTokens = pgTable(
  "password_reset_tokens",
  {
    id: uuid("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    token: varchar("token", { length: 255 }).notNull().unique(),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    usedAt: timestamp("used_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  },
  (table) => ({
    userIdIdx: index("idx_password_reset_tokens_user_id").on(table.userId),
    tokenIdx: index("idx_password_reset_tokens_token").on(table.token),
    expiresAtIdx: index("idx_password_reset_tokens_expires_at").on(
      table.expiresAt
    ),
  })
);

// Email verification tokens
export const emailVerificationTokens = pgTable(
  "email_verification_tokens",
  {
    id: uuid("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    token: varchar("token", { length: 255 }).notNull().unique(),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    usedAt: timestamp("used_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  },
  (table) => ({
    userIdIdx: index("idx_email_verification_tokens_user_id").on(table.userId),
    tokenIdx: index("idx_email_verification_tokens_token").on(table.token),
  })
);

// Audit logs
export const auditLogs = pgTable(
  "audit_logs",
  {
    id: uuid("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    userId: uuid("user_id").references(() => users.id, {
      onDelete: "set null",
    }),
    action: varchar("action", { length: 100 }).notNull(),
    details: jsonb("details"),
    ipAddress: inet("ip_address"),
    userAgent: text("user_agent"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  },
  (table) => ({
    userIdIdx: index("idx_audit_logs_user_id").on(table.userId),
    actionIdx: index("idx_audit_logs_action").on(table.action),
    createdAtIdx: index("idx_audit_logs_created_at").on(table.createdAt),
  })
);

// User sessions
export const userSessions = pgTable(
  "user_sessions",
  {
    id: uuid("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    sessionToken: varchar("session_token", { length: 255 }).notNull().unique(),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  },
  (table) => ({
    userIdIdx: index("idx_user_sessions_user_id").on(table.userId),
    sessionTokenIdx: index("idx_user_sessions_session_token").on(
      table.sessionToken
    ),
    expiresAtIdx: index("idx_user_sessions_expires_at").on(table.expiresAt),
  })
);

// Type exports for type-safe usage
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type User2FA = typeof user2FA.$inferSelect;
export type NewUser2FA = typeof user2FA.$inferInsert;
export type LoginAttempt = typeof loginAttempts.$inferSelect;
export type NewLoginAttempt = typeof loginAttempts.$inferInsert;
export type PasswordResetToken = typeof passwordResetTokens.$inferSelect;
export type NewPasswordResetToken = typeof passwordResetTokens.$inferInsert;
export type EmailVerificationToken =
  typeof emailVerificationTokens.$inferSelect;
export type NewEmailVerificationToken =
  typeof emailVerificationTokens.$inferInsert;
export type AuditLog = typeof auditLogs.$inferSelect;
export type NewAuditLog = typeof auditLogs.$inferInsert;
export type UserSession = typeof userSessions.$inferSelect;
export type NewUserSession = typeof userSessions.$inferInsert;
