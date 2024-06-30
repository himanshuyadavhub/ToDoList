const mongoose = require("mongoose");
const config = require("config");
const mongoURI = config.get("mongoURI");

const dbConnect = async () => {

    await mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.error('MongoDB connection error:', err));
}

module.exports = dbConnect;