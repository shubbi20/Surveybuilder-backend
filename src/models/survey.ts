import mongoose, { Schema, model, Document } from "mongoose";
import { InputType } from "zlib";

/**
 * const d=new Date();
console.log(d.getDate()+" "+d.getMonth()+" "+d.getFullYear());
 */
export interface Selectiontypeinterface {
  QuestionType: string;
  Question: string;
  desc: string;
  choices: string[];
}

export interface SurveyInterface extends Document {
  _id: mongoose.Types.ObjectId;
  userId: string;
  surveyName: string;
  surveyQuestion: Selectiontypeinterface[];
  date: string;
}

const surveySchema = new Schema({
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

const surveyModel = model<SurveyInterface>("Survey", surveySchema);
export default surveyModel;
