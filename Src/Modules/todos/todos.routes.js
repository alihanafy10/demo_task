import { Router } from "express";
import { auth, authorization, validationMiddleware } from "../../Middleware/index.js";
import {  systemRoles } from "../../Utils/index.js";
import { createTodoSchema, listTodoSchema, oneTodoSchema } from "./todos.validation.js";
import { createTodo, deleteTodo, getTodoById, listTodos, updateTodo } from "./todos.controller.js";



export const todosRouter=Router()

todosRouter.post('/create',validationMiddleware(createTodoSchema),auth,authorization([systemRoles.ADMIN,systemRoles.USER]),createTodo)
todosRouter.get('/list',validationMiddleware(listTodoSchema),auth,authorization([systemRoles.ADMIN,systemRoles.USER]),listTodos)
todosRouter.get('/list/:_id',validationMiddleware(oneTodoSchema),auth,authorization([systemRoles.ADMIN,systemRoles.USER]),getTodoById)
todosRouter.put('/update/:_id',validationMiddleware(oneTodoSchema),auth,authorization([systemRoles.ADMIN,systemRoles.USER]),updateTodo)
todosRouter.delete('/delete/:_id',validationMiddleware(oneTodoSchema),auth,authorization([systemRoles.ADMIN,systemRoles.USER]),deleteTodo)


