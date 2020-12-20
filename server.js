const http = require('http');
const app = require('./app');

//assigning a port on which the server should run
///process.env.PORT || 3000 means: 
///whatever is in the environment variable PORT, 
///or 3000 if there's nothing there.
////process.env accesses node.js environment variables
const port = process.env.PORT || 3000;

//creates server
///passing in app to create the server
////the exoress applicaiton qualifies as a request handler
const server = http.createServer(app);

//it starts listening on line 8 and then it will execute
//whichever listener or function we pass into line 11 
server.listen(port);