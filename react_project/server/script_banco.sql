create database tenises;

CREATE TABLE tenises.`user` (
	user_id INT(11) auto_increment NULL,
	name varchar(100) NOT NULL,
	email varchar(100) NOT NULL,
	password varchar(100) NOT NULL,
	CONSTRAINT user_pk PRIMARY KEY (user_id)
);

CREATE TABLE tenises.tenis (
	tenis_id int(11) auto_increment NULL,
	name varchar(100) NOT NULL,
	price DECIMAL(14,2) NOT NULL,
	color varchar(100) NULL,
	`size` int(11) NOT NULL,
	user_id int(11) NOT NULL,
	CONSTRAINT tenis_pk PRIMARY KEY (tenis_id),
	CONSTRAINT tenis_FK FOREIGN KEY (user_id) REFERENCES tenises.`user`(user_id) ON DELETE CASCADE
);
