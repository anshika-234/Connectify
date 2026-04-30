import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io"; // ✅ upar import karo
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import postRouter from "./routes/post.routes.js";
import chatRouter from "./routes/chat.router.js";
import commentRouter from "./routes/comment.routes.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));
app.use(express.static(path.join(__dirname, "public")));

app.use("/auth", userRouter);
app.use("/post", postRouter);
app.use("/chats", chatRouter);
app.use("/comments", commentRouter);

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("User Disconnected");
  });
});

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected");
    server.listen(port, () => {
      console.log(`App is listening on port ${port}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
};

start();
