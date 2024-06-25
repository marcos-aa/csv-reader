import { Prisma, User } from "@prisma/client";
import client from "../../prisma/client";
import { ErrorStatus } from "../middleware/genericError";
import { userQuerySchema } from "../utils/schemas";

interface UserData {
  data: User[];
}

export default class UserServices {
  async read(search: string): Promise<UserData | null> {
    const { success } = userQuerySchema.safeParse(search);
    if (!success) throw new ErrorStatus("Invalid query string", 422);

    const config = {
      contains: search,
      mode: Prisma.QueryMode.insensitive,
    };

    const users = await client.user.findMany({
      where: {
        OR: [
          { name: config },
          { country: config },
          { city: config },
          { favorite_sport: config },
        ],
      },
    });

    return {
      data: users,
    };
  }
}
