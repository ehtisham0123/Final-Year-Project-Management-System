-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 20, 2022 at 02:26 PM
-- Server version: 10.4.19-MariaDB-log
-- PHP Version: 8.0.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `final_year_project_management_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `gender` varchar(255) NOT NULL,
  `age` int(11) NOT NULL,
  `contact` varchar(255) NOT NULL,
  `avatar` varchar(255) NOT NULL,
  `address` text NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `name`, `email`, `password`, `firstname`, `lastname`, `gender`, `age`, `contact`, `avatar`, `address`, `created_at`, `updated_at`) VALUES
('2467a5d8-13ae-46a3-ae49-26f337a7216b', 'alihusnain', 'alihusnainraza@gmail.com', '$2b$08$SNZiz9daX8K5dD0eAcghMOFOhG/cbbgMCzEZXEQtRCUT8JeXraTFy', 'Ali', 'Husnain', 'male', 23, '03025322445', 'ali_husnain.1642682189956.jpg', 'Bilal Town Abbottabad Pakistan', '2021-10-04 19:27:19', '2022-01-20 12:36:30'),
('9b57dce1-6945-453c-8977-ec99b62db824', 'ehtisham', 'ehtisham@gmail.com', '$2b$10$JpB98IBLC9o1HSYiYXRrOe54Kx07mn0rLXPxkQVyJ7tJeM.jOfom6', 'ehtisham', 'khan', 'male', 21, '03459550908', 'UENX7241.JPG', 'Abbottabad Pakistan', '2021-09-17 22:40:35', '2022-01-07 20:12:01'),
('c0b51bb4-c142-436f-906e-27555cf33e35', 'Badshah', 'syedabdullah@gmail.com', '$2b$08$teb688WYHrhZUor1WosyVeShrn9KlOZbVGvXzVVCri3KP3IuR2m1m', 'Abdullah', 'Badshah', 'male', 22, '03139823563', 'badshah.1642682261861.jpg', 'abbottabad', '2021-09-17 22:40:35', '2022-01-20 12:38:59');

-- --------------------------------------------------------

--
-- Table structure for table `chat`
--

CREATE TABLE `chat` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `student_id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `teacher_id` char(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `groups`
--

CREATE TABLE `groups` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `student1_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `student2_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `groups`
--

INSERT INTO `groups` (`id`, `created_at`, `updated_at`, `student1_id`, `student2_id`) VALUES
('0e245d57-7143-4ba4-bdaa-09e0ac84f73f', '2022-01-20 12:48:19', '2022-01-20 12:48:19', '0f485951-607f-474f-bb63-5ab5a7b2a07c', NULL),
('40a93345-8406-4e05-9436-e7d1ae8800e7', '2022-01-19 21:13:53', '2022-01-19 21:13:53', 'c0b51bb4-c142-436f-906e-27555cf33e35', '2467a5d8-13ae-46a3-ae49-26f337a7216b');

-- --------------------------------------------------------

--
-- Table structure for table `group_requests`
--

CREATE TABLE `group_requests` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `student1_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `student2_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `student_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `teacher_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(11) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) NOT NULL,
  `details` text NOT NULL,
  `discipline` text NOT NULL,
  `session` text NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `teacher_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `admin_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `name`, `details`, `discipline`, `session`, `created_at`, `updated_at`, `teacher_id`, `admin_id`) VALUES
