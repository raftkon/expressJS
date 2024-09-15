# ExpressJS boilerplate

A template for ExpressJS server application with MongoDB and predefined User model
with JWT and cookie authentication and `controllers`, `routes`, `middlewares` folders example.
Also `errors` folder for proper error handling and `lib` folder with security oriented helper classes.
The project is containerized with Docker.

It is an ExpressJS application with standard folder structure, MongoDB as a database
and predefined User model with JWT and cookie authentication. It is a template for

## Authentication & Authorization

The application has an authentication system utilizing `jsonwebtoken` and `cookie-session` npm modules.
With JWT you don't need to store anything in the database, it is signed with a custom secret so that
you know if someone has tampered the token. In addition, the `cookie-session` module used signs again
the cookie so that you know if someone tampered the cookie. We use cookies to transfer the token in
order to transfer it immidiateley in case we have server-side render frontend like `NextJS` and also
because we use `http-only cookies` to avoid XSS attacks. Finally, for better security we encrypt the
user data in the jwt before we put it inside the cookie and we decrypt it to get the user data back.
We do this with /src/lib/secure.js where it is implemented the Secure class. It contains 2 methods
`encrypt()` and `decrypt()` utilizing `node:crypto` module. We create a cipher given the 1) algorithm, 2) key, 3) iv (initialization vector).
The algorithms you can use are standard (check docs), the key must be a Buffer with 24 bytes and the iv must be a Buffer with 16 bytes.

## Mongo

To run a MongoDB instance using Docker:

```bash
docker run -it --rm --name db -p 27017:27017 mongo
```

## Run the application

To run the expressJS application:

```bash
npm run dev
```

## Run with docker-compose

There are two docker-compose files, `docker-compose.dev.yml` and `docker-compose.yml` for development
and production respectively. To run the application:

```bash
docker compose up -d && docker compose logs -f
```
