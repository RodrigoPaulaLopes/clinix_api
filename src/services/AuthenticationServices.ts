import { defaultMaxListeners } from "events";
import { API } from "../api/ApiConfig";

import dotenv from "dotenv";
dotenv.config();

class AuthenticationServices {

  public async login(email: string, password: string){
    const res = await API.post('/oauth/token', {
        grant_type: 'password',
        username: email,
        password,
        audience: process.env.AUTH0_AUDIENCE,
        client_id: process.env.AUTH0_CLIENT_ID,
        client_secret: process.env.AUTH0_CLIENT_SECRET,
        scope: 'openid profile email'
    });

  return res.data;
  }

  public async logout(){
 
  }
}

export default AuthenticationServices