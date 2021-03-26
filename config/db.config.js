const mongoose = require('mongoose');
const keys = require('./keys.config');

const MongoString = keys.MONGO_URI

const connectDB = () => {
    mongoose.connect(MongoString, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => 'mongodb conected!')
        .catch((err) => console.log(err));
}

module.exports = connectDB;