import { MongoClient } from 'mongodb';

let client;
let db;

const connectDB = async () => {
  try {
    if (!client) {
      client = new MongoClient(process.env.MONGO_URI || 'mongodb://localhost:27017');
      await client.connect();
      db = client.db('mern_auth');  
      console.log('MongoDB Connected');
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); 
  }
};

const getUserCollection = () => {
  if (!db) {
    throw new Error('Database not connected');
  }
  return db.collection('users');  
};

export { connectDB, getUserCollection };
