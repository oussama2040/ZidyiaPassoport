-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 04, 2024 at 12:32 AM
-- Server version: 10.4.6-MariaDB
-- PHP Version: 7.3.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `certificate`
--

INSERT INTO `certificate` (`certificate_id`, `student_id`, `organization_id`, `name`, `body`, `issued_date`, `expiry_date`, `created_at`, `status`, `file`, `rejection_reason`) VALUES
(1, 1, 1, 'UpdatedCertificateName', 'UpdatedBody', '2024-03-03', '2024-03-15', '2024-03-03', 'verified', 'https://res.cloudinary.com/daa9irzfz/image/upload/v1709500881/mb3hs7mqugfbmjrsdxsn.jpg', ''),
(2, 1, 1, 'UpdatedCertificateName', 'UpdatedBody', '2024-03-03', '2024-03-15', '2024-03-03', 'rejected', 'https://res.cloudinary.com/daa9irzfz/image/upload/v1709503119/cjbxw4fofdykd28oezx3.jpg', 'applicable'),
(3, 1, 1, 'Certificate Name', 'Certificate Body', '2024-03-03', '2024-03-10', '2024-03-04', 'pending', 'https://res.cloudinary.com/daa9irzfz/image/upload/v1709506274/r1vyhrffyzz9nit75bib.jpg', ''),
(4, 1, 1, 'Certificate Name', 'Certificate Body', '2024-03-03', '2024-03-10', '2024-03-04', 'pending', 'https://res.cloudinary.com/daa9irzfz/image/upload/v1709506294/rjiucb8wzza5q8ewlxr0.jpg', ''),
(5, 1, 1, 'Certificate Name', 'Certificate Body', '2024-03-03', '2024-03-10', '2024-03-04', 'pending', 'https://res.cloudinary.com/daa9irzfz/image/upload/v1709506316/lx3nhtkncgx8bns2j4c3.jpg', ''),
(6, 1, 1, 'Certificate Name', 'Certificate Body', '2024-03-03', '2024-03-10', '2024-03-04', 'pending', 'https://res.cloudinary.com/daa9irzfz/image/upload/v1709506376/in9ca112oewoepmrsgzp.jpg', ''),
(7, 1, 1, 'Certificate Name', 'Certificate Body', '2024-03-03', '2024-03-10', '2024-03-04', 'pending', 'https://res.cloudinary.com/daa9irzfz/image/upload/v1709506395/jec2ldixsjxnklehqhsf.jpg', ''),
(8, 1, 1, 'CertificateName10', 'Body2', '2024-03-03', '2024-03-10', '2024-03-04', 'verified', 'https://res.cloudinary.com/daa9irzfz/image/upload/v1709508699/xwo5wnxum3tvtf4wzeub.jpg', '');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `certificateverification`
--

INSERT INTO `certificateverification` (`verification_id`, `certificate_id`, `organization_id`, `verification_date`, `note`) VALUES
(1, 1, 1, '2024-03-03', '');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`student_id`, `ID`, `academic_id`, `first_name`, `last_name`, `email`, `password`, `mobile`, `profile_img`, `location`, `bio`, `token`, `created_at`, `updated_at`) VALUES
(1, 'a', '1', 'a', 'a', 'a', 'a', 1, 'a', 'a', 'a', 'a', '0000-00-00', '0000-00-00');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `superadmin`
--

CREATE TABLE `superadmin` (
  `superadmin_id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tenent`
--

INSERT INTO `tenent` (`organization_id`, `admin_email`, `password`, `name`, `location`, `created_at`) VALUES
(1, 'a', 'a', 'a', 'a', '0000-00-00');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `transcript`
--

INSERT INTO `transcript` (`transcript_id`, `student_id`, `organization_id`, `status`, `rejection_reason`, `file`, `verified_at`, `created_at`) VALUES
(1, 1, 1, 'pending', '', 'https://res.cloudinary.com/daa9irzfz/image/upload/v1709506317/ap1a1rt0atox7nh8kcxk.png', '0000-00-00', '2024-03-04'),
(2, 1, 1, 'pending', '', 'https://res.cloudinary.com/daa9irzfz/image/upload/v1709506396/ygc3bxapxsb1v6imf0ip.png', '0000-00-00', '2024-03-04');

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
  MODIFY `certificate_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `certificateverification`
--
ALTER TABLE `certificateverification`
  MODIFY `verification_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `student`
--
ALTER TABLE `student`
  MODIFY `student_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `subscriber`
--
ALTER TABLE `subscriber`
  MODIFY `subscriber_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `superadmin`
--
ALTER TABLE `superadmin`
  MODIFY `superadmin_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tenent`
--
ALTER TABLE `tenent`
  MODIFY `organization_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `transcript`
--
ALTER TABLE `transcript`
  MODIFY `transcript_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

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
-- Constraints for table `transcript`
--
ALTER TABLE `transcript`
  ADD CONSTRAINT `transcript_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `transcript_ibfk_2` FOREIGN KEY (`organization_id`) REFERENCES `tenent` (`organization_id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
