import { User } from "@prisma/client";
import client from "../../prisma/client";

interface UserData {
  data: User[];
}

export default class UserServices {
  async read(search: string): Promise<UserData | null> {
    const lowsearch = search.toLowerCase();
    const users = await client.user.findMany({
      where: {
        OR: [
          {
            name: {
              contains: lowsearch,
            },
          },
          {
            country: {
              contains: lowsearch,
            },
          },
          {
            city: {
              contains: lowsearch,
            },
          },
          {
            favorite_sport: {
              contains: lowsearch,
            },
          },
        ],
      },
    });

    return {
      data: users,
    };
  }
}
