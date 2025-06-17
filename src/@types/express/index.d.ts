import type { User } from "../../database/entities/User";

declare namespace Express {
  export interface Request {
    user?: User;
  }
}
