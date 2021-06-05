const passport = require('passport');
const GoolgeStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');


const User = mongoose.model('users');
passport.serializeUser((user,done)=>{
  //null means there is nor error found
  //user.id is the one that has been created by mongodb
  done(null, user.id);
});
passport.deserializeUser((id,done)=>{
  User.findById(id)
      .then( user =>{
        done(null, user);
  });
});

passport.use(new GoolgeStrategy({
  clientID: keys.googleClientID,
  
  clientSecret: keys.googleClientSecret,
  callbackURL:'/auth/google/callback' 
  },  (accessToken, refreshToken, profile, done) =>{

    User.findOne({googleId : profile.id})
    .then( existingUser =>{
        if(existingUser){
          done(null, existingUser);
            }
        else{ 
          new User({googleId: profile.id}).save()
                .then((user)=>{
                    done(null,user);
        });   
      }
    });
  })
);