import express from "express";
import { Router } from "express";
const router = express.Router();
import SurveyController from "../controller/survey/survey";
import tokenValidator from "../middleware/decodeToken";

const survey = new SurveyController();
//random checking
router.post("/survey", tokenValidator, survey.createSurvey);
router.get("/getSurvey/:surveyId", tokenValidator, survey.getSurvey);
router.get("/getAllSurveys", tokenValidator, survey.getAllSurvey);
router.post("/attemptSurvey", tokenValidator, survey.attemptSurvey);
router.get("/getSurveys", tokenValidator, survey.getSurveyForAttempt);
router.get("/getUserSurveys", tokenValidator, survey.getSurveyForUserId);
router.delete("/deleteSurvey", tokenValidator, survey.deleteSurvey);
router.get(
  "/getSurveyResponse/:surveyName",
  tokenValidator,
  survey.getSurveyResponse
);

export default router;
