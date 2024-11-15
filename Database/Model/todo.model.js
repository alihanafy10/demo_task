import mongoose from "../global-setup.js";
import { priorityType } from "../../Src/Utils/index.js";
const { Schema, model } = mongoose;

const todoSchema = new Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  image:String,
  title:String,
  desc:String,
  priority:{
    type: String,
    enum: Object.values(priorityType),
  },
  dueDate:Date,

}, { timestamps: true });

export const Todo =mongoose.models.Todo || model('Todo',todoSchema);