# url-monitor-react-springboot
Test URLs to see if they respond and if the response has the correct data. Built with Spring Boot and React in order to test the feasability of that combo.

This is a hobby project that I created on my own. The basic idea is to ping a URL and see if it 

* responds with a 200
* if that response contains the text that you're expecting.

Actually though, I mostly wanted to experiment with merging Node.js and Spring Boot into a self-contained application. This app uses Spring Boot, Webpack, Node, React, Bootstrap, and a few other modules. 

The experiment was mostly a success but I think this combo is not the way to go for cross-platform apps. Server-side web apps, sure, ok, maybe. But the dev process kind of sucks. Merging webpack with Spring Boot introduced too much latency in the test cycle compared to a straight Node.js cycle. I think that my next cross-platform app/experiment will be pure Node.js and based on Electron or NW.js.

You can find more info on the GitHub repo or by emailing derrek @ derrek.young.com

https://github.com/derrekyoung/url-monitor-react-springboot/