('48aa7dc3-dbd3-4afc-8112-6e8a1f25bb86', 'What is Lorem Ipsum? Where does it come from?', '\nLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', 'Software Engineering', 'Fall 2017', '2022-01-20 12:37:08', '2022-01-20 12:37:08', NULL, '2467a5d8-13ae-46a3-ae49-26f337a7216b'),
('993b3275-9c89-4846-98bf-cf231dc932ad', 'What is Lorem Ipsum?', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', 'Software Engineering', 'Fall 2017', '2022-01-03 12:54:57', '2022-01-07 13:49:50', 'f5a7a758-3464-4651-a50e-e4852b2c7713', NULL),
('acc2b1e5-812f-4f45-b2f0-db73ae278acc', 'What is Lorem Ipsum? Where does it come from? Why do we use it? Where can I get some?', 'What is Lorem Ipsum? Where does it come from? Why do we use it? Where can I get some? What is Lorem Ipsum? Where does it come from? Why do we use it? Where can I get some? What is Lorem Ipsum? Where does it come from? Why do we use it? Where can I get some? What is Lorem Ipsum? Where does it come from? Why do we use it? Where can I get some? What is Lorem Ipsum? Where does it come from? Why do we use it? Where can I get some?', 'Software Engineering', 'Fall 2017', '2022-01-20 12:38:42', '2022-01-20 12:38:42', NULL, 'c0b51bb4-c142-436f-906e-27555cf33e35');

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) NOT NULL,
  `details` text NOT NULL,
  `discipline` text NOT NULL,
  `session` text NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`id`, `name`, `details`, `discipline`, `session`, `created_at`, `updated_at`) VALUES
