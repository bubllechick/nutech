-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Waktu pembuatan: 08 Des 2024 pada 20.43
-- Versi server: 10.4.28-MariaDB
-- Versi PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `test_nutech`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `balance`
--

CREATE TABLE `balance` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `balance` int(11) NOT NULL,
  `idMembership` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `balance`
--

INSERT INTO `balance` (`id`, `balance`, `idMembership`, `createdAt`, `updatedAt`) VALUES
('c1bbc4f0-1543-45fd-904c-ebef04bc8d1a', 650000, 'f346b29c-f78a-46b9-b71c-e188cafca258', '2024-12-08 03:08:01', '2024-12-09 02:34:23');

-- --------------------------------------------------------

--
-- Struktur dari tabel `banner`
--

CREATE TABLE `banner` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `banner_name` varchar(255) NOT NULL,
  `banner_image` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `banner`
--

INSERT INTO `banner` (`id`, `banner_name`, `banner_image`, `description`, `createdAt`, `updatedAt`) VALUES
('4d056db0-87f4-4a57-9880-e2fde69f0af6', 'Banner 1', 'https://nutech-integrasi.app/dummy.jpg', 'Lerem Ipsum Dolor sit amet', '2024-12-08 01:31:55', '2024-12-08 01:31:55'),
('82577f8a-363a-4ee1-ae7a-e878c165645c', 'Banner 4', 'https://nutech-integrasi.app/dummy.jpg', 'Lerem Ipsum Dolor sit amet', '2024-12-08 01:31:55', '2024-12-08 01:31:55'),
('b6f179e4-9588-4429-bfd8-a6f5c7bac742', 'Banner 5', 'https://nutech-integrasi.app/dummy.jpg', 'Lerem Ipsum Dolor sit amet', '2024-12-08 01:31:55', '2024-12-08 01:31:55'),
('ce9410f7-6f57-41ca-8bbb-c6a3b61f8570', 'Banner 6', 'https://nutech-integrasi.app/dummy.jpg', 'Lerem Ipsum Dolor sit amet', '2024-12-08 01:31:55', '2024-12-08 01:31:55'),
('e20cabaa-e5d9-4bee-ba6d-1f3e52537b25', 'Banner 3', 'https://nutech-integrasi.app/dummy.jpg', 'Lerem Ipsum Dolor sit amet', '2024-12-08 01:31:55', '2024-12-08 01:31:55'),
('f453448e-22e7-487c-964d-66058d90ff40', 'Banner 2', 'https://nutech-integrasi.app/dummy.jpg', 'Lerem Ipsum Dolor sit amet', '2024-12-08 01:31:55', '2024-12-08 01:31:55');

-- --------------------------------------------------------

--
-- Struktur dari tabel `membership`
--

CREATE TABLE `membership` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `profile_image` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `membership`
--

INSERT INTO `membership` (`id`, `first_name`, `last_name`, `email`, `password`, `profile_image`, `createdAt`, `updatedAt`) VALUES
('f346b29c-f78a-46b9-b71c-e188cafca258', 'User Edited', 'Nutech Edited', 'user@nutech-integrasi.com', 'YWJjZGVmMTIzNA==', 'https://res.cloudinary.com/dhhszhpdk/image/upload/v1733601002/profile_image/profile_images/1733600999785-Screenshot_1729103115.png.png', '2024-12-08 01:31:55', '2024-12-08 02:50:02');

-- --------------------------------------------------------

--
-- Struktur dari tabel `services`
--

CREATE TABLE `services` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `service_code` varchar(255) NOT NULL,
  `service_name` varchar(255) NOT NULL,
  `service_icon` varchar(255) NOT NULL,
  `service_tariff` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `services`
--

