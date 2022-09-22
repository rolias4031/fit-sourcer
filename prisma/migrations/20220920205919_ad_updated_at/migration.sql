/*
  Warnings:

  - Added the required column `updatedAt` to the `LowerBody` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `LowerBodyGarment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `LowerBody` ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `LowerBodyGarment` ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;
