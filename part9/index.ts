import express from 'express';
import calculateBmi from './bmiCalculator';

const app = express();
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if (!height || !weight || isNaN(height) || isNaN(weight)) {
    res.status(400).send({ error: "malformatted parameters" });
    return;
  }

  const result = calculateBmi(height, weight);
  res.send({ weight, height, bmi: result });
});
