import express from "express";
import { upload } from "../helpers/multer";

import {
  deleteFile,
  getAllFiles,
  getFile,
  uploadFile,
} from "../controllers/file";

export default (router: express.Router) => {
  router.get("/", getAllFiles);
  router.get("/:id", getFile);
  router.post("/upload", upload.single("file"), uploadFile);
  router.delete("/:id", deleteFile);
};
