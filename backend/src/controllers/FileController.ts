import { Request, Response } from "express";
import FileServices from "../services/FileServices";

export default class FileController {
  async create(req: Request, res: Response) {
    if (!req.file) return res.status(500).json({ message: "Invalid file" });
    const result = await new FileServices().create(req.file);
    return res.json(result);
  }
}
