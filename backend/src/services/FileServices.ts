import { parse } from "@fast-csv/parse";
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

    const stream = createReadStream(file.path).pipe(parse(parseConfig));
    return await new Promise<string>((resolve, reject) => {
      stream.on("data", (row: User) => data.push(row));
      stream.on("end", async () => {
        try {
          await client.user.createMany({ data });
          resolve("The file was uploaded successfully");
        } catch (e) {
          const code = (e as PrismaClientKnownRequestError).code;
          if (code == "P2002") {
            reject(new ErrorStatus("Duplicate user present in list", 403));
          }
          reject(e);
        }

        unlinkSync(file.path);
      });
      stream.on("error", (error) => reject(error.message));
    });
  }
}
