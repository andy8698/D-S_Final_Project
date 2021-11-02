CREATE DATABASE IF NOT EXISTS msisdb;
USE msisdb;

DROP TABLE IF EXISTS student;
CREATE TABLE student (
	id int PRIMARY KEY AUTO_INCREMENT ,
    username varchar(24) UNIQUE NOT NULL,
    name varchar(48)
);

INSERT INTO student (id, username, name) VALUES 
(1, 'tomgreg', 'Tom Gregory'),
(2, 'beth1', 'Beth Barnhart'),
(3, 'bipin', 'Prof. Prabhakar');

-- SELECT * FROM students;

DROP TABLE IF EXISTS offer;
CREATE TABLE offer (
	id int PRIMARY KEY AUTO_INCREMENT,
    studentId int NOT NULL REFERENCES student(id) 
        ON DELETE CASCADE ON UPDATE CASCADE,
	companyName VARCHAR(24) NOT NULL DEFAULT '',
    salary int NOT NULL DEFAULT 0,
    bonus int NOT NULL DEFAULT 0,
	offerDate date NOT NULL DEFAULT (CURRENT_DATE)
);

-- Student 1 has no offers, Student 2 has 3 offers, Student 3 has one offer
INSERT INTO offer(id, studentId, companyName, salary, bonus, offerDate) VALUES
  (1, 2, 'KPMG', 95000, 7000, '2021-09-30'),
  (2, 2, 'Deloitte Digital', 94000, 12000, '2021-10-03'),
  (3, 2, 'IU, ISGP', 54000, 0, '2021-10-05'),
  (4, 3, 'Amazon', 122000, 11000, '2021-10-15');

-- COMMIT;

-- CREATE USER 'msisreader'@'%' IDENTIFIED BY 'msisreadonly';
-- GRANT SELECT ON * . * TO 'msisreader'@'%';

-- Homework;

drop table if exists book_table;

create table book_table (
    ID int PRIMARY KEY AUTO_INCREMENT,
	Title VARCHAR(48) NOT NULL, 
	Author VARCHAR(24) NOT NULL, 
	Year_Published INTEGER NOT NULL, 
	Publisher VARCHAR(24) NOT NULL, 
	Page_Count INTEGER NOT NULL, 
	MSRP FLOAT NOT NULL
);


insert into book_table (ID, Title, Author, Year_Published, Publisher, Page_Count, MSRP) values
(1, 'Harry Potter and the Sorcerers Stone', 'J.K. Rowling', 1998, 'Scholastic', 309, 6.98),
(2, 'The Hobbit', 'J. R. R. Tolkien', 1937, 'Recorded Books', 310, 7.63),
(3, 'Enders Game', 'Orson Scott', 1985, 'Tor Teen', 384, 9.34),
(4, 'Fahrenheit 451', 'Ray Bradbury', 1953, 'Simon & Schuster', 249, 8.49);

-- SELECT * FROM book_table;

-- Final Project

DROP TABLE IF EXISTS Game;
CREATE TABLE Game (
	id int PRIMARY KEY AUTO_INCREMENT ,
    gameName varchar(24),
    Field varchar(24) NOT NULL,
    Time date NOT NULL
);

INSERT INTO Game (id, gameName, Field, Time) VALUES 
(1, 'Game 1', 'Field 1', 11/8/2021),
(2, 'Game 2', 'Field 2', 11/9/2021),
(3, 'Game 3', 'Field 3', 11/10/21);

DROP TABLE IF EXISTS Referee_table;
CREATE TABLE Referee_table (
    RefereeID int PRIMARY KEY AUTO_INCREMENT,
    GameID int NOT NULL REFERENCES Game(id) 
        ON DELETE CASCADE ON UPDATE CASCADE,
    Name varchar(24) NOT NULL,
	Age int NOT NULL,
	Grade int NOT NULL,
	Skill int NOT NULL
);

INSERT INTO Referee_table (RefereeID, GameID, Name, Age, Grade, Skill) VALUES 
(1, 2, 'Tom Gregory', 34, 1, 88),
(2, 2, 'Beth Barnhart', 34, 4, 58),
(3, 3, 'Bipin Prabhakar', 43, 2, 78);

ALTER TABLE Referee_table
ADD COLUMN status enum('Unassigned', 'Assigned', 'Tentative', 'Accepted')
NOT NULL DEFAULT 'Unassigned';

/** SELECT name, username, MAX(salary) AS maxSalary, COUNT(salary) AS offerCount
FROM student LEFT OUTER JOIN offer ON student.id = offer.studentId
GROUP BY usename, name
; **/


