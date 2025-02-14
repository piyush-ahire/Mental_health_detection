import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/userLogin')
  .then(() => {
    console.log(`Connected to MongoDB`);
  })
  .catch((error) => {
    console.error(`Error connecting to MongoDB: ${error}`);
  });
