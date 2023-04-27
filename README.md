## PF-26a
## Final Project, Group 08-26a


# Our group project	

This is a student group project done as a final big assigment, in wich join all the technologies learned at SoyHenry bootcamp, in addition the academy gathered the best developers of the *26A cohort* to make the first delivery of this app for a future deployment.

*Graduation project at soyHenry.com bootcamp.*

## About

This project allows users to view, search, save and buy diferent products. Also, allows administrators to manage diferent functionalities such as create, delete and modify diferent products, supervise user functions, purchases and much more.
---

<!--- - <a href="https://kilt-clothing.vercel.app">Deployment link<a> --->
## Developer Team

- <a href="https://github.com/AgustinEze">@AgustinEze</a>
- <a href="https://github.com/francoibanezwev">@francoibanezweb</a>
- <a href="https://github.com/Micaias7">@Micaias7</a>
- <a href="https://github.com/Naicolqui">@Naicolqui</a>
- <a href="https://github.com/tathapachon">@tathapachon</a>
- <a href="https://github.com/Uli-mgh">@Uli-mgh</a>

## Project Objetives

- Build a React Js app from scratch
- Afirm and conect all the learned concepts in the Carreer 
- Practice GIT workflow / team work, in a real working environment
- Use scrum agile methodology
- learn good programming practices

## Stack of Technologies

### Front End:
HTML, CSS, Javascript, React, Material-ui, Redux, Bootstrap.

### Back End:
Node.js, Express, Stripe, Sequelize, Firebase.

### Database:
PostgreSQL.

## BoilerPlate

The boilerPlate has two folders: `api` and `client`.

Inside `api` you must have to create a file called: `.env` 
that has the following form: 

```
DB_USER=postgresuser
DB_PASSWORD=postgrespassword
DB_HOST=localhost
PORT=postgresport
GOOGLE_MAIL_APP = mail
GOOGLE_MAIL_APP_PASS = google_mail_password
API_KEY_STRIPE=stripe_api_key
```
You have to replace `postgresuser`, `postgrespassword` and `postgresport` with your own credentials to connect to postgres database, and Mailgun services. This file will be ignored by github, as it contains sensitive information (the credentials).

## Next 
### _Connect the data base_

 - Go to your postgres database manager and create a new   database. Replace `"data_base_name"` in `.env` file with the name of the new database.

 ### _Install the necesary package to run it_

- Open the project console
    + Inside `api` folder, run the command line, `npm install` / `yarn install` 
    + Inside `client` folder, run the command line, `npm install` / `yarn install`.

### _Run the project_

- Open the project console
    + Inside `api` folder, run the command line, `npm run dev` / `yarn run dev`.

    + Inside `api` folder, run the command line, `npm run seed` / `yarn run seed` to fill the database, while the back is running.

    + Inside `client` folder, run the command line, `npm start` (go to http://localhost:3000/). 


<h2>Here are some screenshots:</h2>

<h5>Home page</h5>
<img src="assets/WhatsApp%20Image%202022-08-10%20at%2011.13.30%20PM%20(1).jpeg"/>
<img src="assets/WhatsApp%20Image%202022-08-10%20at%2011.13.30%20PM%20(2).jpeg"/>

<h5>Some alerts</h5>
<img src="assets/WhatsApp%20Image%202022-08-10%20at%2011.13.30%20PM.jpeg"/>

<h5>Product details</h5>
<img src="assets/WhatsApp%20Image%202022-08-10%20at%2011.13.31%20PM%20(2).jpeg"/>
<img src="assets/WhatsApp%20Image%202022-08-10%20at%2011.13.31%20PM%20(1).jpeg"/>

<h5>Admin panel</h5>
<img src="assets/WhatsApp%20Image%202022-08-10%20at%2011.13.31%20PM%20(3).jpeg"/>
