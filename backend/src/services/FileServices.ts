import { parse } from "@fast-csv/parse";
import { CSVRow } from "@shared/types";
import { createReadStream, unlinkSync } from "fs";
import client from "../../prisma/client";

export default class FileServices {
  async create(file: Express.Multer.File): Promise<string> {
    const data: CSVRow[] = [];
    const parseConfig = {
      headers: true,
      delimiter: ",",
      quote: null,
    };

    const stream = createReadStream(file.path).pipe(parse(parseConfig));
    return await new Promise<string>((resolve, reject) => {
      stream.on("data", (row: CSVRow) => data.push(row));
      stream.on("end", async () => {
        try {
          await client.user.createMany({ data });
          resolve("The file was uploaded successfully.");
        } catch (e) {
          reject("Something went wrong");
        }

        unlinkSync(file.path);
      });
      stream.on("error", (error) => reject(error.message));
    });
  }
}
