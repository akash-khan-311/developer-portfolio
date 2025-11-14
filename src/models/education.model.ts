import mongoose, { Schema } from 'mongoose';
import { TEducation } from '../Interface/education.interface';

const EducationSchema = new Schema<TEducation>({
  school: { type: String, required: true },
  degree: { type: String, required: true },
  admitYear: { type: Date, required: true },
  passYear: { type: Date, required: true },
});

const Education = (mongoose.models?.Education ||
  mongoose.model<TEducation>(
    'Education',
    EducationSchema
  )) as mongoose.Model<TEducation>;
export default Education;
