import * as jwt from 'jsonwebtoken';
import { JWTPayload } from '../../Types/Users/type';

export interface IJWTData {
    id: number;
    phone?: string;
    email: string;
    deviceToken?: string;
    expiry?: number;
}

const jwt_access_secret_key = process.env.JWT_AUTH_SECRET_KEY || '';
const jwt_access_token_expiry = process.env.ACCESS_TOKEN_VALIDITY_SECS || '900s';

export function jwtService() {
    return {
        generateAuthToken: ({ id, phone, email, deviceToken, expiry }: JWTPayload): string => {
            return jwt.sign({ id, phone, email, deviceToken }, jwt_access_secret_key, {
                expiresIn: expiry ? expiry : jwt_access_token_expiry,
            });
        }
    };
}
