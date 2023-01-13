## Welcome to laundry management system code
## Requirements:
The laundry management system aim is to provide laundry related facilities to the user like washing, dry cleaning and iron , it give some beneficial facilities like:
- It saves our time , like we place a order in online and don't need to go anywhere for placing a order.
- The user can easily see their request status like it's submitted or inprogress or done.
- Here the data of a user stay safely. 

## Solution Design :
The laundry management system using the MVC architechture:
- M(model): Model is mainly the MySQL database where we store the data in two table (user and request) of this managemnet system using mysql.
- V(view): View is mainly focus the frontend part of the management system using handelbars(hbs), css, javascript.
- C(controller): Controller is mainly focus the backend part of the management system using node.js's App.js file.
- Here we design the below pages:
- Home page.
- Register page. 
- Login page.
- User dashboard. 
- Employee dashboard. 
- New request page.
- Old request page. 
- Update status page.

## Technology involved:
- Handelbars
- css
- javascript
- node.js
- mysql

## Project Structure :
- ![Optional Text](/images/projectstructure.png)

## Assumption:
- We have two types of user:
- Laundry user:- External person who can place a request.
- Laundry employee:- Internal employee to change status. 
- Here we have two dashboard one is laundry user dashboard and another one is the laundry employee dashboard.
- In laundry user dashboard the user can raise a new request using the provided email id and also their old request list and status.
- In laundry employee dashboard the employee can see the requests and update the status.  

## Steps to run the application
  ### Step -1: Installed node.js in your system

- Clone the project into the local.
- Navigate the path.
- Open the command prompt.
- Run-"npm start".
 ### Step -2: Installed mysql in your system

 - Then create a database using this file:"laundry_management_system/MYSQL Query/sqlquery.sql"

 ### URls
- https://www.lifewire.com/how-to-install-mysql-windows-10-4584021
- https://www.itsolutionstuff.com/post/node-js-crud-with-mysql-tutorial-exampleexample.html
- https://youtube.com/watch?v=2I5jZ-S8BuM&feature=shares
- https://nodejs.org/en/download/
- https://www.w3schools.com/html/default.asp

