import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
const corsOptions: cors.CorsOptions = { origin: 'http://localhost:5173' };
const PORT: number = 3001;

app.get('/api/ping', cors(corsOptions), (_req, res) => {
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
