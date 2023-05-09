import mongoose from 'mongoose';

const connectMongo = async () => {
  console.log('1111');
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URL);
    if (connection.readyState == 1) {
      return Promise.resolve(true);
    }
  } catch (error) {
    console.log('22222');
    return Promise.reject(error);
  }
};

export default connectMongo;
