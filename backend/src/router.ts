import { Request, Router } from "express";
import multer from "multer";
import path from "path";
import FileController from "./controllers/FileController";
import UserController from "./controllers/UserController";
import { tryWrapper } from "./utils/tryWrapper";

const upload = multer({
  dest: "./uploads",
  fileFilter: (req: Request, file, cb) => {
    if (path.extname(file.originalname).toLowerCase() === ".csv")
      cb(null, true);
    else cb(null, false);
  },
});

const router = Router();

router.post(
  "/api/files",
  upload.single("file"),
  tryWrapper(new FileController().create)
);
router.get("/api/users", tryWrapper(new UserController().read));

export default router;
