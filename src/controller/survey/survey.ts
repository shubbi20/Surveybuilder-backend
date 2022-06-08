import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { isNull, isUndefined } from "lodash";
import { StatusCodes } from "http-status-codes";
import userModel from "../../models/user";
import Joi from "joi";
import surveyModel from "../../models/survey";
import surveyAttemptModel from "../../models/attemptSurvey";

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

  getSurvey = async (req: any, res: Response, next: NextFunction) => {
    try {
      const UserId: string = req.decodedToken.username;
      const user = await userModel.find({ username: UserId });
      if (isNull(user)) {
        res
          .status(StatusCodes.NOT_FOUND)
          .send("user with specified id doesn't exist");
        return;
      }
      const surveyId = req.params.surveyId;
      const survey = await surveyModel.findById(surveyId);
      if (isNull(survey)) {
        res
          .status(StatusCodes.NOT_FOUND)
          .send(`survey with this ${surveyId} does not exist`);
        return;
      }

      const Data = survey;

      res.status(StatusCodes.OK).send(Data);
      return;
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send((error as Error).message);
      return;
    }
  };

  getAllSurvey = async (req: any, res: Response, next: NextFunction) => {
    try {
      const UserId: string = req.decodedToken.username;
      const user = await userModel.find({ username: UserId });
      if (isNull(user)) {
        res
          .status(StatusCodes.NOT_FOUND)
          .send("user with specified id doesn't exist");
        return;
      }
      const surveyList = await surveyModel.find();
      if (isNull(surveyList)) {
        res.status(StatusCodes.BAD_REQUEST).send("model is not working");
        return;
      }
      res.status(StatusCodes.OK).send(surveyList);
      return;
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send((error as Error).message);
      return;
    }
  };

  attemptSurvey = async (req: any, res: Response, next: NextFunction) => {
    try {
      const UserId: string = req.decodedToken.username;
      const user = await userModel.find({ username: UserId });
      if (isNull(user)) {
        res
          .status(StatusCodes.NOT_FOUND)
          .send("user with specified id doesn't exist");
        return;
      }
      /**
       * validation part
       */
      const schema = Joi.object()
        .options({ abortEarly: false })
        .keys({
          surveyId: Joi.string().required(),
          surveyName: Joi.string().required(),
          surveyCreator: Joi.string().required(),
          userAttempted: Joi.string().required(),
          surveyResponse: Joi.array().required(),
        })
        .unknown();

      const result = schema.validate(req.body);
      if (result.error) {
        res.status(StatusCodes.BAD_REQUEST).send(result.error);
        return;
      }

      const date = new Date();
      const d = `${date.getDate()}/${
        date.getMonth() + 1
      }/${date.getFullYear()}`;

      const surveyAttempted = new surveyAttemptModel({
        surveyId: req.body.surveyId,
        surveyName: req.body.surveyName,
        surveyCreator: req.body.surveyCreator,
        userAttempted: req.body.userAttempted,
        surveyQuestion: req.body.surveyResponse,
        date: d,
      });
      const surveySaved = await surveyAttempted.save();

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

  getSurveyForAttempt = async (req: any, res: Response, next: NextFunction) => {
    try {
      const UserId: string = req.decodedToken.username;
      const user = await userModel.find({ username: UserId });
      if (isNull(user)) {
        res
          .status(StatusCodes.NOT_FOUND)
          .send("user with specified id doesn't exist");
        return;
      }
      const surveyList = await surveyModel
        .aggregate()
        .match({
          $expr: {
            $ne: ["$userName", UserId],
          },
        })
        .lookup({
          from: "surveyattempts",
          let: {
            user: UserId,
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$$user", "$userAttempted"],
                },
              },
            },
            {
              $addFields: {
                suv: "$surveyName",
              },
            },
            {
              $project: {
                surveyName: 1,
                userAttempted: 1,
                suv: 1,
              },
            },
          ],

          as: "result",
        })
        .unwind({
          path: "$result",
          preserveNullAndEmptyArrays: true,
        })
        .addFields({
          count: {
            $cond: [
              {
                $eq: ["$surveyName", "$result.suv"],
              },
              1,
              0,
            ],
          },
        })
        .group({
          _id: {
            _id: "$_id",
            surveyName: "$surveyName",
            date: "$date",
            surveyQuestion: "$surveyQuestion",
            userName: "$userName",
          },
          total: {
            $sum: "$count",
          },
        })
        .match({
          $expr: {
            $eq: ["$total", 0],
          },
        })
        .project({
          _id: "$_id._id",
          surveyName: "$_id.surveyName",
          date: "$_id.date",
          surveyQuestion: "$_id.surveyQuestion",
          userName: "$_id.userName",
        });

      if (isNull(surveyList)) {
        res.status(StatusCodes.BAD_REQUEST).send("model is not working");
        return;
      }
      res.status(StatusCodes.OK).send(surveyList);
      return;
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send((error as Error).message);
      return;
    }
  };

  getSurveyForUserId = async (req: any, res: Response, next: NextFunction) => {
    try {
      const UserId: string = req.decodedToken.username;
      const user = await userModel.find({ username: UserId });
      if (isNull(user)) {
        res
          .status(StatusCodes.NOT_FOUND)
          .send("user with specified id doesn't exist");
        return;
      }

      const surveys = await surveyModel.find({ userName: UserId });

      if (isNull(surveys)) {
        res.status(StatusCodes.BAD_REQUEST).send("model is not working");
        return;
      }
      res.status(StatusCodes.OK).send(surveys);
      return;
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send((error as Error).message);
      return;
    }
  };

  deleteSurvey = async (req: any, res: Response, next: NextFunction) => {
    try {
      const UserId: string = req.decodedToken.username;
      const user = await userModel.find({ username: UserId });
      if (isNull(user)) {
        res
          .status(StatusCodes.NOT_FOUND)
          .send("user with specified id doesn't exist");
        return;
      }
      const surveyId = req.body.surveyId;
      const surveys = await surveyModel.findByIdAndDelete(surveyId);

      if (isNull(surveys)) {
        res.status(StatusCodes.BAD_REQUEST).send("problem at deletion");
        return;
      }
      res.status(StatusCodes.OK).send(surveys);
      return;
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send((error as Error).message);
      return;
    }
  };

  getSurveyResponse = async (req: any, res: Response, next: NextFunction) => {
    try {
      const UserId: string = req.decodedToken.username;
      const user = await userModel.find({ username: UserId });
      if (isNull(user)) {
        res
          .status(StatusCodes.NOT_FOUND)
          .send("user with specified id doesn't exist");
        return;
      }
      const surveyName = req.params.surveyName;
      const surveys = await surveyAttemptModel.find({ surveyId: surveyName });

      if (isNull(surveys)) {
        res.status(StatusCodes.BAD_REQUEST).send("data fetch failed");
        return;
      }
      res.status(StatusCodes.OK).send(surveys);
      return;
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send((error as Error).message);
      return;
    }
  };
}

export default SurveyController;
