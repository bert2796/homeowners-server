-- CreateTable
CREATE TABLE `LeasePaymentImage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `leasePaymentId` INTEGER NOT NULL,
    `url` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `LeasePaymentImage` ADD CONSTRAINT `LeasePaymentImage_leasePaymentId_fkey` FOREIGN KEY (`leasePaymentId`) REFERENCES `LeasePayment`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
