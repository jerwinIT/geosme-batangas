import { Pool } from "pg";

// Database configuration for different environments
const dbConfig = {
  development: {
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432"),
    database: process.env.DB_NAME || "geosme_dev",
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "password",
    ssl: false,
  },
  production: {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  },
};

const isProduction = process.env.NODE_ENV === "production";
const config = isProduction ? dbConfig.production : dbConfig.development;

// Create connection pool
export const pool = new Pool(config);

// Test database connection
export async function testConnection() {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT NOW()");
    client.release();
    console.log("✅ Database connected successfully:", result.rows[0]);
    return true;
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    return false;
  }
}

// Graceful shutdown
process.on("SIGINT", async () => {
  await pool.end();
  console.log("Database pool closed");
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await pool.end();
  console.log("Database pool closed");
  process.exit(0);
});
