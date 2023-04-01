import express from "express";
import file from "./file";

const router = express.Router();

export default (): express.Router => {
  file(router);
  return router;
};
