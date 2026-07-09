import cors from 'cors';
import express from 'express';
import diagnosisRouter from './routes/diagnosisRouter.ts';
import patientRouter from './routes/patientRouter.ts';

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // restrict calls to those from this address
    // methods: "GET" // only allow GET requests
  })
);

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
    console.log('someone pinged here');
    res.send('pong');
});

app.use('/api/diagnoses', diagnosisRouter);
app.use('/api/patients', patientRouter);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
