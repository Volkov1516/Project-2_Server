import express from 'express';
import projectRoutes from './routes/project.routes';
import componentRoutes from './routes/component.routes'
import { errorHandler } from './middleware/errorHandler';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/projects', projectRoutes);
app.use('/components', componentRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
