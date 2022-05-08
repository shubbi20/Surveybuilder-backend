import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },

  username: { type: String, required: true, unique: true },

  email: { type: String, required: true, unique: true },

  age: { type: Number, required: true },

  mobile: { type: Number, required: true },
});

const userModel = mongoose.model("User", userSchema);

export default userModel;
