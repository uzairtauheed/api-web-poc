api-web-poc
===========

An API/Web app PoC using a bunch of modules and frameworks, like Express.js, AngularJS, Browserify, Mongo, etc.

## Dependencies

This is a MEAN application (MongoDB, Express.js, AngularJS, Node.js), therefore you need to have a working installation of Node.js (0.10.x) and MongoDB (2.x). You will also require `nodemon` installed to make your life easier if any change is done on Node.js.

## Install

IF there is no `nodemon` installed follow the command below, otherwise skip to step 2.

### Step 1

```sh
npm install -g nodemon
```

### Step 2

```sh
# CD to API folder and install Node.js dependencies
cd api
npm install

# CD to Web App folder and install Node.js and Browser dependencies
cd ../web
npm install
bower install
```

## Run

This project is conformed by 2 applications, therefore you will need to run both simultaneously. You will require to have a local MongoDB server running with default settings (no user/password required, listening on port 27017).

On one terminal (console)
```sh
cd api
npm start
```

And on a different terminal (console)
```sh
cd web
npm start
```

The application itself require a user to be already present, therefore, you will need to insert a test user on a users collection:

```sh
$ mongo
MongoDB shell version: 2.4.9
> use test
switched to db test
> db.users.insert({"email": "test@test.com", "firstName": "Test", "lastName": "User", "password": "12345", "token": ""})
>
```

