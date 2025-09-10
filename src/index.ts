import express from "express";
import cors from "cors";
import morgan from "morgan";

import projectRoutes from "./routes/project.routes";
import componentRoutes from "./routes/component.routes";
import cardRoutes from "./routes/card.routes";
import columnRoutes from "./routes/column.routes";
import { notFound } from "./middleware/notFound";
import { errorHandler } from "./middleware/errorHandler";

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.use("/projects", projectRoutes);
app.use("/components", componentRoutes);
app.use("/cards", cardRoutes);
app.use("/columns", columnRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
