FROM eclipse-temurin:17-jre-jammy
VOLUME /tmp
COPY target/*.jar app.jar
ENTRYPOINT ["java","-jar","-DSVG_GEN_SVC_HOST=${SVG_SVC_HOST}","-DSVG_GEN_SVC_PORT=${SVG_SVC_PORT}","app.jar"]
