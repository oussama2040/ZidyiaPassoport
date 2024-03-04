-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 04, 2024 at 12:14 AM
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
  `file` varchar(250) NOT NULL,
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
  `created_at` date NOT NULL DEFAULT current_timestamp(),
  `updated_at` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`student_id`, `ID`, `academic_id`, `first_name`, `last_name`, `email`, `password`, `mobile`, `profile_img`, `location`, `bio`, `token`, `created_at`, `updated_at`) VALUES
(1, 'http://dummyimage.com/147x100.png/cc0000/ffffff', '01HR2PVFHC5Q28JA60MYT651KP', 'Richmound', 'Wixon', 'rwixon0@house.gov', '$2a$04$fvQgi.tAtSFjcxRF2vjEn.So234xtt3QaEV45nEEyHMERYNykGE7m', 0, 'http://dummyimage.com/211x100.png/cc0000/ffffff', '07167 Twin Pines Center', 'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.', '65e4b7bdfc13ae7fa5cd3ae3', '2024-03-03', '2024-03-02'),
(2, 'http://dummyimage.com/204x100.png/dddddd/000000', '01HR2PVFHJB8PQEHY7ZGV4JY94', 'Leilah', 'Stuke', 'lstuke1@walmart.com', '$2a$04$SzmsS/hcUB.izZeRcO8iH.r006cD1OvRhDxahcHqBI1TPk7SDvWsO', 0, 'http://dummyimage.com/118x100.png/5fa2dd/ffffff', '91 Summit Drive', 'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.\r\nInteger tincidunt  sed magna at nunc commodo placerat.', '65e4b7bdfc13ae7fa5cd3ae4', '2024-03-03', '2024-03-03'),
(3, 'http://dummyimage.com/106x100.png/ff4444/ffffff', '01HR2PVFHPDFTWTV4NTEYBR81E', 'Shane', 'Loveard', 'sloveard2@virginia.edu', '$2a$04$A9q4lm8i6QOcM03mUwXEa.g8vPnnPzsiJ0OFSIPvQv/8SGn58EHvK', 0, 'http://dummyimage.com/184x100.png/dddddd/000000', '79 Crescent Oaks Park', 'Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibusc tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.', '65e4b7befc13ae7fa5cd3ae5', '2024-03-03', '2024-03-03'),
(4, 'http://dummyimage.com/153x100.png/ff4444/ffffff', '01HR2PVFHV5B6WG0M8FJ98K3FT', 'Tucky', 'Bixley', 'tbixley3@globo.com', '$2a$04$/bMUaA/RZKdmLwISUSJQVuU0j5J73qAlnF4sjZsUcB7i6SfMwnsCO', 0, 'http://dummyimage.com/179x100.png/dddddd/000000', '284 Mccormick Trail', 'Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputatquis orci eget orci vehicula condimentum.', '65e4b7befc13ae7fa5cd3ae6', '2024-03-03', '2024-03-03'),
(5, 'http://dummyimage.com/235x100.png/ff4444/ffffff', '01HR2PVFHZ0ZNX4MZGSDN4QGYJ', 'Floris', 'Mather', 'fmather4@example.com', '$2a$04$Y0Yx6xlrkmEEABNNrNeMX.FKiOMw8JGz2OoSHlhu.1BVOPe4v1WEG', 0, 'http://dummyimage.com/168x100.png/5fa2dd/ffffff', '0855 Butterfield Crossing', 'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia\r\nMorbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.', '65e4b7befc13ae7fa5cd3ae7', '2024-03-03', '2024-03-03'),
(6, 'http://dummyimage.com/242x100.png/ff4444/ffffff', '01HR2PVFJ43X8DHXXFNDD9AV5P', 'Sunny', 'Oager', 'soager5@acquirethisname.com', '$2a$04$r8zVUhM5h.zsqYVLZrNQn.tuP5PldfMoz9WzOh4WiJ58FdmwH9OKm', 0, 'http://dummyimage.com/171x100.png/dddddd/000000', '72800 Hooker Way', 'Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.', '65e4b7befc13ae7fa5cd3ae8', '2024-03-03', '2024-03-03'),
(7, 'http://dummyimage.com/179x100.png/ff4444/ffffff', '01HR2PVFJ8SERYC9ZNA3BEB6D5', 'Simone', 'Cowperthwaite', 'scowperthwaite6@nba.com', '$2a$04$KXwxsTCq2t72Xxc3eIhNQeE.F5eYviFMZaV75mVJ5E7niwfbEMdLK', 0, 'http://dummyimage.com/108x100.png/dddddd/000000', '82338 Mariners Cove Court', 'Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.', '65e4b7befc13ae7fa5cd3ae9', '2024-03-03', '2024-03-03'),
(8, 'http://dummyimage.com/112x100.png/ff4444/ffffff', '01HR2PVFJDHWJSCGQWWYK234AW', 'Lemmy', 'Benedit', 'lbenedit7@china.com.cn', '$2a$04$mHFR.eWefpiet4hE2B2fZe3RL0cez6DdLc7lPZ07cMMqF.nVWUvQS', 0, 'http://dummyimage.com/161x100.png/5fa2dd/ffffff', '374 Evergreen Parkway', 'Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.', '65e4b7befc13ae7fa5cd3aea', '2024-03-03', '2024-03-03'),
(9, 'http://dummyimage.com/227x100.png/ff4444/ffffff', '01HR2PVFJJWX5MVS7G187FEBW4', 'Erica', 'Gabler', 'egabler8@myspace.com', '$2a$04$bdhnwOhB2LEGxvwzuJLnsOrRec3UMYFxna2XcM6eaJVYqYsrngu32', 0, 'http://dummyimage.com/191x100.png/dddddd/000000', '825 Comanche Place', 'Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tetis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.', '65e4b7befc13ae7fa5cd3aeb', '2024-03-03', '2024-03-03');

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
  `created_at` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `subscriber`
