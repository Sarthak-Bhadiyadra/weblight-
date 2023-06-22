import express, { Request, Response } from 'express';
import { API_ENDPOINTS } from '../Types/Server';
import { createUsers, listUsers, updateUsers, deleteUsers } from '../Controllers/User';
import { login } from '../Controllers/Login';

const router = express.Router();

router.post(API_ENDPOINTS.LOGIN, login)


export {
    router
}