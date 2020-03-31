DROP SCHEMA public CASCADE;
CREATE SCHEMA IF NOT EXISTS public;

/*
  Extension that generate uuid
*/
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Automate update update_dt
CREATE OR REPLACE FUNCTION trigger_set_updated_dt()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_dt = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Table Definition
CREATE TABLE "public"."todo" (
    "todo_id" SERIAL PRIMARY KEY,
    "todo_title" varchar NOT NULL,
    "completed" boolean DEFAULT FALSE,
    "created_dt" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updated_dt" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE "public"."staff" (
    "staff_id" SERIAL PRIMARY KEY,
    "username" varchar NOT NULL,
    "password" varchar,
    "last_logon_dt" timestamp,
    "user_scope" varchar DEFAULT 'staff',
    "created_dt" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updated_dt" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE "public"."session" (
    "session_id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "staff_id" int8 NOT NULL REFERENCES staff (staff_id),
    "ip_address" VARCHAR NOT NULL,
    "created_dt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("session_id")
);