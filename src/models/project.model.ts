import mongoose, { Model, Schema } from "mongoose";
import { TProject } from "../Interface/project.interface";

export const ProjectSchema = new Schema<TProject>({
    title: {type: String,required: true,},
    description: {type: String,required: true},
    image: {type: String,required: true},
    codeLink: {type: String,required: true},
    liveLink: {type: String,required: true},
    technologies: {type: [String],required: true},

})
const Project = (mongoose.models?.Project || mongoose.model<TProject>('Project', ProjectSchema)) as Model<TProject>;

export default Project