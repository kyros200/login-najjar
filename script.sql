create database auth;

use auth;

create table login (
	id_user int NOT NULL auto_increment,
    login varchar(255) NOT NULL,
    randomInfo varchar(100),
	password binary,
    salt binary,
    PRIMARY KEY (id_user)
);

insert into login 
    (login, randomInfo)
values
    ("test1", "Random Info")

select * from login;