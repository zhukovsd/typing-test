# spring-npm-frontend-boilerplate
A boilerplate Spring MVC project with Swagger intergration and es6/pug frontend built with npm

### Backend:
- Spring MVC
- Springfox and Swagger-ui for automated JSON API documentation

### Frontend:
- NPM as a package manager
- swagger-client as a REST API consumer
- Pug as HTML template engine

### Building:
- Browserify (with babelify plugin) to build and bundle Javascript
- Pug-cli to render HTML from templates
- Bash script as a build tasks runner
- Ant target executes build bash script during WAR artifact pre-processing
- Built frontend app is into WAR root folder

### Watching and hot-swapping for frontend files:
- Watchify to rebuild and hot-swap Javascript on-the-fly
- Pug-cli with `--watch` flag
- Bash as a watch tasks runner and watcher for static HTML files
- Watch tasks replaces files directly in the WAR artifact

### Prerequisites:
- IDEA Ultimate
- Spring 4.x
- Node.JS and NPM

### Build and run the project on your side
1. `git clone`
2. `cd frontend`
3. `npm install`
4. Open project in IDEA, run `spring-npm-frontend-boilerplate:war exploded` artifact in your favourite web container
5. To enable watching and hot-swapping, run `watch.sh` bash script

### Available resources:
- http://localhost:8080/ - started application (you have have another port)
- http://localhost:8080/v2/api-docs - Swagger OpenAPI config
- http://localhost:8080/swagger-ui.html - Swagger UI with API documentation