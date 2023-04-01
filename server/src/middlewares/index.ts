import express from "express";
import multer, { Multer } from "multer";

//Storage Engine

// MULTER config

// MULTER config
const multerStorage = multer.diskStorage({
  destination: function (req: express.Request, file, cb) {
    cb(null, __dirname + "../../uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

export const upload: Multer = multer({
  limits: { fileSize: 10 * 1024 * 1024 },
  storage: multerStorage,
});
