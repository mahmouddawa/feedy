if(process.env.NODE_ENV === 'production'){
  //we are in production retrun the production keys
  module.exports = require('./prod');
}
else{
  // we are in development, return the dev keys
  module.exports = require('./dev');
}


