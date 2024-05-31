import cors from "cors";
import express from "express";
import genericError from "./middleware/genericError";
import router from "./router";

const app = express();
app.use(
  cors({
    origin: "http://localhost:4000",
  })
);

app.use(router);
app.use(express.json());
app.use(genericError);
app.listen(3000);

export default app;
