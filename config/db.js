const mongoose = require("mongoose");

// Setting up Mongoose with MongoDB
const mongodbURI = process.env.mongodbURI;

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
