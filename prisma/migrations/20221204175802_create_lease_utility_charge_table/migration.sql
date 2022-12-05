-- CreateTable
CREATE TABLE `LeaseUtilityCharge` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `leaseId` INTEGER NOT NULL,
    `utilityId` INTEGER NOT NULL,
    `amount` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `LeaseUtilityCharge` ADD CONSTRAINT `LeaseUtilityCharge_leaseId_fkey` FOREIGN KEY (`leaseId`) REFERENCES `Lease`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LeaseUtilityCharge` ADD CONSTRAINT `LeaseUtilityCharge_utilityId_fkey` FOREIGN KEY (`utilityId`) REFERENCES `Utility`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
