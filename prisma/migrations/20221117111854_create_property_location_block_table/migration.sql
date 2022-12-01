-- CreateTable
CREATE TABLE `PropertyLocationBlock` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(128) NOT NULL,
    `display` VARCHAR(128) NOT NULL,
    `description` TEXT NULL,

    UNIQUE INDEX `PropertyLocationBlock_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
