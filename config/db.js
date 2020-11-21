const config = require("config");
const mongoose = require("mongoose");

// Setting up Mongoose with MongoDB
const mongodbURI = config.get("mongodbURI");

module.exports = () => {
  mongoose.connect(
    mongodbURI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    },
    (err, res) => {
      if (err)
        console.error(`Error Occured while connecting to MongoDB! \n${err}`);
      else console.log(`MongoDB Connected...`);
    }
  );
};
