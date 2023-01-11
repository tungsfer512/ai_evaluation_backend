-- --------------------------------------------------------
-- Máy chủ:                      127.0.0.1
-- Server version:               8.0.31 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Phiên bản:           12.3.0.6589
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for ai_evaluation_dev_1
CREATE DATABASE IF NOT EXISTS `ai_evaluation_dev_1` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `ai_evaluation_dev_1`;

-- Dumping structure for table ai_evaluation_dev_1.dataset
CREATE TABLE IF NOT EXISTS `dataset` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `title` text NOT NULL,
  `path` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table ai_evaluation_dev_1.dataset: ~4 rows (approximately)
REPLACE INTO `dataset` (`id`, `title`, `path`, `createdAt`, `updatedAt`) VALUES
	('0496234e-684d-4361-8362-0b4274a1c748', 'License Plate Recognition', 'license_plate_recognition', '2022-12-26 19:59:21', '2022-12-26 19:59:21'),
	('22cf4679-7ed9-4b55-8c4f-dc1ed807bccb', 'Object detection', 'object_detection', '2022-12-26 19:35:55', '2022-12-26 19:35:55'),
	('496e727f-801d-4dbd-a394-3e32dfefbb75', 'People counting', 'people_counting', '2022-12-26 19:21:30', '2022-12-26 19:21:30'),
	('9e059837-f436-450a-9d39-05511fa0c748', ' Vehicle counting', 'vehicle_counting', '2022-12-26 17:28:15', '2022-12-26 17:28:15');

-- Dumping structure for table ai_evaluation_dev_1.group
CREATE TABLE IF NOT EXISTS `group` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `title` text NOT NULL,
  `description` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table ai_evaluation_dev_1.group: ~3 rows (approximately)
REPLACE INTO `group` (`id`, `title`, `description`, `createdAt`, `updatedAt`) VALUES
	('0b92a79e-7daf-4602-9e9b-84355b6ccd61', 'Unsupervisor Learning', 'Unsupervisor Learning', '2022-11-20 09:23:07', '2022-11-23 08:47:40'),
	('0f0202f8-c8fe-46a5-a64a-fe06974c7a94', 'Supervisor Learning', 'Supervisor Learning', '2022-11-20 09:22:33', '2022-11-20 09:22:33'),
	('caab4a0c-b8ae-4826-88f0-8c6e2f7792d3', 'Reinforcement Learning', 'Reinforcement Learning', '2022-11-23 08:49:58', '2022-11-23 08:49:58');

-- Dumping structure for table ai_evaluation_dev_1.problem
CREATE TABLE IF NOT EXISTS `problem` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `title` text NOT NULL,
  `description` text NOT NULL,
  `inputDescription` text NOT NULL,
  `outputDescription` text NOT NULL,
  `inputSample` text NOT NULL,
  `outputSample` text NOT NULL,
  `subGroupId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `datasetId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `subGroupId` (`subGroupId`),
  KEY `datasetId` (`datasetId`),
  CONSTRAINT `problem_ibfk_1` FOREIGN KEY (`subGroupId`) REFERENCES `subgroup` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `problem_ibfk_2` FOREIGN KEY (`datasetId`) REFERENCES `dataset` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table ai_evaluation_dev_1.problem: ~4 rows (approximately)
REPLACE INTO `problem` (`id`, `title`, `description`, `inputDescription`, `outputDescription`, `inputSample`, `outputSample`, `subGroupId`, `datasetId`, `createdAt`, `updatedAt`) VALUES
	('41c24adf-2da4-4763-93f0-980d28d629f8', 'Vehicle counting', 'The data set contains 31 video clips (about 9 hours in total) captured from 20 unique camera views (some cameras provide multiple video clips to cover different lighting and weather conditions.). Each camera view comes with a detailed instruction document describing the region of interest (ROI), movements of interest (MOI) and how vehicles should be counted (please refer to the ReadMe.txt file for more details). The instruction document is meant to remove the ambiguities so that different people manually counting vehicles following instruction in the document should yield the same result. The ground truth counts for all videos are manually created and cross-validated following the provided instruction document.   ', 'A crucial tool in signal timing planning is capturing accurate movement- and class-specific vehicle counts. To be useful in online intelligent transportation systems, methods designed for this task must not only be accurate in their counting, but should also be efficient, preferably working in real-time on the edge [7]. Teams should thus design on-line real-time programs to count both cars and trucks belonging to the MOIs given a video clip. In this track, both the effectiveness of the program and its efficiency will count towards determining the winning team.\n\nThe 9 hours of video in track 1 are split into two data sets A and B. Data set A (5 hours in total) along with all the corresponding instruction documents and a small subset of ground truth labels (for demonstration purpose) are made available to participating teams. Data set B will be reserved for later testing. \n\nTeams can design their vehicle counting programs and submit counting results of data set A to the online evaluation system to get ranked on the public leader board. The public leader board only provides a way for a team to evaluate and improve their systems and the ranking will NOT determine the winners of this track. All prize contenders have to submit functioning code to be tested on data set B. The best performer on data set B combining both the counting accuracy and the program efficiency will be declared the winner. \n\nEach row in the submission file identifies one vehicle that exits the frame in the given movement id.', 'To be ranked on the public leader board of data set A, one text file should be submitted to the online evaluation system containing, on each line, details of one counted vehicle, in the following format (values are space-delimited):\n\n〈gen_time〉 〈video_id〉 〈frame_id〉 〈movement_id〉 〈vehicle_class_id〉\n\nWhere:\n\n〈gen_time〉 is the generation time, i.e., the time from the start of the program execution until this frame’s output is generated, in seconds. Teams should obtain a unix timestamp at the start of the program execution and before each output to the stream and report the differences between the current unix timestamp and the program execution start unix timestamp.\n〈video_id〉 is the video numeric identifier, starting with 1. It represents the position of the video in the list of all track videos, sorted in alphanumeric order.\n〈frame_id〉 represents the frame count for the current frame in the current video, starting with 1.\n〈movement_id〉 denotes the the movement numeric identifier, starting with 1. It represents the position of the movement in the list of the MOIs defined in the corresponding instruction document of that video.\n〈vehicle_class_id〉 is the vehicle classic numeric identifier. Only two values are accepted {1, 2} where 1 stands for “car” and 2 represents “truck”.\nIn addition to the vehicle counts, the teams will need to report a baseline efficiency factor (Efficiency Base) and the total wall-clock execution time for the run (Execution Time), which should include the total time taken to parse the video, predict the results, and write them to the output file, including detection or tracking inference.\n\nThe text file containing all counted vehicles should be named track1.txt and can be archived using Zip (track1.zip) or tar+gz (track1.tar.gz) to reduce upload time.\n\nThe Efficiency Base factor score should be measured on the test system the experiments are executed on. If multiple systems are used for testing different runs of a team’s algorithm, a separate Efficiency Base score should be obtained for each system and the appropriate score should be provided when submitting results. The Efficiency Base factor is computed by executing the efficiency_base.py script on the system, which can be downloaded from the Track 1 download page. Note that the script will be updated for the 2021 challenge to better account for differences in GPU performance among systems.', 'vehicle_counting.mp4', 'vehicle_counting.csv', 'eed21d3a-e2f4-4cc9-8b33-d248662c01ec', '9e059837-f436-450a-9d39-05511fa0c748', '2022-12-26 17:38:47', '2022-12-26 17:38:47'),
	('4623bec3-37ac-4613-9a2c-15c3fec5789c', 'People counting', 'The crowd counting evaluation page lists detailed information regarding how submissions will be scored.\nTest-challenge (30 video clips) is used for workshop competition, and the results will be announced during the ECCV 2020 Vision Meets Drone: A Challenge workshop. We encourage the participants to use the provided training data, while also allow them to use additional training data. The use of external data must be indicated during submission. \nThe train video clips and corresponding annotations as well as the video clips in the test-challenge set are available on the download page. Before participating, every user is required to create an account using an institutional email address. If you have any problem in registration, please contact us. After registration, the users should submit the results in their accounts. The submitted results will be evaluated according to the rules described on the evaluation page. Please refer to the evaluation page for a detailed explanation.', 'The challenge will provide 112 challenging sequences, including 82 video sequences for training (2,420 frames in total), and 30 sequences for testing (900 frames in total), which are available on the download page. We manually annotate persons with points in each video frame. ', 'The goal in this competition is to take an image of a handwritten single digit, and determine what that digit is. For every in the test set, you should predict the correct label.', 'people_counting.mp4', 'people_counting.csv', 'eed21d3a-e2f4-4cc9-8b33-d248662c01ec', '496e727f-801d-4dbd-a394-3e32dfefbb75', '2022-12-26 19:39:42', '2022-12-26 19:39:42'),
	('6b811674-56fe-40e7-882a-3414aef16b1c', 'License Plate Recognition', 'Vehicle License plate detection and recognition is a well-known challenge that has been tackled by many computer-vision labs and companies. However, each country has its own specific license plate formats. This challenge is targeting regular Tunisian license plates.', 'A set of vehicle images (900 images) taken from the internet and annotated manually. The annotations are the coordinates of the bounding box containing the license plate.\nA set of license plate images (900 images) where the annotations are the text written in the license plate.\nThis challenge was designed by InstaDeep in Tunisia in partnership with the National Road Safety Observatory of Tunisia, specifically for the AI-Hack-Tunisia 2019 hackathon.\n\nThe objective of this challenge is to detect the vehicle’s license plates then recognize the characters in each license plate. The solution will then be used to detect vehicle license plates in traffic cameras.', '\nThis metric is used in order to evaluate the error for each number in each license plate. In the test set, we provide 213 images of cars where each image contains only one car and one license plate.\n\nThe submission file will have N times 7 rows, where N is the number of images and multiplied by seven because the license plate is composed of two numbers the first one contains at most 3 digits and the second one at most 4 digits. If the first number on the image for example contains only two digits then the first digit should be filled with zero. Also, each row should be one hot encoded. Since we have 10 classes (from 0 to 9) the digit 7 for example should be encoded this way : 0,0,0,0,0,0,0,1,0,0.', 'license_plate_recognition.mp4', 'license_plate_recognition.csv', 'eed21d3a-e2f4-4cc9-8b33-d248662c01ec', '0496234e-684d-4361-8362-0b4274a1c748', '2022-12-26 20:13:17', '2022-12-26 20:13:17'),
	('7d4c12ff-a1e9-478b-9d40-5df64726ce47', 'Object detection', 'This challenge is the VIPriors Object Detection Challenge. The objective of the challenge is to detect bike parts on images from the DelftBikes dataset, containing 10,000 bike images with 22 densely annotated parts for each bike. Besides, we explicitly annotate all part locations and part states as missing, intact, damaged, or occluded. To note that, the dataset contains some noisy labels too, thefore it is more challenging. The evaluation is done on avaliable part, namely intact, damaged and occluded parts.', 'The task to be performed is object detection, predicting bounding boxes. DelftBikes contains 10,000 bike images with 22 densely annotated parts for each bike. Besides, we explicitly annotate all part locations and part states as missing, intact, damaged, or occluded. To note that, the dataset contains some noisy labels too, thefore it is more challenging. The evaluation is done on avaliable part, namely intact, damaged and occluded parts. For more information about dataset, you can check the paper.\n\nWe also provide a validation set which derived from training set. Validation results can be submitted to Development (Validation set).\n\nFor final submission, you can use both training and validation sets for training. We provide train labels and fake test labels to be able to generate submission. To note that, evaluation is done on images with their original sizes.', 'The submissions file is a JSON encoding of a list of bounding box predictions. This is the format of a submission file:\n\n[\n    {\n        "image_id": "0.jpg",\n        "category_id": 5,\n        "bbox": [220,220,30,30],\n        "score": 0.98,\n    },\n    ...\n]', 'object_detection.mp4', 'object_detection.csv', 'eed21d3a-e2f4-4cc9-8b33-d248662c01ec', '22cf4679-7ed9-4b55-8c4f-dc1ed807bccb', '2022-12-26 19:38:59', '2022-12-26 19:38:59');

