import { Request, Response } from "express";

// Handler for the "/users" route
const getUsers = (req: Request, res: Response) => {
    res.json({
        message: "This is initial setup"
    });
};

export {
    getUsers
};