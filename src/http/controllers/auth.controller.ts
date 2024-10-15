import { Request, Response } from "express";
import Controller from ".";

class AuthContoller extends Controller {
    login(req: Request, res: Response) {
        return this.handleResponse(res, "Sucessfully login", []);
    }
}

export default new AuthContoller();
