import { NextFunction, Request, Response } from "express";
import { MulterError } from "multer";

export class ErrorStatus extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export default function genericError(
  e: ErrorStatus,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const status = (e as ErrorStatus).status;
  if (e instanceof MulterError)
    return res.status(422).json({
      message: e.message,
    });

  if (status)
    return res.status(status).json({
      message: e.message,
    });
  return res.status(500).json({
    message: "Something went wrong",
  });
}
