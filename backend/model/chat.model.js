import { mongoose } from "mongoose";
import { Schema } from "mongoose";

const chatSchema = new Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  message: {
    type: String,
    require: true,
  },
  roomId: {
    type: String,
    require: true,
  },
  createdAT: {
    type: Date,
    default: Date.now(),
  },
});

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
