import { ServerApiVersion } from 'mongodb';
import mongoose, { ConnectOptions } from 'mongoose';

const DATABASE_URL = process.env.MONGODB_URI || '';

let cached: { conn: any; promise: any } = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts: ConnectOptions = {
      bufferCommands: false,
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    };

    cached.promise = mongoose.connect(DATABASE_URL, opts);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export function getMongoDbClient() {
  return cached.conn?.connection.getClient();
}

connect();

// import { MongoClient, ServerApiVersion } from 'mongodb';

// if (!process.env.MONGODB_URI) {
//   throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
// }

// const uri = process.env.MONGODB_URI;
// const options = {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// };

// let client: MongoClient;

// if (process.env.NODE_ENV === 'development') {
//   let globalWithMongo = global as typeof globalThis & {
//     _mongoClient?: MongoClient;
//   };

//   if (!globalWithMongo._mongoClient) {
//     globalWithMongo._mongoClient = new MongoClient(uri, options);
//   }
//   client = globalWithMongo._mongoClient;
// } else {
//   client = new MongoClient(uri, options);
// }

// export default client;
