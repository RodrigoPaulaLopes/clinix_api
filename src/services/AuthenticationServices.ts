import { defaultMaxListeners } from "events";
import { API } from "../api/ApiConfig";

import dotenv from "dotenv";
import APIError from "../error/ApiError";
dotenv.config();

class AuthenticationServices {

  public async login(email: string, password: string) {
    try {
      const res = await API.post('/oauth/token', {
        grant_type: 'password',
        username: email,
        password,
        audience: process.env.AUTH0_AUDIENCE,
        client_id: process.env.AUTH0_CLIENT_ID,
        client_secret: process.env.AUTH0_CLIENT_SECRET,
        scope: 'openid profile email'
      });

      console.log("Login successful:", res.data);
      return res.data;
      console.log("Login successful:", { access_token: "mocked_access_token" });
    } catch (error) {
      console.error("Error during login:", error);
      throw new APIError(500, "Authentication failed");
    }

  }

  public async logout() {

  }
}

export default AuthenticationServices