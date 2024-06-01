import { Request, Response } from "express";
import { ErrorStatus } from "../middleware/genericError";
import FileServices from "../services/FileServices";

export default class FileController {
  async create(req: Request, res: Response) {
    const file = req.file;
    if (!file) throw new ErrorStatus("Invalid file", 422);
    const message = await new FileServices().create(file);
    return res.status(200).json({ message });
  }
}
