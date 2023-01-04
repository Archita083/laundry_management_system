CREATE DATABASE laundrydb CHARACTER SET utf8 COLLATE utf8_general_ci;
show databases;
USE laundrydb;
create table user_table(
id int not null auto_increment,
Fullname varchar(20),
Email varchar(80),
Phone_number varchar(15),
Password varchar(64)
);
select * from user_table;
insert into user_table (id, Fullname, Email, Phone_number, Password) values (1, 'Archita Mishra', 'architamishra674@gmail.com', 6372487005, 'rima');





												


