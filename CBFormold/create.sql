DROP TABLE IF EXISTS admins;
DROP TABLE IF EXISTS skills;
DROP TABLE IF EXISTS skill_categories;
DROP TABLE IF EXISTS form_fields;

CREATE TABLE form_fields (
	id INT AUTO_INCREMENT PRIMARY KEY,
	first_name VARCHAR(255) NOT NULL,
	last_name VARCHAR(255) NOT NULL,
	street VARCHAR(255) NOT NULL,
	city VARCHAR(255) NOT NULL,
	zip INT NOT NULL,
	city_state VARCHAR(255) NOT NULL,
	phone_country INT DEFAULT 91,
	phone VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL,
	created_at VARCHAR(255) DEFAULT NOW(),
	status TINYINT DEFAULT 1 -- 1: Valid, 2: Expired
) ENGINE = INNODB; -- Check engine available, Check MariaDB. Might not work properly on MySQL

CREATE TABLE skill_categories (
	id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(255),
	created_at VARCHAR(255) DEFAULT NOW(),
	status TINYINT DEFAULT 1 -- 1: Valid, 2: Expired
) ENGINE = INNODB;

CREATE TABLE skills (
	id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(255),
	category INT NOT NULL,
	created_at VARCHAR(255) DEFAULT NOW(),
	status TINYINT DEFAULT 1, -- 1: Valid, 2: Expired
	FOREIGN KEY (category) REFERENCES skill_categories(id) ON DELETE CASCADE
) ENGINE = INNODB;

INSERT INTO skill_categories (name) VALUES ('Scripting Languages'), ('Other Languages'), ('Databases'), ('Personal Skills');

INSERT INTO skills (name, category) VALUES
	('PHP', 1), ('Javascript', 1), ('Ruby', 1), ('ASP', 1), ('Perl', 1),
	('C', 2), ('C++', 2), ('Java', 2), ('Delphi', 2),
	('MySQL', 3), ('MSSQL', 3), ('Oracle', 3), ('PostgreSQL', 3),
	('Communication', 4), ('Leadership', 4), ('Diligence', 4);

CREATE TABLE admins (
	id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(255),
	login VARCHAR(255) NOT NULL,
	hash VARCHAR(64) NOT NULL,
	email VARCHAR(255) NOT NULL,
	phone_country INT DEFAULT 91,
	phone VARCHAR(255),
	created_at VARCHAR(255) DEFAULT NOW(),
	status TINYINT DEFAULT 1 -- 1: Valid, 2: Expired
) ENGINE = INNODB;