-- Dumping structure for table ai_evaluation_dev_1.sample
CREATE TABLE IF NOT EXISTS `sample` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `title` text NOT NULL,
  `path` text NOT NULL,
  `size` double NOT NULL,
  `truth` text NOT NULL,
  `datasetId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `datasetId` (`datasetId`),
  CONSTRAINT `sample_ibfk_1` FOREIGN KEY (`datasetId`) REFERENCES `dataset` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table ai_evaluation_dev_1.sample: ~49 rows (approximately)
REPLACE INTO `sample` (`id`, `title`, `path`, `size`, `truth`, `datasetId`, `createdAt`, `updatedAt`) VALUES
	('10ae41c7-cb5b-49ca-993a-83e1501cdff4', '12.mp4', 'test_videos/vehicle_counting/12.mp4', 387586560, 'demo/vehicle_counting/1.csv', '9e059837-f436-450a-9d39-05511fa0c748', '2022-12-26 17:28:15', '2022-12-26 17:28:15'),
	('1267376d-b34b-42b6-88d2-93e79db40407', '3.mp4', 'test_videos/object_detection/3.mp4', 225930191, 'test_results/object_detection/3.csv', '22cf4679-7ed9-4b55-8c4f-dc1ed807bccb', '2022-12-26 19:35:55', '2022-12-26 19:35:55'),
	('1e7e9257-5038-4c89-92b9-187c1357e9d0', '4.mp4', 'test_videos/vehicle_counting/4.mp4', 189683490, 'test_results/vehicle_counting/4.csv', '9e059837-f436-450a-9d39-05511fa0c748', '2022-12-26 17:28:15', '2022-12-26 17:28:15'),
	('1f61215a-e38d-4b12-9836-b92c8e457904', '6.mp4', 'test_videos/object_detection/6.mp4', 78732119, 'test_results/object_detection/6.csv', '22cf4679-7ed9-4b55-8c4f-dc1ed807bccb', '2022-12-26 19:35:55', '2022-12-26 19:35:55'),
	('20a1c1af-1dc1-44b6-b378-70e5b9b31675', '4.mp4', 'test_videos/people_counting/4.mp4', 95750050, 'test_results/people_counting/4.csv', '496e727f-801d-4dbd-a394-3e32dfefbb75', '2022-12-26 19:21:30', '2022-12-26 19:21:30'),
	('22373ce6-9308-4be2-9b61-5139329cf29f', '4.mp4', 'test_videos/license_plate_recognition/4.mp4', 98097827, 'demo/license_plate_recognition/4.csv', '0496234e-684d-4361-8362-0b4274a1c748', '2022-12-26 19:59:21', '2022-12-26 19:59:21'),
	('29923f3a-966c-471d-abd8-31ebfa06a857', '8.mp4', 'test_videos/people_counting/8.mp4', 196084018, 'test_results/people_counting/8.csv', '496e727f-801d-4dbd-a394-3e32dfefbb75', '2022-12-26 19:21:30', '2022-12-26 19:21:30'),
	('2b389571-3acc-42e4-88bf-085698db847f', '4.mp4', 'test_videos/object_detection/4.mp4', 139628506, 'test_results/object_detection/4.csv', '22cf4679-7ed9-4b55-8c4f-dc1ed807bccb', '2022-12-26 19:35:55', '2022-12-26 19:35:55'),
	('2d4d1370-0526-44b3-9ead-f08ba0cbf94f', '8.mp4', 'test_videos/object_detection/8.mp4', 291147166, 'test_results/object_detection/8.csv', '22cf4679-7ed9-4b55-8c4f-dc1ed807bccb', '2022-12-26 19:35:55', '2022-12-26 19:35:55'),
	('2fd205c7-c53b-4859-a38d-d171556229de', '9.mp4', 'test_videos/people_counting/9.mp4', 377814015, 'test_results/people_counting/9.csv', '496e727f-801d-4dbd-a394-3e32dfefbb75', '2022-12-26 19:21:30', '2022-12-26 19:21:30'),
	('397df101-9121-4db7-93c8-35534d7446a4', '7.mp4', 'test_videos/vehicle_counting/7.mp4', 111092787, 'test_results/vehicle_counting/7.csv', '9e059837-f436-450a-9d39-05511fa0c748', '2022-12-26 17:28:15', '2022-12-26 17:28:15'),
	('3f76c317-6078-4c38-bd20-e2670955b1dc', '1.mp4', 'test_videos/people_counting/1.mp4', 424910778, 'demo/people_counting/1.csv', '496e727f-801d-4dbd-a394-3e32dfefbb75', '2022-12-26 19:21:30', '2022-12-26 19:21:30'),
	('429061ec-c7c3-4411-8b14-38151664d0d0', '1.mp4', 'test_videos/license_plate_recognition/1.mp4', 385861327, 'demo/license_plate_recognition/1.csv', '0496234e-684d-4361-8362-0b4274a1c748', '2022-12-26 19:59:21', '2022-12-26 19:59:21'),
	('48bf00db-963b-4576-8813-507b5585c6ff', '3.mp4', 'test_videos/people_counting/3.mp4', 90364508, 'test_results/people_counting/3.csv', '496e727f-801d-4dbd-a394-3e32dfefbb75', '2022-12-26 19:21:30', '2022-12-26 19:21:30'),
	('4bacc640-f92d-4dec-b810-aff11833775d', '15.mp4', 'test_videos/vehicle_counting/15.mp4', 147485245, 'test_results/vehicle_counting/15.csv', '9e059837-f436-450a-9d39-05511fa0c748', '2022-12-26 17:28:15', '2022-12-26 17:28:15'),
	('4d64dfdf-5623-4200-9ea6-ec752ccb09dc', '2.mp4', 'test_videos/vehicle_counting/2.mp4', 209215790, 'test_results/vehicle_counting/2.csv', '9e059837-f436-450a-9d39-05511fa0c748', '2022-12-26 17:28:15', '2022-12-26 17:28:15'),
	('5801042c-1770-467a-862d-61c5f7e7e758', '11.mp4', 'test_videos/people_counting/11.mp4', 46512686, 'test_results/people_counting/11.csv', '496e727f-801d-4dbd-a394-3e32dfefbb75', '2022-12-26 19:21:30', '2022-12-26 19:21:30'),
	('5e3f4643-82a0-48e6-993d-49cca8aadebe', '16.mp4', 'test_videos/vehicle_counting/16.mp4', 149510815, 'test_results/vehicle_counting/16.csv', '9e059837-f436-450a-9d39-05511fa0c748', '2022-12-26 17:28:15', '2022-12-26 17:28:15'),
	('68b21c2c-6eeb-4b01-8085-d5f0a67b001a', '10.mp4', 'test_videos/people_counting/10.mp4', 70652754, 'test_results/people_counting/10.csv', '496e727f-801d-4dbd-a394-3e32dfefbb75', '2022-12-26 19:21:30', '2022-12-26 19:21:30'),
	('6e9d59a1-88e7-40b7-b91b-9ba25aa6916f', '9.mp4', 'test_videos/object_detection/9.mp4', 257366189, 'test_results/object_detection/9.csv', '22cf4679-7ed9-4b55-8c4f-dc1ed807bccb', '2022-12-26 19:35:55', '2022-12-26 19:35:55'),
	('6ed41de2-bfa1-450c-9b35-cfd0d1a6581b', '2.mp4', 'test_videos/people_counting/2.mp4', 88696309, 'test_results/people_counting/2.csv', '496e727f-801d-4dbd-a394-3e32dfefbb75', '2022-12-26 19:21:30', '2022-12-26 19:21:30'),
	('764e88a9-3c50-4cbd-a95f-3bf53f597bb1', '11.mp4', 'test_videos/license_plate_recognition/11.mp4', 291687621, 'demo/license_plate_recognition/11.csv', '0496234e-684d-4361-8362-0b4274a1c748', '2022-12-26 19:59:21', '2022-12-26 19:59:21'),
	('886f03b0-834f-42ef-b132-a3b830323fa1', '7.mp4', 'test_videos/object_detection/7.mp4', 251156905, 'test_results/object_detection/7.csv', '22cf4679-7ed9-4b55-8c4f-dc1ed807bccb', '2022-12-26 19:35:55', '2022-12-26 19:35:55'),
	('89b7e279-eb5c-406c-800b-e22715e9779c', '5.mp4', 'test_videos/vehicle_counting/5.mp4', 268776810, 'test_results/vehicle_counting/5.csv', '9e059837-f436-450a-9d39-05511fa0c748', '2022-12-26 17:28:15', '2022-12-26 17:28:15'),
	('8db88780-8ffa-43fe-98da-ff53f87fb037', '9.mp4', 'test_videos/vehicle_counting/9.mp4', 116002878, 'test_results/vehicle_counting/9.csv', '9e059837-f436-450a-9d39-05511fa0c748', '2022-12-26 17:28:15', '2022-12-26 17:28:15'),
	('9075b89c-358e-48a6-9299-2826a58de427', '7.mp4', 'test_videos/license_plate_recognition/7.mp4', 270083642, 'demo/license_plate_recognition/7.csv', '0496234e-684d-4361-8362-0b4274a1c748', '2022-12-26 19:59:21', '2022-12-26 19:59:21'),
	('963f28e7-96a5-478d-9702-1c3e599c9f53', '14.mp4', 'test_videos/vehicle_counting/14.mp4', 330307254, 'test_results/vehicle_counting/14.csv', '9e059837-f436-450a-9d39-05511fa0c748', '2022-12-26 17:28:15', '2022-12-26 17:28:15'),
	('9c4b8eb8-b8d3-42e3-8522-cb81a52fa233', '11.mp4', 'test_videos/vehicle_counting/11.mp4', 70741283, 'test_results/vehicle_counting/11.csv', '9e059837-f436-450a-9d39-05511fa0c748', '2022-12-26 17:28:15', '2022-12-26 17:28:15'),
	('a4d2c77d-c86c-443f-9935-285c9a56c18b', '6.mp4', 'test_videos/vehicle_counting/6.mp4', 170402336, 'test_results/vehicle_counting/6.csv', '9e059837-f436-450a-9d39-05511fa0c748', '2022-12-26 17:28:15', '2022-12-26 17:28:15'),
	('a545b3d0-cf0a-431c-9360-8554f2c2e07d', '5.mp4', 'test_videos/object_detection/5.mp4', 359560116, 'demo/object_detection/1.csv', '22cf4679-7ed9-4b55-8c4f-dc1ed807bccb', '2022-12-26 19:35:55', '2022-12-26 19:35:55'),
	('ab778b76-082f-4544-971c-eadc65ec52ad', '6.mp4', 'test_videos/license_plate_recognition/6.mp4', 218475095, 'demo/license_plate_recognition/6.csv', '0496234e-684d-4361-8362-0b4274a1c748', '2022-12-26 19:59:21', '2022-12-26 19:59:21'),
	('ab9a87dc-bc3d-4fa6-8974-d88b1d0d033e', '5.mp4', 'test_videos/license_plate_recognition/5.mp4', 191134323, 'demo/license_plate_recognition/5.csv', '0496234e-684d-4361-8362-0b4274a1c748', '2022-12-26 19:59:21', '2022-12-26 19:59:21'),
	('abbeac33-3e7c-45fc-afdb-2a639a2ef680', '3.mp4', 'test_videos/license_plate_recognition/3.mp4', 319031536, 'demo/license_plate_recognition/3.csv', '0496234e-684d-4361-8362-0b4274a1c748', '2022-12-26 19:59:21', '2022-12-26 19:59:21'),
	('ad607893-cfcc-476b-a64e-5c0b1831b3a5', '5.mp4', 'test_videos/people_counting/5.mp4', 98632005, 'test_results/people_counting/5.csv', '496e727f-801d-4dbd-a394-3e32dfefbb75', '2022-12-26 19:21:30', '2022-12-26 19:21:30'),
	('af4bebf4-1370-4376-a3b8-8b4ac1624220', '9.mp4', 'test_videos/license_plate_recognition/9.mp4', 419366883, 'demo/license_plate_recognition/9.csv', '0496234e-684d-4361-8362-0b4274a1c748', '2022-12-26 19:59:21', '2022-12-26 19:59:21'),
	('b54ff5d2-cc86-4ff3-81c6-4f7dea78c9be', '3.mp4', 'test_videos/vehicle_counting/3.mp4', 184718890, 'test_results/vehicle_counting/3.csv', '9e059837-f436-450a-9d39-05511fa0c748', '2022-12-26 17:28:15', '2022-12-26 17:28:15'),
	('b765ce96-8ad8-4c8e-98c0-1341ce959f8e', '8.mp4', 'test_videos/license_plate_recognition/8.mp4', 477249407, 'demo/license_plate_recognition/8.csv', '0496234e-684d-4361-8362-0b4274a1c748', '2022-12-26 19:59:21', '2022-12-26 19:59:21'),
	('bcfcc5da-9ffb-4c9c-8a59-22d3da02b8c6', '13.mp4', 'test_videos/vehicle_counting/13.mp4', 280400517, 'test_results/vehicle_counting/13.csv', '9e059837-f436-450a-9d39-05511fa0c748', '2022-12-26 17:28:15', '2022-12-26 17:28:15'),
	('bf813153-da72-4cc2-a4d5-a7a44fc3a1e4', '1.mp4', 'test_videos/vehicle_counting/1.mp4', 73024294, 'test_results/vehicle_counting/1.csv', '9e059837-f436-450a-9d39-05511fa0c748', '2022-12-26 17:28:15', '2022-12-26 17:28:15'),
	('c5784a0b-3c0f-4f1c-b5c2-5fc70f377709', '1.mp4', 'test_videos/object_detection/1.mp4', 220472318, 'test_results/object_detection/1.csv', '22cf4679-7ed9-4b55-8c4f-dc1ed807bccb', '2022-12-26 19:35:55', '2022-12-26 19:35:55'),
	('d2b61a4c-f17c-4703-ac5f-f749293bc311', '2.mp4', 'test_videos/license_plate_recognition/2.mp4', 268605157, 'demo/license_plate_recognition/2.csv', '0496234e-684d-4361-8362-0b4274a1c748', '2022-12-26 19:59:21', '2022-12-26 19:59:21'),
	('d4d7a119-042d-4fb0-b1d5-f6207898ddbd', '2.mp4', 'test_videos/object_detection/2.mp4', 137518421, 'test_results/object_detection/2.csv', '22cf4679-7ed9-4b55-8c4f-dc1ed807bccb', '2022-12-26 19:35:55', '2022-12-26 19:35:55'),
	('da4e875b-5681-46dd-bc36-2bf01b66c7b5', '10.mp4', 'test_videos/vehicle_counting/10.mp4', 279162668, 'test_results/vehicle_counting/10.csv', '9e059837-f436-450a-9d39-05511fa0c748', '2022-12-26 17:28:15', '2022-12-26 17:28:15'),
	('df94bdd1-2c0e-49f2-9486-78be208a55d7', '10.mp4', 'test_videos/license_plate_recognition/10.mp4', 400543766, 'demo/license_plate_recognition/10.csv', '0496234e-684d-4361-8362-0b4274a1c748', '2022-12-26 19:59:21', '2022-12-26 19:59:21'),
	('ead5677b-d769-47ea-a3c5-3aa4ff21681c', '10.mp4', 'test_videos/object_detection/10.mp4', 217956141, 'test_results/object_detection/10.csv', '22cf4679-7ed9-4b55-8c4f-dc1ed807bccb', '2022-12-27 00:30:43', '2022-12-27 00:30:43'),
	('ecc16d63-540f-493e-becb-622ee1616c80', '6.mp4', 'test_videos/people_counting/6.mp4', 16445326, 'test_results/people_counting/6.csv', '496e727f-801d-4dbd-a394-3e32dfefbb75', '2022-12-26 19:21:30', '2022-12-26 19:21:30'),
	('f325fc89-3e2f-4ea0-b67a-c958fc932951', '12.mp4', 'test_videos/people_counting/12.mp4', 255512289, 'test_results/people_counting/12.csv', '496e727f-801d-4dbd-a394-3e32dfefbb75', '2022-12-26 19:21:30', '2022-12-26 19:21:30'),
	('faf2b1cc-e3e5-4944-8084-93c7aea4d7af', '7.mp4', 'test_videos/people_counting/7.mp4', 308021654, 'test_results/people_counting/7.csv', '496e727f-801d-4dbd-a394-3e32dfefbb75', '2022-12-26 19:21:30', '2022-12-26 19:21:30'),
	('fe25608f-2fe1-4682-8be0-1e583b635eb6', '8.mp4', 'test_videos/vehicle_counting/8.mp4', 84957853, 'test_results/vehicle_counting/8.csv', '9e059837-f436-450a-9d39-05511fa0c748', '2022-12-26 17:28:15', '2022-12-26 17:28:15');

-- Dumping structure for table ai_evaluation_dev_1.subgroup
CREATE TABLE IF NOT EXISTS `subgroup` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `title` text NOT NULL,
  `description` text,
  `groupId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `groupId` (`groupId`),
  CONSTRAINT `subgroup_ibfk_1` FOREIGN KEY (`groupId`) REFERENCES `group` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table ai_evaluation_dev_1.subgroup: ~5 rows (approximately)
