import mongoose, { Schema, Document, models, Model } from 'mongoose';
import { TSkills } from '../Interface/skills.interface';

const SkillSchema = new Schema<TSkills>({
  name: {type: String, required: true},
  icon: {type: String, required: true},
})
const Skill = (mongoose.models?.Skill || mongoose.model<TSkills>('Skill', SkillSchema)) as Model<TSkills>;
export default Skill;