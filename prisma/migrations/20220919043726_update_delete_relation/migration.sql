-- DropForeignKey
ALTER TABLE `LowerBody` DROP FOREIGN KEY `LowerBody_userId_fkey`;

-- AddForeignKey
ALTER TABLE `LowerBody` ADD CONSTRAINT `LowerBody_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