--

INSERT INTO `subscriber` (`subscriber_id`, `admin_email`, `password`, `name`, `location`, `expiry_date`, `created_at`) VALUES
(1, 'wkiley0@geocities.jp', '$2a$04$eBFQy00o2CD3PyRkO6lWgO3MMXDD2.FHylf8X.7ZrlpjbCOorryOa', 'Gerlach and Sons', 'PO Box 99076', '2024-03-02', '2023-03-02'),
(2, 'gharder1@e-recht24.de', '$2a$04$U/fD2/fFCIOeGLsa1P93Nejh/ELM4AZtes7s.JIRfluIarm.lWe0C', 'Christiansen LLC', 'Room 1412', '2023-01-02', '2022-01-02'),
(3, 'psallows2@parallels.com', '$2a$04$RgAU1ern9Ca2mHAtWrgt8e9VpzNlFyO6uXNF1lQr0R3SKLx1.aWeu', 'Carter LLC', 'PO Box 80458', '2025-03-03', '2024-03-03'),
(4, 'ntregea3@technorati.com', '$2a$04$V0TN2pdPDlWgoY3npXKE8.UOLs8.6uXMCX3vumEaBgK6y4vfTz.4a', 'Hintz, Frami and Connelly', '2nd Floor', '2025-03-03', '2024-03-03'),
(5, 'olegh4@edublogs.org', '$2a$04$gl6o9F1WB5ND016l8kpTUOjlj1H/6ji0n6NCMZFt2fBHntXWe7MZO', 'Beatty, Fadel and Towne', '14th Floor', '2025-03-03', '2024-03-03'),
(6, 'fclaybourn5@globo.com', '$2a$04$WX8ode1b9oKgiz2D2g2tEO4eq6bNIX68WF5EJwMcHzuybPM6cqbT.', 'Kautzer-Gleason', 'Suite 27', '2025-03-03', '2024-03-03'),
(7, 'welloway6@cbslocal.com', '$2a$04$u/1jfEDyDV19rBj.a0hTb.GNNZwrYiAg7fm1s09oqyf6h.n0t4XG2', 'Gutmann, Tillman and Spencer', 'PO Box 23303', '2025-03-03', '2024-03-03'),
(8, 'gronaldson7@scientificamerican.com', '$2a$04$GkoP3L4yF.gti7xIDqdSgOhGniQu7j7mH2g8zNzv2aljTLv.7luCC', 'Kreiger, Turner and Crooks', 'PO Box 56325', '2025-03-03', '2024-03-03'),
(9, 'nsproat8@intel.com', '$2a$04$3WoRvKETpOvvCKYqmksTbOF/MoDMhsfcN5ZykuogSaD5noH42JTD6', 'Jacobs, Kessler and Pfannerstill', 'Suite 49', '2025-03-03', '2024-03-03'),
(10, 'nbawles9@moonfruit.com', '$2a$04$bu0ab.X3Fo05vKto4QeTnud5Dt58mOR9xCFji507brolMUNtwR7Oy', 'Tromp Inc', 'Suite 45', '2025-03-03', '2024-03-03');

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
  `created_at` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tenent`
--

INSERT INTO `tenent` (`organization_id`, `admin_email`, `password`, `name`, `location`, `created_at`) VALUES
(1, 'atroake0@umich.edu', '$2a$04$P8rdzmTsoO3MEp4GUv5SVenEZyaiIKPFTBNTUKyWXT2Jar8h0jiWy', 'Cruickshank-Rolfson', 'Apt 412', '2024-03-03'),
(2, 'pbarkley1@hexun.com', '$2a$04$hrRrQn2jf3LnUsI6cUU5bu.uVx4Ha3Qd7dt4CeWWrGHxpjLpp5HdW', 'Mante Group', 'Suite 48', '2024-03-03'),
(3, 'rsedgefield2@nymag.com', '$2a$04$/v3Gei9ZBZJPFgrXl9lGqOTO/jwGwf/00f.CNwdJN8L5hqjhOr16C', 'Stehr-Balistreri', 'Apt 1340', '2024-03-03'),
(4, 'ronoulane3@patch.com', '$2a$04$rYxRPUDXMaFoslYNEOPHwOpHWVCq0KBDYFQo8PzDQqpTpx7LW2N4i', 'Labadie-Krajcik', 'Suite 67', '2024-03-03'),
(5, 'kbourdis4@usnews.com', '$2a$04$UaFY5LgDS9YyX7rUbO69w.aw3TJmM807aGJOofe.J.9pmDy5vvlBy', 'Runte, Kuhn and Connelly', 'PO Box 95989', '2024-03-03'),
(6, 'amccathy5@scientificamerican.com', '$2a$04$v07HSXV2jl3DdoJ.TKBN/.Dyp1O/6hmkZGNsJ5zYJKIs7yNz0gnkS', 'Wuckert, Jacobs and Kohler', 'Suite 42', '2024-03-03'),
(7, 'amattin6@cmu.edu', '$2a$04$WZ/Q/s6YybOPX84g3vvokOReKcdLtCFOdGUBami8TBzGRkyHZGl7.', 'Beier Inc', 'Apt 26', '2024-03-03'),
(8, 'pwhistlecraft7@friendfeed.com', '$2a$04$hGjzsllWHSFI1Ytxw6Fl4u.yAeY2JMtXpE76YhdNNvM3U3bKJpELW', 'Wunsch Inc', 'PO Box 82105', '2024-03-03'),
(9, 'wmaccrosson8@tinyurl.com', '$2a$04$/Yrw3njS7QzoT/7F4p1jh.uOXF6feiEpIb88LQ2aZ8r.ejAkGQFii', 'Gusikowski-Berge', 'Suite 9', '2024-03-03'),
(22, 'wass.younes@gmail.com', '$2b$08$dTBhMDC00Csq93wgzoCBuepHHh3.bcNr4MRzGrmPflYYOJ2tjmo8.', 'wassim', 'saida', '2024-03-03');

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
  `file` varchar(500) NOT NULL,
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
-- Indexes for table `document`
--
ALTER TABLE `document`
  ADD PRIMARY KEY (`document_id`),
  ADD UNIQUE KEY `student_id` (`student_id`),
  ADD KEY `organization_id` (`organization_id`);

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
-- AUTO_INCREMENT for table `document`
--
ALTER TABLE `document`
  MODIFY `document_id` int(11) NOT NULL AUTO_INCREMENT;

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
-- Constraints for table `document`
--
ALTER TABLE `document`
  ADD CONSTRAINT `document_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `document_ibfk_2` FOREIGN KEY (`organization_id`) REFERENCES `tenent` (`organization_id`) ON UPDATE CASCADE;

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
