import fs from 'fs';

import { Todo } from "../../../Database/Model/index.js";
import { catchError } from "../../Middleware/index.js";
import { ApiFeatures } from "../../Utils/index.js";

export const createTodo=catchError(async(req,res,next)=>{
    //featch user data
    const user=req.authUser

    //featch todo data
    const {image,title,desc,priority,dueDate}=req.body

    //create todo object
    const todoObj=new Todo({
        image,
        title,
        desc,
        priority,
        dueDate,
        user:user._id
    })

    //save todo in database
    const todo=await todoObj.save()

    res.status(201).json({message:"created todo successfully",data:todo})
});

export const listTodos=catchError(async(req,res,next)=>{
    const ApiFeaturesPagination = new ApiFeatures(Todo, req.query).filter_sort_pagination();
      const data = await ApiFeaturesPagination.mongooseQuery

    res.status(200).json({message:"get todos successfully",data})
})

export const getTodoById=catchError(async(req,res,next)=>{
    const data=await Todo.findOne({_id:req.params._id,user:req.authUser._id})
    res.status(200).json({message:"get todos successfully",data})
})

export const updateTodo=catchError(async(req,res,next)=>{
    //check todo
    const todoData=await Todo.findOne({_id:req.params._id,user:req.authUser._id})
    if(!todoData) return next(new AppEroor("todo not found",404))

    //featch image path
    const imagePath=todoData.image

    //check if image exists
    if(fs.existsSync(imagePath)){
        //delete old image
        fs.unlinkSync(imagePath);
    }
    
    const data=await Todo.findByIdAndUpdate({_id:req.params._id,user:req.authUser._id},req.body,{new:true})
    res.status(200).json({message:"updated todo successfully",data})
})

export const deleteTodo=catchError(async(req,res,next)=>{
    await Todo.findByIdAndDelete({_id:req.params._id,user:req.authUser._id})
    res.status(200).json({message:"deleted todo successfully"})
})