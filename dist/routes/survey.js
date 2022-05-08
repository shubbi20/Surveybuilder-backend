"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const survey_1 = __importDefault(require("../controller/survey/survey"));
const decodeToken_1 = __importDefault(require("../middleware/decodeToken"));
const survey = new survey_1.default();
router.post("/survey/:userId", decodeToken_1.default, survey.createSurvey);
router.get("/getSurvey", survey.getSurvey);
router.get("/getAllSurveys", survey.getAllSurvey);
exports.default = router;
