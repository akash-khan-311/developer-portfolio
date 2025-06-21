import mongoose, { Schema, Document, models, Model } from 'mongoose';
import { TExperience } from '../Interface/experience.interface';

const ExperienceSchema = new Schema<TExperience>({
  company: { type: String, required: true },
  endDate: { type: Date, required: true },
  startDate: { type: Date, required: true },
  role: { type: String, required: true },
});
const Experience = (mongoose.models?.Experience ||
  mongoose.model<TExperience>(
    'Experience',
    ExperienceSchema
  )) as Model<TExperience>;
export default Experience;
