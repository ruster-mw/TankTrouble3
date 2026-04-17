-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 16, 2026 at 09:32 PM
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
-- Database: `tank-trouble3`
--

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `Id_r` int(11) NOT NULL,
  `name` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`Id_r`, `name`) VALUES
(1, 'admin'),
(3, 'moderator'),
(2, 'player');

-- --------------------------------------------------------

--
-- Table structure for table `statistics`
--

CREATE TABLE `statistics` (
  `Id_s` int(11) NOT NULL,
  `Id_u` int(11) NOT NULL,
  `playtime` time DEFAULT NULL,
  `games` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `statistics`
--

INSERT INTO `statistics` (`Id_s`, `Id_u`, `playtime`, `games`) VALUES
(1, 1, '90:40:20', 456),
(2, 19, '100:40:20', 0),
(3, 21, '90:40:20', 0),
(4, 23, '90:40:20', 0),
(5, 24, '90:40:20', 0),
(6, 25, '90:40:20', 0),
(7, 26, '90:40:20', 0),
(8, 27, '90:40:20', 0),
(9, 28, '90:40:20', 0),
(10, 29, '90:40:20', 0),
(11, 31, '90:40:20', 0),
(12, 34, '90:40:20', 0),
(13, 37, '90:40:20', 0),
(14, 38, '90:40:20', 0),
(15, 41, '90:40:20', 0),
(16, 8, '90:40:20', 0),
(17, 43, '90:40:20', 0),
(18, 45, '90:41:36', 8),
(19, 1, '90:40:20', 0),
(20, 47, '90:40:20', 0),
(21, 50, '90:40:20', 0),
(22, 51, '00:00:00', 0),
(23, 52, '20:40:20', 200),
(24, 53, '20:40:20', 200),
(25, 54, '20:40:20', 200),
(26, 55, '20:40:20', 200),
(27, 56, '20:40:20', 200),
(28, 57, '20:40:20', 200),
(29, 58, '20:40:20', 200),
(30, 59, '20:40:20', 200),
(31, 60, '20:40:20', 200),
(32, 61, '20:40:20', 200),
(33, 62, '20:40:20', 200),
(34, 63, '20:40:20', 200),
(35, 64, '20:40:20', 200),
(36, 65, '20:40:20', 200),
(37, 66, '20:40:20', 200),
(38, 67, '20:40:20', 200),
(39, 68, '20:40:20', 200),
(40, 69, '20:40:20', 200),
(41, 70, '20:40:20', 200),
(42, 71, '20:40:20', 200),
(43, 72, '20:40:20', 200),
(44, 73, '20:40:20', 200),
(45, 74, '20:40:20', 200),
(46, 75, '20:40:20', 200),
(47, 76, '20:40:20', 200),
(48, 77, '20:40:20', 200),
(49, 78, '20:40:20', 200),
(50, 79, '20:40:20', 200),
(51, 80, '20:40:20', 200),
(52, 81, '20:40:20', 200),
(53, 82, '10:15:30', 120),
(54, 83, '10:15:30', 120),
(55, 84, '05:40:10', 80),
(56, 85, '05:40:10', 80),
(57, 86, '12:00:00', 150),
(58, 87, '12:00:00', 150),
(59, 88, '08:25:45', 95),
(60, 89, '08:25:45', 95),
(61, 90, '15:10:05', 210),
(62, 91, '15:10:05', 210),
(63, 92, '00:00:00', 0),
(64, 93, '00:00:00', 0),
(65, 94, '00:00:00', 0),
(66, 95, '00:00:00', 0),
(67, 96, '00:00:00', 0),
(68, 97, '00:00:00', 0),
(69, 98, '00:00:00', 0);

-- --------------------------------------------------------

--
-- Table structure for table `themes`
--

CREATE TABLE `themes` (
  `Id_t` int(11) NOT NULL,
  `title` varchar(100) DEFAULT NULL,
  `config` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`config`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `themes`
--

INSERT INTO `themes` (`Id_t`, `title`, `config`) VALUES
(1, 'classic', '{\"title\": \"classic\", \"tankSprites\": \"Retro\", \"colors\": [\"hsl(240, 60%, 3%)\", \"#ffffff\", \"#00ffff\", \"#090913\", \"#00ffff80\"], \"explosionParticle\": \"#00ffff4d\", \"powerColor\": \"#00dddd\"}'),
(2, 'retro', '{\"title\": \"retro\", \"tankSprites\": \"Retro\", \"colors\": [\"#e7e7e7\", \"#030303\", \"#070707\", \"#c7c7c7\", \"#07070780\"], \"explosionParticle\": \"#0000004d\", \"powerColor\": \"#080808\"}'),
(3, 'hell', '{\"title\": \"hell\", \"tankSprites\": \"Retro\", \"colors\": [\"#060202\", \"#ff0000\", \"#ff0000\", \"#130909\", \"#ff000080\"], \"explosionParticle\": \"#ff00004d\", \"powerColor\": \"#b80000\"}'),
(4, 'Virus', '{\"title\": \"Virus\", \"tankSprites\": \"Retro\", \"colors\": [\"hsl(310, 100%, 3%)\", \"#02e100\", \"#02e100\", \"hsl(309, 87%, 6%)\", \"hsla(306, 100%, 11%, 0.50)\"], \"explosionParticle\": \"#1eff004d\", \"powerColor\": \"#15e902\"}'),
(8, 'junglev2', '{\"title\": \"junglev2\", \"tankSprites\": \"Retro\", \"colors\": [\"#020206\", \"#ffffff\", \"#00ffff\", \"#090913\", \"#00ffff80\"], \"explosionParticle\": \"#00ffff4d\", \"powerColor\": \"#00dddd\"}');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `Id_u` int(11) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(40) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `login_token` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`Id_u`, `username`, `password`, `email`, `role_id`, `created_at`, `login_token`) VALUES
(8, 'c', '$2y$10$nRXZ5tkT9B0FCy2RUIKscu.MyQiLQAVcfRqR19mL1TLmckxAranuW', 'a@b.pl', 3, '2026-04-11', '579f97eca8728f38b706800e787cb574'),
(19, 'user11', '$2y$10$examplehash11', 'user11@example.com', 2, '2026-04-11', '4607e5188ad3fdeca28711652712ae4d'),
(21, 'user13', '$2y$10$examplehash13', 'user13@example.com', 2, '2026-04-11', '5ee2a2548aed752e07f15a6e1e707525'),
(23, 'user15', '$2y$10$examplehash15', 'user15@example.com', 2, '2026-04-11', 'e186643406c2410f41981a5ddead9f9b'),
(24, 'user16', '$2y$10$examplehash16', 'user16@example.com', 2, '2026-04-11', '7195f1db3cd23f353222b6ad296f21cc'),
(25, 'user17', '$2y$10$examplehash17', 'user17@example.com', 2, '2026-04-11', 'd7e3cf1d1b79965044abe54e2a54744f'),
(26, 'user18', '$2y$10$examplehash18', 'user18@example.com', 2, '2026-04-11', '60aa9698c2f43360f9f8172af37d4868'),
(27, 'user19', '$2y$10$examplehash19', 'user19@example.com', 2, '2026-04-11', '9680774d4472ac65701b7d1c682b4971'),
(28, 'user20', '$2y$10$examplehash20', 'user20@example.com', 2, '2026-04-11', '5f44a038bc3ed9c3bdd5a67e969e55f2'),
(34, 'user', '$2y$10$MgdzmqTkiOVQya/UNM78Yutr01PkNDzkoUrMG3.baZrZwgKUHkUuK', 'user@user.user', 1, '2026-04-11', 'c1fea7222bc762e836973212b6cc5b64'),
(43, 'sigmaBoi', '$2y$10$FwPA7zN8HK5aT36ZwqbrteXrQC.g//B4uiGFdl.g8ktSEAMz7VblG', 'Sigma@sis.sigma', 3, '2026-04-11', 'af0ca881a7191f65c82162aaa5143192'),
(44, 'guest', '$2y$10$.BXOLQ0v7W0Oy/GnYCKgtOZfF8rejZN834SwxiCLzC9JzXo2dHhtq', 'guest@guest.guest', 2, '2026-04-11', '422e7be6387190cf505c1033f126ff84'),
(45, 'admin', '$2y$10$9GmbW4Cf4MhBlJYDjDSQXuGOQTAnA8jbIauN3TPqvbdKZL4.JFkA6', 'mateuszwypior2000@gmail.com', 1, '2026-04-11', 'f3cb601c4d755c028d359f3cd57ca6ed'),
(47, 'new', '$2y$10$Wa7Xaw4rzsxEswiUwWbZLOHT.vtbbteHLRDuiEI0r6KbgfA7q79kq', 'new@new.pl', 3, '2026-04-11', '9dc8037491bba73db9b51827b64e6832'),
(48, 'am', '$2y$10$0VqaTvvijtU3rTIKmRkKuO.bcyjPgsXFptkcNOjkSxN7RgCtQYPI6', 'am@am.am', 2, '2026-04-11', '4e2d8b57b3a0585630aa8070775b7693'),
(49, 'konto', '$2y$10$9RYQm5H7xOBGUlNOt6MLz.osAMg5kSY4hywDPtxkxTo5M2QbFPDOe', 'konto@konto.konto', 2, '2026-04-11', 'b81b5d363882ec0e5021c5eaf608f819'),
(50, 'heir', '$2y$10$tngyVbZGFNzJvW6OJCwwaOO3KOGBXrSrq0nKr2Mb2Cgh/Y.P0QUMW', 'h@h.h', 2, '2026-04-11', '40bb646b103645cdac7fdc219723b89f'),
(51, 'testdate', '$2y$10$YPZ15kpc7ujQ9mpTi7k0WeFK9ICKMj6SZ4FuCv8EmBl0iahawRVFi', 'testdate@a.a', 2, '2026-04-12', '333dfb49ff2479430f2b80c163e63696'),
(52, 'username1', '$2y$10$examplehash1', 'user1@b.pl', 3, '2026-04-10', '29d89ee35e0a32c35e6914236db3f886'),
(53, 'username2', '$2y$10$examplehash2', 'user2@b.pl', 3, '2026-04-09', '8b24ab366ea669774659e0c5c9416275'),
(54, 'username3', '$2y$10$examplehash3', 'user3@b.pl', 3, '2026-04-08', '64600bfcea5fb4885a6e1cd2ca85cd68'),
(55, 'username4', '$2y$10$examplehash4', 'user4@b.pl', 3, '2026-04-07', 'c8cb2436aa7aeba5a28dce7da23f79b3'),
(56, 'username5', '$2y$10$examplehash5', 'user5@b.pl', 3, '2026-04-06', '37bed697270c0244e715409804f7c31f'),
(57, 'username6', '$2y$10$examplehash6', 'user6@b.pl', 3, '2026-04-05', '7e567bd8a850bd903fdebfed297b5449'),
(58, 'username7', '$2y$10$examplehash7', 'user7@b.pl', 3, '2026-04-04', '255074dc76796c76dc6e67d8c8c02269'),
(59, 'username8', '$2y$10$examplehash8', 'user8@b.pl', 3, '2026-04-03', '6ab790255c693e25d87d879f279eed90'),
(60, 'username9', '$2y$10$examplehash9', 'user9@b.pl', 3, '2026-04-02', '8c58f73bf97c3be057827cf734faa0d0'),
(61, 'username10', '$2y$10$examplehash10', 'user10@b.pl', 3, '2026-04-01', 'b34cfc0415b43fbc0375ae96bcc832ee'),
(62, 'username11', '$2y$10$examplehash11', 'user11@b.pl', 3, '2026-03-31', 'ed9647d1e7fe4a9d62dba13b30e58347'),
(63, 'username12', '$2y$10$examplehash12', 'user12@b.pl', 3, '2026-03-30', '379d92636333fe228c6d14b4474a147e'),
(64, 'username13', '$2y$10$examplehash13', 'user13@b.pl', 3, '2026-03-29', '280796d29f3e663c255d1d70c8a54db1'),
(65, 'username14', '$2y$10$examplehash14', 'user14@b.pl', 3, '2026-03-28', '443f2a3112b02f53ea28f9bfa3dad9e0'),
(66, 'username15', '$2y$10$examplehash15', 'user15@b.pl', 3, '2026-03-27', '5ecba07904e0e68bc16f4b67c0e5bf5c'),
(67, 'username16', '$2y$10$examplehash16', 'user16@b.pl', 3, '2026-03-26', '3a571fee5f537ee10e4e835b8e3ba948'),
(68, 'username17', '$2y$10$examplehash17', 'user17@b.pl', 3, '2026-03-25', '96d4e1671c504a2715d3125d80fbe014'),
(69, 'username18', '$2y$10$examplehash18', 'user18@b.pl', 3, '2026-03-24', '26fab66c4c4f25f7da0392e0b20c4050'),
(70, 'username19', '$2y$10$examplehash19', 'user19@b.pl', 3, '2026-03-23', '851fd0ff0e12e317d72d7c512416e7e6'),
(71, 'username20', '$2y$10$examplehash20', 'user20@b.pl', 3, '2026-03-22', '627ac13bbcb655c925fee3bebd74ae76'),
(72, 'username21', '$2y$10$examplehash21', 'user21@b.pl', 3, '2026-03-21', '97182e31b544a0d83f6571c3056402f4'),
(73, 'username22', '$2y$10$examplehash22', 'user22@b.pl', 3, '2026-03-20', '7bd63bdb8694024e19ef5fceeb1f1dc9'),
(74, 'username23', '$2y$10$examplehash23', 'user23@b.pl', 3, '2026-03-19', 'f0b3c502c4696e227dd00d9385c1c715'),
(75, 'username24', '$2y$10$examplehash24', 'user24@b.pl', 3, '2026-03-18', 'c05dd4d8b2b7c9ade4748d5cfe2df389'),
(76, 'username25', '$2y$10$examplehash25', 'user25@b.pl', 3, '2026-03-17', '8aaa4c774e6b1184aa6dbd0aa03d9450'),
(77, 'username26', '$2y$10$examplehash26', 'user26@b.pl', 3, '2026-03-16', '0c84aef89705f589bc39ee13af8ef8c2'),
(79, 'username28', '$2y$10$examplehash28', 'user28@b.pl', 3, '2026-03-14', 'cda4dd54a033618ca81d40f8a18a182d'),
(80, 'username29', '$2y$10$examplehash29', 'user29@b.pl', 3, '2026-03-13', '24c2cb894bbbb3c8ca57620fe8f279a7'),
(81, 'username30', '$2y$10$examplehash30', 'user30@b.pl', 3, '2026-03-12', '05b638a8dac993ccfbedbcc1bacf8261'),
(82, 'username31', '$2y$10$examplehash31', 'user31@b.pl', 3, '2026-04-10', '367a2ce6ea51deeadf0226dc23679d4d'),
(83, 'username32', '$2y$10$examplehash32', 'user32@b.pl', 3, '2026-04-10', '6ebef5d2d4dd6c796502b3db9908105d'),
(84, 'username33', '$2y$10$examplehash33', 'user33@b.pl', 3, '2026-04-09', '1dfa9f89cb47546e71ffa62b56b353fb'),
(85, 'username34', '$2y$10$examplehash34', 'user34@b.pl', 3, '2026-04-09', 'ff60c60b8679dd8eb4360d18c691c3eb'),
(86, 'username35', '$2y$10$examplehash35', 'user35@b.pl', 3, '2026-04-08', 'f9e5df5b8cbd296246b8b0cf83a7c373'),
(87, 'username36', '$2y$10$examplehash36', 'user36@b.pl', 3, '2026-04-08', 'c440981950c63856fac6252613f060fc'),
(88, 'username37', '$2y$10$examplehash37', 'user37@b.pl', 3, '2026-04-07', 'bfbbf4f8d7d20694f5a1b74ee2884789'),
(89, 'username38', '$2y$10$examplehash38', 'user38@b.pl', 3, '2026-04-07', '05f3349d381c794e7a2c103095bdd61b'),
(90, 'username39', '$2y$10$examplehash39', 'user39@b.pl', 3, '2026-04-06', '27e9fd324ce67062b63733d9aff6602e'),
(91, 'username40', '$2y$10$examplehash40', 'user40@b.pl', 3, '2026-04-06', 'fdb0cb827d6bb0208ea0c8ede3b21c03'),
(92, 'sdasdsadsaasdsadsadvvv', '$2y$10$2oEiKUlOw6ecs9t1uf4Uke/ATvoarrtl0ZnTkN4sR5p5O7PUmlEa6', 'd@sdASda.dsadsa', 2, '2026-04-12', '764f850fb9de77fc264e4474d0825354'),
(93, 'yhtguyjnh', '$2y$10$/1GbAeShIsTCUmuKopOib.FKmI95JnPPdkrsMVXA.XghjJw0Bp1Jy', 'mmo@miomo.plkp', 2, '2026-04-12', '6ccb39c1392be8ed9e56d7bcdad8b927'),
(94, 'userads', '$2y$10$cCqLwl5fBPiehfxYxCAMA.JnzEogGxLLrNnfOnpgVk6RtmGAVcN3K', 'user@user2.2', 2, '2026-04-13', '53cddcaf07c11d12536489a0380f7541'),
(96, 'gir', '$2y$10$9g.EY6ZgLRR0gDxPWgxZOOTx96KXHgqNuN8AALOA/1PS5/X861Tfu', 'gir@gir.gir', 2, '2026-04-16', 'dsadsacascay8q2y9ncas90snc9q289qd'),
(97, 'account', '$2y$10$RI9zAhthduyf2mdxb94yB.hi5AWs0FEYAnvtxOSjRkRyfFeSL6eV.', 'account@account.h', 2, '2026-04-16', '42d45c73708f64869aa04ea42a22a396120427ed8e94313c9916472b3d5efa94'),
(98, 'key', '$2y$10$aFkZAyCypD8NEeohITz./Ol1xrpLsaNhM/sg7wQB8lF6gj3YrzRAC', 'key@key.h', 2, '2026-04-16', 'a91106048405f2c8e3fa027f71afa59a7eb66ee59ae24cbf24035986b90fa59f');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`Id_r`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `statistics`
--
ALTER TABLE `statistics`
  ADD PRIMARY KEY (`Id_s`);

--
-- Indexes for table `themes`
--
ALTER TABLE `themes`
  ADD PRIMARY KEY (`Id_t`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`Id_u`),
  ADD UNIQUE KEY `login_token` (`login_token`),
  ADD KEY `role_id` (`role_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `Id_r` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `statistics`
--
ALTER TABLE `statistics`
  MODIFY `Id_s` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

--
-- AUTO_INCREMENT for table `themes`
--
ALTER TABLE `themes`
  MODIFY `Id_t` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `Id_u` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=99;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
