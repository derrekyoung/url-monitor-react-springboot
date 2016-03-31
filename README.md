# url-monitor-react-springboot
Test URLs to see if they respond and if the response has the correct data. Built with Spring Boot and React in order to test the feasability of that combo.

This is a hobby project that I created on my own. The basic idea is to ping a URL and see if it 

* responds with a 200
* if that response contains the text that you're expecting.

## Prerequisites
* Java 8 (to run)
* Maven 3 (to build and/or run)

## Usage
Download a release from [the releases page](https://github.com/derrekyoung/url-monitor-react-springboot/releases/latest/).

Run from the command line: `java -jar url-monitor-VERSION.war`

This will start an embedded Tomcat server inside the war file. Then navigate to the local server [http://localhost:8080](http://localhost:8080) or the remote server where you started the app http://your_server_here:8080

## Help and More Info
You can find more info on the GitHub repo or by emailing derrek @ derrek.young.com

https://github.com/derrekyoung/url-monitor-react-springboot/

## Closing Thoughts
Actually though, I mostly wanted to experiment with merging Node.js and Spring Boot into a self-contained, cross-platform application. This app uses Spring Boot, Webpack, Node, React, Bootstrap, and a few other modules.

The experiment was mostly a success but I think this combo is not the way to go for cross-platform apps. Server-side web apps, sure, ok, maybe. But the dev process here kind of sucks. Merging webpack with Spring Boot introduced too much latency in the test cycle compared to a straight Node.js cycle. I think that my next cross-platform app/experiment will be pure Node.js and based on Electron or NW.js.
