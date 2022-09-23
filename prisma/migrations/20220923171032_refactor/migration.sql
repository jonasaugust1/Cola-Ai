/*
  Warnings:

  - You are about to alter the column `transaction` on the `ad` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(10)`.
  - You are about to alter the column `zip_code` on the `address` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(10)`.
  - You are about to alter the column `street` on the `address` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.
  - You are about to alter the column `district` on the `address` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.
  - You are about to alter the column `state` on the `address` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(4)`.
  - You are about to alter the column `country` on the `address` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(4)`.
  - You are about to alter the column `city` on the `address` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.
  - You are about to alter the column `name` on the `category` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(20)`.
  - You are about to alter the column `sub_category` on the `category` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(20)`.
  - You are about to alter the column `name` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.
  - You are about to alter the column `email` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.
  - You are about to alter the column `password` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(20)`.

*/
-- AlterTable
ALTER TABLE `ad` MODIFY `transaction` VARCHAR(10) NOT NULL,
    MODIFY `price` FLOAT NULL;

-- AlterTable
ALTER TABLE `address` MODIFY `zip_code` VARCHAR(10) NOT NULL,
    MODIFY `street` VARCHAR(50) NOT NULL,
    MODIFY `district` VARCHAR(50) NOT NULL,
    MODIFY `state` VARCHAR(4) NOT NULL,
    MODIFY `country` VARCHAR(4) NOT NULL,
    MODIFY `city` VARCHAR(50) NOT NULL;

-- AlterTable
ALTER TABLE `category` MODIFY `name` VARCHAR(20) NOT NULL,
    MODIFY `sub_category` VARCHAR(20) NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `name` VARCHAR(50) NOT NULL,
    MODIFY `email` VARCHAR(50) NOT NULL,
    MODIFY `password` VARCHAR(20) NOT NULL;

-- CreateTable
CREATE TABLE `CategoryAd` (
    `id` VARCHAR(191) NOT NULL,
    `adId` VARCHAR(191) NOT NULL,
    `categoryId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`categoryId`, `adId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CategoryAd` ADD CONSTRAINT `CategoryAd_adId_fkey` FOREIGN KEY (`adId`) REFERENCES `Ad`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CategoryAd` ADD CONSTRAINT `CategoryAd_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
