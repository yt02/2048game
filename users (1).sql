-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 05, 2025 at 02:42 PM
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
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
