import mongoose, { Schema, Document, models, Model } from 'mongoose';
import { TAbout } from '../Interface/about.interface';
const AboutSchema = new Schema<TAbout>({
  description: {type: String, required: true},
  profileImage: {type: String, required: true},
})
const About = (mongoose.models?.About || mongoose.model<TAbout>('About', AboutSchema)) as Model<TAbout>;
export default About;