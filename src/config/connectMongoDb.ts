/* eslint-disable no-console */
import mongoose from 'mongoose';

const user = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;
const dbName = process.env.MONGO_DATABASE;

export async function connectMongoDb() {
  await mongoose
    .connect(`mongodb://${user}:${password}@127.0.0.1:27017/${dbName}?authSource=admin`)
    .catch((err) => console.log(err));
}
