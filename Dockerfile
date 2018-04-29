FROM circleci/openjdk:8-jdk

RUN curl -sL https://deb.nodesource.com/setup_9.x | sudo -E bash - \
    && sudo apt-get install nodejs \
    && sudo apt-get install npm

COPY pom.xml .
COPY frontend/package.json frontend/package.json

RUN pwd
RUN ls -la

RUN mvn dependency:go-offline

# RUN sudo chmod 777 / && sudo chmod 777 /usr/lib/node_modules && npm install --global

WORKDIR /frontend
RUN sudo chmod 777 /usr/lib/node_modules && sudo chmod 777 /frontend && npm install
RUN ls -la
WORKDIR /

# RUN ls -la

# CMD ["/bin/sh", "-c", "#(nop)"]