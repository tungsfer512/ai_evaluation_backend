/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE DATABASE IF NOT EXISTS `ai_evaluation_dev` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `ai_evaluation_dev`;

CREATE TABLE IF NOT EXISTS `dataset` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `title` varchar(255) NOT NULL,
  `path` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `problemId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `problemId` (`problemId`),
  CONSTRAINT `dataset_ibfk_1` FOREIGN KEY (`problemId`) REFERENCES `problem` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE IF NOT EXISTS `group` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

REPLACE INTO `group` (`id`, `title`, `description`, `createdAt`, `updatedAt`) VALUES
	('0b92a79e-7daf-4602-9e9b-84355b6ccd61', 'Unsupervisor Learning', 'Unsupervisor Learning', '2022-11-20 09:23:07', '2022-11-23 08:47:40'),
	('0f0202f8-c8fe-46a5-a64a-fe06974c7a94', 'Supervisor Learning', 'Supervisor Learning', '2022-11-20 09:22:33', '2022-11-20 09:22:33'),
	('caab4a0c-b8ae-4826-88f0-8c6e2f7792d3', 'Reinforcement Learning', 'Reinforcement Learning', '2022-11-23 08:49:58', '2022-11-23 08:49:58');

CREATE TABLE IF NOT EXISTS `problem` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `title` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `inputDescription` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `outputDescription` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `subGroupId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `subGroupId` (`subGroupId`),
  CONSTRAINT `problem_ibfk_1` FOREIGN KEY (`subGroupId`) REFERENCES `subgroup` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

