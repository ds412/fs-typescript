import express, { type Request, type Response, type NextFunction } from 'express';
import patientService from '../services/patientService.ts';
import { NewPatientEntrySchema, type NonSensitivePatient, type NewPatientEntry, type Patient } from '../types.ts';
import { z } from 'zod';


// middleware that parses newPatientEntry from request body
const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
    try {
        // calls schema parser on request body
        NewPatientEntrySchema.parse(req.body);
        next();
    }
    // if error caught, passed to error handling middleware
    catch (error: unknown) {
        next(error);
    }
};


const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
    const data = patientService.getNonSensitiveEntries();
    res.send(data);
});


router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatientEntry>, res: Response<Patient>) => {
    const addedEntry = patientService.addPatient(req.body);
    res.json(addedEntry);
});


// middleware to handle errors
const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
    if (error instanceof z.ZodError) {
        res.status(400).send({ error: error.issues });
    } else {
        next(error);
    }
};

router.use(errorMiddleware);

export default router;
