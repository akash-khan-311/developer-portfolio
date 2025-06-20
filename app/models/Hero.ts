import mongoose, { Schema, Document, models, Model } from 'mongoose';

export interface IHero extends Document {
  greet: string;
  name: string;
  backgroundImage?: string;
  introText: string[];
}


const HeroSchema = new Schema<IHero>({
  greet: { type: String, required: true },
  name: { type: String, required: true },
  introText: { type: [String], required: true },
   backgroundImage: { type: String, required: false },
})


const Hero = (mongoose.models?.Hero || mongoose.model<IHero>('Hero', HeroSchema)) as Model<IHero>;

export default Hero;