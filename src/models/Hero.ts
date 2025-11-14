import mongoose, { Schema, Document, models, Model } from 'mongoose';
import { THero } from '../Interface/hero.interface';



const HeroSchema = new Schema<THero>({
  name: {type: String, required: true},
  slug: {type: [String], required: true},
  socialLinks: {
    facebook: {type: String, required: true},
    twitter: {type: String, required: true},
    linkedin: {type: String, required: true},
    github: {type: String, required: true},
  },
  resume: {type: String, required: true},
})


const Hero = (mongoose.models?.Hero || mongoose.model<THero>('Hero', HeroSchema)) as Model<THero>;

export default Hero;