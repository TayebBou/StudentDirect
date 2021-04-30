![ezgif-2-a5133321f7db](https://user-images.githubusercontent.com/52780772/116741887-26980000-a9e6-11eb-918b-08952f2b6695.gif)

![ezgif-2-33a78f53f773](https://user-images.githubusercontent.com/52780772/116741915-2b5cb400-a9e6-11eb-8048-9ffc27b34217.gif)

![ezgif-2-c28a7f0804fb](https://user-images.githubusercontent.com/52780772/116741926-2dbf0e00-a9e6-11eb-93bf-92be8df21882.gif)

# StudentDirect

## Information System for Student Management with Angular 8 / JavaScript / TypeScript / Angular Material / Swagger / Sass in frontend and NodeJs / Express JS / MongoDB / JWT / REST API / JSON in backend.

### In this application I used the MEAN STACK TECHNOLOGIES

MEAN :

    _ MongoDB
    
    _ Express.JS
    
    _ Angular
    
    _ Node.JS

# HOW TO LAUNCH : 

## 1 - Install Node.js plateform
#### ( Choose the LTS version recommanded for most users )
## 2 - Install the SGBD MongoDB
#### ( Choose the MongoDB Entreprise Server for best features )
## 3 - Install Robo 3T GUI ( graphical user interface )
#### ( Install only the Robo 3T GUI without IDE the Robot 3T is used to see the data in the MongoDB )
## 4 - Clone the project
#### ( Clone or download the project )
## 5 - Open the API projet and install all dependencies
#### ( Position yourself at the root of API and run "npm i" commande )
## 6 - Run the database
#### ( Position yourself at the root of API in a terminal and run the following command : "C:/"Program Files"/MongoDB/Server/4.4/bin/mongod.exe --dbpath=/Users/Mr-Ta/mongodb-data" change the paths depending on yours and let the terminal open )
## 7 - In a new terminal start the API
#### ( Start the API with "npm start" commande in a new terminal in the root of the API )
## 8 - Go to http://localhost:3000/api/api-docs/ and Add an Admin with the post methode
#### ( You will be redirect to a swagger documentation to create the first admin because tha app need at least one admin to login and there is no signup cuz it's an administration application for student management and don't forget the password cuz you will use it to login)
## 9 - Run the angular frontend application
#### ( Position yourself at the root of frontend project and run "npm i" commande and start the front app with "ng serve" commande )
## 10 - Open your browser on http://localhost:4200/
#### ( You will be redirected to the login page )
## 11 - Login with the identifiers of the admin you just created
#### ( Done now you have access to the application and you can start by creating a student and modules, exams, delays, payments ... )

### Security

If you want to secure the account api go to account route in API and enable the comment : //router.all('*', verify).
this means the middlware method verify will be executed before running any account request and you can check this verify method in the middlware folder it's just a method who check the JWT token.

### EMAILS

To send Emails put your Gmail address and Gmail password in the student controller in controller folder in the create method when we creat a student we send a mail for him with his identifiers and also in passForget controller we sent an email for people who forget the students who forget the password with the link they can use to change it.

Kind regards :)

![Students](https://user-images.githubusercontent.com/52780772/116730705-56d8a200-a9d8-11eb-8423-080e99cbb9e5.png)

![Modules](https://user-images.githubusercontent.com/52780772/116730728-5c35ec80-a9d8-11eb-9bc9-a0fffa5ee91d.JPG)

![Payment](https://user-images.githubusercontent.com/52780772/116730737-60faa080-a9d8-11eb-9c26-b098a4f9172b.png)
