-- phpMyAdmin SQL Dump
-- version 5.2.1deb3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jan 15, 2025 at 03:54 PM
-- Server version: 10.11.7-MariaDB-4
-- PHP Version: 8.2.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `xcelzs`
--

-- --------------------------------------------------------

--
-- Table structure for table `Availabilities`
--

CREATE TABLE `Availabilities` (
  `id` int(11) NOT NULL,
  `start_time` datetime NOT NULL,
  `end_time` datetime NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Availabilities`
--

INSERT INTO `Availabilities` (`id`, `start_time`, `end_time`, `createdAt`, `updatedAt`, `userId`) VALUES
(119, '2025-01-01 10:00:00', '2025-01-01 11:00:00', '2025-01-01 10:00:00', '2025-01-01 10:00:00', 1),
(120, '2025-01-01 11:00:00', '2025-01-01 12:00:00', '2025-01-01 10:15:00', '2025-01-01 10:15:00', 1),
(121, '2025-01-02 13:00:00', '2025-01-02 14:00:00', '2025-01-02 13:00:00', '2025-01-02 13:00:00', 1),
(122, '2025-01-02 14:00:00', '2025-01-02 15:00:00', '2025-01-02 13:30:00', '2025-01-02 13:30:00', 1),
(123, '2025-01-05 09:00:00', '2025-01-05 10:00:00', '2025-01-05 09:00:00', '2025-01-05 09:00:00', 1),
(124, '2025-01-05 10:00:00', '2025-01-05 11:00:00', '2025-01-05 09:15:00', '2025-01-05 09:15:00', 1),
(125, '2025-01-07 14:00:00', '2025-01-07 15:00:00', '2025-01-07 14:00:00', '2025-01-07 14:00:00', 1),
(126, '2025-01-07 15:00:00', '2025-01-07 16:00:00', '2025-01-07 14:30:00', '2025-01-07 14:30:00', 1),
(127, '2025-01-10 16:00:00', '2025-01-10 17:00:00', '2025-01-10 16:00:00', '2025-01-10 16:00:00', 1),
(128, '2025-01-10 17:00:00', '2025-01-10 18:00:00', '2025-01-10 16:15:00', '2025-01-10 16:15:00', 1),
(129, '2025-01-12 08:30:00', '2025-01-12 09:30:00', '2025-01-12 08:30:00', '2025-01-12 08:30:00', NULL),
(130, '2025-01-12 09:30:00', '2025-01-12 10:30:00', '2025-01-12 08:45:00', '2025-01-12 08:45:00', 1),
(131, '2025-01-14 13:00:00', '2025-01-14 14:00:00', '2025-01-14 13:00:00', '2025-01-14 13:00:00', 1),
(132, '2025-01-14 14:00:00', '2025-01-14 15:00:00', '2025-01-14 13:15:00', '2025-01-14 13:15:00', 1),
(133, '2025-01-16 10:30:00', '2025-01-16 11:30:00', '2025-01-16 10:30:00', '2025-01-16 10:30:00', 1),
(134, '2025-01-16 11:30:00', '2025-01-16 12:30:00', '2025-01-16 10:45:00', '2025-01-16 10:45:00', 1),
(135, '2025-01-18 14:00:00', '2025-01-18 15:00:00', '2025-01-18 14:00:00', '2025-01-18 14:00:00', 1),
(136, '2025-01-18 15:00:00', '2025-01-18 16:00:00', '2025-01-18 14:30:00', '2025-01-18 14:30:00', 1),
(137, '2025-01-20 09:00:00', '2025-01-20 10:00:00', '2025-01-20 09:00:00', '2025-01-20 09:00:00', 1),
(138, '2025-01-20 10:00:00', '2025-01-20 11:00:00', '2025-01-20 09:15:00', '2025-01-20 09:15:00', 1);

-- --------------------------------------------------------

--
-- Table structure for table `Meetings`
--

CREATE TABLE `Meetings` (
  `id` int(11) NOT NULL,
  `start_time` datetime NOT NULL,
  `end_time` datetime NOT NULL,
  `topic` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Meetings`
--

INSERT INTO `Meetings` (`id`, `start_time`, `end_time`, `topic`, `createdAt`, `updatedAt`, `userId`) VALUES
(3, '2025-01-15 10:00:00', '2025-01-15 11:00:00', 'Team Talk', '2025-01-14 12:15:09', '2025-01-15 12:15:54', 1),
(4, '2025-01-15 10:00:00', '2025-01-15 11:00:00', 'sprint Discussion', '2025-01-14 13:47:03', '2025-01-14 13:47:03', 1),
(5, '2025-01-15 10:00:00', '2025-01-15 11:00:00', 'new schedule', '2025-01-15 09:47:54', '2025-01-15 09:47:54', 1),
(6, '2025-01-15 09:59:00', '2025-01-15 12:04:00', 'no good news', '2025-01-15 09:59:37', '2025-01-15 09:59:37', 1),
(7, '2025-01-15 11:57:30', '2025-01-15 11:57:30', 'new message', '2025-01-15 12:59:20', '2025-01-15 12:59:20', 1),
(9, '2025-01-15 11:57:30', '2025-01-15 11:57:30', 'testing', '2025-01-15 13:15:13', '2025-01-15 13:15:13', 1);

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`id`, `name`, `email`, `createdAt`, `updatedAt`) VALUES
(1, 'sadick issaka', 'issakasaddick14@gmail.com', '2025-01-14 11:54:04', '2025-01-14 11:54:04');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Availabilities`
--
ALTER TABLE `Availabilities`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `Meetings`
--
ALTER TABLE `Meetings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Availabilities`
--
ALTER TABLE `Availabilities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=139;

--
-- AUTO_INCREMENT for table `Meetings`
--
ALTER TABLE `Meetings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Availabilities`
--
ALTER TABLE `Availabilities`
  ADD CONSTRAINT `Availabilities_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `Meetings`
--
ALTER TABLE `Meetings`
  ADD CONSTRAINT `Meetings_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
