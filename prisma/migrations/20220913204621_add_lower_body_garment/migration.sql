-- CreateTable
CREATE TABLE `LowerBodyGarment` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `vendor` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `waist` DECIMAL(65, 30) NOT NULL DEFAULT 0,
    `hip` DECIMAL(65, 30) NOT NULL DEFAULT 0,
    `seat` DECIMAL(65, 30) NOT NULL DEFAULT 0,
    `thigh` DECIMAL(65, 30) NOT NULL DEFAULT 0,
    `calf` DECIMAL(65, 30) NOT NULL DEFAULT 0,
    `inseam` DECIMAL(65, 30) NOT NULL DEFAULT 0,
    `outseam` DECIMAL(65, 30) NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_LowerBodyGarmentToUser` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_LowerBodyGarmentToUser_AB_unique`(`A`, `B`),
    INDEX `_LowerBodyGarmentToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_LowerBodyGarmentToUser` ADD CONSTRAINT `_LowerBodyGarmentToUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `LowerBodyGarment`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_LowerBodyGarmentToUser` ADD CONSTRAINT `_LowerBodyGarmentToUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
