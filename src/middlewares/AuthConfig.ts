import { expressjwt } from 'express-jwt';
import jwksRsa from 'jwks-rsa';
import { RequestHandler } from 'express';
import dotenv from 'dotenv';

dotenv.config();

export const checkJwt: RequestHandler = expressjwt({
  secret: jwksRsa.expressJwtSecret({
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
    cache: true,
    rateLimit: true
  }),
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ['RS256']
});
