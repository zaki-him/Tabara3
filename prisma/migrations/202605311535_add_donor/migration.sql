-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "BloodType" AS ENUM ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-');

-- CreateTable
CREATE TABLE "donors" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "blood_type" "BloodType" NOT NULL,
    "age" INTEGER NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "last_donation" DATE NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "donors_pkey" PRIMARY KEY ("id")
);
