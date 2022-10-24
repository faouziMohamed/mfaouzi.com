# Faouzi's Mohamed developer Portfolio

💡 visit on 🚅 [mfaouzi.live](https://mfaouzi.live)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the
result.

## Using Docker

1. You'll need to have [Docker](https://docs.docker.com/engine/install/)
   installed in your machine
1. Build a docker image using the command bellow
   ```bash
   # This assumes you are in the root of the directory project
    docker build --pull --rm -f "Dockerfile" -t fz-portfolio:latest .
   ```
1. If the command from the step 1 and 2 finished to run, run the Web server and
   expose the port 3000 to your host. ( ❗ make sure that the port 3000 is not
   used by another app)
   ```bash
   docker run -it --rm --name fz-portfolio -p 3000:3000 fz-portfolio:latest
   ```

After these steps, open [http://localhost:3000](http://localhost:3000) with your
browser to see the result.

To stop the docker container, run the command bellow

```bash
docker stop fz-portfolio
```

## Before pushing your code

- Make sure to run the command `npm run type-check` or `yarn type-check` to make
  sure that your code is type safe
- Make sure to run the command `npm run lint:fix` or `yarn lint:fix` to fix all
  the linting errors and warnings
- Make sure to run the command `npm run test:ci` or `yarn test:ci` to make sure
  that all the tests are passing
- You can run the test on your browser by running the
  command `npm run test:open` or
  `yarn test:open`

## Bump the version

- If you want to bump the version of the project, you can run the
  command `npm run release` or `yarn release`.
- for a major version bump, run `npm run release:major` or `yarn release:major`.
- Push the changes to the remote repository with the
  command `npm run push-release` or `yarn push-release`.

- To stop the web server [the docker container] run

```bash
docker stop fz-portfolio
```

## Deploy on Heroku (container)

💡 I'm going to use the name fz-portfolio for the app name, but you can use any
or
leave the default name that Heroku will give to your app.

- Make sure to have
  the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
  installed in your machine
- Login to your Heroku account
  ```bash
    heroku login
  ```
- login to your Heroku container registry
  ```bash
    heroku container:login
  ```
- Create a new app if you don't have one already
  ```bash
    heroku create fz-portfolio
  ```
- Push the docker image to Heroku
  ```bash
    heroku container:push web --app fz-portfolio
  ```
- Release the docker image to Heroku
  ```bash
    heroku container:release web --app fz-portfolio
  ```
- Open the app in your browser
  ```bash
    heroku open --app fz-portfolio
  ```

## Deploy on a reverse proxy server (nginx 🐶)

1. Create a new file in the root of the project with the name `nginx.conf`
1. Copy the content below and paste it in the `nginx.conf`
   file (https://mfaouzi.live)
   ```nginx
    server {
      listen 80;
      server_name mfaouzi.live;
      location / {
         proxy_pass http://localhost:3000;
      }
    }
   ```
1. create a nginx.Dockerfile in the root of the project for the nginx server
   ```dockerfile
   FROM nginx:1.19.6-alpine
   COPY nginx.conf /etc/nginx/nginx.conf
   ```
1. Create a docker-compose file to deploy the app image to nginx server using
   the app Dockerfile and nginx Dockerfile
   ```yaml
   version: '3.9'
   services:
     app:
       build: .
       ports:
         - '3000:3000'
     nginx:
       build: .
       ports:
         - '80:80'
         - '8080:80'
       depends_on:
         - app
   ```
1. Run the command `docker-compose up` to start the app and the nginx server
1. Open [http://localhost:8080](http://localhost:8080) with your browser to see
   the result.
