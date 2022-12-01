-- CreateTable
CREATE TABLE `FacilityPayment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` ENUM('RequireDP', 'RequireFP', 'None') NOT NULL,
    `facilityId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `FacilityPayment_facilityId_key`(`facilityId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `FacilityPayment` ADD CONSTRAINT `FacilityPayment_facilityId_fkey` FOREIGN KEY (`facilityId`) REFERENCES `Facility`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
