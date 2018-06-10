FROM tomcat:8.0.52-jre8

COPY ROOT.xml /usr/local/tomcat/conf/Catalina/localhost/ROOT.xml
COPY server.xml /usr/local/tomcat/conf/server.xml

COPY target/typing-test-1.0-SNAPSHOT /opt/typing-test-1.0-SNAPSHOT