REPLACE INTO `problem` (`id`, `title`, `description`, `inputDescription`, `outputDescription`, `subGroupId`, `createdAt`, `updatedAt`) VALUES
	('11b4cf78-f831-4a37-8cae-b21f96e5be0d', 'v', 'v', 'v', 'v', '55715e69-2ea5-413f-a508-7d368fcefea7', '2022-11-20 17:50:40', '2022-11-22 03:47:30'),
	('15bac641-d7bb-4813-b06e-dcca58f37993', 'House Prices - Advanced Regression Techniques', 'Ask a home buyer to describe their dream house, and they probably won\'t begin with the height of the basement ceiling or the proximity to an east-west railroad. But this playground competition\'s dataset proves that much more influences price negotiations than the number of bedrooms or a white-picket fence. With 79 explanatory variables describing (almost) every aspect of residential homes in Ames, Iowa, this competition challenges you to predict the final price of each home.', 'Submissions are evaluated on Root-Mean-Squared-Error (RMSE) between the logarithm of the predicted value and the logarithm of the observed sales price. (Taking logs means that errors in predicting expensive houses and cheap houses will affect the result equally.)', 'It is your job to predict the sales price for each house. For each Id in the test set, you must predict the value of the SalePrice variable.', '55715e69-2ea5-413f-a508-7d368fcefea7', '2022-11-20 09:57:43', '2022-11-20 09:57:43'),
	('1b13c89d-0905-49ec-ad0d-7b73243ab8c7', 'Novozymes Enzyme Stability Prediction', 'Enzymes are proteins that act as catalysts in the chemical reactions of living organisms. The goal of this competition is to predict the thermostability of enzyme variants. The experimentally measured thermostability (melting temperature) data includes natural sequences, as well as engineered sequences with single or multiple mutations upon the natural sequences. Understanding and accurately predict protein stability is a fundamental problem in biotechnology. Its applications include enzyme engineering for addressing the world’s challenges in sustainability, carbon neutrality and more. Improvements to enzyme stability could lower costs and increase the speed scientists can iterate on concepts.', 'Each seq_id represents a single-mutation variant of an enzyme. Your task is to rank the stability of these variants, assigning greater ranks to more stable variants.', 'For each seq_id in the test set, you must predict the value for for the target tm.', '55715e69-2ea5-413f-a508-7d368fcefea7', '2022-11-20 09:36:44', '2022-11-20 09:36:44'),
	('521884dd-abb7-4c7c-bda5-560728784c9b', 'House Prices - Advanced Regression Techniques', 'House Prices - Advanced Regression Techniques\', group:  \'Supervisors\', subgroup: \'Regression\', description: "Ask a home buyer to describe their dream house, and they probably won\'t begin with the height of the basement ceiling or the proximity to an east-west railroad. But this playground competition\'s dataset proves that much more influences price negotiations than the number of bedrooms or a white-picket fence. With 79 explanatory variables describing (almost) every aspect of residential homes in Ames, Iowa, this competition challenges you to predict the final price of each home.', 'Submissions are evaluated on Root-Mean-Squared-Error (RMSE) between the logarithm of the predicted value and the logarithm of the observed sales price. (Taking logs means that errors in predicting expensive houses and cheap houses will affect the result equally.)', 'It is your job to predict the sales price for each house. For each Id in the test set, you must predict the value of the SalePrice variable.', '55715e69-2ea5-413f-a508-7d368fcefea7', '2022-11-20 09:49:41', '2022-11-20 09:49:41'),
	('5dddd639-2c48-4e77-8c15-28fdb3ebe0e7', 'Digit Recognizer', 'MNIST ("Modified National Institute of Standards and Technology") is the de facto “hello world” dataset of computer vision. Since its release in 1999, this classic dataset of handwritten images has served as the basis for benchmarking classification algorithms. As new machine learning techniques emerge, MNIST remains a reliable resource for researchers and learners alike. In this competition, your goal is to correctly identify digits from a dataset of tens of thousands of handwritten images. We’ve curated a set of tutorial-style kernels which cover everything from regression to neural networks. We encourage you to experiment with different algorithms to learn first-hand what works well and how techniques compare.', 'An image of a handwritten single digit', 'The goal in this competition is to take an image of a handwritten single digit, and determine what that digit is. For every in the test set, you should predict the correct label.', 'eed21d3a-e2f4-4cc9-8b33-d248662c01ec', '2022-11-20 09:43:54', '2022-11-20 09:43:54'),
	('6d6b2ede-18ba-4a60-8966-84566b4a826c', 'a2', '2', '2', '2', 'c9c8f10a-4c9d-49f6-a9c6-87b8aae0cb53', '2022-11-20 17:50:18', '2022-11-20 17:50:18'),
	('8aaaf6e0-15eb-400f-8b4b-9244a2abb7eb', 'Digit Recognizer', 'MNIST ("Modified National Institute of Standards and Technology") is the de facto “hello world” dataset of computer vision. Since its release in 1999, this classic dataset of handwritten images has served as the basis for benchmarking classification algorithms. As new machine learning techniques emerge, MNIST remains a reliable resource for researchers and learners alike. In this competition, your goal is to correctly identify digits from a dataset of tens of thousands of handwritten images. We’ve curated a set of tutorial-style kernels which cover everything from regression to neural networks. We encourage you to experiment with different algorithms to learn first-hand what works well and how techniques compare.', 'An image of a handwritten single digit', 'The goal in this competition is to take an image of a handwritten single digit, and determine what that digit is. For every in the test set, you should predict the correct label.', 'eed21d3a-e2f4-4cc9-8b33-d248662c01ec', '2022-11-20 09:56:55', '2022-11-20 09:56:55'),
	('8e108a45-fb39-440d-84cd-8ab5d6b3caef', 'Novozymes Enzyme Stability Prediction', 'Enzymes are proteins that act as catalysts in the chemical reactions of living organisms. The goal of this competition is to predict the thermostability of enzyme variants. The experimentally measured thermostability (melting temperature) data includes natural sequences, as well as engineered sequences with single or multiple mutations upon the natural sequences. Understanding and accurately predict protein stability is a fundamental problem in biotechnology. Its applications include enzyme engineering for addressing the world’s challenges in sustainability, carbon neutrality and more. Improvements to enzyme stability could lower costs and increase the speed scientists can iterate on concepts.', 'Each seq_id represents a single-mutation variant of an enzyme. Your task is to rank the stability of these variants, assigning greater ranks to more stable variants.', 'For each seq_id in the test set, you must predict the value for for the target tm.', '55715e69-2ea5-413f-a508-7d368fcefea7', '2022-11-20 09:55:21', '2022-11-20 09:55:21'),
	('b9ec897a-5d8b-4be0-9c5d-1c1193954e61', 'Petals to the Metal - Flower Classification on TPU', 'It’s difficult to fathom just how vast and diverse our natural world is. There are over 5,000 species of mammals, 10,000 species of birds, 30,000 species of fish – and astonishingly, over 400,000 different types of flowers.In this competition, you’re challenged to build a machine learning model that identifies the type of flowers in a dataset of images (for simplicity, we’re sticking to just over 100 types).', 'Submissions are evaluated on macro F1 score.', 'For each id in the test set, you must predict a type of flower (or label).', '2afb94d0-275b-4e7e-816f-ae8bc61c3b6b', '2022-11-20 09:54:12', '2022-11-20 09:54:12'),
	('baeb809c-6606-4d4b-8d28-f83e0e99fcbb', 'Petals to the Metal - Flower Classification on TPU', 'It’s difficult to fathom just how vast and diverse our natural world is. There are over 5,000 species of mammals, 10,000 species of birds, 30,000 species of fish – and astonishingly, over 400,000 different types of flowers.In this competition, you’re challenged to build a machine learning model that identifies the type of flowers in a dataset of images (for simplicity, we’re sticking to just over 100 types).', 'Submissions are evaluated on macro F1 score.', 'For each id in the test set, you must predict a type of flower (or label).', 'eed21d3a-e2f4-4cc9-8b33-d248662c01ec', '2022-11-20 09:58:59', '2022-11-20 09:58:59'),
	('c14c6a3b-e19d-4eb1-a667-d48d765c2fe8', 'Natural Language Processing with Disaster Tweets', 'Twitter has become an important communication channel in times of emergency. The ubiquitousness of smartphones enables people to announce an emergency they’re observing in real-time. Because of this, more agencies are interested in programatically monitoring Twitter (i.e. disaster relief organizations and news agencies). But, it’s not always clear whether a person’s words are actually announcing a disaster.', 'Submissions are evaluated using F1 between the predicted and expected answers.', 'For each ID in the test set, you must predict 1 if the tweet is describing a real disaster, and 0 otherwise.', '55715e69-2ea5-413f-a508-7d368fcefea7', '2022-11-20 09:51:15', '2022-11-20 09:51:15'),
	('ca9cd3bf-5bd8-4308-af2c-fec93957e757', 'Natural Language Processing with Disaster Tweets', 'Twitter has become an important communication channel in times of emergency. The ubiquitousness of smartphones enables people to announce an emergency they’re observing in real-time. Because of this, more agencies are interested in programatically monitoring Twitter (i.e. disaster relief organizations and news agencies). But, it’s not always clear whether a person’s words are actually announcing a disaster.', 'Submissions are evaluated using F1 between the predicted and expected answers.', 'For each ID in the test set, you must predict 1 if the tweet is describing a real disaster, and 0 otherwise.', 'd378915b-1a24-4f62-b7ec-2b71869dff65', '2022-11-20 09:58:21', '2022-11-20 09:58:21'),
	('ec0cb7f9-9a70-47d0-9c4d-f84f124c3ecb', 'a1', 'a1', 'a1', 'a', '4d3a46a9-8546-4c76-9860-adfe03d74437', '2022-11-20 17:49:20', '2022-11-20 17:49:20'),
	('ef06b722-f59b-4c8d-9227-f2b9fd591667', 'Predict Future Sales', 'In this competition you will work with a challenging time-series dataset consisting of daily sales data, kindly provided by one of the largest Russian software firms - 1C Company. We are asking you to predict total sales for every product and store in the next month. By solving this competition you will be able to apply and enhance your data science skills.', 'Submissions are evaluated by root mean squared error (RMSE). True target values are clipped into [0,20] range.', 'For each id in the test set, you must predict a total number of sales.', '55715e69-2ea5-413f-a508-7d368fcefea7', '2022-11-20 09:41:29', '2022-11-20 09:41:29'),
	('fbf0e74a-e33f-418f-a872-5745f7bbad86', 'Predict Future Sales', 'In this competition you will work with a challenging time-series dataset consisting of daily sales data, kindly provided by one of the largest Russian software firms - 1C Company. We are asking you to predict total sales for every product and store in the next month. By solving this competition you will be able to apply and enhance your data science skills.', 'Submissions are evaluated by root mean squared error (RMSE). True target values are clipped into [0,20] range.', 'For each id in the test set, you must predict a total number of sales.', 'd378915b-1a24-4f62-b7ec-2b71869dff65', '2022-11-20 09:56:05', '2022-11-20 09:56:05');

