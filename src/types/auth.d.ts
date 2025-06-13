import 'express-jwt';

declare module 'express-jwt' {
  interface Auth {
    sub: string;
    scope?: string;
    [key: string]: any;
  }
}
