import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';
import { ExerciseCalculatorInput } from './types';


const app = express();
app.use(express.json());
const PORT = 3003;

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

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (!req.body || typeof req.body !== 'object' || !req.body.daily_exercises || !req.body.target) {
    console.log(typeof req.body);
    res.status(400).send({ error: "parameters missing" });
    return;
  }

  const exerciseInput = req.body as ExerciseCalculatorInput;

  const daily_exercises = exerciseInput.daily_exercises;
  if (!Array.isArray(daily_exercises)) {
    res.status(400).send({ error: "malformatted parameters" });
    return;
  }
  const dailyExercises: number[] = [];
  for (const hours of daily_exercises) {
    if (isNaN(Number(hours))) {
      res.status(400).send({ error: "malformatted parameters" });
      return;
    }
    dailyExercises.push(Number(hours));
  }

  const target = Number(exerciseInput.target);
  if (isNaN(target)) {
    res.status(400).send({ error: "malformatted parameters" });
    return;
  }

  const result = calculateExercises(dailyExercises, target);
  res.send(result);
});