CREATE TABLE IF NOT EXISTS `subgroup` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `groupId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `groupId` (`groupId`),
  CONSTRAINT `subgroup_ibfk_1` FOREIGN KEY (`groupId`) REFERENCES `group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

REPLACE INTO `subgroup` (`id`, `title`, `description`, `groupId`, `createdAt`, `updatedAt`) VALUES
	('2afb94d0-275b-4e7e-816f-ae8bc61c3b6b', 'Classification', 'Classification', '0f0202f8-c8fe-46a5-a64a-fe06974c7a94', '2022-11-20 09:26:48', '2022-11-20 09:26:48'),
	('4d3a46a9-8546-4c76-9860-adfe03d74437', 'Clustering', 'Clustering', '0f0202f8-c8fe-46a5-a64a-fe06974c7a94', '2022-11-20 09:26:52', '2022-11-20 09:26:52'),
	('55715e69-2ea5-413f-a508-7d368fcefea7', 'Regression', 'Regression', '0b92a79e-7daf-4602-9e9b-84355b6ccd61', '2022-11-20 09:25:53', '2022-11-20 09:25:53'),
	('839106e2-83a2-4944-ad8f-18b94fe9e685', 'Association', 'Association', '0b92a79e-7daf-4602-9e9b-84355b6ccd61', '2022-11-20 09:26:13', '2022-11-20 09:26:13'),
	('c9c8f10a-4c9d-49f6-a9c6-87b8aae0cb53', 'Clustering', 'Clustering', '0b92a79e-7daf-4602-9e9b-84355b6ccd61', '2022-11-20 09:26:07', '2022-11-20 09:26:07'),
	('d378915b-1a24-4f62-b7ec-2b71869dff65', 'Regression', 'Regression', '0f0202f8-c8fe-46a5-a64a-fe06974c7a94', '2022-11-20 09:26:42', '2022-11-20 09:26:42'),
	('eed21d3a-e2f4-4cc9-8b33-d248662c01ec', 'Classification', 'Classification', '0b92a79e-7daf-4602-9e9b-84355b6ccd61', '2022-11-20 09:26:03', '2022-11-20 09:26:03'),
	('f0156afe-5df6-4bf0-8b93-58f523324fa8', 'Anomaly Detection', 'Anomaly Detection', '0b92a79e-7daf-4602-9e9b-84355b6ccd61', '2022-11-20 09:26:20', '2022-11-20 09:26:20');

