import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { isNull, isUndefined } from "lodash";
import { StatusCodes } from "http-status-codes";
import userModel from "../../models/user";
import Joi from "joi";
import surveyModel from "../../models/survey";

class SurveyController {
  createSurvey = async (req: any, res: Response, next: NextFunction) => {
    try {
      /**
       * authentication part
       */
      // const userId = req.session.userId;
      // if (isUndefined(userId)) {
      //   res.status(StatusCodes.BAD_REQUEST).send("You are not logged in");
      //   return;
      // }
      // const user = await userModel.findById(userId);
      // /**
      //  * If user does not exists
      //  */
      // if (isNull(user)) {
      //   res
      //     .status(StatusCodes.BAD_REQUEST)
      //     .send("user with specific id does not exists.");
      //   return;
      // }

      /**
       * validating inputs
       */
      const schema = Joi.object()
        .options({ abortEarly: false })
        .keys({
          surveyName: Joi.string().required(),
          surveyQuestion: Joi.array().required(),
        })
        .unknown();

      const result = schema.validate(req.body);
      if (result.error) {
        res.status(StatusCodes.BAD_REQUEST).send("failed");
        console.log("hello");
        return;
      }

      /**
       * checking user is valid or not
       */
      const UserId: string = req.decodedToken.username;
      const user = await userModel.find({ username: UserId });
      if (isNull(user)) {
        res
          .status(StatusCodes.NOT_FOUND)
          .send("user with specified id doesn't exist");
        return;
      }
      const date = new Date();
      const d = `${date.getDate()}/${
        date.getMonth() + 1
      }/${date.getFullYear()}`;
      const survey = new surveyModel({
        userName: UserId,
        surveyName: req.body.surveyName,
        surveyQuestion: req.body.surveyQuestion,
        date: d,
      });
      const surveySaved = await survey.save();

      const Data = [
        {
          _id: surveySaved._id,
          msg: "your newly survey is created",
        },
      ];
      res.status(StatusCodes.CREATED).send(Data);
      return;
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send((error as Error).message);
      return;
    }
  };

  getSurvey = async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send((error as Error).message);
      return;
    }
  };

  getAllSurvey = async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send((error as Error).message);
      return;
    }
  };
}

export default SurveyController;
