const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require("./config/keys");
require("./models/User");
require("./services/passport");


const app = express();

app.use(express.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    keys: [keys.cookieKey],
  })
);

app.use(passport.initialize());
app.use(passport.session());


mongoose.connect(keys.mongoURI, {
  // to solve some issue with deployment on Heroku
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

require("./routes/authRoutes")(app);
require("./routes/billingRoutes")(app);

if (process.env.NODE_ENV === "production") {
  // express serve up production assest like  main.js and main.css
  app.use(express.static("client/build"));
  // express serve up the index.html file if it doesn't find the rout
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000; 

console.log("running on Port : ", PORT);
app.listen(PORT); 





//Heroku inject the port in the env.port

//even though it looks like express is listening to the traffic but in reality Node is the 
//one is listening and routing it to express.. 
// app.listen(5000, ()=>{
//   console.log('listening on port 5000')
// });