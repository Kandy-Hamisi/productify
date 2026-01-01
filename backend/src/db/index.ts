import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";
import { ENV } from "../config/env";

if (!ENV.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

// initialize postgreSQL connection pool
const pool = new Pool({ connectionString: ENV.DATABASE_URL });

// log when first connection is established
pool.on("connect", () => console.log("connected to database"));

export const db = drizzle({ client: pool, schema });

// What is a connection pool?
// A connection pool is a cache of database connections that are kept open and reused.

// why use it?
// Opening/closing connections is slow. Instead of creating a new connection for each request, we reuse existing one.
// - Database limit concurrent connections. A pool manages a fixed number of connections and shares them across requests
