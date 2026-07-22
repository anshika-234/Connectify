import mongoose from "mongoose";

const connectionRequestSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["accepted", "pending", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true },
);

// Prevent duplicate same-direction request
connectionRequestSchema.index({ sender: 1, receiver: 1 }, { unique: true });

const ConnectionRequest = mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema,
);

export default ConnectionRequest;
