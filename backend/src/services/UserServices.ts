import client from "../../prisma/client";

export default class UserServices {
  async read(search: string) {
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

    return users;
  }
}