('1db3ec09-271a-4db2-b08f-9f246c285a63', 'Final Year Project Management System', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', 'Software Engineering', 'Fall 2017', '2021-10-25 18:25:38', '2022-01-11 17:01:47'),
('7d463bcc-7009-406f-b665-a130f65bf108', 'Service Provider Web Application ', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum', 'Software Engineering', 'Fall 2017', '2022-01-20 11:31:04', '2022-01-20 11:31:04');

-- --------------------------------------------------------

--
-- Table structure for table `project_allocations`
--

CREATE TABLE `project_allocations` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `group_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `project_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `project_allocations`
--

INSERT INTO `project_allocations` (`id`, `created_at`, `updated_at`, `group_id`, `project_id`) VALUES
('2be56034-bd34-41ea-af4e-d4371ff7f3e3', '2022-01-19 21:20:39', '2022-01-19 21:20:39', '40a93345-8406-4e05-9436-e7d1ae8800e7', '1db3ec09-271a-4db2-b08f-9f246c285a63'),
('bd97f17a-f456-482f-8d00-07a0b40338cb', '2022-01-20 12:48:28', '2022-01-20 12:48:28', '0e245d57-7143-4ba4-bdaa-09e0ac84f73f', '7d463bcc-7009-406f-b665-a130f65bf108');

-- --------------------------------------------------------

--
-- Table structure for table `project_oraganizer_assignments`
--

CREATE TABLE `project_oraganizer_assignments` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) NOT NULL,
  `marks` int(11) NOT NULL,
  `discipline` text NOT NULL,
  `session` text NOT NULL,
  `details` text NOT NULL,
  `deadline` text NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `teacher_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `project_oraganizer_assignments`
--

INSERT INTO `project_oraganizer_assignments` (`id`, `name`, `marks`, `discipline`, `session`, `details`, `deadline`, `created_at`, `updated_at`, `teacher_id`) VALUES
('a4e17966-fd0d-46a9-b051-f1d55fb686c2', 'What is Lorem Ipsum? Where does it come from?', 25, 'Software Engineering', 'Fall 2017', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', '2022-01-22T02:04', '2022-01-19 21:04:14', '2022-01-19 21:04:14', 'f5a7a758-3464-4651-a50e-e4852b2c7713'),
('cbba8e76-1185-43d0-8ec0-78fb6b515fc3', 'Where does it come from?', 25, 'Software Engineering', 'Fall 2017', 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)', '2022-01-21T02:06', '2022-01-19 21:06:14', '2022-01-19 21:06:14', 'f5a7a758-3464-4651-a50e-e4852b2c7713'),
('e550b5e3-f0dc-41ce-80df-ad9d7e2f398e', 'Why do we use it? Where can I get some?', 25, 'Software Engineering', 'Fall 2017', 'Why do we use it? Where can I get some?\nContrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.', '2022-01-21T02:05', '2022-01-19 21:05:35', '2022-01-19 21:05:35', 'f5a7a758-3464-4651-a50e-e4852b2c7713');

-- --------------------------------------------------------

--
-- Table structure for table `project_oraganizer_assignment_submissions`
--

CREATE TABLE `project_oraganizer_assignment_submissions` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `file` varchar(255) NOT NULL,
  `file_type` varchar(255) NOT NULL,
  `obtained_marks` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `student_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `assignment_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `project_oraganizer_assignment_submissions`
--

INSERT INTO `project_oraganizer_assignment_submissions` (`id`, `file`, `file_type`, `obtained_marks`, `created_at`, `updated_at`, `student_id`, `assignment_id`) VALUES
('0b50ecb8-edad-478c-8d11-881ca494dae5', 'Document The Software Design.1642680220714.pdf', 'pdf', NULL, '2022-01-20 12:03:40', '2022-01-20 12:03:40', '0f485951-607f-474f-bb63-5ab5a7b2a07c', 'cbba8e76-1185-43d0-8ec0-78fb6b515fc3');

-- --------------------------------------------------------

--
-- Table structure for table `project_organizers`
--

CREATE TABLE `project_organizers` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `discipline` text NOT NULL,
  `session` text NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `teacher_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `project_organizers`
--

INSERT INTO `project_organizers` (`id`, `discipline`, `session`, `created_at`, `updated_at`, `teacher_id`) VALUES
('c4d84da3-6cdd-47ae-bf7d-35081e9d8d9d', 'Software Engineering', 'Fall 2017', '2022-01-20 11:33:45', '2022-01-20 11:33:45', 'f5a7a758-3464-4651-a50e-e4852b2c7713'),
('d0ea1c6c-f96f-498f-94bf-f7079e1a8d4b', 'Computer Science', 'Fall 2017', '2022-01-20 11:51:11', '2022-01-20 11:51:11', 'f5a7a758-3464-4651-a50e-e4852b2c7713');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `name`, `created_at`, `updated_at`) VALUES
('6ac5b5ab-c1a6-4670-9383-e6b0bb0bd1e8', 'Fall 2017', '2021-10-26 21:50:17', '2021-10-26 21:50:17');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `gender` varchar(255) NOT NULL,
  `cgpa` float NOT NULL,
  `age` int(11) NOT NULL,
  `rollnumber` int(11) NOT NULL,
  `contact` varchar(255) NOT NULL,
  `avatar` varchar(255) NOT NULL,
  `address` text NOT NULL,
  `discipline` text NOT NULL,
  `session` text NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id`, `name`, `email`, `password`, `firstname`, `lastname`, `gender`, `cgpa`, `age`, `rollnumber`, `contact`, `avatar`, `address`, `discipline`, `session`, `created_at`, `updated_at`) VALUES
('0f485951-607f-474f-bb63-5ab5a7b2a07c', 'Ehtisham', 'ehtishamjadoon1234@gmail.com', '$2b$08$Anf1OMw96dT.aTX34jKVCOdeEmklQGgc1CptifNYjhBguprtEohW2', 'Ehtisham', 'Jadoon', 'male', 2.44, 25, 5493, '03459550908', 'UENX7241.1642677403389.JPG', 'Murree Road Abbottabad', 'Software Engineering', 'Fall 2017', '2022-01-20 11:16:43', '2022-01-20 11:22:04'),
('2467a5d8-13ae-46a3-ae49-26f337a7216b', 'alihusnain', 'alihusnainraza@gmail.com', '$2b$08$SNZiz9daX8K5dD0eAcghMOFOhG/cbbgMCzEZXEQtRCUT8JeXraTFy', 'Ali', 'Husnain', 'male', 2.4, 23, 5570, '03025322445', 'profile.png', 'Bilal Town Abbottabad Pakistan', 'Software Engineering', 'Fall 2017', '2021-10-04 19:27:19', '2022-01-17 20:20:01'),
('c0b51bb4-c142-436f-906e-27555cf33e35', 'Badshah123', 'syedabdullah@gmail.com', '$2b$08$teb688WYHrhZUor1WosyVeShrn9KlOZbVGvXzVVCri3KP3IuR2m1m', 'Abdullah', 'Badshah', 'male', 3, 22, 5500, '03139823563', 'badshah.1633375857530.jpg', 'Abbottabad Pakistan', 'Software Engineering', 'Fall 2017', '2021-10-04 19:01:22', '2021-10-16 18:03:20');

-- --------------------------------------------------------

--
-- Table structure for table `supervisors`
--

CREATE TABLE `supervisors` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `teacher_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `project_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `supervisors`
--

INSERT INTO `supervisors` (`id`, `created_at`, `updated_at`, `teacher_id`, `project_id`) VALUES
('4181d355-1a0f-492a-974c-9177d9b7b4b5', '2022-01-20 11:33:05', '2022-01-20 11:33:05', 'f5a7a758-3464-4651-a50e-e4852b2c7713', '7d463bcc-7009-406f-b665-a130f65bf108'),
('db4090bc-2907-4a7a-8cb7-06fe33cbac81', '2022-01-20 11:31:12', '2022-01-20 11:31:12', 'f5a7a758-3464-4651-a50e-e4852b2c7713', '1db3ec09-271a-4db2-b08f-9f246c285a63');

-- --------------------------------------------------------

--
-- Table structure for table `supervisor_assignments`
--

CREATE TABLE `supervisor_assignments` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) NOT NULL,
  `marks` int(11) NOT NULL,
  `details` text NOT NULL,
  `deadline` text NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `project_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `teacher_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `supervisor_assignments`
--

INSERT INTO `supervisor_assignments` (`id`, `name`, `marks`, `details`, `deadline`, `created_at`, `updated_at`, `project_id`, `teacher_id`) VALUES
('3fc5b884-120c-40a7-a5d9-040c6e42a447', 'What is Lorem Ipsum? Where does it come from?', 25, 'What is Lorem Ipsum?\nLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', '2022-01-20T16:01', '2022-01-20 11:57:18', '2022-01-20 11:57:18', '1db3ec09-271a-4db2-b08f-9f246c285a63', 'f5a7a758-3464-4651-a50e-e4852b2c7713'),
('f9ad1eb8-8e2a-4c8c-b097-aa126a87f5d2', 'What is Lorem Ipsum?', 25, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', '2022-01-22T16:57', '2022-01-20 11:58:01', '2022-01-20 11:58:01', '7d463bcc-7009-406f-b665-a130f65bf108', 'f5a7a758-3464-4651-a50e-e4852b2c7713');

-- --------------------------------------------------------

--
-- Table structure for table `supervisor_assignment_submissions`
--

CREATE TABLE `supervisor_assignment_submissions` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `file` varchar(255) NOT NULL,
  `file_type` varchar(255) NOT NULL,
  `obtained_marks` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `student_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `assignment_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `teachers`
--

CREATE TABLE `teachers` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `gender` varchar(255) NOT NULL,
  `age` int(11) NOT NULL,
  `contact` varchar(255) NOT NULL,
  `avatar` varchar(255) NOT NULL,
  `address` text NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `teachers`
--

INSERT INTO `teachers` (`id`, `name`, `email`, `password`, `firstname`, `lastname`, `gender`, `age`, `contact`, `avatar`, `address`, `created_at`, `updated_at`) VALUES
('f5a7a758-3464-4651-a50e-e4852b2c7713', 'Sidra123', 'engr.sidra19@gmail.com', '$2b$08$jcA7KbbaxzeLT6Htxzk6iO1Fpy.lXKKFagZZuxoychNUNjrfc734O', 'Sidra', 'Zubair', 'female', 29, '090078601', 'profile.png', 'Abbottabad Pakistan', '2021-10-04 19:07:55', '2022-01-08 20:44:16');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `chat`
--
ALTER TABLE `chat`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`id`),
  ADD KEY `groups_ibfk_1` (`student1_id`),
  ADD KEY `groups_ibfk_2` (`student2_id`);

--
-- Indexes for table `group_requests`
--
ALTER TABLE `group_requests`
  ADD PRIMARY KEY (`id`),
  ADD KEY `group_requests_ibfk_1` (`student1_id`),
  ADD KEY `group_requests_ibfk_2` (`student2_id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `student_id` (`student_id`),
  ADD KEY `teacher_id` (`teacher_id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `posts_ibfk_1` (`teacher_id`),
  ADD KEY `posts_ibfk_2` (`admin_id`);

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `project_allocations`
--
ALTER TABLE `project_allocations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `project_allocations_ibfk_1` (`group_id`),
  ADD KEY `project_allocations_ibfk_2` (`project_id`);

--
-- Indexes for table `project_oraganizer_assignments`
--
ALTER TABLE `project_oraganizer_assignments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `project_oraganizer_assignments_ibfk_1` (`teacher_id`);

--
-- Indexes for table `project_oraganizer_assignment_submissions`
--
ALTER TABLE `project_oraganizer_assignment_submissions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `project_oraganizer_assignment_submissions_ibfk_1` (`student_id`),
  ADD KEY `project_oraganizer_assignment_submissions_ibfk_2` (`assignment_id`);

--
-- Indexes for table `project_organizers`
--
ALTER TABLE `project_organizers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `project_organizers_ibfk_1` (`teacher_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `supervisors`
--
ALTER TABLE `supervisors`
  ADD PRIMARY KEY (`id`),
  ADD KEY `supervisors_ibfk_1` (`teacher_id`),
  ADD KEY `supervisors_ibfk_2` (`project_id`);

--
-- Indexes for table `supervisor_assignments`
--
ALTER TABLE `supervisor_assignments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `supervisor_assignments_ibfk_1` (`project_id`),
  ADD KEY `supervisor_assignments_ibfk_2` (`teacher_id`);

--
-- Indexes for table `supervisor_assignment_submissions`
--
ALTER TABLE `supervisor_assignment_submissions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `supervisor_assignment_submissions_ibfk_1` (`student_id`),
  ADD KEY `supervisor_assignment_submissions_ibfk_2` (`assignment_id`);

--
-- Indexes for table `teachers`
--
ALTER TABLE `teachers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `chat`
--
ALTER TABLE `chat`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=131;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `groups`
--
ALTER TABLE `groups`
  ADD CONSTRAINT `groups_ibfk_1` FOREIGN KEY (`student1_id`) REFERENCES `students` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `groups_ibfk_2` FOREIGN KEY (`student2_id`) REFERENCES `students` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `group_requests`
--
ALTER TABLE `group_requests`
  ADD CONSTRAINT `group_requests_ibfk_1` FOREIGN KEY (`student1_id`) REFERENCES `students` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `group_requests_ibfk_2` FOREIGN KEY (`student2_id`) REFERENCES `students` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `posts_ibfk_2` FOREIGN KEY (`admin_id`) REFERENCES `admins` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `project_allocations`
--
ALTER TABLE `project_allocations`
  ADD CONSTRAINT `project_allocations_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `project_allocations_ibfk_2` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `project_oraganizer_assignments`
--
ALTER TABLE `project_oraganizer_assignments`
  ADD CONSTRAINT `project_oraganizer_assignments_ibfk_1` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `project_oraganizer_assignment_submissions`
--
ALTER TABLE `project_oraganizer_assignment_submissions`
  ADD CONSTRAINT `project_oraganizer_assignment_submissions_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `project_oraganizer_assignment_submissions_ibfk_2` FOREIGN KEY (`assignment_id`) REFERENCES `project_oraganizer_assignments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `project_organizers`
--
ALTER TABLE `project_organizers`
  ADD CONSTRAINT `project_organizers_ibfk_1` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `supervisors`
--
ALTER TABLE `supervisors`
  ADD CONSTRAINT `supervisors_ibfk_1` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `supervisors_ibfk_2` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `supervisor_assignments`
--
ALTER TABLE `supervisor_assignments`
  ADD CONSTRAINT `supervisor_assignments_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `supervisor_assignments_ibfk_2` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `supervisor_assignment_submissions`
--
ALTER TABLE `supervisor_assignment_submissions`
  ADD CONSTRAINT `supervisor_assignment_submissions_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `supervisor_assignment_submissions_ibfk_2` FOREIGN KEY (`assignment_id`) REFERENCES `supervisor_assignments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
