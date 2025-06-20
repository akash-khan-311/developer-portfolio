import mongoose, { mongo } from 'mongoose';

export interface IAdmin extends Document {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'superAdmin';
}

const AdminSchema = new mongoose.Schema<IAdmin>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'superAdmin'], default: 'admin' },
  
});
const Admin = (mongoose.models.Admin ||
  mongoose.model<IAdmin>('Admin', AdminSchema)) as mongoose.Model<IAdmin>;

export default Admin;
