-- CreateTable
CREATE TABLE `ReservationPaymentImage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `reservationPaymentId` INTEGER NOT NULL,
    `url` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ReservationPaymentImage` ADD CONSTRAINT `ReservationPaymentImage_reservationPaymentId_fkey` FOREIGN KEY (`reservationPaymentId`) REFERENCES `ReservationPayment`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
