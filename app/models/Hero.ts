import mongoose, { Schema, Document, models, Model } from 'mongoose';

export interface IHero extends Document {
  title: string;
  subtitle: string;
  backgroundImage?: string;
  introText: string[];
}


const HeroSchema = new Schema<IHero>({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  introText: { type: [String], required: true },
   backgroundImage: { type: String, required: false },
})


const Hero = (mongoose.models.Hero || mongoose.model<IHero>('Hero', HeroSchema)) as Model<IHero>;

export default Hero;