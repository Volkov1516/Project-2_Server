import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import http from "http";
import { Server } from "socket.io";

import projectRoutes from "./routes/project.routes";
import componentRoutes from "./routes/component.routes";
import cardRoutes from "./routes/card.routes";
import columnRoutes from "./routes/column.routes";
import telegramRoutes from "./routes/telegram.routes";
import { notFound } from "./middleware/notFound";
import { errorHandler } from "./middleware/errorHandler";

dotenv.config();

const app = express();
const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
const port = process.env.PORT || 3000;

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.use("/projects", projectRoutes);
app.use("/components", componentRoutes);
app.use("/cards", cardRoutes);
app.use("/columns", columnRoutes);
app.use("/telegram", telegramRoutes);

app.use(notFound);
app.use(errorHandler);

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
