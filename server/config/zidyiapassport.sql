-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 08, 2024 at 12:58 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `zidyiapassport`
--

-- --------------------------------------------------------

--
-- Table structure for table `certificate`
--

CREATE TABLE `certificate` (
  `certificate_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `organization_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `body` varchar(500) NOT NULL,
  `issued_date` date NOT NULL,
  `expiry_date` date NOT NULL,
  `created_at` date NOT NULL DEFAULT current_timestamp(),
  `status` varchar(50) NOT NULL DEFAULT 'pending',
  `CertificateFile` varchar(250) NOT NULL,
  `rejection_reason` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `certificateverification`
--

CREATE TABLE `certificateverification` (
  `verification_id` int(11) NOT NULL,
  `certificate_id` int(11) NOT NULL,
  `organization_id` int(11) NOT NULL,
  `verification_date` date NOT NULL,
  `note` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `customfields`
--

CREATE TABLE `customfields` (
  `field_id` int(11) NOT NULL,
  `organization_id` int(11) DEFAULT NULL,
  `fieldName` varchar(255) NOT NULL,
  `fieldType` enum('text','date','dropdown','file','radio','checkbox') DEFAULT NULL,
  `isOptional` tinyint(1) NOT NULL,
  `options` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`options`)),
  `version` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `document`
--

CREATE TABLE `document` (
  `document_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `organization_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `body` varchar(500) NOT NULL,
  `issued_date` date NOT NULL,
  `expiry_date` date NOT NULL,
  `created_at` date NOT NULL DEFAULT current_timestamp(),
  `status` varchar(50) NOT NULL DEFAULT 'pending',
  `file` varchar(250) NOT NULL,
  `rejection_reason` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `filledforms`
--

CREATE TABLE `filledforms` (
  `filled_form_id` int(11) NOT NULL,
  `organization_id` int(11) DEFAULT NULL,
  `student_id` int(11) DEFAULT NULL,
  `form_data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`form_data`)),
  `FileOption` varchar(500) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `qrcodes`
--

CREATE TABLE `qrcodes` (
  `file_name` varchar(100) NOT NULL,
  `hashed_data` varchar(250) NOT NULL,
  `cloudinary_url` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `qrcodes`
--

INSERT INTO `qrcodes` (`file_name`, `hashed_data`, `cloudinary_url`) VALUES
('qr_code_123456_Marwa.png', '7edb3ee6831f7c87e8519e14bd45edd0200023512b3b6e7c15cca33a14dc342f', ''),
('qr_code_68856_Marwa.png', '703b55cd42b7704bbf0a8d0aef2fff6ac01dc0b050f5cf6b5f05d1efeeb4fda7', ''),
('qr_code_68999856_Marwa.png', '0c4faee2236a15f30d460d61e1085f1445e87e776463f70c2c4d4a7961cdff1e', ''),
('qr_code_353789_Marwa.png', '08c3045b084441d5726f0e16aad18252e184e53dcfe9112f2938c4c7f3ad7412', ''),
('qr_code_353789_Marwa.png', '08c3045b084441d5726f0e16aad18252e184e53dcfe9112f2938c4c7f3ad7412', ''),
('qr_code_03355079_Wassim.png', 'd4ad0a66d2ea4f9a21134edbad3749c0e86f7275eaa5748e3a1fa8738c6614f0', ''),
('qr_code_03355079_Wassim.png', 'd4ad0a66d2ea4f9a21134edbad3749c0e86f7275eaa5748e3a1fa8738c6614f0', ''),
('qr_code_03355079_Wassim.png', 'd4ad0a66d2ea4f9a21134edbad3749c0e86f7275eaa5748e3a1fa8738c6614f0', ''),
('qr_code_03355079_Wassim.png', 'd4ad0a66d2ea4f9a21134edbad3749c0e86f7275eaa5748e3a1fa8738c6614f0', ''),
('qr_code_0335507910_Wassim.png', '782874898cfaebafa4069e86e5cc410084b57ae8f8f89a9369f1f0f838d5c0b8', ''),
('qr_code_0005507910_Wassim.png', 'f0398ed8d8ab5189e00b480cc096cf9b758a9abeb872fcac0f245f0610525f58', ''),
('qr_code_0005507910_Wassim.png', 'f0398ed8d8ab5189e00b480cc096cf9b758a9abeb872fcac0f245f0610525f58', ''),
('qr_code_0005507910_Rayan.png', '4015d5a8f7196b578cf1983e3002470c48e5776eae0694279468e5a08fdec6ba', ''),
('qr_code_00057910_Rayan.png', 'aae1636c061080d6ceb4fbf3dbec46878e894c2030d6d41c5c659b0cc17084e7', 'https://res.cloudinary.com/daa9irzfz/image/upload/v1709898255/qrcodes/tulmsr3kbr0ekqpo88yr.png'),
('qr_code_00033357910_Rayan.png', 'f6d15caa44299ab932ba9716ffc2557c97abf9c4c53183022518c098c8db0646', 'https://res.cloudinary.com/daa9irzfz/image/upload/v1709898299/qrcodes/vxjocql3ylg6c5zgfy85.png'),
('qr_code_0107910_Rayan.png', '8817eadb51ced4acc2d52639b925ee2033a91e764e0dcc5d624eece09888538a', 'https://res.cloudinary.com/daa9irzfz/image/upload/v1709898811/qrcodes/oaobb6gjqoopqaqkzana.png');

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `student_id` int(11) NOT NULL,
  `ID` varchar(200) NOT NULL,
  `academic_id` varchar(200) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(500) NOT NULL,
  `mobile` int(15) NOT NULL,
  `profile_img` varchar(200) NOT NULL,
  `location` varchar(100) NOT NULL,
  `bio` varchar(500) NOT NULL,
  `token` varchar(250) NOT NULL,
  `resetPassToken` varchar(255) DEFAULT NULL,
  `status` varchar(10) NOT NULL DEFAULT 'false',
  `created_at` date NOT NULL DEFAULT current_timestamp(),
  `updated_at` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`student_id`, `ID`, `academic_id`, `first_name`, `last_name`, `email`, `password`, `mobile`, `profile_img`, `location`, `bio`, `token`, `resetPassToken`, `status`, `created_at`, `updated_at`) VALUES
(1, 'http://dummyimage.com/147x100.png/cc0000/ffffff', '01HR2PVFHC5Q28JA60MYT651KP', 'Richmound', 'Wixon', 'rwixon0@house.gov', '$2a$04$fvQgi.tAtSFjcxRF2vjEn.So234xtt3QaEV45nEEyHMERYNykGE7m', 0, 'http://dummyimage.com/211x100.png/cc0000/ffffff', '07167 Twin Pines Center', 'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.', '65e4b7bdfc13ae7fa5cd3ae3', NULL, 'false', '2024-03-03', '2024-03-02'),
(2, 'http://dummyimage.com/204x100.png/dddddd/000000', '01HR2PVFHJB8PQEHY7ZGV4JY94', 'Leilah', 'Stuke', 'lstuke1@walmart.com', '$2a$04$SzmsS/hcUB.izZeRcO8iH.r006cD1OvRhDxahcHqBI1TPk7SDvWsO', 0, 'http://dummyimage.com/118x100.png/5fa2dd/ffffff', '91 Summit Drive', 'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.\r\nInteger tincidunt  sed magna at nunc commodo placerat.', '65e4b7bdfc13ae7fa5cd3ae4', NULL, 'false', '2024-03-03', '2024-03-03'),
(3, 'http://dummyimage.com/106x100.png/ff4444/ffffff', '01HR2PVFHPDFTWTV4NTEYBR81E', 'Shane', 'Loveard', 'sloveard2@virginia.edu', '$2a$04$A9q4lm8i6QOcM03mUwXEa.g8vPnnPzsiJ0OFSIPvQv/8SGn58EHvK', 0, 'http://dummyimage.com/184x100.png/dddddd/000000', '79 Crescent Oaks Park', 'Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibusc tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.', '65e4b7befc13ae7fa5cd3ae5', NULL, 'false', '2024-03-03', '2024-03-03'),
(4, 'http://dummyimage.com/153x100.png/ff4444/ffffff', '01HR2PVFHV5B6WG0M8FJ98K3FT', 'Tucky', 'Bixley', 'tbixley3@globo.com', '$2a$04$/bMUaA/RZKdmLwISUSJQVuU0j5J73qAlnF4sjZsUcB7i6SfMwnsCO', 0, 'http://dummyimage.com/179x100.png/dddddd/000000', '284 Mccormick Trail', 'Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputatquis orci eget orci vehicula condimentum.', '65e4b7befc13ae7fa5cd3ae6', NULL, 'false', '2024-03-03', '2024-03-03'),
(5, 'http://dummyimage.com/235x100.png/ff4444/ffffff', '01HR2PVFHZ0ZNX4MZGSDN4QGYJ', 'Floris', 'Mather', 'fmather4@example.com', '$2a$04$Y0Yx6xlrkmEEABNNrNeMX.FKiOMw8JGz2OoSHlhu.1BVOPe4v1WEG', 0, 'http://dummyimage.com/168x100.png/5fa2dd/ffffff', '0855 Butterfield Crossing', 'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia\r\nMorbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.', '65e4b7befc13ae7fa5cd3ae7', NULL, 'false', '2024-03-03', '2024-03-03'),
(6, 'http://dummyimage.com/242x100.png/ff4444/ffffff', '01HR2PVFJ43X8DHXXFNDD9AV5P', 'Sunny', 'Oager', 'soager5@acquirethisname.com', '$2a$04$r8zVUhM5h.zsqYVLZrNQn.tuP5PldfMoz9WzOh4WiJ58FdmwH9OKm', 0, 'http://dummyimage.com/171x100.png/dddddd/000000', '72800 Hooker Way', 'Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.', '65e4b7befc13ae7fa5cd3ae8', NULL, 'false', '2024-03-03', '2024-03-03'),
(7, 'http://dummyimage.com/179x100.png/ff4444/ffffff', '01HR2PVFJ8SERYC9ZNA3BEB6D5', 'Simone', 'Cowperthwaite', 'scowperthwaite6@nba.com', '$2a$04$KXwxsTCq2t72Xxc3eIhNQeE.F5eYviFMZaV75mVJ5E7niwfbEMdLK', 0, 'http://dummyimage.com/108x100.png/dddddd/000000', '82338 Mariners Cove Court', 'Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.', '65e4b7befc13ae7fa5cd3ae9', NULL, 'false', '2024-03-03', '2024-03-03'),
(8, 'http://dummyimage.com/112x100.png/ff4444/ffffff', '01HR2PVFJDHWJSCGQWWYK234AW', 'Lemmy', 'Benedit', 'lbenedit7@china.com.cn', '$2a$04$mHFR.eWefpiet4hE2B2fZe3RL0cez6DdLc7lPZ07cMMqF.nVWUvQS', 0, 'http://dummyimage.com/161x100.png/5fa2dd/ffffff', '374 Evergreen Parkway', 'Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.', '65e4b7befc13ae7fa5cd3aea', NULL, 'false', '2024-03-03', '2024-03-03'),
(9, 'http://dummyimage.com/227x100.png/ff4444/ffffff', '01HR2PVFJJWX5MVS7G187FEBW4', 'Erica', 'Gabler', 'egabler8@myspace.com', '$2a$04$bdhnwOhB2LEGxvwzuJLnsOrRec3UMYFxna2XcM6eaJVYqYsrngu32', 0, 'http://dummyimage.com/191x100.png/dddddd/000000', '825 Comanche Place', 'Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tetis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.', '65e4b7befc13ae7fa5cd3aeb', NULL, 'false', '2024-03-03', '2024-03-03');

-- --------------------------------------------------------

--
-- Table structure for table `subscriber`
--

CREATE TABLE `subscriber` (
  `subscriber_id` int(11) NOT NULL,
  `admin_email` varchar(100) NOT NULL,
  `password` varchar(500) NOT NULL,
  `name` varchar(100) NOT NULL,
  `location` varchar(100) NOT NULL,
  `expiry_date` date NOT NULL,
  `created_at` date NOT NULL DEFAULT current_timestamp(),
  `resetPassToken` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `subscriber`
--

INSERT INTO `subscriber` (`subscriber_id`, `admin_email`, `password`, `name`, `location`, `expiry_date`, `created_at`, `resetPassToken`) VALUES
(1, 'marabohaidar@gmail.com', '$2b$10$Q2dUbaLKZqnq2HmDCQ4De.OhkyaRY82XjBRHnC3vfpPVjE3.U7NEm', 'Gerlach and Sons', 'PO Box 99076', '2025-03-02', '2024-03-02', 'b4a2e0a955339275b162cbe1e91abb067d9af7d5'),
(2, 'gharder1@e-recht24.de', '$2a$04$U/fD2/fFCIOeGLsa1P93Nejh/ELM4AZtes7s.JIRfluIarm.lWe0C', 'Christiansen LLC', 'Room 1412', '2023-01-02', '2022-01-02', NULL),
(3, 'psallows2@parallels.com', '$2a$04$RgAU1ern9Ca2mHAtWrgt8e9VpzNlFyO6uXNF1lQr0R3SKLx1.aWeu', 'Carter LLC', 'PO Box 80458', '2025-03-03', '2024-03-03', NULL),
(4, 'ntregea3@technorati.com', '$2a$04$V0TN2pdPDlWgoY3npXKE8.UOLs8.6uXMCX3vumEaBgK6y4vfTz.4a', 'Hintz, Frami and Connelly', '2nd Floor', '2025-03-03', '2024-03-03', NULL),
(5, 'olegh4@edublogs.org', '$2a$04$gl6o9F1WB5ND016l8kpTUOjlj1H/6ji0n6NCMZFt2fBHntXWe7MZO', 'Beatty, Fadel and Towne', '14th Floor', '2025-03-03', '2024-03-03', NULL),
(6, 'fclaybourn5@globo.com', '$2a$04$WX8ode1b9oKgiz2D2g2tEO4eq6bNIX68WF5EJwMcHzuybPM6cqbT.', 'Kautzer-Gleason', 'Suite 27', '2025-03-03', '2024-03-03', NULL),
(7, 'welloway6@cbslocal.com', '$2a$04$u/1jfEDyDV19rBj.a0hTb.GNNZwrYiAg7fm1s09oqyf6h.n0t4XG2', 'Gutmann, Tillman and Spencer', 'PO Box 23303', '2025-03-03', '2024-03-03', NULL),
(8, 'gronaldson7@scientificamerican.com', '$2a$04$GkoP3L4yF.gti7xIDqdSgOhGniQu7j7mH2g8zNzv2aljTLv.7luCC', 'Kreiger, Turner and Crooks', 'PO Box 56325', '2025-03-03', '2024-03-03', NULL),
(9, 'nsproat8@intel.com', '$2a$04$3WoRvKETpOvvCKYqmksTbOF/MoDMhsfcN5ZykuogSaD5noH42JTD6', 'Jacobs, Kessler and Pfannerstill', 'Suite 49', '2025-03-03', '2024-03-03', NULL),
(10, 'nbawles9@moonfruit.com', '$2a$04$bu0ab.X3Fo05vKto4QeTnud5Dt58mOR9xCFji507brolMUNtwR7Oy', 'Tromp Inc', 'Suite 45', '2025-03-03', '2024-03-03', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `subscriptionrequest`
--

CREATE TABLE `subscriptionrequest` (
  `id` int(11) NOT NULL,
  `subscriber_email` varchar(200) NOT NULL,
  `subscriber_name` varchar(200) NOT NULL,
  `location` varchar(200) NOT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `subscriptionrequest`
--

INSERT INTO `subscriptionrequest` (`id`, `subscriber_email`, `subscriber_name`, `location`, `status`) VALUES
(1, 'tkemm0@example.com', 'Waelchi Inc', 'lebanona', 'pending'),
(2, 'gzotto1@vk.com', 'Daugherty and Sons', 'lebanon', 'pending'),
(3, 'lwoodcock2@myspace.com', 'Shanahan-Kulas', 'lebanon', 'pending'),
(4, 'mpear3@ucla.edu', 'Greenfelder, Gusikowski and Kuhlman', 'lebanon', 'pending'),
(5, 'ctwoohy4@blogtalkradio.com', 'Orn, Barton and Wisozk', 'lebanon', 'pending');

-- --------------------------------------------------------

--
-- Table structure for table `superadmin`
--

CREATE TABLE `superadmin` (
  `superadmin_id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tenent`
--

CREATE TABLE `tenent` (
  `organization_id` int(11) NOT NULL,
  `admin_email` varchar(100) NOT NULL,
  `password` varchar(500) NOT NULL,
  `name` varchar(100) NOT NULL,
  `location` varchar(100) NOT NULL,
  `created_at` date NOT NULL DEFAULT current_timestamp(),
  `resetPassToken` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tenent`
--

INSERT INTO `tenent` (`organization_id`, `admin_email`, `password`, `name`, `location`, `created_at`, `resetPassToken`) VALUES
(1, 'marabohaidar@gmail.com', '$2b$10$FGqJMRPGyfAcn1AlTdUvA.x8q/BYX4OhmxeIt5bKbIy.GJC0/JIJe', 'Cruickshank-Rolfson', 'Apt 412', '2024-03-03', 'a2c46e80f4c043d008995794eed25acff261f524'),
(2, 'pbarkley1@hexun.com', '$2a$04$hrRrQn2jf3LnUsI6cUU5bu.uVx4Ha3Qd7dt4CeWWrGHxpjLpp5HdW', 'Mante Group', 'Suite 48', '2024-03-03', NULL),
(3, 'rsedgefield2@nymag.com', '$2a$04$/v3Gei9ZBZJPFgrXl9lGqOTO/jwGwf/00f.CNwdJN8L5hqjhOr16C', 'Stehr-Balistreri', 'Apt 1340', '2024-03-03', NULL),
(4, 'ronoulane3@patch.com', '$2a$04$rYxRPUDXMaFoslYNEOPHwOpHWVCq0KBDYFQo8PzDQqpTpx7LW2N4i', 'Labadie-Krajcik', 'Suite 67', '2024-03-03', NULL),
(5, 'kbourdis4@usnews.com', '$2a$04$UaFY5LgDS9YyX7rUbO69w.aw3TJmM807aGJOofe.J.9pmDy5vvlBy', 'Runte, Kuhn and Connelly', 'PO Box 95989', '2024-03-03', NULL),
(6, 'amccathy5@scientificamerican.com', '$2a$04$v07HSXV2jl3DdoJ.TKBN/.Dyp1O/6hmkZGNsJ5zYJKIs7yNz0gnkS', 'Wuckert, Jacobs and Kohler', 'Suite 42', '2024-03-03', NULL),
(7, 'amattin6@cmu.edu', '$2a$04$WZ/Q/s6YybOPX84g3vvokOReKcdLtCFOdGUBami8TBzGRkyHZGl7.', 'Beier Inc', 'Apt 26', '2024-03-03', NULL),
(8, 'pwhistlecraft7@friendfeed.com', '$2a$04$hGjzsllWHSFI1Ytxw6Fl4u.yAeY2JMtXpE76YhdNNvM3U3bKJpELW', 'Wunsch Inc', 'PO Box 82105', '2024-03-03', NULL),
(9, 'wmaccrosson8@tinyurl.com', '$2a$04$/Yrw3njS7QzoT/7F4p1jh.uOXF6feiEpIb88LQ2aZ8r.ejAkGQFii', 'Gusikowski-Berge', 'Suite 9', '2024-03-03', NULL),
(22, 'wass.younes@gmail.com', '$2b$08$dTBhMDC00Csq93wgzoCBuepHHh3.bcNr4MRzGrmPflYYOJ2tjmo8.', 'wassim', 'saida', '2024-03-03', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `transcript`
--

CREATE TABLE `transcript` (
  `transcript_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `organization_id` int(11) NOT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'pending',
  `rejection_reason` varchar(500) NOT NULL,
  `TranscriptFile` varchar(500) NOT NULL,
  `verified_at` date NOT NULL,
  `created_at` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `certificate`
--
ALTER TABLE `certificate`
  ADD PRIMARY KEY (`certificate_id`),
  ADD KEY `student_id` (`student_id`),
  ADD KEY `organization_id` (`organization_id`),
  ADD KEY `student_id_2` (`student_id`);

--
-- Indexes for table `certificateverification`
--
ALTER TABLE `certificateverification`
  ADD PRIMARY KEY (`verification_id`),
  ADD KEY `certificate_id` (`certificate_id`),
  ADD KEY `organization_id` (`organization_id`);

--
-- Indexes for table `customfields`
--
ALTER TABLE `customfields`
  ADD PRIMARY KEY (`field_id`),
  ADD KEY `organization_id` (`organization_id`);

--
-- Indexes for table `document`
--
ALTER TABLE `document`
  ADD PRIMARY KEY (`document_id`),
  ADD UNIQUE KEY `student_id` (`student_id`),
  ADD KEY `organization_id` (`organization_id`);

--
-- Indexes for table `filledforms`
--
ALTER TABLE `filledforms`
  ADD PRIMARY KEY (`filled_form_id`),
  ADD KEY `organization_id` (`organization_id`),
  ADD KEY `student_id` (`student_id`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`student_id`),
  ADD UNIQUE KEY `academic_id` (`academic_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `subscriber`
--
ALTER TABLE `subscriber`
  ADD PRIMARY KEY (`subscriber_id`),
  ADD UNIQUE KEY `admin_email` (`admin_email`);

--
-- Indexes for table `subscriptionrequest`
--
ALTER TABLE `subscriptionrequest`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `superadmin`
--
ALTER TABLE `superadmin`
  ADD PRIMARY KEY (`superadmin_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `tenent`
--
ALTER TABLE `tenent`
  ADD PRIMARY KEY (`organization_id`),
  ADD UNIQUE KEY `admin_email` (`admin_email`);

--
-- Indexes for table `transcript`
--
ALTER TABLE `transcript`
  ADD PRIMARY KEY (`transcript_id`),
  ADD KEY `student_id` (`student_id`),
  ADD KEY `organization_id` (`organization_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `certificate`
--
ALTER TABLE `certificate`
  MODIFY `certificate_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `certificateverification`
--
ALTER TABLE `certificateverification`
  MODIFY `verification_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `customfields`
--
ALTER TABLE `customfields`
  MODIFY `field_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `document`
--
ALTER TABLE `document`
  MODIFY `document_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `filledforms`
--
ALTER TABLE `filledforms`
  MODIFY `filled_form_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `student`
--
ALTER TABLE `student`
  MODIFY `student_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `subscriber`
--
ALTER TABLE `subscriber`
  MODIFY `subscriber_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `subscriptionrequest`
--
ALTER TABLE `subscriptionrequest`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `superadmin`
--
ALTER TABLE `superadmin`
  MODIFY `superadmin_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tenent`
--
ALTER TABLE `tenent`
  MODIFY `organization_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `transcript`
--
ALTER TABLE `transcript`
  MODIFY `transcript_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `certificate`
--
ALTER TABLE `certificate`
  ADD CONSTRAINT `certificate_ibfk_1` FOREIGN KEY (`organization_id`) REFERENCES `tenent` (`organization_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `certificate_ibfk_2` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`) ON UPDATE CASCADE;

--
-- Constraints for table `certificateverification`
--
ALTER TABLE `certificateverification`
  ADD CONSTRAINT `certificateverification_ibfk_1` FOREIGN KEY (`organization_id`) REFERENCES `tenent` (`organization_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `certification_certificationver` FOREIGN KEY (`certificate_id`) REFERENCES `certificate` (`certificate_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `customfields`
--
ALTER TABLE `customfields`
  ADD CONSTRAINT `customfields_ibfk_1` FOREIGN KEY (`organization_id`) REFERENCES `tenent` (`organization_id`);

--
-- Constraints for table `document`
--
ALTER TABLE `document`
  ADD CONSTRAINT `document_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `document_ibfk_2` FOREIGN KEY (`organization_id`) REFERENCES `tenent` (`organization_id`) ON UPDATE CASCADE;

--
-- Constraints for table `filledforms`
--
ALTER TABLE `filledforms`
  ADD CONSTRAINT `filledforms_ibfk_1` FOREIGN KEY (`organization_id`) REFERENCES `tenent` (`organization_id`),
  ADD CONSTRAINT `filledforms_ibfk_2` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`);

--
-- Constraints for table `transcript`
--
ALTER TABLE `transcript`
  ADD CONSTRAINT `transcript_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `transcript_ibfk_2` FOREIGN KEY (`organization_id`) REFERENCES `tenent` (`organization_id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
