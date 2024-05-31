import { Request, Response } from "express";
import UserServices from "../services/UserServices";

export default class UserController {
  async read(req: Request, res: Response) {
    const q = req.query.q as string;
    const result = await new UserServices().read(q);
    return res.status(200).json(result);
  }
}
