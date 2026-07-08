import express from 'express';
import { calculateBmi } from './bmiCalculator.ts';
import { calculateExercises } from './exerciseCalculator.ts';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    // get query string parameters
    const { height, weight } = req.query;

    // type check
    if (typeof height !== 'string' || typeof weight !== 'string' || isNaN(Number(height)) || isNaN(Number(weight))) {
        return res.status(400).json({
            error: 'malformatted parameters'
        });
    }

    const h = Number(height);
    const w = Number(weight);

    // return JSON file with correct parameters
    return res.json({ weight: w, height: h, bmi: calculateBmi(h, w) });
});

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;

    if (daily_exercises === undefined || target === undefined) {
        return res.status(400).send({ error: 'parameters missing' });
    }
    if (!Array.isArray(daily_exercises) || isNaN(Number(target)) || daily_exercises.some(value => isNaN(Number(value)))) {
        return res.status(400).send({
            error: 'malformatted parameters'
        });
    }
    const dailyHrs = daily_exercises.map(Number);
    const result = calculateExercises(dailyHrs, Number(target));

    return res.send(result);
});


const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
