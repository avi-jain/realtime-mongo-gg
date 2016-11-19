##Gossip Girl

**A real-time notification system for stalking user activity, based on Node.js, Express and MongoDB.** 
There are 2 ways to accomplish this, one is simply by using socket.io to emit events on changes **nocursor** branch, and the other uses capped collections and tailable cursors for the tracking system, since MongoDB does not have triggers. 
The version with tailable cursors first prints out every "gossip" that the user follows and then listens for changes. *.limit()* / *.max_scan()* does not work with tailable cursors, and I couldn't figure out how to print just the last query using them, but apparently capped collections and tailable cursors perform better.

One can choose which attributes/fields of the user to keep track of. It uses an additional collection for maintaining the "gossip" which is the capped one, and as of now there are 2 fields that can be tracked - location and partner. It's easily customizable for more fields. 
It makes use of Passport for helper functions of login and sessions and socket.io for the real-time notifications. 

###INSTALLATION - 
* Make sure Node and MongoDB are installed on your system. If not, Node can be installed from
[here](https://nodejs.org/en/) and Mongo from [here](https://docs.mongodb.com/manual/installation/?jmp=footer)
* Download zip or clone this repo locally, and install required packages using `npm install`(install dev dependencies if you wish)
* Run the mongod service
* Create a *gossips* collection **which must be a capped collection** and a *users* collection.
* Run the server using either `npm start` or `node app.js`. It runs on port 3000.
* You'll need a working internet connection as the socket files and jquery is served via a CDN.

###NOTES - 

* Pub-sub can be done better and faster with Redis, but I was accustomed to Mongo and wanted to play around with the tailable cursor feature (which is not documented properly in Mongoose, my ODM of choice :( , hence I use pure mongo for that part.)
* It's pretty lightweight, does not use a front-end framework(Angular/React), nor does it use any
front-end libraries(Bootstrap/Material). So yes, it's kinda ugly to look at.
* "Access-Control-Allow-Methods" -> "POST, GET,OPTIONS". Does the updates through post requests, rather than put requests, keeping in mind browser compatibility issues with put requests through forms. Can be easily changed.
* Tailable cursors won't work on empty collections.

###TO-DO
* Displays self username in stalk page. Remove that while looping over user list.
* Convert location/partner updates to ajax instead of rendering a new page
* Make the cursor emit the latest document only
