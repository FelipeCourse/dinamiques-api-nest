/*
  Warnings:

  - Made the column `created_by` on table `Article` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_by` on table `Category` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_by` on table `Teacher` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_by` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Article" ALTER COLUMN "created_by" SET NOT NULL;

-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "created_by" SET NOT NULL;

-- AlterTable
ALTER TABLE "Teacher" ALTER COLUMN "created_by" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "created_by" SET NOT NULL;
