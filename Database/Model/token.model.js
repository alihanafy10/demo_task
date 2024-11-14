import mongoose from "mongoose";
const { Schema, model } = mongoose;

const tokenSchema = new Schema({
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  refreshToken:{
    type: String,
    required: true,
    unique: true
  }

}, { timestamps: true });

export const Token =mongoose.models.Token || model('Token',tokenSchema);