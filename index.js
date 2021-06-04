const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

const app = express();

mongoose.connect(keys.mongoURI, {
  // to solve some issue with deployment on Heroku
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;

console.log('running on Port : ', PORT);
app.listen(PORT);





//Heroku inject the port in the env.port

//even though it looks like express is listening to the traffic but in reality Node is the 
//one is listening and routing it to express.. 
// app.listen(5000, ()=>{
//   console.log('listening on port 5000')
// });