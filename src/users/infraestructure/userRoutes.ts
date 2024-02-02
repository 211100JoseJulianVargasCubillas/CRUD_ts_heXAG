import express from 'express';
import { createUserController,getAllUsersController,getByIdCoontroller, updateUserByIdController,deleteUserController} from './dependencies';

export const userRoutes = express.Router();

userRoutes.post("/",createUserController.userController.bind(createUserController))
userRoutes.get("/all", getAllUsersController.allUser.bind(getAllUsersController));
userRoutes.get("/:uuid", getByIdCoontroller.run.bind(getByIdCoontroller))
userRoutes.put("/:uuid", updateUserByIdController.update.bind(updateUserByIdController))
userRoutes.delete("/:uuid", deleteUserController.deleteUser.bind(deleteUserController))