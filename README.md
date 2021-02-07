# Time Sink - Visualize Your Chrome Activity Like Never Before

We live in a time where data is abundant, however it is no easy task to understand the data. This project is an attempt to allow users to gain better insights of how they spend their time on the internet.  


### Repository Structure
This repository contains two components
  1. The chrome extension
  2. Next.js application that visualizes data provided by the extension 


### Setup Instructions


The chrome extension is located in the `timeSinkChromExtension` folder. This [article](https://webkul.com/blog/how-to-install-the-unpacked-extension-in-chrome/) provides step to step instructions on how to load this extension to your local browser.

Once installed, navigate to the `time_sink_ui` directory and run `npm run dev` in order to run the web application. The application will be hosted on [`http://localhost:3000/`](http://localhost:3000/). Alernatively, you can navigate to the hosted [application on vercel](https://time-sink.vercel.app/) or click on the chrome extension icon on your browser to see the application in action.

