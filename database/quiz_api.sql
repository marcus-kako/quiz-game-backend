DROP DATABASE IF EXISTS QUIZ_GAME_API;

CREATE DATABASE QUIZ_GAME_API;

USE QUIZ_GAME_API;

CREATE TABLE Users (
    id INT NOT NULL auto_increment,
    displayName VARCHAR(30) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(15) NOT NULL,
    PRIMARY KEY(id)
) ENGINE=INNODB;

CREATE TABLE Games (
    id INT NOT NULL auto_increment,
    successes INT NOT NULL,
    mistakes INT NOT NULL,
    result INT NOT NULL,
    date DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
) ENGINE=INNODB;

CREATE TABLE Users_Games (
    user_id INT NOT NULL,
    game_id INT NOT NULL,
    FOREIGN KEY (user_id)
        REFERENCES Users (id)
        ON DELETE CASCADE,
    FOREIGN KEY (game_id)
        REFERENCES Games (id)
        ON DELETE CASCADE
)  ENGINE=INNODB;

SET SQL_SAFE_UPDATES = 0;
