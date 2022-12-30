-- CreateTable
CREATE TABLE `Property` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `propertyTypeId` INTEGER NOT NULL,
    `propertyLocationPhaseId` INTEGER NOT NULL,
    `propertyLocationBlockId` INTEGER NOT NULL,
    `propertyLocationLotId` INTEGER NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `amount` VARCHAR(255) NOT NULL,
    `code` VARCHAR(255) NOT NULL,
    `location` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `bathrooms` INTEGER NOT NULL DEFAULT 0,
    `bedrooms` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `Property_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Property` ADD CONSTRAINT `Property_propertyTypeId_fkey` FOREIGN KEY (`propertyTypeId`) REFERENCES `PropertyType`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Property` ADD CONSTRAINT `Property_propertyLocationPhaseId_fkey` FOREIGN KEY (`propertyLocationPhaseId`) REFERENCES `PropertyLocationPhase`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Property` ADD CONSTRAINT `Property_propertyLocationBlockId_fkey` FOREIGN KEY (`propertyLocationBlockId`) REFERENCES `PropertyLocationBlock`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Property` ADD CONSTRAINT `Property_propertyLocationLotId_fkey` FOREIGN KEY (`propertyLocationLotId`) REFERENCES `PropertyLocationLot`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
