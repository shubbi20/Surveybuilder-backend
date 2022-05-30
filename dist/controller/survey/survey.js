"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const http_status_codes_1 = require("http-status-codes");
const user_1 = __importDefault(require("../../models/user"));
const joi_1 = __importDefault(require("joi"));
const survey_1 = __importDefault(require("../../models/survey"));
const attemptSurvey_1 = __importDefault(require("../../models/attemptSurvey"));
class SurveyController {
    constructor() {
        this.createSurvey = async (req, res, next) => {
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
                const schema = joi_1.default.object()
                    .options({ abortEarly: false })
                    .keys({
                    surveyName: joi_1.default.string().required(),
                    surveyQuestion: joi_1.default.array().required(),
                })
                    .unknown();
                const result = schema.validate(req.body);
                if (result.error) {
                    res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).send("failed");
                    console.log("hello");
                    return;
                }
                /**
                 * checking user is valid or not
                 */
                const UserId = req.decodedToken.username;
                const user = await user_1.default.find({ username: UserId });
                if ((0, lodash_1.isNull)(user)) {
                    res
                        .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                        .send("user with specified id doesn't exist");
                    return;
                }
                const date = new Date();
                const d = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
                const survey = new survey_1.default({
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
                res.status(http_status_codes_1.StatusCodes.CREATED).send(Data);
                return;
            }
            catch (error) {
                res
                    .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
                    .send(error.message);
                return;
            }
        };
        this.getSurvey = async (req, res, next) => {
            try {
                const UserId = req.decodedToken.username;
                const user = await user_1.default.find({ username: UserId });
                if ((0, lodash_1.isNull)(user)) {
                    res
                        .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                        .send("user with specified id doesn't exist");
                    return;
                }
                const surveyId = req.params.surveyId;
                const survey = await survey_1.default.findById(surveyId);
                if ((0, lodash_1.isNull)(survey)) {
                    res
                        .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                        .send(`survey with this ${surveyId} does not exist`);
                    return;
                }
                const Data = survey;
                res.status(http_status_codes_1.StatusCodes.OK).send(Data);
                return;
            }
            catch (error) {
                res
                    .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
                    .send(error.message);
                return;
            }
        };
        this.getAllSurvey = async (req, res, next) => {
            try {
                const UserId = req.decodedToken.username;
                const user = await user_1.default.find({ username: UserId });
                if ((0, lodash_1.isNull)(user)) {
                    res
                        .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                        .send("user with specified id doesn't exist");
                    return;
                }
                const surveyList = await survey_1.default.find();
                if ((0, lodash_1.isNull)(surveyList)) {
                    res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).send("model is not working");
                    return;
                }
                res.status(http_status_codes_1.StatusCodes.OK).send(surveyList);
                return;
            }
            catch (error) {
                res
                    .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
                    .send(error.message);
                return;
            }
        };
        this.attemptSurvey = async (req, res, next) => {
            try {
                const UserId = req.decodedToken.username;
                const user = await user_1.default.find({ username: UserId });
                if ((0, lodash_1.isNull)(user)) {
                    res
                        .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                        .send("user with specified id doesn't exist");
                    return;
                }
                /**
                 * validation part
                 */
                const schema = joi_1.default.object()
                    .options({ abortEarly: false })
                    .keys({
                    surveyId: joi_1.default.string().required(),
                    surveyName: joi_1.default.string().required(),
                    surveyCreator: joi_1.default.string().required(),
                    userAttempted: joi_1.default.string().required(),
                    surveyResponse: joi_1.default.array().required(),
                })
                    .unknown();
                const result = schema.validate(req.body);
                if (result.error) {
                    res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).send(result.error);
                    return;
                }
                const date = new Date();
                const d = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
                const surveyAttempted = new attemptSurvey_1.default({
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
                res.status(http_status_codes_1.StatusCodes.CREATED).send(Data);
                return;
            }
            catch (error) {
                res
                    .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
                    .send(error.message);
                return;
            }
        };
    }
}
exports.default = SurveyController;
