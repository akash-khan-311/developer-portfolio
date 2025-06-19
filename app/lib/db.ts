import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
  if (mongoose.connections[0].readyState !== 1) {
    try {
      await mongoose.connect(process.env.DATABASE_URL!);
      console.log('MongoDB Connected');
    } catch (error) {
      console.error('MongoDB connection error:', error);
    }
  }
};