REPLACE INTO `subgroup` (`id`, `title`, `description`, `groupId`, `createdAt`, `updatedAt`) VALUES
	('55715e69-2ea5-413f-a508-7d368fcefea7', 'Regression', 'Regression', '0f0202f8-c8fe-46a5-a64a-fe06974c7a94', '2022-11-20 09:25:53', '2022-11-20 09:25:53'),
	('839106e2-83a2-4944-ad8f-18b94fe9e685', 'Association', 'Association', '0f0202f8-c8fe-46a5-a64a-fe06974c7a94', '2022-11-20 09:26:13', '2022-11-20 09:26:13'),
	('c9c8f10a-4c9d-49f6-a9c6-87b8aae0cb53', 'Clustering', 'Clustering', '0b92a79e-7daf-4602-9e9b-84355b6ccd61', '2022-11-20 09:26:07', '2022-11-20 09:26:07'),
	('eed21d3a-e2f4-4cc9-8b33-d248662c01ec', 'Classification', 'Classification', '0f0202f8-c8fe-46a5-a64a-fe06974c7a94', '2022-11-20 09:26:03', '2022-11-20 09:26:03'),
	('f0156afe-5df6-4bf0-8b93-58f523324fa8', 'Anomaly Detection', 'Anomaly Detection', '0f0202f8-c8fe-46a5-a64a-fe06974c7a94', '2022-11-20 09:26:20', '2022-11-20 09:26:20');

