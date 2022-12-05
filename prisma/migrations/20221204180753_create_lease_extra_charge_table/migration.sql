-- CreateTable
CREATE TABLE `LeaseExtraCharge` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `leaseId` INTEGER NOT NULL,
    `extraId` INTEGER NOT NULL,
    `amount` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `LeaseExtraCharge` ADD CONSTRAINT `LeaseExtraCharge_leaseId_fkey` FOREIGN KEY (`leaseId`) REFERENCES `Lease`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LeaseExtraCharge` ADD CONSTRAINT `LeaseExtraCharge_extraId_fkey` FOREIGN KEY (`extraId`) REFERENCES `Extra`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
