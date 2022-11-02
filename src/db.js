// Require library mongoose
const mongoose = require('mongoose');

module.exports = {
  connect: DB_HOST => { 
    // URL driver Mongo
    mongoose.set('useNewUrlParser', true);
    // Set findOneAndUpdate () instead findAndModify ()
    mongoose.set('useFindAndModify', false);
    // Set createIndex () instead sureIndex ()
    mongoose.set('useCreateIndex', true);
    // New tecnic for finding and monitoring servers
    mongoose.set('useUnifiedTopology', true);
    // Connect to DB
    mongoose.connect(DB_HOST);
    // Error if fail
    mongoose.connection.on('error', err => {
      console.error(err);
      console.log(
        'MongoDB connection error. Please make sure MongoDB is running.'
      );
      process.exit();
    });
  },

  close: () => {
    mongoose.connections.close();
  }
};
