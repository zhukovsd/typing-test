FROM tomcat:7.0.86-jre8

COPY ROOT.xml /usr/local/tomcat/conf/Catalina/localhost/ROOT.xml
COPY target/typing-test-1.0-SNAPSHOT /opt/typing-test-1.0-SNAPSHOT