CREATE TABLE IF NOT EXISTS `submission` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `accuracyModel` double DEFAULT NULL,
  `accuracyTest` double DEFAULT NULL,
  `excutionTime` double DEFAULT NULL,
  `excutionMemories` double DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'pending',
  `description` varchar(255) DEFAULT NULL,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `problemId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `problemId` (`problemId`),
  CONSTRAINT `submission_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`),
  CONSTRAINT `submission_ibfk_2` FOREIGN KEY (`problemId`) REFERENCES `problem` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE IF NOT EXISTS `user` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

REPLACE INTO `user` (`id`, `username`, `password`, `email`, `firstName`, `lastName`, `role`, `createdAt`, `updatedAt`) VALUES
	('314b4da1-a364-47c5-8c6a-c74e88594ae8', 'admin', '$2b$10$xce9Pj.sImKaZL./iNQV0u2UUOkhUSeHZypfdJgyJuL9Hef02hrbe', 'admin@gmail.com', 'Admin', 'Admin', 'admin', '2022-11-27 02:45:49', '2022-11-27 02:45:49'),
	('6702a0e7-4283-4f1d-b406-b2bff0b8e1f3', 'superadmin', '$2b$10$K4VaglfBLfRV6FI6wDOqo.o6IoX59BioJvmv12jOAY1LrQB/IKMdC', 'superadmin@gmail.com', 'Superadmin', 'Superadmin', 'superadmin', '2022-11-27 02:46:35', '2022-11-27 02:46:35'),
	('8552c585-064d-42da-9b52-5f34f333cfaa', 'user', '$2b$10$e4/ZYkpgA1FqpqCrsy8h8.6QGRyrIJj8XqVQghNLR9DekoPNxjrme', 'user@gmail.com', 'User', 'User', 'user', '2022-11-27 02:46:07', '2022-11-27 02:46:07');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
