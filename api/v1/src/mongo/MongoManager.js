const mongoose = require('mongoose');

class MongoManager {
  constructor(config) {
    this._config = config;
  }
  getMongoUrl() {
    return this._config.MONGODB_URI;
  }
  connect() {
    mongoose.set('useCreateIndex', true);
    return mongoose
      .connect(this.getMongoUrl(), { useNewUrlParser: true, useUnifiedTopology: true })
      .then((conn) => {
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function () {
          console.log('We are connected!')
        });
      })
      .catch(console.log);

    // return mongoose;
  }
}

module.exports = { MongoManager };