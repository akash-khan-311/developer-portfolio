import mongoose, { Schema } from 'mongoose';
import { TPersonalInfo } from '../Interface/personalInfo.interface';
import { BLOOD_GROUP } from '../constant';

const PersonalInfoSchema = new Schema<TPersonalInfo>({
  email: { type: String, required: true },
  phone: { type: String, required: true },
  country: { type: String, required: true },
  bloodGroup: { type: String, required: true },
  languages: { type: [String], required: true },
  dob: { type: String, required: true },
  bio: { type: String, required: true },
});

const PersonalInfo = (mongoose.models?.PersonalInfo ||
  mongoose.model<TPersonalInfo>(
    'PersonalInfo',
    PersonalInfoSchema
  )) as mongoose.Model<TPersonalInfo>;
export default PersonalInfo;
