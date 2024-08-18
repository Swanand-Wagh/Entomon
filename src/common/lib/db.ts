import { MongoClient, ServerApiVersion } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

let client: MongoClient;

if (process.env.NODE_ENV === 'development') {
  let globalWithMongo = global as typeof globalThis & {
    _mongoClient?: MongoClient;
  };

  if (!globalWithMongo._mongoClient) {
    globalWithMongo._mongoClient = new MongoClient(uri, options);
  }
  client = globalWithMongo._mongoClient;
} else {
  client = new MongoClient(uri, options);
}

export default client;


// import mongoose from 'mongoose';

// const MONGODB_URI = process.env.MONGODB_URI;

// const connect = async () => {
//   const connectionState = mongoose.connection.readyState;

//   try {
//     mongoose.connect(MONGODB_URI!, {
//       dbName: 'entomon',
//       bufferCommands: true,
//     });
//     console.log('Connected');
//   } catch (err: any) {
//     console.log('Error: ', err);
//     throw new Error('Error: ', err);
//   }
// };

// export default connect;
