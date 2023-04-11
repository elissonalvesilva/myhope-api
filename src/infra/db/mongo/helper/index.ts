import mongoose from 'mongoose';

export class MongoHelper {
  static connect(uri: string): Promise<void> {
    const options = {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    const connection = () => {
      mongoose
        .connect(encodeURI(uri), options)
        .then(() => {
          return console.log('Successfully connected to Database');
        })
        .catch((error: Error) => {
          console.log('Error connecting to database: ', error);
          return process.exit(1);
        });
    };
    return new Promise((resolve) => resolve(connection()));
  }

  static disconnect(): void {
    mongoose.connection.close();
  }
}