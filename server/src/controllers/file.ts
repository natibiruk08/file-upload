import express from "express";
import dotenv from "dotenv";
import sequelize from "../../config/config";
import { File } from "../../models/File";
import { Model } from "sequelize";

dotenv.config();

export const uploadFile = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    sequelize
      .sync()
      .then(() => {
        File.create({
          name: req.file.originalname,
          size: req.file.size,
          createdAt: Date.now(),
        })
          .then(() => {
            return res
              .status(200)
              .json({ message: "File uploaded to server successfully" })
              .end();
          })
          .catch((error) => {
            console.error("Failed to create a new record : ", error);
            return res.status(400).end();
          });
      })
      .catch((error) => {
        return res.status(400).end();
      });
  } catch (error) {
    console.log(error.message);
    return res.status(400).end();
  }
};

export const getAllFiles = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    let data: Model[];

    sequelize
      .sync()
      .then(() => {
        File.findAll()
          .then((res) => {
            data = res;
          })
          .catch((error) => {
            console.error(error);
            return res.status(400).end();
          });
      })
      .catch((error) => {
        return res.status(400).end();
      });

    return res.status(200).json({ data }).end();
  } catch (error) {
    console.log(error.message);
    return res.status(400).end();
  }
};

export const getFile = async (req: express.Request, res: express.Response) => {
  try {
    let data: Model;

    const { id } = req.params;

    sequelize
      .sync()
      .then(() => {
        File.findOne({
          where: {
            id,
          },
        })
          .then((res) => {
            data = res;
          })
          .catch((error) => {
            console.error(error);
            return res.status(400).end();
          });
      })
      .catch((error) => {
        console.log(error.message);
        return res.status(400).end();
      });

    return res.status(200).json({ data }).end();
  } catch (error) {
    console.log(error.message);
    return res.status(400).end();
  }
};

export const deleteFile = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;

    sequelize
      .sync()
      .then(() => {
        File.destroy({
          where: {
            id,
          },
        })
          .then(() => {
            return res.status(200).json({ message: "File deleted" }).end();
          })
          .catch((error) => {
            console.error(error);
            return res.status(400).end();
          });
      })
      .catch((error) => {
        console.log(error.message);
        return res.status(400).end();
      });
  } catch (error) {
    console.log(error.message);
    return res.status(400).end();
  }
};
