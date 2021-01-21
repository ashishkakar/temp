DROP TABLE IF EXISTS admins;
DROP TABLE IF EXISTS skills;
DROP TABLE IF EXISTS skill_categories;
DROP TABLE IF EXISTS guest_forms;

CREATE TABLE guest_forms (
	id INT AUTO_INCREMENT PRIMARY KEY,
	first_name VARCHAR(255) NOT NULL,
	last_name VARCHAR(255) NOT NULL,
	street VARCHAR(255) NOT NULL,
	city VARCHAR(255) NOT NULL,
	zip VARCHAR(255) NOT NULL,
	city_state VARCHAR(255) NOT NULL,
	phone_country VARCHAR(255) DEFAULT "91",
	phone VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL,
	ip VARCHAR(15) NOT NULL,
	created_at VARCHAR(19) DEFAULT NOW()
) ENGINE = INNODB; -- Check engine available, check mysql

CREATE TABLE skill_categories (
	id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	CONSTRAINT unique_name UNIQUE(name)
) ENGINE = INNODB;

CREATE TABLE skills (
	id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	category INT NOT NULL,
	FOREIGN KEY (category) REFERENCES skill_categories(id) ON DELETE CASCADE,
	CONSTRAINT unique_name UNIQUE(category, name)
) ENGINE = INNODB;

INSERT INTO skill_categories (name) VALUES ('Scripting Languages'), ('Other Languages'), ('Databases'), ('Personal Skills');

INSERT INTO skills (name, category) VALUES
	('PHP', 1), ('Javascript', 1), ('Ruby', 1), ('ASP', 1), ('Perl', 1),
	('C', 2), ('C++', 2), ('Java', 2), ('Delphi', 2),
	('MySQL', 3), ('MSSQL', 3), ('Oracle', 3), ('PostgreSQL', 3),
	('Communication', 4), ('Leadership', 4), ('Diligence', 4);

CREATE TABLE admins (
	id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	login VARCHAR(255) NOT NULL,
	hash VARCHAR(64) NOT NULL,
	salt VARCHAR(64) NOT NULL,
	email VARCHAR(255) NOT NULL,
	phone_country VARCHAR(255) DEFAULT "91",
	phone VARCHAR(255) NOT NULL,
	created_at VARCHAR(19) DEFAULT NOW(),
	last_login_at VARCHAR(19) NOT NULL,
	last_login_ip VARCHAR(15) NOT NULL,
	logged_in TINYINT DEFAULT 0, -- 0: logged out, 1: logged in
	status TINYINT DEFAULT 1, -- 1: active, 2: expired, 3: banned
	CONSTRAINT unique_login UNIQUE(login),
	CONSTRAINT unique_email UNIQUE(email),
	INDEX login_index(login)
) ENGINE = INNODB;

INSERT INTO admins (name, login, hash, salt, email) VALUES ('Cue Blocks', 'cueblocks', '6008e892faac4e8e271d94fada4f8daabe8713c04a23f06e4dabaa0773103e25', 'dcf1fdd5aab2bef733be63e58d261a325b632a02248f8a8dfc8ad05b51abe266', 'admin@cueblocks.com');

CREATE TABLE guest_skills (
	id INT AUTO_INCREMENT PRIMARY KEY,
	guest INT NOT NULL,
	skill INT NOT NULL,
	score TINYINT DEFAULT 1,
	FOREIGN KEY (guest) REFERENCES guest_forms(id) ON DELETE CASCADE,
	FOREIGN KEY (skill) REFERENCES skills(id) ON DELETE CASCADE,
) ENGINE=INNODB;

CREATE TABLE password_retries (
	id INT AUTO_INCREMENT PRIMARY KEY,
	login VARCHAR(255) NOT NULL,
	hash VARCHAR(64) NOT NULL
	ip VARCHAR(15) NOT NULL,
	tried_at VARCHAR(19) DEFAULT NOW()
) ENGINE=INNODB;

CREATE TABLE ip_bans (
	ip VARCHAR(15) PRIMARY KEY,
	banned_at VARCHAR(19) DEFAULT NOW()
) ENGINE=INNODB;