INSERT INTO `services` (`id`, `service_code`, `service_name`, `service_icon`, `service_tariff`, `createdAt`, `updatedAt`) VALUES
('12ad72e7-df21-45ed-bb0f-4689da2de5cd', 'PGN', 'PGN Berlangganan', 'https://nutech-integrasi.app/dummy.jpg', 50000, '2024-12-08 01:31:55', '2024-12-08 01:31:55'),
('305157a5-c6c1-4f02-a174-9f3f8a15ed6f', 'PLN', 'Listrik', 'https://nutech-integrasi.app/dummy.jpg', 10000, '2024-12-08 01:31:55', '2024-12-08 01:31:55'),
('8604cf0f-7e6b-48db-8b51-f5616ebe70db', 'QURBAN', 'Qurban', 'https://nutech-integrasi.app/dummy.jpg', 200000, '2024-12-08 01:31:55', '2024-12-08 01:31:55'),
('aa7810ca-07ad-4627-b4b4-6a185c223455', 'ZAKAT', 'Zakat', 'https://nutech-integrasi.app/dummy.jpg', 300000, '2024-12-08 01:31:55', '2024-12-08 01:31:55'),
('b5777ed2-a8a4-407f-8240-d3fa9995d0e0', 'PDAM', 'PDAM Berlangganan', 'https://nutech-integrasi.app/dummy.jpg', 40000, '2024-12-08 01:31:55', '2024-12-08 01:31:55'),
('c16c1f8a-eaef-48c3-ad8a-1f878a8dac4d', 'VOUCHER_GAME', 'Voucher Game', 'https://nutech-integrasi.app/dummy.jpg', 100000, '2024-12-08 01:31:55', '2024-12-08 01:31:55'),
('d2306ad7-098e-4c08-a725-9f88d1e82f21', 'PAKET_DATA', 'Paket data', 'https://nutech-integrasi.app/dummy.jpg', 50000, '2024-12-08 01:31:55', '2024-12-08 01:31:55'),
('d7a20ac8-3b90-4065-8c22-c05780a139f9', 'MUSIK', 'Musik Berlangganan', 'https://nutech-integrasi.app/dummy.jpg', 50000, '2024-12-08 01:31:55', '2024-12-08 01:31:55'),
('d8538df3-816a-4263-a0e4-cab2959b4dc7', 'VOUCHER_MAKANAN', 'Voucher Makanan', 'https://nutech-integrasi.app/dummy.jpg', 100000, '2024-12-08 01:31:55', '2024-12-08 01:31:55'),
('dfbd5ea3-c9f0-4f69-9f5f-0d28f22f96d8', 'TV', 'TV Berlangganan', 'https://nutech-integrasi.app/dummy.jpg', 50000, '2024-12-08 01:31:55', '2024-12-08 01:31:55'),
('f1d55993-3ee2-4b4d-88d3-3b1d9c5dfeae', 'PAJAK', 'Pajak PBB', 'https://nutech-integrasi.app/dummy.jpg', 40000, '2024-12-08 01:31:55', '2024-12-08 01:31:55'),
('f42c3306-426d-4e7d-9800-64e9a9f7a7be', 'PULSA', 'Pulsa', 'https://nutech-integrasi.app/dummy.jpg', 40000, '2024-12-08 01:31:55', '2024-12-08 01:31:55');

-- --------------------------------------------------------

--
-- Struktur dari tabel `transaction`
--

CREATE TABLE `transaction` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `invoice_number` varchar(255) NOT NULL,
  `transaction_type` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `total_amount` int(11) NOT NULL,
  `idMembership` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `transaction`
--

INSERT INTO `transaction` (`id`, `invoice_number`, `transaction_type`, `description`, `total_amount`, `idMembership`, `createdAt`, `updatedAt`) VALUES
('17eaa18d-8b2b-4562-b24b-f6567cd950ac', 'INV09122024-004', 'TOPUP', 'Top Up balance', 10000, 'f346b29c-f78a-46b9-b71c-e188cafca258', '2024-12-09 01:56:54', '2024-12-09 01:56:54'),
('6b3efa5b-8423-4490-91b1-4e36f52742ed', 'INV09122024-003', 'TOPUP', 'Top Up balance', 10000, 'f346b29c-f78a-46b9-b71c-e188cafca258', '2024-12-09 01:55:33', '2024-12-09 01:55:33'),
('7019789f-b51c-4d44-9c17-2e4aa6bb781f', 'INV09122024-005', 'PAYMENT', 'Pulsa', 40000, 'f346b29c-f78a-46b9-b71c-e188cafca258', '2024-12-09 02:34:23', '2024-12-09 02:34:23'),
('7590e99e-a844-4cf9-92ad-6f1a51956ce8', 'INV09122024-001', 'TOPUP', 'Top Up balance', 10000, 'f346b29c-f78a-46b9-b71c-e188cafca258', '2024-12-09 01:27:16', '2024-12-09 01:27:16'),
('de6e289f-86c8-4582-ba0d-642d619b079f', 'INV09122024-001', 'TOPUP', 'Top Up balance', 10000, 'f346b29c-f78a-46b9-b71c-e188cafca258', '2024-12-09 01:27:08', '2024-12-09 01:27:08'),
('fbe5ad29-e674-4f70-b903-cc8a429ab297', 'INV09122024-002', 'TOPUP', 'Top Up balance', 10000, 'f346b29c-f78a-46b9-b71c-e188cafca258', '2024-12-09 01:55:30', '2024-12-09 01:55:30');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `balance`
--
ALTER TABLE `balance`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idMembership` (`idMembership`);

--
-- Indeks untuk tabel `banner`
--
ALTER TABLE `banner`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `membership`
--
ALTER TABLE `membership`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `email_2` (`email`),
  ADD UNIQUE KEY `email_3` (`email`),
  ADD UNIQUE KEY `email_4` (`email`),
  ADD UNIQUE KEY `email_5` (`email`),
  ADD UNIQUE KEY `email_6` (`email`);

--
-- Indeks untuk tabel `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `transaction`
--
ALTER TABLE `transaction`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idMembership` (`idMembership`);

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `balance`
--
ALTER TABLE `balance`
  ADD CONSTRAINT `balance_ibfk_1` FOREIGN KEY (`idMembership`) REFERENCES `membership` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `transaction`
--
ALTER TABLE `transaction`
  ADD CONSTRAINT `transaction_ibfk_1` FOREIGN KEY (`idMembership`) REFERENCES `membership` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
