#!/bin/bash
spring init --build=maven \
--java-version=17 \
--dependencies=web,security,lombok \
--packaging=jar \
--artifactId=svg-web-app \
--groupId=com.ec.svg.web \
--description="SVG Web App" \
--name="svg-web-app" \
sample-app.zip