-- Dumping structure for table ai_evaluation_dev_1.submission
CREATE TABLE IF NOT EXISTS `submission` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `selectionRate` int DEFAULT NULL,
  `accuracy` double DEFAULT NULL,
  `f1score` double DEFAULT NULL,
  `precision` double DEFAULT NULL,
  `recall` double DEFAULT NULL,
  `executionTime` double DEFAULT NULL,
  `executionMemories` double DEFAULT NULL,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `problemId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `problemId` (`problemId`),
  CONSTRAINT `submission_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `submission_ibfk_2` FOREIGN KEY (`problemId`) REFERENCES `problem` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table ai_evaluation_dev_1.submission: ~11 rows (approximately)
REPLACE INTO `submission` (`id`, `selectionRate`, `accuracy`, `f1score`, `precision`, `recall`, `executionTime`, `executionMemories`, `userId`, `problemId`, `createdAt`, `updatedAt`) VALUES
	('317f5ef8-7cab-43d9-b8bf-dad9652de8a3', 60, 81.21062106210621, 81.21062106210621, 81.21062106210621, 81.21062106210621, 36336, 43499147.63636363, '8552c585-064d-42da-9b52-5f34f333cfaa', '6b811674-56fe-40e7-882a-3414aef16b1c', '2022-12-27 00:14:44', '2022-12-27 00:14:44'),
	('3f50e1eb-d303-4610-b6e8-a616a304e52a', 60, 65.66754475251209, 65.66754475251209, 65.66754475251209, 65.66754475251209, 2499, 70366094.22222222, '8552c585-064d-42da-9b52-5f34f333cfaa', '7d4c12ff-a1e9-478b-9d40-5df64726ce47', '2022-12-26 22:39:46', '2022-12-26 22:39:46'),
	('6d107453-eb43-4b46-a2d8-a39ec5434442', 60, 26.084656084656082, 26.084656084656082, 26.084656084656082, 26.084656084656082, 389022, 41971712, '8552c585-064d-42da-9b52-5f34f333cfaa', '7d4c12ff-a1e9-478b-9d40-5df64726ce47', '2022-12-27 01:41:05', '2022-12-27 01:41:05'),
	('75083a9a-798f-4222-8ce1-0b009f77e89c', 60, 81.54815481548155, 81.54815481548155, 81.54815481548155, 81.54815481548155, 4460, 71680000, '8552c585-064d-42da-9b52-5f34f333cfaa', '6b811674-56fe-40e7-882a-3414aef16b1c', '2022-12-26 21:00:40', '2022-12-26 21:00:40'),
	('85a08d4b-e380-45af-9aa4-4fb8f921f4c8', 60, 83.52556869474164, 83.52556869474164, 83.52556869474164, 83.52556869474164, 245926, 41426944, '8552c585-064d-42da-9b52-5f34f333cfaa', '4623bec3-37ac-4613-9a2c-15c3fec5789c', '2022-12-27 02:27:07', '2022-12-27 02:27:07'),
	('8f9e314b-4cc2-4b00-893b-9aea2929f4cc', 60, 91.18363365730016, 91.18363365730016, 91.18363365730016, 91.18363365730016, 4412, 70037162.66666667, '8552c585-064d-42da-9b52-5f34f333cfaa', '4623bec3-37ac-4613-9a2c-15c3fec5789c', '2022-12-26 20:46:48', '2022-12-26 20:46:48'),
	('a1ddd650-c549-456b-aa83-68f16ee52646', 60, 29.000105300567302, 43.24285387537836, 33.039106150175826, 37.80632453821706, 15910, 75460608, '8552c585-064d-42da-9b52-5f34f333cfaa', '4623bec3-37ac-4613-9a2c-15c3fec5789c', '2023-01-11 07:58:44', '2023-01-11 07:58:44'),
	('a63019c2-b15e-4b8c-85f3-a0429c8b5a10', 60, 65.66754475251209, 65.66754475251209, 65.66754475251209, 65.66754475251209, 14639, 70468949.33333333, '8552c585-064d-42da-9b52-5f34f333cfaa', '7d4c12ff-a1e9-478b-9d40-5df64726ce47', '2022-12-26 22:37:50', '2022-12-26 22:37:50'),
	('b0c569e1-6503-46bc-a658-3f87add7ee13', 60, 65.66754475251209, 65.66754475251209, 65.66754475251209, 65.66754475251209, 2529, 70792078.22222222, '8552c585-064d-42da-9b52-5f34f333cfaa', '7d4c12ff-a1e9-478b-9d40-5df64726ce47', '2022-12-26 22:39:17', '2022-12-26 22:39:17'),
	('b49aeb29-e41f-41f7-93ab-4a6e866c522e', 60, 84.50960150960151, 84.50960150960151, 84.50960150960151, 84.50960150960151, 346287, 41582592, '8552c585-064d-42da-9b52-5f34f333cfaa', '41c24adf-2da4-4763-93f0-980d28d629f8', '2022-12-27 02:58:10', '2022-12-27 02:58:10'),
	('bd33673e-95d1-4537-b147-4e3f5c5f948a', 60, 93.66018479060345, 93.66018479060345, 93.66018479060345, 93.66018479060345, 3834, 70234112, '8552c585-064d-42da-9b52-5f34f333cfaa', '41c24adf-2da4-4763-93f0-980d28d629f8', '2022-12-26 18:33:01', '2022-12-26 18:33:01'),
	('fa1aee7d-1419-4438-b1a5-0de171848b50', 60, 85.28461353461354, 85.28461353461354, 85.28461353461354, 85.28461353461354, 276712, 42258432, '8552c585-064d-42da-9b52-5f34f333cfaa', '41c24adf-2da4-4763-93f0-980d28d629f8', '2022-12-27 00:43:25', '2022-12-27 00:43:25'),
	('fe38baf5-0876-483e-8f65-c44932af100c', 60, 29.000105300567302, 43.24285387537836, 33.039106150175826, 37.80632453821706, 14252, 81670144, '8552c585-064d-42da-9b52-5f34f333cfaa', '4623bec3-37ac-4613-9a2c-15c3fec5789c', '2023-01-10 17:30:45', '2023-01-10 17:30:45');

