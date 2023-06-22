import { Request, Response } from "express";
import { createBodyRequest, updateBodyRequest } from "../Types/Users/type";
import { createUser, listUser, updateUser, deleteUser, checkUserExist } from "../Models/User";

// Handler for the "/users" route
const createUsers = async (req: createBodyRequest, res: Response) => {
    const data = req.body
    try {
        const checkuser = await checkUserExist(data)
        if (checkuser) {
            res.send("User Already Exists..!")

        }
        else {
            const user = await createUser(data)
            res.json({
                status: 200,
                data: user
            });
        }
    } catch (error) {
        console.log("error", error)
        res.send("Error in creating User")
    }
};

const listUsers = async (req: Request, res: Response) => {
    const parsedQueryData = req.query.data ? JSON.parse(JSON.stringify(req.query.data)) : {};
    const data = req.body
    try {
        const user = await listUser(data)
        res.json({
            status: 200,
            data: user
        });
    } catch (error) {
        console.log("error", error)
        res.send("Something Went Wrong...!")
    }
};

const updateUsers = async (req: updateBodyRequest, res: Response) => {
    const data = req.body
    const id = req.params.id
    try {
        const user = await updateUser(data, id)
        res.json({
            status: 200,
            data: user
        });
    } catch (error) {
        console.log("error", error)
        res.send("Something Went Wrong...!")
    }
};

const deleteUsers = async (req: createBodyRequest, res: Response) => {
    const id = req.params.id
    try {
        const user = await deleteUser(id)
        res.json({
            status: 200,
            data: user,
            message: "User Deleted Successfully"
        });
    } catch (error) {
        console.log("error", error)
        res.send("Something Went Wrong...!")
    }
};

export {
    createUsers,
    listUsers,
    updateUsers,
    deleteUsers
};