##Gossip Girl

A real-time notification system for stalking user activity. Based on Node.js, Express and MongoDB.
It uses capped collections and tailable cursors for the tracking system, since MongoDB does not have triggers. One can choose which attributes/fields of the user to keep track of. It uses an additional collection for maintaining the "gossip" which is the capped one, and as of now there are 2 fields that can be tracked - location and partner. It's easily customizable.
I make use of Passport for helper functions of login and sessions and socket.io for the real-time notifications. 

###INSTALLATION - 
* Make sure Node and MongoDB are installed on your system. If not, Node can be installed from
and Mongo from 
* Download zip or clone this repo locally, and install required packages using `npm install`
* Run the mongod service
* Run the server using either `npm start` or node app.js

###NOTES - 

* Pub-sub can be done better and faster with Redis, but I was accustomed to Mongo and wanted to play around with the tailable cursor feature (which is not documented properly in Mongoose, my ODM of choice :( . Hence uses a small part of pure Mongo)
* It's pretty lightweight, does not use a front-end framework(Angular/React), nor does it use any
front-end libraries(Bootstrap/Material). So yes, it's kinda ugly to look at.
* "Access-Control-Allow-Methods" -> "POST, GET,OPTIONS". Does the updates through post requests, rather than put requests, keeping in mind browser compatibility issues with put requests through forms. Can be easily changed.

###TO-DO
* Displays self username in stalk page. Remove that while looping over user list.
* Convert location/partner updates to ajax instead of rendering a new page
