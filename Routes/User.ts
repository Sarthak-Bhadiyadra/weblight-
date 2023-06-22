import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { API_ENDPOINTS } from '../Types/Server';
import { createUsers, listUsers, updateUsers, deleteUsers } from '../Controllers/User';
import { is_authorize_user, permitAccess } from '../Middleware/auth';
import { ROLE_SHORT_CODE } from '../Types/Users/type';
import { validateRequest } from '../Middleware/validation';

const router = express.Router();

router.post(API_ENDPOINTS.CREATE, is_authorize_user, permitAccess([ROLE_SHORT_CODE.ADMIN]), validateRequest([
    body('first_name').notEmpty().withMessage('First name is required.'),
    body('last_name').notEmpty().withMessage('Last name is required.'),
    body('email').isEmail().withMessage('Invalid email address.'),
    body('phone_no').notEmpty().withMessage('Phone number is required.'),
    body('password').notEmpty().withMessage('Password is required.'),
    body('city').notEmpty().withMessage('City is required.'),
    body('state').notEmpty().withMessage('State is required.'),
    body('role_sc').notEmpty().withMessage('Role short code is required.'),
]), createUsers)

router.get(API_ENDPOINTS.LIST, is_authorize_user, permitAccess([ROLE_SHORT_CODE.ADMIN, ROLE_SHORT_CODE.USER]), listUsers)

router.patch(API_ENDPOINTS.UPDATE, is_authorize_user, permitAccess([ROLE_SHORT_CODE.ADMIN]), validateRequest([
    body('first_name').optional().notEmpty().withMessage('First name is required.'),
    body('last_name').optional().notEmpty().withMessage('Last name is required.'),
    body('email').optional().isEmail().withMessage('Invalid email address.'),
    // Additional validations for the update route
]), updateUsers)

router.delete(API_ENDPOINTS.DELETE, is_authorize_user, permitAccess([ROLE_SHORT_CODE.ADMIN]), deleteUsers)


export {
    router
}