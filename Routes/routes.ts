import express, { Request, Response } from 'express';
import { API_ENDPOINTS } from '../Types/Server';
import { getUsers } from '../Controllers/User';

const router = express.Router();

router.get(API_ENDPOINTS.INITIAL_GET, getUsers)

export {
    router
}