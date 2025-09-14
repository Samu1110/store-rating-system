-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Sep 14, 2025 at 07:38 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `roxiler_task1`
--

-- --------------------------------------------------------

--
-- Table structure for table `ratings`
--

CREATE TABLE `ratings` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `store_id` int(11) DEFAULT NULL,
  `rating` int(11) DEFAULT NULL CHECK (`rating` between 1 and 5)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ratings`
--

INSERT INTO `ratings` (`id`, `user_id`, `store_id`, `rating`) VALUES
(1, 1, 1, 5),
(22, 1, 2, 3),
(23, 1, 3, 4),
(24, 5, 1, 3),
(25, 5, 2, 2),
(28, 5, 3, 1),
(29, 12, 1, 2),
(30, 12, 2, 4),
(31, 17, 3, 3),
(32, 17, 9, 4),
(35, 17, 4, 3),
(41, 5, 13, 4);

-- --------------------------------------------------------

--
-- Table structure for table `stores`
--

CREATE TABLE `stores` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `address` varchar(400) DEFAULT NULL,
  `owner_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `stores`
--

INSERT INTO `stores` (`id`, `name`, `address`, `owner_id`) VALUES
(1, 'sam\'s stationary', 'kolhapur', 2),
(2, 'shara stationary', 'kolhapur', 2),
(3, 'sh stationary', 'karad', 2),
(4, 'store', 'kop', 16),
(6, 'jaee', 'kop', 16),
(7, 'astore', 'kop', 16),
(8, 'jsss store', 'karuaa', 2),
(9, 'mmmsss store', 'karuaa', 15),
(10, 'kkkksss store', 'karuaanaa', 16),
(11, 'samu\'s', 'kolhapur', 2),
(12, 'samu\'s', 'kolhapur', 2),
(13, 'samuuu\'s', 'karad', 18);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(60) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `address` varchar(400) DEFAULT NULL,
  `role` enum('ADMIN','USER','STORE_OWNER') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `address`, `role`) VALUES
(1, 'sample12312345665434', 'sam@example.com', '$2b$10$hxfQfvXDwjjT63Dp/uqAkecTO9qmywF3Y/./3B6RPns0w5WQ.BDLq', 'kolhapur', 'USER'),
(2, 'samruddhi1234567890', 'sam@sample.com', '$2b$10$gM/D44GgXE/nnBdysQw9Z.gyv7JrYfJCFk5DeTDth7B65v/1oCkLK', 'kolhapur', 'STORE_OWNER'),
(3, 'sharvilmithari', 'sharvil@sample.com', '$2b$10$Dzb1Grh55JzzZV3N2edrv.SQffwuY258Fo8vprbgUTlkmeeyC736e', 'kop', 'ADMIN'),
(4, 'sami', 'sami@sample.com', '$2b$10$u/RR8bh9L5ikdCIwspLR2.nIitDBzBBSuWF0vCTq.CtoF5yqKFbU2', 'kop', 'ADMIN'),
(5, 'rox9876543210987654321', 'rox@example.com', '$2b$10$cYahsOns/W/cA0O6MfGYwul3.5ROsKRA.i6HJVi48Oaspx9ZIkIb.', 'kol', 'USER'),
(7, 'sa', 'sami@sample1.com', '$2b$10$Iwys71O19maqAaLOEF5L..cTxcyqRjliIOaypRJJRYLpl8o4vZNoG', '', 'USER'),
(8, 'komal  ashok mahajan', 'komal234@gmail.com', '$2b$10$yfuLEILhbZJ/s/zaWYaT8uOCfnRsbCPQ/Zd8D0jaDzlBsdZQebJgm', 'palus', 'USER'),
(9, 'komal ashok mahajann', 'komal23@gmail.com', '$2b$10$bUdPSdcGO59v0CRoxVANV.ZKQJmnR7WyzCBoJGUf7WmK86SoSebha', 'palus', 'USER'),
(10, 'jaee sanjay shelarrrrrrr', 'jaee@gmail.com', '$2b$10$L6/Ne4gTytjpc30eFDKxCO8pjJfJ87/6ExLEtq9T1nKJ8KYbqf/we', 'karad', 'USER'),
(12, 'jaeeeeeee sanjay shelar', 'jaee1@gmail.com', '$2b$10$q0e52vmgOHTGEroOEgA2h.PRHijrw2spDH80Dk83wrGDzaXgqX83a', 'karad', 'USER'),
(14, 'komallllllllllllllllllllll', 'komal2345@gmail.com', '$2b$10$CKp3mulR6rxGmedqIvtaUexNwjwN4L0tJl7ISGqwcJfgEcUF2wm4u', 'palus', 'USER'),
(15, 'mssss', 'ssmmm1@example.com', '$2b$10$S2qlrhdSzP1jBGLXfAP.q.aXo2QARi6d71aqluM9SwZQEEVXqk/4O', 'karuaa', 'STORE_OWNER'),
(16, 'kssss', 'sskkk@example.com', '$2b$10$3AMQ3Qvlt1IQCqszi1O3GuQZVTc04zYfVgBxi.ReEHDd3UQqLFiFW', 'karuaanaa', 'STORE_OWNER'),
(17, 'sadhana deepak mithari', 'sadhana@sample.com', '$2b$10$lmmB0HpxGxXR7s.3ljf8WO1m7ZPh59WGjlIa0DqbEQqoxp2kxk4gG', 'kolkata', 'USER'),
(18, 'samuuu', 'samuuu@sammm.gmail.com', '$2b$10$vJYClqFk5LVXWC/eZDHC9OVd9Qn5PufZsT2b9HyT06WCBbRPhwC3y', 'karad', 'STORE_OWNER'),
(19, 'samruddhi deepak mithari', 'samruddhi@gmail.com', '$2b$10$ELBY9Awi//cN31/QkzQ0b.KBGxyRzjAhO0q4nf4lCYx/Tqcca3Wuy', 'kale', 'USER'),
(20, 'shaurya shivprasad mithari', 'shaurya@sample.com', '$2b$10$2tmsBovbJIP/BDIWEPw4geou0zcR4lFbcYzeumTPGND0jKBwX794i', 'kolhapur', 'ADMIN');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ratings`
--
ALTER TABLE `ratings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`,`store_id`),
  ADD KEY `store_id` (`store_id`);

--
-- Indexes for table `stores`
--
ALTER TABLE `stores`
  ADD PRIMARY KEY (`id`),
  ADD KEY `owner_id` (`owner_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ratings`
--
ALTER TABLE `ratings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `stores`
--
ALTER TABLE `stores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `ratings`
--
ALTER TABLE `ratings`
  ADD CONSTRAINT `ratings_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `ratings_ibfk_2` FOREIGN KEY (`store_id`) REFERENCES `stores` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `stores`
--
ALTER TABLE `stores`
  ADD CONSTRAINT `stores_ibfk_1` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
