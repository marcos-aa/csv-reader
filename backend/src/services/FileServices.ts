import { parseStream } from "@fast-csv/parse";
import { User } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { createReadStream, unlinkSync } from "fs";
import client from "../../prisma/client";
import { ErrorStatus } from "../middleware/genericError";

export default class FileServices {
  async create(file: Express.Multer.File): Promise<string> {
    const data: User[] = [];
    const parseConfig = {
      headers: true,
      delimiter: ",",
      quote: null,
    };

    const readable = createReadStream(file.path);
    const stream = parseStream(readable, parseConfig);

    return await new Promise<string>((resolve, reject) => {
      stream.on("data", (row: User) => {
        data.push(row);
      });

      stream.on("error", (e) => {
        unlinkSync(file.path);
        reject(e.message);
      });

      stream.on("end", async () => {
        try {
          await client.user.createMany({ data });
          resolve("The file was uploaded successfully");
        } catch (e) {
          const code = (e as PrismaClientKnownRequestError).code;
          let message: string = (e as PrismaClientKnownRequestError).message,
            status: number = 500;

          if (code == "P2002") {
            message = "Duplicate user present in list";
            status = 403;
          }
          reject(new ErrorStatus(message, status));
        }
        unlinkSync(file.path);
      });
    });
  }
}
