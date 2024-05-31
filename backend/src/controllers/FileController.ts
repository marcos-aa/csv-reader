import { Request, Response } from "express";
import FileServices from "../services/FileServices";

export default class FileController {
  async create(req: Request, res: Response) {
    if (!req.file) return res.status(422).json({ message: "Invalid file" });
    const message = await new FileServices().create(req.file);
    return res.status(200).json({ message });
  }
}
