import mongoose, { Schema, model, Document } from "mongoose";

export interface surveySolutionInterface {
  QuestionType: string;
  Question: string;
  questionAns: string;
}

export interface SurveyInterface extends Document {
  _id: mongoose.Types.ObjectId;
  surveyId: string;
  surveyName: string;
  surveyCreator: string;
  userAttempted: string;
  date: string;
  surveyResponse: surveySolutionInterface[];
}

const surveyAttemptSchema = new Schema({
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

const surveyAttemptModel = model<SurveyInterface>(
  "SurveyAttempt",
  surveyAttemptSchema
);
export default surveyAttemptModel;
