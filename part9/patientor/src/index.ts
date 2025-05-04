import express from 'express';
import cors from 'cors';
import diagnosesRouter from './routes/diagnoses';

const app = express();
app.use(express.json());
const corsOptions: cors.CorsOptions = { origin: 'http://localhost:5173' };
const PORT: number = 3001;

app.use(cors(corsOptions));

app.get('/api/ping', (_req, res) => {
  res.send('pong');
});

app.use('/api/diagnoses', diagnosesRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
