-- Create the database if it does not exist
CREATE DATABASE IF NOT EXISTS mess_feedback;
USE mess_feedback;

-- Create the feedback table
CREATE TABLE IF NOT EXISTS feedback (
    id INT AUTO_INCREMENT PRIMARY KEY,
    reg_no VARCHAR(20) NOT NULL,
    student_name VARCHAR(100) NOT NULL,
    block_room VARCHAR(50) NOT NULL,
    mess_name VARCHAR(100) NOT NULL,
    mess_type ENUM('Veg', 'Non-Veg', 'Special', 'Night Mess') NOT NULL,
    category ENUM('Quality', 'Quantity', 'Hygiene', 'Mess Timing', 'Others') NOT NULL,
    feedback_type VARCHAR(255) NOT NULL,
    comments TEXT NOT NULL,
    proof VARCHAR(255) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


