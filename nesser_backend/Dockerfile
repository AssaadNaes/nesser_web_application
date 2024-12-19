FROM openjdk:24

WORKDIR /app

COPY target/nesser_backend-0.0.1-SNAPSHOT.jar /app/app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]