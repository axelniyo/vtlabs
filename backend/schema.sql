
-- Create and use the database
CREATE DATABASE IF NOT EXISTS vtlabs_db;
USE vtlabs_db;

-- Table for Posts
CREATE TABLE IF NOT EXISTS `posts` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `uuid` VARCHAR(36) NOT NULL UNIQUE,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT NOT NULL,
  `imageUrl` VARCHAR(255),
  `category` ENUM('Announcement', 'Project', 'Training', 'Interior Design') NOT NULL,
  `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for Training Programs
CREATE TABLE IF NOT EXISTS `training_programs` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `uuid` VARCHAR(36) NOT NULL UNIQUE,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT NOT NULL,
  `duration` VARCHAR(100) NOT NULL,
  `status` ENUM('Open', 'Closed') NOT NULL,
  `year` INT NOT NULL,
  `mediaUrls` JSON
);

-- Table for Projects
CREATE TABLE IF NOT EXISTS `projects` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `uuid` VARCHAR(36) NOT NULL UNIQUE,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT NOT NULL,
  `imageUrl` VARCHAR(255),
  `year` INT NOT NULL,
  `trainingProgramId` VARCHAR(36)
);

-- Table for Applications
CREATE TABLE IF NOT EXISTS `applications` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `uuid` VARCHAR(36) NOT NULL UNIQUE,
  `fullName` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(50),
  `courseId` VARCHAR(36) NOT NULL,
  `courseName` VARCHAR(255) NOT NULL,
  `motivation` TEXT NOT NULL,
  `submittedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for Gallery Images (VTL-CRAFT)
CREATE TABLE IF NOT EXISTS `gallery_images` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `uuid` VARCHAR(36) NOT NULL UNIQUE,
  `imageUrl` VARCHAR(255) NOT NULL,
  `title` VARCHAR(255)
);

-- Table for Student Projects
CREATE TABLE IF NOT EXISTS `student_projects` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `uuid` VARCHAR(36) NOT NULL UNIQUE,
  `title` VARCHAR(255) NOT NULL,
  `studentName` VARCHAR(255) NOT NULL,
  `thread` JSON,
  `githubLink` VARCHAR(255),
  `websiteLink` VARCHAR(255),
  `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

