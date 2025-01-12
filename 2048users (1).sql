-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 05, 2025 at 02:45 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `2048users`
--

-- --------------------------------------------------------

--
-- Table structure for table `cartoon_leaderboard`
--

CREATE TABLE `cartoon_leaderboard` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `score` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cartoon_leaderboard`
--

INSERT INTO `cartoon_leaderboard` (`id`, `username`, `score`, `created_at`) VALUES
(1, 'yt', 812, '2024-12-07 06:58:21'),
(2, 'yt', 3244, '2024-12-07 07:12:26'),
(3, 'yt', 2976, '2024-12-07 07:29:01'),
(4, 'yt', 5424, '2024-12-07 07:54:40'),
(5, 'yt', 7084, '2024-12-07 08:24:00'),
(6, 'yt', 5384, '2024-12-07 09:57:19'),
(7, 'yt', 5268, '2024-12-07 11:30:28'),
(8, 'yt', 5716, '2024-12-07 11:53:20'),
(9, 'yt', 10468, '2024-12-07 12:11:50'),
(10, 'yt', 2492, '2024-12-07 13:51:36'),
(11, 'yt', 3264, '2024-12-07 14:01:08'),
(12, 'yt', 5592, '2024-12-07 14:17:40'),
(13, 'yt', 3200, '2024-12-07 16:16:24'),
(14, 'yt', 1104, '2024-12-07 16:20:35'),
(15, 'yt', 5288, '2024-12-07 16:26:18'),
(16, 'yt', 4516, '2024-12-07 16:33:03'),
(17, 'yt123', 1500, '2024-12-18 06:16:59'),
(18, 'yt123', 3108, '2024-12-18 06:20:50'),
(19, 'yt123', 6412, '2024-12-18 06:27:14'),
(20, 'yt123', 1332, '2024-12-18 06:29:13'),
(21, 'yt123', 4744, '2024-12-18 06:33:27'),
(22, 'yt123', 6840, '2024-12-18 06:40:20'),
(23, 'yt123', 2024, '2024-12-18 06:43:43'),
(24, 'yt123', 3272, '2024-12-18 06:48:53'),
(25, 'yt123', 3108, '2024-12-18 06:51:54'),
(26, 'yt123', 3340, '2024-12-18 06:55:08'),
(27, 'yt123', 7084, '2024-12-18 07:11:22'),
(28, 'yt123', 3112, '2024-12-18 09:00:27'),
(29, 'yt123', 7020, '2024-12-18 09:07:42'),
(30, 'yt123', 5680, '2024-12-18 09:14:00'),
(31, 'yt123', 3100, '2024-12-18 09:17:57'),
(32, 'yt123', 3320, '2024-12-18 09:34:18'),
(33, 'yt123', 5216, '2024-12-18 09:40:54'),
(34, 'yt123', 9788, '2024-12-18 10:59:33'),
(35, 'uu', 7060, '2024-12-18 15:38:50'),
(36, 'uu', 5648, '2024-12-18 15:44:55'),
(37, 'uu', 1396, '2024-12-18 15:47:06'),
(38, 'uu', 1904, '2024-12-18 15:49:37'),
(39, 'uu', 7232, '2024-12-18 15:56:42'),
(40, 'uu', 6988, '2024-12-18 16:03:42'),
(41, 'uu', 7168, '2024-12-18 16:14:00'),
(42, 'uu', 6816, '2024-12-18 16:20:37'),
(43, 'uu', 3428, '2024-12-19 01:21:32'),
(44, 'uu', 5180, '2024-12-19 01:27:40'),
(45, 'yt123', 3024, '2024-12-20 08:14:19'),
(46, 'yt123', 4652, '2024-12-20 08:25:00'),
(47, 'yt123', 1604, '2024-12-20 08:27:13'),
(48, 'yt123', 5632, '2024-12-20 08:31:40'),
(49, 'yt123', 5468, '2024-12-20 08:36:47'),
(50, 'yt123', 5756, '2024-12-20 14:37:34'),
(51, 'yt123', 6916, '2024-12-20 16:47:22'),
(52, 'yy3333', 7396, '2024-12-20 17:19:20'),
(53, 'yy3333', 2612, '2024-12-20 17:23:01'),
(54, 'yy3333', 7604, '2024-12-20 17:31:21'),
(55, 'yy22222', 2604, '2024-12-21 06:00:20'),
(56, 'yt123', 5508, '2024-12-23 13:00:16'),
(57, 'yt123', 6860, '2024-12-23 13:09:33'),
(58, 'uu', 2588, '2024-12-30 01:10:00');

-- --------------------------------------------------------

--
-- Table structure for table `challenge_leaderboard`
--

CREATE TABLE `challenge_leaderboard` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `score` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `challenge_leaderboard`
--

INSERT INTO `challenge_leaderboard` (`id`, `username`, `score`, `created_at`) VALUES
(1, 'yt', 2936, '2024-12-06 16:07:21'),
(2, 'yt', 696, '2024-12-06 16:37:07'),
(8, 'yt', 840, '2024-12-06 16:39:02'),
(9, 'yt', 168, '2024-12-06 16:43:25'),
(11, 'yt', 396, '2024-12-06 16:43:55'),
(13, 'yt', 796, '2024-12-06 16:44:56'),
(16, 'yt', 436, '2024-12-06 16:50:47'),
(18, 'yt', 244, '2024-12-06 16:51:05'),
(22, 'yt', 252, '2024-12-06 17:03:28'),
(26, 'yt', 960, '2024-12-06 17:09:20'),
(28, 'yt', 972, '2024-12-06 17:10:16'),
(29, 'yt', 1068, '2024-12-06 17:11:13'),
(30, 'yt', 504, '2024-12-06 17:12:11'),
(31, 'yt', 676, '2024-12-06 17:12:26'),
(36, 'yt', 1100, '2024-12-07 06:46:08'),
(39, 'yt', 456, '2024-12-07 06:50:15'),
(40, 'yt', 400, '2024-12-07 16:10:39'),
(41, 'yt123', 416, '2024-12-20 08:19:49'),
(42, 'yt123', 1148, '2024-12-20 08:20:24'),
(43, 'yt123', 1932, '2024-12-20 08:20:57'),
(44, 'yy3333', 0, '2024-12-20 17:33:18'),
(45, 'yy3333', 2776, '2024-12-20 17:33:56'),
(46, 'yy3333', 1848, '2024-12-20 17:35:02'),
(47, 'yy3333', 0, '2024-12-20 17:35:05'),
(48, 'yy3333', 0, '2024-12-20 17:37:29'),
(49, 'yy3333', 0, '2024-12-20 17:38:21'),
(50, 'yy3333', 992, '2024-12-20 17:38:53'),
(51, 'yy3333', 2104, '2024-12-20 17:39:25'),
(52, 'yy3333', 344, '2024-12-20 17:39:59'),
(53, 'yy3333', 0, '2024-12-20 17:43:12'),
(54, 'yy3333', 1288, '2024-12-20 17:48:04'),
(55, 'yy3333', 216, '2024-12-20 17:49:01'),
(56, 'yy3333', 856, '2024-12-20 17:50:08'),
(57, 'yy3333', 616, '2024-12-20 17:50:47'),
(58, 'yy3333', 1416, '2024-12-20 17:53:33'),
(59, 'yy3333', 1324, '2024-12-20 17:54:27'),
(60, 'yy3333', 2304, '2024-12-20 17:55:24'),
(61, 'yy3333', 0, '2024-12-20 17:59:07'),
(62, 'yy3333', 1568, '2024-12-20 17:59:22'),
(63, 'yy3333', 0, '2024-12-20 17:59:25'),
(64, 'yy3333', 0, '2024-12-20 17:59:27'),
(65, 'yy3333', 1484, '2024-12-20 18:01:10'),
(66, 'yy3333', 0, '2024-12-20 18:01:12'),
(67, 'yy3333', 0, '2024-12-20 18:01:15'),
(68, 'yy3333', 1448, '2024-12-20 18:01:35'),
(69, 'yy3333', 0, '2024-12-20 18:01:39'),
(70, 'yy3333', 0, '2024-12-20 18:03:14'),
(71, 'yy3333', 568, '2024-12-20 18:03:26'),
(72, 'yy3333', 0, '2024-12-20 18:03:28'),
(73, 'yy3333', 1392, '2024-12-20 18:03:44'),
(74, 'yy3333', 0, '2024-12-20 18:03:46'),
(75, 'yy3333', 0, '2024-12-20 18:05:31'),
(76, 'yy3333', 1664, '2024-12-20 18:05:45'),
(77, 'yy3333', 0, '2024-12-20 18:05:47'),
(78, 'yy3333', 0, '2024-12-20 18:05:48'),
(79, 'yy3333', 2132, '2024-12-20 18:07:30'),
(80, 'yy3333', 0, '2024-12-20 18:07:32'),
(81, 'yy3333', 2372, '2024-12-20 18:09:26'),
(82, 'yy3333', 0, '2024-12-20 18:10:45'),
(83, 'yy3333', 1644, '2024-12-20 18:11:00'),
(84, 'yy3333', 0, '2024-12-20 18:11:03'),
(85, 'yy3333', 0, '2024-12-20 18:11:04'),
(86, 'yy3333', 0, '2024-12-20 18:11:38'),
(87, 'yy3333', 3048, '2024-12-20 18:12:49'),
(88, 'yy3333', 0, '2024-12-20 18:12:51'),
(89, 'yy3333', 0, '2024-12-20 18:12:52'),
(90, 'yy22222', 1788, '2024-12-21 05:07:26'),
(91, 'yy22222', 0, '2024-12-21 05:07:28'),
(92, 'yy22222', 0, '2024-12-21 05:07:29'),
(93, 'yy22222', 1444, '2024-12-21 05:10:55'),
(94, 'yy22222', 0, '2024-12-21 05:11:16'),
(95, 'yy22222', 496, '2024-12-21 05:13:15'),
(96, 'yy22222', 0, '2024-12-21 05:13:18'),
(97, 'yy22222', 0, '2024-12-21 05:14:15'),
(98, 'yy22222', 492, '2024-12-21 05:17:05'),
(99, 'yy22222', 1268, '2024-12-21 05:17:23'),
(100, 'yy22222', 0, '2024-12-21 05:21:51'),
(101, 'yy22222', 668, '2024-12-21 05:22:04'),
(102, 'yy22222', 0, '2024-12-21 05:25:48'),
(103, 'yy22222', 472, '2024-12-21 05:26:20'),
(104, 'yy22222', 348, '2024-12-21 05:26:53'),
(105, 'yy22222', 1364, '2024-12-21 05:27:11'),
(106, 'yy22222', 1280, '2024-12-21 05:28:48'),
(107, 'yy22222', 1276, '2024-12-21 05:30:24'),
(108, 'yy22222', 1308, '2024-12-21 05:30:41'),
(109, 'yy22222', 1452, '2024-12-21 05:30:57'),
(110, 'yy22222', 0, '2024-12-21 05:31:00'),
(111, 'yy22222', 584, '2024-12-21 05:31:11'),
(112, 'yy22222', 1692, '2024-12-21 05:32:17'),
(113, 'yy22222', 4, '2024-12-21 05:32:58'),
(114, 'yy22222', 0, '2024-12-21 05:35:39'),
(115, 'yy22222', 376, '2024-12-21 05:37:21'),
(116, 'yy22222', 0, '2024-12-21 05:37:24'),
(117, 'yy22222', 208, '2024-12-21 05:38:22'),
(118, 'yy22222', 432, '2024-12-21 05:38:59'),
(119, 'yy22222', 1228, '2024-12-21 05:39:32'),
(120, 'yy22222', 792, '2024-12-21 05:40:06'),
(121, 'yy22222', 564, '2024-12-21 05:40:17'),
(122, 'yy22222', 2020, '2024-12-21 05:48:01'),
(123, 'yy22222', 456, '2024-12-21 05:56:41'),
(124, 'yy22222', 1460, '2024-12-21 05:57:00'),
(125, 'yy22222', 1076, '2024-12-21 06:00:41'),
(126, 'yy22222', 2440, '2024-12-21 06:02:35'),
(127, 'yy22222', 0, '2024-12-21 06:02:37'),
(128, 'yy22222', 0, '2024-12-21 06:02:39'),
(129, 'yy22222', 0, '2024-12-21 06:02:40'),
(130, 'yy22222', 0, '2024-12-21 06:02:41'),
(131, 'yy22222', 0, '2024-12-21 06:02:41'),
(132, 'yy22222', 0, '2024-12-21 06:02:42'),
(133, 'yy22222', 0, '2024-12-21 06:02:43'),
(134, 'yy22222', 624, '2024-12-21 06:03:42'),
(135, 'yy22222', 2104, '2024-12-21 06:04:27'),
(136, 'yy22222', 1060, '2024-12-21 06:05:12'),
(137, 'yy22222', 2664, '2024-12-21 06:08:51'),
(138, 'yy22222', 2620, '2024-12-21 07:35:52'),
(139, 'yy22222', 960, '2024-12-21 07:37:42'),
(140, 'yy22222', 648, '2024-12-21 07:38:15'),
(141, 'yy22222', 1224, '2024-12-21 07:39:17'),
(142, 'yy22222', 1108, '2024-12-21 07:43:36'),
(143, 'yy22222', 460, '2024-12-21 07:43:49'),
(144, 'yy22222', 1088, '2024-12-21 07:44:51'),
(145, 'yy22222', 2804, '2024-12-21 07:46:18'),
(146, 'yt123', 2288, '2024-12-21 12:05:50'),
(147, 'yt123', 2104, '2024-12-21 12:06:52'),
(148, 'yt123', 2252, '2024-12-21 12:07:54'),
(149, 'yt123', 1436, '2024-12-21 12:08:34');

-- --------------------------------------------------------

--
-- Table structure for table `leaderboard`
--

CREATE TABLE `leaderboard` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `score` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `leaderboard`
--

INSERT INTO `leaderboard` (`id`, `username`, `score`, `date`) VALUES
(1, 'yt', 1612, '2024-12-04 08:42:40'),
(3, 'yt', 2508, '2024-12-04 09:38:03'),
(5, 'yt', 6408, '2024-12-04 13:16:49'),
(7, 'yt', 600, '2024-12-04 13:19:12'),
(9, 'uu', 1412, '2024-12-04 13:41:13'),
(11, 'uu', 2300, '2024-12-04 13:47:35'),
(13, 'uu', 3052, '2024-12-04 13:48:07'),
(15, 'uu', 1984, '2024-12-04 13:55:29'),
(16, 'uu', 2276, '2024-12-04 13:56:51'),
(17, 'uu', 976, '2024-12-04 13:58:15'),
(18, 'yt', 824, '2024-12-04 14:09:34'),
(19, 'uu', 892, '2024-12-04 17:30:52'),
(20, 'yt', 3196, '2024-12-05 01:17:28'),
(21, 'yt', 5364, '2024-12-05 02:08:50'),
(22, 'testing', 6372, '2024-12-05 02:46:38'),
(23, 'yt', 5356, '2024-12-06 08:21:18'),
(24, 'yt', 708, '2024-12-06 10:30:19'),
(25, 'yt', 1224, '2024-12-06 10:30:40'),
(26, 'yt', 620, '2024-12-06 10:33:11'),
(27, 'yt', 1396, '2024-12-06 15:43:31'),
(28, 'yt', 3056, '2024-12-06 15:44:12'),
(30, 'yt', 1736, '2024-12-06 16:25:00'),
(31, 'yt', 624, '2024-12-07 06:58:00'),
(33, 'yt', 12188, '2024-12-07 16:06:08'),
(34, 'uu', 2920, '2024-12-12 04:08:27'),
(35, 'uu', 1016, '2024-12-18 13:17:47'),
(36, 'yt123', 3120, '2024-12-20 14:59:31'),
(37, 'yy22222', 2820, '2024-12-21 07:36:24'),
(38, 'yt123', 2956, '2024-12-21 14:33:52'),
(39, 'yt123', 2320, '2024-12-21 14:37:41'),
(40, 'yt123', 5656, '2024-12-23 09:32:25'),
(41, 'yt123', 3344, '2024-12-23 13:48:39'),
(42, 'yt123', 2704, '2024-12-23 13:51:49'),
(43, 'yt123', 7152, '2024-12-23 13:58:37'),
(44, 'uu', 3168, '2024-12-23 15:10:52'),
(45, 'uu', 7120, '2024-12-23 15:17:37'),
(46, 'uu', 6548, '2024-12-23 15:23:33');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `profile_picture` varchar(255) DEFAULT 'assets/default.png'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `profile_picture`) VALUES
(1, 'yt', '', '$2y$10$FhNfptV3xHkw3AaHh2jome9twHWrR0UOMej.gwFs1iWZWC0.YMuGS', 'images/default.png'),
(2, 'uu', 'uu@gmail.com', '$2y$10$9U3gUDNmiyvtynmXNHBWk.khAwdRg./ezNWzjWjtzmym4RGi1qCYa', 'images/nacht-ueber-grindelwald-i-02c2504f-b99b-443f-a13b-486896ca4767.jpg'),
(3, 'pp', '', '$2y$10$KzkRKvrxKMzHHxr7AknsHugxUB2pt6cErtoWD9Gy6sqEdj1IhHj06', 'images/default.png'),
(4, 'testing', '', '$2y$10$DbKRBfMFtRkP5w0WV1Ja/OmyZNF5sUD4JA9okHQc8rz41weU2Zzuq', 'images/default.png'),
(5, 'yeethong', '', '$2y$10$EyOf0unwCYWxlSsfF19LT.5P54GbrFCstCsyh1DTACAUttKvgYh1G', 'images/default.png'),
(6, 'yyyyy', '', '$2y$10$GH0a.Ut.nDTtAulrYj31xO.6lPs6vl9k2A.BpFTYERmvA2N9/SD7a', 'images/default.png'),
(7, 'oooo', 'oo@gmail.com', '$2y$10$BHHSecVzbP6HWyXg7r5gO.3CRs.dF56D/EWK1kDOPfbx4AcDlKIu.', 'images/default.png'),
(8, 'yt123', 'yt123@gmail.com', '$2y$10$sRS72gxsW9zZtJfRIYoQde.DHfdh4BifMYmLVya0YadsP3mx8pbn6', 'images/Screenshot 2022-12-27 165827.png'),
(10, 'yt1111', 'yt1111@gmail.com', '$2y$10$COkSdg3Fw7eqbyf5Gep5oOydaEzj56aC116uU.NIC4xx/OpVObolO', 'images/default.png'),
(11, 'yy22222', 'yy22222@gmail.com', '$2y$10$slFgP6fkOQrwT8ABH.W2yOGiVqukVgSVqYBTjHxAScs8c9s7drTxO', 'images/default.png'),
(12, 'yy3333', 'yy3333@gmail.com', '$2y$10$uazMKYXXbU7QBuvW3GVtRu6vpFCEtpmBPnUothTKc54PqmLiTM7hi', 'images/Screenshot 2024-12-07 104051.png');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cartoon_leaderboard`
--
ALTER TABLE `cartoon_leaderboard`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `challenge_leaderboard`
--
ALTER TABLE `challenge_leaderboard`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `leaderboard`
--
ALTER TABLE `leaderboard`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cartoon_leaderboard`
--
ALTER TABLE `cartoon_leaderboard`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT for table `challenge_leaderboard`
--
ALTER TABLE `challenge_leaderboard`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=150;

--
-- AUTO_INCREMENT for table `leaderboard`
--
ALTER TABLE `leaderboard`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
