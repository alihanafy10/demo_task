import { hashSync } from "bcrypt";
import mongoose from "mongoose";
import { levelType } from "../../Src/Utils/index.js";
const { Schema, model } = mongoose;

const userSchema = new Schema({
   displayName:{
    type:String,
    required: true,
   },
   experienceYears:{
    type:Number,
    required: true,
   },
   phone:{
    type:String,
    required: true,
    unique: true,
   },
   password:{
    type:String,
    required: true,
   },
   address:{
    type:String,
    required: true,
   },
   level:{
    type:String,
    required: true,
    enum:Object.values(levelType)
   }

}, { timestamps: true });

userSchema.pre('save', function (next) {
    if (this.isModified('password')) { 
        this.password = hashSync(this.password, +process.env.SALT_NUM);
    }
    next()
})

export const User =mongoose.models.User || model('User',userSchema);