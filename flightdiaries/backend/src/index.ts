import cors from 'cors';
import express from 'express';
import diaryRouter from './routes/diaries.ts';

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173", // restrict calls to those from this address
    // methods: "GET" // only allow GET requests
  })
);

const PORT = 3000;

app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diaries', diaryRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
