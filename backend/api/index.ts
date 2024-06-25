import cors from "cors";
import express from "express";
import genericError from "./middleware/genericError";
import router from "./router";

const app = express();
app.use(
  cors({
    origin: process.env.DOMAIN || "http://localhost:4000",
  })
);

app.use(router);
app.use(express.json());
app.use(genericError);

export default app;
