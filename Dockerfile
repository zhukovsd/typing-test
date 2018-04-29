FROM circleci/openjdk:8-jdk

RUN curl -sL https://deb.nodesource.com/setup_9.x | sudo -E bash - \
    && sudo apt-get install nodejs \
    && sudo apt-get install npm

COPY . .
# COPY frontend/package.json frontend/package.json

# RUN pwd
# RUN ls -la

# RUN sudo chmod 777 / && sudo chmod 777 /usr/lib/node_modules && npm install --global

WORKDIR /frontend
RUN sudo chmod 777 /usr/lib/node_modules && sudo chmod -R 777 /frontend && npm install
# RUN touch build.sh && mkdir build
# RUN ls -la
WORKDIR /

 RUN sudo chmod -R 777 /target
# run "package" to implicitly install all dependencies (including plugins)
RUN mvn package

RUN sudo rm -rf /target

# RUN ls -la

# CMD ["/bin/sh", "-c", "#(nop)"]