const express = require('express');
const passport = require('passport');
const GoolgeStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');



const app = express();

passport.use(new GoolgeStrategy({
  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret,
  callbackURL:'/auth/google/callback' 
  }, (accessToken, refreshToken, profile, done) =>{
    console.log('access token: ',accessToken);
    console.log('refresh token: ', refreshToken);
    console.log('profile: ', profile);
  })
);

console.log('somethig');


app.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

app.get('/auth/google/callback', passport.authenticate('google'));

const PORT = process.env.PORT || 5000;
app.listen(PORT)






//Heroku inject the port in the env.port

//even though it looks like express is listening to the traffic but in reality Node is the 
//one is listening and routing it to express.. 
// app.listen(5000, ()=>{
//   console.log('listening on port 5000')
// });