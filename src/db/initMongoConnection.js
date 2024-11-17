import mongoose from 'mongoose';

const user = process.env.MONGODB_USER;
const pass = process.env.MONGODB_PASSWORD;
const url = process.env.MONGODB_URL;
const db = process.env.MONGODB_DB;
const DB_URI = `mongodb+srv://${user}:${pass}@${url}/${db}?retryWrites=true&w=majority&appName=contacts`;

export const initMongoConnection = async () => {
  await mongoose.connect(DB_URI);
};
