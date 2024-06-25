import { expect } from "@jest/globals";
import { Server } from "http";
import path from "path";
import supertest from "supertest";
import app from "../../api";
import client from "../../prisma/client";

describe("REST endpoints", () => {
  const request = supertest(app);
  let server: Server;

  beforeAll((done) => {
    server = app.listen(3000, done);
  });

  afterAll(() => {
    server.close();
    return client.user.deleteMany({});
  });

  describe("POST /api/files", () => {
    it("Should successfully upload a CSV file", async () => {
      const res = await request
        .post("/api/files")
        .attach("file", path.resolve(__dirname, "../users.csv"));
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe("The file was uploaded successfully");
    });

    it("Should fail to upload CSV file with duplicate name column", async () => {
      const res = await request
        .post("/api/files")
        .attach("file", path.resolve(__dirname, "../users.csv"));

      expect(res.statusCode).toBe(403);
      expect(res.body.message).toBe("Duplicate user present in list");
    });

    it("Should return generic error message when met with unknown error", async () => {
      const res = await request
        .post("/api/files")
        .attach("file", path.resolve(__dirname, "../invalid.csv"));

      expect(res.status).toBe(500);
      expect(res.body.message).toBe("Something went wrong");
    });

    it("Should fail to upload with multiple files", async () => {
      const res = await request
        .post("/api/files")
        .attach("file", path.resolve(__dirname, "../users.csv"))
        .attach("file", path.resolve(__dirname, "../invalid.csv"));

      expect(res.status).toBe(422);
      expect(res.body.message).toBe("Invalid file");
    });

    it("Should fail to upload CSV file with invalid value", async () => {
      const res = await request
        .post("/api/files")
        .attach("file", path.resolve(__dirname, "../invalid.csv"));
      expect(res.statusCode).toBe(500);
      expect(res.body.message).toBe("Something went wrong");
    });

    it("Should fail to upload with non .csv file", async () => {
      const res = await request
        .post("/api/files")
        .attach("file", path.resolve(__dirname, "../users.txt"));
      expect(res.statusCode).toBe(422);
      expect(res.body.message).toBe("Invalid file");
    });

    it("Should fail to upload without file", async () => {
      const res = await request.post("/api/files");
      expect(res.statusCode).toBe(422);
      expect(res.body.message).toBe("Invalid file");
    });
  });

  describe("GET /api/users", () => {
    it("Should successfully get existing data with a valid query", async () => {
      const res = await request.get("/api/users").query({
        q: "john",
      });
      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        data: [
          {
            name: "John Doe",
            country: "USA",
            city: "New York",
            favorite_sport: "Basketball",
          },
          {
            name: "Mike Johnson",
            country: "France",
            city: "Paris",
            favorite_sport: "Tennis",
          },
        ],
      });
    });

    it("Should fail to get users without search parameter", async () => {
      const res = await request.get("/api/users");
      expect(res.status).toBe(422);
      expect(res.body.message).toBe("Invalid query string");
    });

    it("Should fail to get users with non-string query parameter", async () => {
      const res = await request.get("/api/users").query({
        q: [],
      });
      expect(res.status).toBe(422);
      expect(res.body.message).toEqual("Invalid query string");
    });
  });
});
