CREATE DATABASE IF NOT EXISTS msisdb;
USE msisdb;


-- Final Project

DROP TABLE IF EXISTS assignment;

DROP TABLE IF EXISTS Game;
CREATE TABLE Game (
	id int PRIMARY KEY AUTO_INCREMENT ,
    gameName varchar(24),
    Field varchar(24) NOT NULL,
    gameDate date NOT NULL,
    gameTime time NOT NULL
);

INSERT INTO Game (id, gameName, Field, gameDate, gameTime) VALUES 
(1, 'Game 1', 'Field 1', '2021-11-08', '9:30'),
(2, 'Game 2', 'Field 2', '2021-11-08', '11:00'),
(3, 'Game 3', 'Field 3', '2021-11-08', '16:30');

DROP TABLE IF EXISTS Referee_table;
CREATE TABLE Referee_table (
    RefereeID int PRIMARY KEY AUTO_INCREMENT,
    Name varchar(24) NOT NULL,
	Age int NOT NULL,
	Grade varchar(24) NOT NULL,
	Skill int NOT NULL
);

INSERT INTO Referee_table (RefereeID, Name, Age, Grade, Skill) VALUES 
(1, 'Tom Gregory', 34, 'National', 88),
(2, 'Beth Barnhart', 34, 'Regional', 58),
(3, 'Bipin Prabhakar', 43, 'Grassroots', 78);

/**ALTER TABLE Referee_table
ADD COLUMN status enum('Unassigned', 'Assigned', 'Tentative', 'Accepted')
NOT NULL DEFAULT 'Unassigned'; **/


CREATE TABLE assignment (
	id INT NOT NULL PRIMARY KEY auto_increment, 
	refereeid INT,
	gameid INT,
	foreign key (refereeid) references Referee_table(RefereeID),
	foreign key (gameid) references Game(id),
    position enum('Head', 'Assistant', 'Fourth Official'),
	status enum('Unassigned', 'Assigned', 'Tentative', 'Accepted') NOT NULL DEFAULT 'Unassigned'
);

INSERT INTO assignment (id, refereeid, gameid, position, status) VALUES 
(1, 1, 1, 'Head', 'Assigned'),
(2, 2, 2, 'Head', 'Assigned'),
(3, 3, 3, 'Head', 'Assigned');


/** SELECT name, username, MAX(salary) AS maxSalary, COUNT(salary) AS offerCount
FROM student LEFT OUTER JOIN offer ON student.id = offer.studentId
GROUP BY usename, name
; **/

