if(process.env.NODE_ENV === 'production'){
  //we are in production retrun the production keys
  module.exports = require('./prod');
}
else{
  // we are in development, return the dev keys
  module.exports = require('./dev');
}


//this flexibility of requiring files(for prod/dev) for common JS modules "require" in the JS is
// not available when we use the 2015 "import/export/export default" modules synatx


