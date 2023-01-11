CREATE DATABASE laundrydb CHARACTER SET utf8 COLLATE utf8_general_ci;

USE laundrydb;

create table user_table(
fullname varchar(50),
phonenumber varchar(20),
email varchar(80) primary key,
password varchar(70),
usertype varchar(20)
);

create table request_table(
pickupdate date not null,
topwear int,
bottomwear int,
otherwears int,
email varchar(80),
status varchar(80)
);





												


