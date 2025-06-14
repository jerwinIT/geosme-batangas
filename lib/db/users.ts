import { pool } from "./config";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

export interface User {
  id: string;
  username: string;
  email: string;
  passwordHash?: string;
  createdAt: Date;
  updatedAt: Date;
  emailVerified: boolean;
  emailVerifiedAt?: Date;
  isActive: boolean;
  lastLogin?: Date;
  googleId?: string;
  avatarUrl?: string;
  firstName?: string;
  lastName?: string;
  bio?: string;
  location?: string;
}

export interface User2FA {
  id: string;
  userId: string;
  secret: string;
  isEnabled: boolean;
  enabledAt?: Date;
  backupCodes: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserData {
  username: string;
  email: string;
  password?: string;
  googleId?: string;
  avatarUrl?: string;
  firstName?: string;
  lastName?: string;
}

// Create a new user
export async function createUser(userData: CreateUserData): Promise<User> {
  const client = await pool.connect();

  try {
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
    let passwordHash = null;
    if (password) {
      passwordHash = await bcrypt.hash(password, 12);
    }

    const query = `
      INSERT INTO users (username, email, password_hash, google_id, avatar_url, first_name, last_name)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;

    const values = [
      username,
      email,
      passwordHash,
      googleId,
      avatarUrl,
      firstName,
      lastName,
    ];
    const result = await client.query(query, values);

    return mapUserFromDB(result.rows[0]);
  } finally {
    client.release();
  }
}

// Find user by email
export async function findUserByEmail(email: string): Promise<User | null> {
  const client = await pool.connect();

  try {
    const query = "SELECT * FROM users WHERE email = $1 AND is_active = true";
    const result = await client.query(query, [email]);

    if (result.rows.length === 0) {
      return null;
    }

    return mapUserFromDB(result.rows[0]);
  } finally {
    client.release();
  }
}

// Find user by username
export async function findUserByUsername(
  username: string
): Promise<User | null> {
  const client = await pool.connect();

  try {
    const query =
      "SELECT * FROM users WHERE username = $1 AND is_active = true";
    const result = await client.query(query, [username]);

    if (result.rows.length === 0) {
      return null;
    }

    return mapUserFromDB(result.rows[0]);
  } finally {
    client.release();
  }
}

// Find user by Google ID
export async function findUserByGoogleId(
  googleId: string
): Promise<User | null> {
  const client = await pool.connect();

  try {
    const query =
      "SELECT * FROM users WHERE google_id = $1 AND is_active = true";
    const result = await client.query(query, [googleId]);

    if (result.rows.length === 0) {
      return null;
    }

    return mapUserFromDB(result.rows[0]);
  } finally {
    client.release();
  }
}

// Verify user password
export async function verifyPassword(
  email: string,
  password: string
): Promise<User | null> {
  const user = await findUserByEmail(email);

  if (!user || !user.passwordHash) {
    return null;
  }

  const isValid = await bcrypt.compare(password, user.passwordHash);
  return isValid ? user : null;
}

// Update user's last login
export async function updateLastLogin(userId: string): Promise<void> {
  const client = await pool.connect();

  try {
    const query = "UPDATE users SET last_login = NOW() WHERE id = $1";
    await client.query(query, [userId]);
  } finally {
    client.release();
  }
}

// Create or update 2FA for user
export async function create2FA(
  userId: string,
  secret: string
): Promise<User2FA> {
  const client = await pool.connect();

  try {
    // Generate backup codes
    const backupCodes = Array.from({ length: 5 }, () =>
      Math.random().toString(36).substr(2, 9).toUpperCase()
    );

    const query = `
      INSERT INTO user_2fa (user_id, secret, backup_codes)
      VALUES ($1, $2, $3)
      ON CONFLICT (user_id) 
      DO UPDATE SET secret = $2, backup_codes = $3, updated_at = NOW()
      RETURNING *
    `;

    const result = await client.query(query, [userId, secret, backupCodes]);
    return map2FAFromDB(result.rows[0]);
  } finally {
    client.release();
  }
}

// Enable 2FA for user
export async function enable2FA(userId: string): Promise<void> {
  const client = await pool.connect();

  try {
    const query = `
      UPDATE user_2fa 
      SET is_enabled = true, enabled_at = NOW(), updated_at = NOW()
      WHERE user_id = $1
    `;
    await client.query(query, [userId]);
  } finally {
    client.release();
  }
}

// Get user's 2FA settings
export async function get2FA(userId: string): Promise<User2FA | null> {
  const client = await pool.connect();

  try {
    const query = "SELECT * FROM user_2fa WHERE user_id = $1";
    const result = await client.query(query, [userId]);

    if (result.rows.length === 0) {
      return null;
    }

    return map2FAFromDB(result.rows[0]);
  } finally {
    client.release();
  }
}

// Log authentication attempt
export async function logLoginAttempt(
  email: string,
  success: boolean,
  userId?: string,
  failureReason?: string,
  ipAddress?: string,
  userAgent?: string
): Promise<void> {
  const client = await pool.connect();

  try {
    const query = `
      INSERT INTO login_attempts (user_id, email, success, failure_reason, ip_address, user_agent)
      VALUES ($1, $2, $3, $4, $5, $6)
    `;

    const values = [
      userId || null,
      email,
      success,
      failureReason || null,
      ipAddress || null,
      userAgent || null,
    ];
    await client.query(query, values);
  } finally {
    client.release();
  }
}

// Log audit event
export async function logAuditEvent(
  userId: string,
  action: string,
  details?: any,
  ipAddress?: string,
  userAgent?: string
): Promise<void> {
  const client = await pool.connect();

  try {
    const query = `
      INSERT INTO audit_logs (user_id, action, details, ip_address, user_agent)
      VALUES ($1, $2, $3, $4, $5)
    `;

    const values = [
      userId,
      action,
      JSON.stringify(details) || null,
      ipAddress || null,
      userAgent || null,
    ];
    await client.query(query, values);
  } finally {
    client.release();
  }
}

// Helper function to map database row to User object
function mapUserFromDB(row: any): User {
  return {
    id: row.id,
    username: row.username,
    email: row.email,
    passwordHash: row.password_hash,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    emailVerified: row.email_verified,
    emailVerifiedAt: row.email_verified_at,
    isActive: row.is_active,
    lastLogin: row.last_login,
    googleId: row.google_id,
    avatarUrl: row.avatar_url,
    firstName: row.first_name,
    lastName: row.last_name,
    bio: row.bio,
    location: row.location,
  };
}

// Helper function to map database row to User2FA object
function map2FAFromDB(row: any): User2FA {
  return {
    id: row.id,
    userId: row.user_id,
    secret: row.secret,
    isEnabled: row.is_enabled,
    enabledAt: row.enabled_at,
    backupCodes: row.backup_codes,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}
