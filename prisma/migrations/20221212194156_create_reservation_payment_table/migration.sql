-- CreateTable
CREATE TABLE `ReservationPayment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `reservationId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `status` ENUM('Approved', 'Rejected', 'Pending') NOT NULL DEFAULT 'Pending',
    `amount` VARCHAR(191) NOT NULL,
    `reason` VARCHAR(191) NULL,
    `otherReason` VARCHAR(191) NULL,
    `otherReasonDetails` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ReservationPayment` ADD CONSTRAINT `ReservationPayment_reservationId_fkey` FOREIGN KEY (`reservationId`) REFERENCES `Reservation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReservationPayment` ADD CONSTRAINT `ReservationPayment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
