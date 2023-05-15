## ONSHOPPRS - Online Shopping platform

This is an Online Shopping platform built using [Angular](https://angular.io/) for the front-end processes and [NodeJs](https://nodejs.org/en/), [Express.js](https://expressjs.com/), [MongoDB](https://www.mongodb.com/) and [Mongoose](https://mongoosejs.com/) for the back end services, to store data and build APIs endpoints for retrieving and manipulating user data.

## Project Description

Create an application that displays a list of products, allows adding new products, and procides a detailed view for each product.

Develop a RESTful API with Express that supports CRUD operations for the product list. Implement JWT-based authentication for the API and protect specific routes.

Choose a database, design a schema for the product list and implement CRUD operations.

## Table of Contents

- [Built With](#built-with)
- [Live Preview](#live-preview)
- [Required Installations](#required-installations)
- [Instalation of This App](#instalation)
- [License](#license)
- [Authors](#authors)

### Built With

- Angular
- Bootstrap,
- NodeJS,
- Express.js,
- MongoDB,
- Mongoose

<!-- LIVE PREVIEW -->

## Live Preview

This is the link to the live preview. Feel free to visit.<br>

The live version of the project: [OnShopprs App](https://onshopprs.netlify.app/)<br>

<!-- REQUIRED INSTALLATION -->

## Required Installations

<p>If you want a copy of this project running on your machine you have to install:</p>

- <a href="https://nodejs.org/en/">Node.js (v14.0.0 or greater)</a>
- <a href="https://www.mongodb.com/">MongoDB</a>. But for the purpose of testing, the server app is connected to an already exiting mongo database.

<!-- INSTALLATION -->

## Installation of This App

Once you have installed the required package shown on the [Required Installations](#required-installations), proceed with the following steps

Clone the Repository,

```Shell
your@pc:~$ git clone https://github.com/adaorachi/openfabric_assessment
```

Move into the downloaded folder

```Shell
your@pc:~$ cd openfabric_assessment
```

The folder above contains two sub-folders, namely- **frontend** and **backend**. Navigate to the **backend** folder.
Get the dependencies needed for the backend server and start the app server on PORT 5000

```Shell
your@pc:~$ cd backend
your@pc:~$ npm install
your@pc:~$ nodemon
```

From the **backend** folder, navigate back to the root folder and into the **frontend** folder. Start the front-end web app on PORT 4200

```Shell
your@pc:~$ cd ..
```

Get the dependencies needed for the front-end app. Start the web app on PORT 4200

```Shell
your@pc:~$ npm install
your@pc:~$ ng serve
```

Go to http://localhost:4200/ on your browser to view the app. You can create some products, remove them. And also view all product.
You also needed to be authenticated for view protected routes.
You can filter products by thier categories.

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->

## Author

MaryAnn Chukwuka

- Github: [@adaorachi](https://github.com/adaorachi)
- Linkedin: [MaryAnn Chukwuka](https://www.linkedin.com/in/adaorachi/)
