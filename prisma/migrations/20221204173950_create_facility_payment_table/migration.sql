
-- CreateTable
CREATE TABLE `FacilityPaymentSetting` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` ENUM('PerHour', 'WholeDay') NOT NULL,
    `amount` VARCHAR(191) NULL,
    `downPayment` VARCHAR(191) NULL,
    `facilityId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `FacilityPaymentSetting_facilityId_key`(`facilityId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `FacilityPaymentSetting` ADD CONSTRAINT `FacilityPaymentSetting_facilityId_fkey` FOREIGN KEY (`facilityId`) REFERENCES `Facility`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
