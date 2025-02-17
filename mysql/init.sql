CREATE DATABASE IF NOT EXISTS bd_maisa;

USE bd_maisa;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);
INSERT INTO users (name, email, password) VALUES
('admin', 'admin@maisa', 'passMaisA');

CREATE USER 'apibd'@'%' IDENTIFIED BY 'passmaisa';
GRANT ALL PRIVILEGES ON bd_maisa.* TO 'apibd'@'%';
FLUSH PRIVILEGES;
