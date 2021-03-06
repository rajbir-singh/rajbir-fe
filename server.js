const express = require('express');
const app = express();
// Run the app by serving the static files
// in the dist directory
app.use(express.static(__dirname + '/dist'));

console.log('hello app running on: ', process.env.PORT || 4200);
// Start the app by listening on the default
// Heroku port
app.listen(process.env.PORT || 4200);