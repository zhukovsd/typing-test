
## Project overview

The app built from production branch runs here - [88.99.12.213](http://88.99.12.213/)

typing-test is a hobby project. It is a simple 1-minute typing speed test with frontend built with ES6/Pug.js. Each test result gets submitted to the backend (built with Kotlin/Spring) which responds with player's placement and stores typing speed characteristics (characters per minute, typos count) to the persistent Redis DB.

The primary motivation behind the project is to learn new technologies and approaches, such as microservices, and apply them to the project which is not too hard, so I won't be stuck into solving unnecessarily complicated things, and not too easy, so the acquired experience will be relevant for the future projects.

Applied technologies, languages and tools: Kotlin, Spring, Maven, ES6, Pug.js, Webpack, CircleCI, Docker, Docker Swarm.

## Run it locally
- clone the repo
- `docker-compose -f docker-compose-dev.yml up` to start an instance of the app
- open the app by accessing `localhost` in your web browser, if you use run Docker on Linux or Docker for Windows, or `192.168.99.100` (replace with an IP of your Docker machine) if you use Docker Toolbox

## Architecture overview

The app contains [two microservices](https://github.com/zhukovsd/typing-test/blob/master/stack.template.yml), the first one encapsulates Tomcat, which runs Spring application. The second microservice runs Redis instance.

The primary building and dependency management tool is Maven. Is assembles a WAR (web archive) with the Spring app, which includes Frontend resources an exposes them to the root context path of the running application.

During building, Maven (config - [pom.xml](https://github.com/zhukovsd/typing-test/blob/master/pom.xml)) executes Webpack to build the frontend app by running an [npm script](https://github.com/zhukovsd/typing-test/blob/master/frontend/package.json#L10).

[Webpack config](https://github.com/zhukovsd/typing-test/blob/master/frontend/webpack.common.js) defines a number of steps:
- Transpile ES6 to ES4 with Babel, combine application code and vendor code to the output bundled Javascript file (minify for the production build, include source maps for the dev build)
- Compile Pug templates to HTML
- Bundle CSS (minify for the production build, include source maps for the dev build)
- Enable versioning for JS and CSS assets by calculating output file hashes on each build. Hash changes only when the content of the file changes so that clients can cache web assets

Microservices run in Docker containers, which orchestrated by docker-compose (locally) or Docker Swarm (in production). Spring application wrapped into Docker image ([Dockerfile](https://github.com/zhukovsd/typing-test/blob/master/Dockerfile)) based on `tomcat:8-jre8` image.

Redis microservice is also defined by a custom Docker image ([Dockerfile](https://github.com/zhukovsd/typing-test/blob/master/redis-docker-image/Dockerfile)), which enables persistent storage and allows to mount a Docker volume to the Redis data directory.

This project has plenty of things to automate with a CI tool. I chose [CircleCI](https://circleci.com/) due to its native and deep integration with Docker - ability to run CI runners in containers created from custom images, and ability to easily [run Docker commands](https://circleci.com/docs/2.0/building-docker-images/) (for example, `stack deploy` or `image push`) by creating a separate environment with access to Docker Host and CLI.

CI defines multiple steps to build and deploy the project ([ci config](https://github.com/zhukovsd/typing-test/blob/master/.circleci/config.yml)). Git branch name defines which steps to run.
- Build the project with Maven (which internally runs Webpack for the frontend)
- Build and push a Docker image for Tomcat microservice (this microservice runs the compiled Spring app)
- Refresh production Docker Swarm stack by remote execution of `docker stack deploy`

Log of jobs executed CircleCI - https://circleci.com/gh/zhukovsd/typing-test