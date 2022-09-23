/*
  Warnings:

  - You are about to drop the `_adtocategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_adtocategory` DROP FOREIGN KEY `_AdToCategory_A_fkey`;

-- DropForeignKey
ALTER TABLE `_adtocategory` DROP FOREIGN KEY `_AdToCategory_B_fkey`;

-- DropTable
DROP TABLE `_adtocategory`;

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
