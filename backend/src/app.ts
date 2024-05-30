import cors from "cors";
import express from "express";
import router from "./router";

const app = express();
app.use(
  cors({
    origin: "http://localhost:4000",
    credentials: true,
  })
);

app.use(router);
app.listen(3000);

export default app;
