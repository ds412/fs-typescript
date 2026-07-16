import express, { type Response } from 'express';
import diagnosisService from '../services/diagnosisService.ts';
import type { Diagnosis } from '../types.ts';

const router = express.Router();

router.get('/', (_request, response: Response<Diagnosis[]>) => {
    const data = diagnosisService.getEntries();
    response.send(data);
});

export default router;
