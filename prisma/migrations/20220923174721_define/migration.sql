/*
  Warnings:

  - You are about to drop the `categoryad` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `categoryad` DROP FOREIGN KEY `CategoryAd_adId_fkey`;

-- DropForeignKey
ALTER TABLE `categoryad` DROP FOREIGN KEY `CategoryAd_categoryId_fkey`;

-- DropTable
DROP TABLE `categoryad`;