-- Dumping structure for table ai_evaluation_dev_1.submissiondetail
CREATE TABLE IF NOT EXISTS `submissiondetail` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `input` text,
  `accuracy` double DEFAULT NULL,
  `f1score` double DEFAULT NULL,
  `precision` double DEFAULT NULL,
  `recall` double DEFAULT NULL,
  `executionTime` double DEFAULT NULL,
  `executionMemories` double DEFAULT NULL,
  `description` text,
  `submissionId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `submissionId` (`submissionId`),
  CONSTRAINT `submissiondetail_ibfk_1` FOREIGN KEY (`submissionId`) REFERENCES `submission` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table ai_evaluation_dev_1.submissiondetail: ~81 rows (approximately)
REPLACE INTO `submissiondetail` (`id`, `input`, `accuracy`, `f1score`, `precision`, `recall`, `executionTime`, `executionMemories`, `description`, `submissionId`, `createdAt`, `updatedAt`) VALUES
	('087a4a3f-00df-46ac-a7b5-d09ea0f62535', '4.mp4', 84.58333333333333, 84.58333333333333, 84.58333333333333, 84.58333333333333, 0, 70373376, NULL, '3f50e1eb-d303-4610-b6e8-a616a304e52a', '2022-12-26 22:39:46', '2022-12-26 22:39:46'),
	('127699ed-1881-499a-a567-d1943d470ed1', '4.mp4', 84.58333333333333, 84.58333333333333, 84.58333333333333, 84.58333333333333, 0, 70791168, NULL, 'b0c569e1-6503-46bc-a658-3f87add7ee13', '2022-12-26 22:39:17', '2022-12-26 22:39:17'),
	('13215d3f-0e9a-4f80-ab76-f05434ae41cc', '9.mp4', 98.33333333333333, 98.33333333333333, 98.33333333333333, 98.33333333333333, 0, 70049792, NULL, '8f9e314b-4cc2-4b00-893b-9aea2929f4cc', '2022-12-26 20:46:48', '2022-12-26 20:46:48'),
	('14fb6abe-3a8e-4042-ad6e-2abe9d62f3f5', '15.mp4', 97.92207792207792, 97.92207792207792, 97.92207792207792, 97.92207792207792, 0, 70250496, NULL, 'bd33673e-95d1-4537-b147-4e3f5c5f948a', '2022-12-26 18:33:01', '2022-12-26 18:33:01'),
	('2154b247-19ec-4f35-a747-b1b915af9e4c', '3.mp4', 97.5, 97.5, 97.5, 97.5, 0, 70037504, NULL, '8f9e314b-4cc2-4b00-893b-9aea2929f4cc', '2022-12-26 20:46:48', '2022-12-26 20:46:48'),
	('22006192-162f-4a39-9230-4bddae9cf3bb', '6.mp4', 66.03174603174602, 66.03174603174602, 66.03174603174602, 66.03174603174602, 0, 70520832, NULL, 'a63019c2-b15e-4b8c-85f3-a0429c8b5a10', '2022-12-26 22:37:50', '2022-12-26 22:37:50'),
	('233546bf-c3b2-48b0-ade3-e328d8f0770a', '10.mp4', 93.01807760141094, 93.01807760141094, 93.01807760141094, 93.01807760141094, 0, 70025216, NULL, '8f9e314b-4cc2-4b00-893b-9aea2929f4cc', '2022-12-26 20:46:48', '2022-12-26 20:46:48'),
	('24b6c170-7e6e-4806-97e5-546694174dfb', '4.mp4', 81.8069306930693, 81.8069306930693, 81.8069306930693, 81.8069306930693, 0, 43507712, NULL, '317f5ef8-7cab-43d9-b8bf-dad9652de8a3', '2022-12-27 00:14:44', '2022-12-27 00:14:44'),
	('2a00227e-6d16-458a-86c5-286e1ee926dc', '10.mp4', 82.05445544554455, 82.05445544554455, 82.05445544554455, 82.05445544554455, 0, 71680000, NULL, '75083a9a-798f-4222-8ce1-0b009f77e89c', '2022-12-26 21:00:40', '2022-12-26 21:00:40'),
	('32ebe5f6-7e8e-41ca-9307-c58e01bc48fd', '2.mp4', 81.93069306930693, 81.93069306930693, 81.93069306930693, 81.93069306930693, 0, 71680000, NULL, '75083a9a-798f-4222-8ce1-0b009f77e89c', '2022-12-26 21:00:40', '2022-12-26 21:00:40'),
	('34a22ce3-e801-4eb6-9973-3338bc9085b5', '1.mp4', 82.71338901978001, 82.71338901978001, 82.71338901978001, 82.71338901978001, 0, 70021120, NULL, '8f9e314b-4cc2-4b00-893b-9aea2929f4cc', '2022-12-26 20:46:48', '2022-12-26 20:46:48'),
	('3577e2a9-3287-4d3a-8783-6f7de151d1c7', '1.mp4', 80.07425742574257, 80.07425742574257, 80.07425742574257, 80.07425742574257, 0, 71680000, NULL, '75083a9a-798f-4222-8ce1-0b009f77e89c', '2022-12-26 21:00:40', '2022-12-26 21:00:40'),
	('390a7e75-c520-481d-a6a7-9a0bc9e0f305', '11.mp4', 89.63352007469655, 89.63352007469655, 89.63352007469655, 89.63352007469655, 0, 70025216, NULL, '8f9e314b-4cc2-4b00-893b-9aea2929f4cc', '2022-12-26 20:46:48', '2022-12-26 20:46:48'),
	('3bfc935f-f9c6-48be-8035-590bf22ec7ba', '8.mp4', 97.68518518518518, 97.68518518518518, 97.68518518518518, 97.68518518518518, 0, 70270976, NULL, 'bd33673e-95d1-4537-b147-4e3f5c5f948a', '2022-12-26 18:33:01', '2022-12-26 18:33:01'),
	('3ed09f38-c06a-47ba-b656-13d682d92542', '7.mp4', 50.93240093240093, 50.93240093240093, 50.93240093240093, 50.93240093240093, 0, 70537216, NULL, 'a63019c2-b15e-4b8c-85f3-a0429c8b5a10', '2022-12-26 22:37:50', '2022-12-26 22:37:50'),
	('41755488-18a8-4692-aea2-d818789a3232', '3.mp4', 68.35317460317461, 68.35317460317461, 68.35317460317461, 68.35317460317461, 0, 70369280, NULL, '3f50e1eb-d303-4610-b6e8-a616a304e52a', '2022-12-26 22:39:46', '2022-12-26 22:39:46'),
	('4636f4ef-a0fb-4fd2-8d2f-94ba0c35423c', '2.mp4', 65.38461538461539, 65.38461538461539, 65.38461538461539, 65.38461538461539, 0, 70189056, NULL, '3f50e1eb-d303-4610-b6e8-a616a304e52a', '2022-12-26 22:39:46', '2022-12-26 22:39:46'),
	('4be87877-6520-4de1-8764-5821e203dd97', '3.mp4', 85.34266866890705, 85.34266866890705, 85.34266866890705, 85.34266866890705, 0, 70262784, NULL, 'bd33673e-95d1-4537-b147-4e3f5c5f948a', '2022-12-26 18:33:01', '2022-12-26 18:33:01'),
	('4d95930f-9a65-4afc-a8b1-915bdd50da99', '16.mp4', 95.99404761904762, 95.99404761904762, 95.99404761904762, 95.99404761904762, 0, 70250496, NULL, 'bd33673e-95d1-4537-b147-4e3f5c5f948a', '2022-12-26 18:33:01', '2022-12-26 18:33:01'),
	('59cbb2ad-be01-4e23-80ed-e582433026a5', '2.mp4', 83.52556869474164, 83.52556869474164, 83.52556869474164, 83.52556869474164, 0, 41426944, NULL, '85a08d4b-e380-45af-9aa4-4fb8f921f4c8', '2022-12-27 02:27:07', '2022-12-27 02:27:07'),
	('5c40b9f2-7539-4380-a5de-1c7d722dbc32', '6.mp4', 87.96193224764654, 87.96193224764654, 87.96193224764654, 87.96193224764654, 0, 70041600, NULL, '8f9e314b-4cc2-4b00-893b-9aea2929f4cc', '2022-12-26 20:46:48', '2022-12-26 20:46:48'),
	('5e5719ed-ba2f-4570-81b3-6167efb5f188', '14.mp4', 91.23432123432123, 91.23432123432123, 91.23432123432123, 91.23432123432123, 0, 70250496, NULL, 'bd33673e-95d1-4537-b147-4e3f5c5f948a', '2022-12-26 18:33:01', '2022-12-26 18:33:01'),
	('5fc8f641-aa93-4f07-9179-0d2b6eb88959', '1.mp4', 93.93718671679198, 93.93718671679198, 93.93718671679198, 93.93718671679198, 0, 70074368, NULL, 'bd33673e-95d1-4537-b147-4e3f5c5f948a', '2022-12-26 18:33:01', '2022-12-26 18:33:01'),
	('686760a8-b559-4748-a703-2e0c44404bbc', '10.mp4', 100, 100, 100, 100, 0, 70090752, NULL, 'bd33673e-95d1-4537-b147-4e3f5c5f948a', '2022-12-26 18:33:01', '2022-12-26 18:33:01'),
	('6f63af76-cc26-4987-9146-cd78fd631a5b', '11.mp4', 79.95049504950495, 79.95049504950495, 79.95049504950495, 79.95049504950495, 0, 71680000, NULL, '75083a9a-798f-4222-8ce1-0b009f77e89c', '2022-12-26 21:00:40', '2022-12-26 21:00:40'),
	('7a587574-9ea9-40df-94ff-34159951a817', '5.mp4', 89.28780284043444, 89.28780284043444, 89.28780284043444, 89.28780284043444, 0, 70041600, NULL, '8f9e314b-4cc2-4b00-893b-9aea2929f4cc', '2022-12-26 20:46:48', '2022-12-26 20:46:48'),
	('7a933595-fbb1-430b-9d76-0ec34e97f1e5', '4.mp4', 84.58333333333333, 84.58333333333333, 84.58333333333333, 84.58333333333333, 0, 70512640, NULL, 'a63019c2-b15e-4b8c-85f3-a0429c8b5a10', '2022-12-26 22:37:50', '2022-12-26 22:37:50'),
	('7dc2e313-3a29-4d52-9fdd-98cd907a18a8', '5.mp4', 80.81683168316832, 80.81683168316832, 80.81683168316832, 80.81683168316832, 0, 43511808, NULL, '317f5ef8-7cab-43d9-b8bf-dad9652de8a3', '2022-12-27 00:14:44', '2022-12-27 00:14:44'),
	('80a00421-df64-4d96-a0cb-48f816e78b39', '2.mp4', 97.95454545454545, 97.95454545454545, 97.95454545454545, 97.95454545454545, 0, 70250496, NULL, 'bd33673e-95d1-4537-b147-4e3f5c5f948a', '2022-12-26 18:33:01', '2022-12-26 18:33:01'),
	('833b5a31-2b36-4815-9d9a-b4d5ac10f5ad', '4.mp4', 94.78114478114479, 94.78114478114479, 94.78114478114479, 94.78114478114479, 0, 70262784, NULL, 'bd33673e-95d1-4537-b147-4e3f5c5f948a', '2022-12-26 18:33:01', '2022-12-26 18:33:01'),
	('834e8de5-f384-4522-aeee-e42730c1baa5', '12.mp4', 94.3374741200828, 94.3374741200828, 94.3374741200828, 94.3374741200828, 0, 70033408, NULL, '8f9e314b-4cc2-4b00-893b-9aea2929f4cc', '2022-12-26 20:46:48', '2022-12-26 20:46:48'),
	('843d5c1f-da4a-415c-918b-445e8986fb82', '9.mp4', 81.43564356435643, 81.43564356435643, 81.43564356435643, 81.43564356435643, 0, 43524096, NULL, '317f5ef8-7cab-43d9-b8bf-dad9652de8a3', '2022-12-27 00:14:44', '2022-12-27 00:14:44'),
	('89807f7f-fb59-430f-bb9c-db56314039ae', '11.mp4', 81.55940594059405, 81.55940594059405, 81.55940594059405, 81.55940594059405, 0, 43479040, NULL, '317f5ef8-7cab-43d9-b8bf-dad9652de8a3', '2022-12-27 00:14:44', '2022-12-27 00:14:44'),
	('8af53642-1372-4983-bb34-29c1988e4345', '8.mp4', 90.30263387406244, 90.30263387406244, 90.30263387406244, 90.30263387406244, 0, 70045696, NULL, '8f9e314b-4cc2-4b00-893b-9aea2929f4cc', '2022-12-26 20:46:48', '2022-12-26 20:46:48'),
	('8bc60ed9-c680-4216-9b3a-9d980ca2d63c', '6.mp4', 81.55940594059405, 81.55940594059405, 81.55940594059405, 81.55940594059405, 0, 71680000, NULL, '75083a9a-798f-4222-8ce1-0b009f77e89c', '2022-12-26 21:00:40', '2022-12-26 21:00:40'),
	('8df44566-2f8b-453b-89dc-f38f173657c0', '7.mp4', 81.1881188118812, 81.1881188118812, 81.1881188118812, 81.1881188118812, 0, 71680000, NULL, '75083a9a-798f-4222-8ce1-0b009f77e89c', '2022-12-26 21:00:40', '2022-12-26 21:00:40'),
	('8f04660b-9f76-432e-a3f4-8c93e02fd8f9', '2.mp4', 81.06435643564357, 81.06435643564357, 81.06435643564357, 81.06435643564357, 0, 43499520, NULL, '317f5ef8-7cab-43d9-b8bf-dad9652de8a3', '2022-12-27 00:14:44', '2022-12-27 00:14:44'),
	('944a6bda-bd6e-4942-b538-b4f1d4c7f5ab', '2.mp4', 96.87263794406651, 96.87263794406651, 96.87263794406651, 96.87263794406651, 0, 70037504, NULL, '8f9e314b-4cc2-4b00-893b-9aea2929f4cc', '2022-12-26 20:46:48', '2022-12-26 20:46:48'),
	('98a3c898-bc2d-4b27-b597-97b18d960c31', '11.mp4', 100, 100, 100, 100, 0, 70225920, NULL, 'bd33673e-95d1-4537-b147-4e3f5c5f948a', '2022-12-26 18:33:01', '2022-12-26 18:33:01'),
	('9b828fcf-599d-4223-8dcb-70113c6b3cd7', '1.mp4', 29.000105300567302, 43.24285387537836, 33.039106150175826, 37.80632453821706, 0, 81670144, NULL, 'fe38baf5-0876-483e-8f65-c44932af100c', '2023-01-10 17:30:45', '2023-01-10 17:30:45'),
	('9c45765c-e633-4f69-852b-e9a5e84547d9', '1.mp4', 84.50960150960151, 84.50960150960151, 84.50960150960151, 84.50960150960151, 0, 41582592, NULL, 'b49aeb29-e41f-41f7-93ab-4a6e866c522e', '2022-12-27 02:58:10', '2022-12-27 02:58:10'),
	('9f8143e3-0b6f-4f7f-aef8-75a45690a313', '5.mp4', 61.322751322751316, 61.322751322751316, 61.322751322751316, 61.322751322751316, 0, 70516736, NULL, 'a63019c2-b15e-4b8c-85f3-a0429c8b5a10', '2022-12-26 22:37:50', '2022-12-26 22:37:50'),
	('a124dd27-7ca3-4fef-9912-747625a0dd2b', '1.mp4', 29.000105300567302, 43.24285387537836, 33.039106150175826, 37.80632453821706, 1, 75460608, NULL, 'a1ddd650-c549-456b-aa83-68f16ee52646', '2023-01-11 07:58:44', '2023-01-11 07:58:44'),
	('a2939e7a-552b-4ce0-b2b7-a5416c2fd8eb', '9.mp4', 81.68316831683168, 81.68316831683168, 81.68316831683168, 81.68316831683168, 0, 71680000, NULL, '75083a9a-798f-4222-8ce1-0b009f77e89c', '2022-12-26 21:00:40', '2022-12-26 21:00:40'),
	('a58da32b-0d33-479e-b5d0-05b7c5bb0b95', '1.mp4', 81.1881188118812, 81.1881188118812, 81.1881188118812, 81.1881188118812, 0, 43425792, NULL, '317f5ef8-7cab-43d9-b8bf-dad9652de8a3', '2022-12-27 00:14:44', '2022-12-27 00:14:44'),
	('a8ac1392-5236-4460-80e4-4b0210f302ff', '1.mp4', 85.28461353461354, 85.28461353461354, 85.28461353461354, 85.28461353461354, 0, 42258432, NULL, 'fa1aee7d-1419-4438-b1a5-0de171848b50', '2022-12-27 00:43:25', '2022-12-27 00:43:25'),
	('ab3b97bf-983a-470c-bec8-6c9eb1ce9829', '8.mp4', 51.41414141414141, 51.41414141414141, 51.41414141414141, 51.41414141414141, 0, 70844416, NULL, 'b0c569e1-6503-46bc-a658-3f87add7ee13', '2022-12-26 22:39:17', '2022-12-26 22:39:17'),
	('ac8d3431-8b70-48fe-9f6b-3b29b245b936', '1.mp4', 68.18181818181817, 68.18181818181817, 68.18181818181817, 68.18181818181817, 0, 70258688, NULL, 'a63019c2-b15e-4b8c-85f3-a0429c8b5a10', '2022-12-26 22:37:50', '2022-12-26 22:37:50'),
	('ad5f5ea3-601a-4b79-8bd8-5b28bc0a91d7', '9.mp4', 74.80392156862746, 74.80392156862746, 74.80392156862746, 74.80392156862746, 0, 70459392, NULL, '3f50e1eb-d303-4610-b6e8-a616a304e52a', '2022-12-26 22:39:46', '2022-12-26 22:39:46'),
	('b35357ca-f3a0-4123-98ed-5e8c2e19c50a', '10.mp4', 82.05445544554455, 82.05445544554455, 82.05445544554455, 82.05445544554455, 0, 43466752, NULL, '317f5ef8-7cab-43d9-b8bf-dad9652de8a3', '2022-12-27 00:14:44', '2022-12-27 00:14:44'),
	('b8bf7cd8-aeb8-464e-8af3-a6253ff7cd39', '4.mp4', 89.14965986394557, 89.14965986394557, 89.14965986394557, 89.14965986394557, 0, 70041600, NULL, '8f9e314b-4cc2-4b00-893b-9aea2929f4cc', '2022-12-26 20:46:48', '2022-12-26 20:46:48'),
	('b9d00412-57b7-4dbc-8c9b-0d55fbc6cc23', '3.mp4', 82.05445544554455, 82.05445544554455, 82.05445544554455, 82.05445544554455, 0, 71680000, NULL, '75083a9a-798f-4222-8ce1-0b009f77e89c', '2022-12-26 21:00:40', '2022-12-26 21:00:40'),
	('ba6279d6-ca08-4c7f-a334-d2584d012eb1', '8.mp4', 80.56930693069307, 80.56930693069307, 80.56930693069307, 80.56930693069307, 0, 43524096, NULL, '317f5ef8-7cab-43d9-b8bf-dad9652de8a3', '2022-12-27 00:14:44', '2022-12-27 00:14:44'),
	('bbf20928-2e45-4fe7-b1f5-e4de0f708874', '6.mp4', 66.03174603174602, 66.03174603174602, 66.03174603174602, 66.03174603174602, 0, 70430720, NULL, '3f50e1eb-d303-4610-b6e8-a616a304e52a', '2022-12-26 22:39:46', '2022-12-26 22:39:46'),
	('bc56a040-ac43-449c-b0ae-6b2645f01173', '5.mp4', 61.322751322751316, 61.322751322751316, 61.322751322751316, 61.322751322751316, 0, 70418432, NULL, '3f50e1eb-d303-4610-b6e8-a616a304e52a', '2022-12-26 22:39:46', '2022-12-26 22:39:46'),
	('bf66b34f-340f-4307-97ea-488681b3ea92', '1.mp4', 68.18181818181817, 68.18181818181817, 68.18181818181817, 68.18181818181817, 0, 70701056, NULL, 'b0c569e1-6503-46bc-a658-3f87add7ee13', '2022-12-26 22:39:17', '2022-12-26 22:39:17'),
	('bf9a8e9b-bdba-4438-b445-5d64055bb741', '1.mp4', 68.18181818181817, 68.18181818181817, 68.18181818181817, 68.18181818181817, 0, 70156288, NULL, '3f50e1eb-d303-4610-b6e8-a616a304e52a', '2022-12-26 22:39:46', '2022-12-26 22:39:46'),
	('bffbb08c-36b9-47c0-b530-c46dca917b20', '7.mp4', 93.94841269841271, 93.94841269841271, 93.94841269841271, 93.94841269841271, 0, 70266880, NULL, 'bd33673e-95d1-4537-b147-4e3f5c5f948a', '2022-12-26 18:33:01', '2022-12-26 18:33:01'),
	('c01e21ff-21d8-4f28-85e6-7eddd450deaa', '3.mp4', 80.19801980198021, 80.19801980198021, 80.19801980198021, 80.19801980198021, 0, 43503616, NULL, '317f5ef8-7cab-43d9-b8bf-dad9652de8a3', '2022-12-27 00:14:44', '2022-12-27 00:14:44'),
	('c0ea4fd2-2441-413c-8e71-14ba2064dc28', '4.mp4', 82.17821782178217, 82.17821782178217, 82.17821782178217, 82.17821782178217, 0, 71680000, NULL, '75083a9a-798f-4222-8ce1-0b009f77e89c', '2022-12-26 21:00:40', '2022-12-26 21:00:40'),
	('c34eb3d9-1c1b-4ff6-b260-d7bb2b694fad', '2.mp4', 65.38461538461539, 65.38461538461539, 65.38461538461539, 65.38461538461539, 0, 70729728, NULL, 'b0c569e1-6503-46bc-a658-3f87add7ee13', '2022-12-26 22:39:17', '2022-12-26 22:39:17'),
	('c3e3efa2-7b3d-4769-8d21-96429e5dbad3', '7.mp4', 50.93240093240093, 50.93240093240093, 50.93240093240093, 50.93240093240093, 0, 70832128, NULL, 'b0c569e1-6503-46bc-a658-3f87add7ee13', '2022-12-26 22:39:17', '2022-12-26 22:39:17'),
	('c408302e-153a-40f8-9bf5-965491bf1668', '8.mp4', 51.41414141414141, 51.41414141414141, 51.41414141414141, 51.41414141414141, 0, 70455296, NULL, '3f50e1eb-d303-4610-b6e8-a616a304e52a', '2022-12-26 22:39:46', '2022-12-26 22:39:46'),
	('c4dea44a-fde8-4084-8b50-b2bde0e4107b', '8.mp4', 51.41414141414141, 51.41414141414141, 51.41414141414141, 51.41414141414141, 0, 70541312, NULL, 'a63019c2-b15e-4b8c-85f3-a0429c8b5a10', '2022-12-26 22:37:50', '2022-12-26 22:37:50'),
	('c4efb2fa-09db-4f58-80f0-a706847ab34a', '12.mp4', 85.26787564287564, 85.26787564287564, 85.26787564287564, 85.26787564287564, 0, 70242304, NULL, 'bd33673e-95d1-4537-b147-4e3f5c5f948a', '2022-12-26 18:33:01', '2022-12-26 18:33:01'),
	('c598de7c-e436-4262-ab44-e80c4a1499a5', '7.mp4', 85.09314296814296, 85.09314296814296, 85.09314296814296, 85.09314296814296, 0, 70045696, NULL, '8f9e314b-4cc2-4b00-893b-9aea2929f4cc', '2022-12-26 20:46:48', '2022-12-26 20:46:48'),
	('c5fbf440-3f5b-4344-b196-290e05baa1b9', '9.mp4', 74.80392156862746, 74.80392156862746, 74.80392156862746, 74.80392156862746, 0, 70848512, NULL, 'b0c569e1-6503-46bc-a658-3f87add7ee13', '2022-12-26 22:39:17', '2022-12-26 22:39:17'),
	('c642d15a-c7c0-49c0-a131-0f249d214883', '6.mp4', 82.57919709565546, 82.57919709565546, 82.57919709565546, 82.57919709565546, 0, 70262784, NULL, 'bd33673e-95d1-4537-b147-4e3f5c5f948a', '2022-12-26 18:33:01', '2022-12-26 18:33:01'),
	('d109f373-cd16-4a1e-aff4-68ec1ac1bca5', '5.mp4', 61.322751322751316, 61.322751322751316, 61.322751322751316, 61.322751322751316, 0, 70795264, NULL, 'b0c569e1-6503-46bc-a658-3f87add7ee13', '2022-12-26 22:39:17', '2022-12-26 22:39:17'),
	('d2061573-8b97-4a76-a4a3-c084c130ecf0', '7.mp4', 81.06435643564357, 81.06435643564357, 81.06435643564357, 81.06435643564357, 0, 43524096, NULL, '317f5ef8-7cab-43d9-b8bf-dad9652de8a3', '2022-12-27 00:14:44', '2022-12-27 00:14:44'),
	('d3212f00-c872-430d-b4a4-18f0adae9c17', '6.mp4', 81.55940594059405, 81.55940594059405, 81.55940594059405, 81.55940594059405, 0, 43524096, NULL, '317f5ef8-7cab-43d9-b8bf-dad9652de8a3', '2022-12-27 00:14:44', '2022-12-27 00:14:44'),
	('d379c763-42da-412d-bd67-6419dcc65f74', '8.mp4', 81.68316831683168, 81.68316831683168, 81.68316831683168, 81.68316831683168, 0, 71680000, NULL, '75083a9a-798f-4222-8ce1-0b009f77e89c', '2022-12-26 21:00:40', '2022-12-26 21:00:40'),
	('d3d4047c-7825-46a9-99bf-c281c23f4b15', '7.mp4', 50.93240093240093, 50.93240093240093, 50.93240093240093, 50.93240093240093, 0, 70443008, NULL, '3f50e1eb-d303-4610-b6e8-a616a304e52a', '2022-12-26 22:39:46', '2022-12-26 22:39:46'),
	('d7f308ca-827d-4b8d-8976-3317bdaa8f79', '5.mp4', 82.67326732673267, 82.67326732673267, 82.67326732673267, 82.67326732673267, 0, 71680000, NULL, '75083a9a-798f-4222-8ce1-0b009f77e89c', '2022-12-26 21:00:40', '2022-12-26 21:00:40'),
	('d8dcedf1-6fd2-4e60-a145-1f0d878318b5', '13.mp4', 85.38851585291214, 85.38851585291214, 85.38851585291214, 85.38851585291214, 0, 70250496, NULL, 'bd33673e-95d1-4537-b147-4e3f5c5f948a', '2022-12-26 18:33:01', '2022-12-26 18:33:01'),
	('e1d2f350-c333-428f-9bad-9d13fb6f80e7', '3.mp4', 68.35317460317461, 68.35317460317461, 68.35317460317461, 68.35317460317461, 0, 70787072, NULL, 'b0c569e1-6503-46bc-a658-3f87add7ee13', '2022-12-26 22:39:17', '2022-12-26 22:39:17'),
	('e4f33bbe-829c-4a26-a226-6bc942e1aaa2', '2.mp4', 65.38461538461539, 65.38461538461539, 65.38461538461539, 65.38461538461539, 0, 70283264, NULL, 'a63019c2-b15e-4b8c-85f3-a0429c8b5a10', '2022-12-26 22:37:50', '2022-12-26 22:37:50'),
	('f0a5e440-6172-43d4-89ae-e78ec463235e', '6.mp4', 66.03174603174602, 66.03174603174602, 66.03174603174602, 66.03174603174602, 0, 70799360, NULL, 'b0c569e1-6503-46bc-a658-3f87add7ee13', '2022-12-26 22:39:17', '2022-12-26 22:39:17'),
	('f0d9d502-c54d-4d8a-9a36-2b45e8d6aa1a', '3.mp4', 68.35317460317461, 68.35317460317461, 68.35317460317461, 68.35317460317461, 0, 70508544, NULL, 'a63019c2-b15e-4b8c-85f3-a0429c8b5a10', '2022-12-26 22:37:50', '2022-12-26 22:37:50'),
	('f25b023c-84f8-497a-87ef-2d3c1ea1bff8', '4.mp4', 26.084656084656082, 26.084656084656082, 26.084656084656082, 26.084656084656082, 0, 41971712, NULL, '6d107453-eb43-4b46-a2d8-a39ec5434442', '2022-12-27 01:41:05', '2022-12-27 01:41:05'),
	('f2c981cd-3a68-407d-a0d6-8fc86add0a8f', '9.mp4', 100, 100, 100, 100, 0, 70270976, NULL, 'bd33673e-95d1-4537-b147-4e3f5c5f948a', '2022-12-26 18:33:01', '2022-12-26 18:33:01'),
	('f3f3783b-c062-46da-9ace-7d1960d9fa1b', '9.mp4', 74.80392156862746, 74.80392156862746, 74.80392156862746, 74.80392156862746, 0, 70541312, NULL, 'a63019c2-b15e-4b8c-85f3-a0429c8b5a10', '2022-12-26 22:37:50', '2022-12-26 22:37:50'),
	('f7202c9b-8777-4eaf-bc26-84dcb56c5a87', '5.mp4', 96.52777777777777, 96.52777777777777, 96.52777777777777, 96.52777777777777, 0, 70262784, NULL, 'bd33673e-95d1-4537-b147-4e3f5c5f948a', '2022-12-26 18:33:01', '2022-12-26 18:33:01');

-- Dumping structure for table ai_evaluation_dev_1.user
CREATE TABLE IF NOT EXISTS `user` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `username` text NOT NULL,
  `password` text NOT NULL,
  `email` text NOT NULL,
  `firstName` text NOT NULL,
  `lastName` text NOT NULL,
  `role` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table ai_evaluation_dev_1.user: ~5 rows (approximately)
REPLACE INTO `user` (`id`, `username`, `password`, `email`, `firstName`, `lastName`, `role`, `createdAt`, `updatedAt`) VALUES
	('0315ed93-5ffe-40fd-af5c-8fb56557507b', 'vuanh', '$2b$10$2WpxRQjswMgha5/Vk.pg/.loUiOGzX6IGMWfaMtMGUi7j3tD9DZ6a', 'vu.anh147852@gmail.com', 'vu', 'minh anh', 'user', '2022-12-19 17:06:24', '2022-12-19 17:06:24'),
	('0417433a-6ad6-4aee-b7d6-7aa62ddf4ce9', 'admin2', '$2b$10$REHtNKmJQrTKVcRh5KEHz.eIaMyZ0K74NQUybeWPm7/rd8mFJsG4y', 'vu.anh147852@gmail.com', 'vu', 'minh anh', 'admin', '2022-12-19 17:09:17', '2022-12-19 17:09:17'),
	('314b4da1-a364-47c5-8c6a-c74e88594ae8', 'admin', '$2b$10$xce9Pj.sImKaZL./iNQV0u2UUOkhUSeHZypfdJgyJuL9Hef02hrbe', 'admin@gmail.com', 'Admin', 'Admin', 'admin', '2022-11-27 02:45:49', '2022-11-27 02:45:49'),
	('6702a0e7-4283-4f1d-b406-b2bff0b8e1f3', 'superadmin', '$2b$10$K4VaglfBLfRV6FI6wDOqo.o6IoX59BioJvmv12jOAY1LrQB/IKMdC', 'superadmin@gmail.com', 'Superadmin', 'Superadmin', 'superadmin', '2022-11-27 02:46:35', '2022-11-27 02:46:35'),
	('8552c585-064d-42da-9b52-5f34f333cfaa', 'user', '$2b$10$e4/ZYkpgA1FqpqCrsy8h8.6QGRyrIJj8XqVQghNLR9DekoPNxjrme', 'user@gmail.com', 'User', 'User', 'user', '2022-11-27 02:46:07', '2022-11-27 02:46:07');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
