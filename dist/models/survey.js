"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const surveySchema = new mongoose_1.Schema({
    userName: { type: String, required: true },
    surveyName: { type: String, required: true },
    surveyQuestion: {
        type: [
            {
                QuestionType: String,
                Question: String,
                desc: String,
                choices: { type: [String] },
            },
        ],
        required: true,
    },
    date: { type: String, required: true },
});
const surveyModel = (0, mongoose_1.model)("Survey", surveySchema);
exports.default = surveyModel;
