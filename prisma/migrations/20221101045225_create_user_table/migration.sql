-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(128) NOT NULL,
    `middleName` VARCHAR(128) NULL,
    `lastName` VARCHAR(128) NOT NULL,
    `email` VARCHAR(128) NOT NULL,
    `username` VARCHAR(128) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `hasTemporaryPassword` BOOLEAN NOT NULL DEFAULT true,
    `role` ENUM('Admin', 'Staff', 'Tenant') NOT NULL DEFAULT 'Tenant',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
