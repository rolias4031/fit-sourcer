-- CreateTable
CREATE TABLE `LowerBody` (
    `id` VARCHAR(191) NOT NULL,
    `userEmail` VARCHAR(191) NOT NULL,
    `waist` DECIMAL(65, 30) NOT NULL DEFAULT 0,
    `hip` DECIMAL(65, 30) NOT NULL DEFAULT 0,
    `seat` DECIMAL(65, 30) NOT NULL DEFAULT 0,
    `thigh` DECIMAL(65, 30) NOT NULL DEFAULT 0,
    `calf` DECIMAL(65, 30) NOT NULL DEFAULT 0,
    `inseam` DECIMAL(65, 30) NOT NULL DEFAULT 0,
    `outseam` DECIMAL(65, 30) NOT NULL DEFAULT 0,

    UNIQUE INDEX `LowerBody_userEmail_key`(`userEmail`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `LowerBody` ADD CONSTRAINT `LowerBody_userEmail_fkey` FOREIGN KEY (`userEmail`) REFERENCES `User`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;
