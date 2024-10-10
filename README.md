# ExpressJS boilerplate

## Mongo

To run a MongoDB instance using Docker:

```bash
docker run -it --rm --name db -p 27017:27017 mongo
```

## Run with docker-compose

There are two ways to run the project:

- `development`: running the _./dev.sh_, you can see live reload because the project runs with nodemon
- `production`: running the _./prod.sh_

### Bash Scripts

Check if the scripts are executables with `ls -la`. To mark the scripts as executables run:

```bash
chmod +x <filename>.sh
```

- `prod.sh`: The script contains all the configuration for _building_, _killing_ and _logging_ the **production** version of the project. It prompts you to choose between 3 options: (1) _build project_, (2) _kill project_ or (3) _see the logs of the project_.

- `dev.sh`: The script contains all the configuration for _building_, _killing_ and _logging_ the **development** version of the project. It prompts you to choose between 3 options: (1) _build project_, (2) _kill project_ or (3) _see the logs of the project_.
