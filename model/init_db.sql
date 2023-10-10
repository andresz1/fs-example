--
-- Drop Tables
--

SET foreign_key_checks = 0;
DROP TABLE if exists cats;
SET foreign_key_checks = 1;

--
-- Create Tables
--
CREATE TABLE cats(
  id INT NOT NULL AUTO_INCREMENT, 
  name VARCHAR(60) not null, 
  age INT,
  PRIMARY KEY (id)
);

INSERT INTO cats(name, age) VALUES ('michi', 5);