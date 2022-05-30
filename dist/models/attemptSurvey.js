"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const surveyAttemptSchema = new mongoose_1.Schema({
    surveyId: { type: String, required: true },
    surveyName: { type: String, required: true },
    surveyCreator: { type: String, required: true },
    userAttempted: { type: String, required: true },
    date: { type: String, required: true },
    surveyQuestion: {
        type: [
            {
                QuestionType: String,
                Question: String,
                questionAns: String,
            },
        ],
        required: true,
    },
});
const surveyAttemptModel = (0, mongoose_1.model)("SurveyAttempt", surveyAttemptSchema);
exports.default = surveyAttemptModel;
