import express, { type Request, type Response, type NextFunction } from 'express';
import patientService from '../services/patientService.ts';
import { NewPatientEntrySchema, NewEntrySchema, type NonSensitivePatient, type NewPatientEntry, type Patient, type NewEntry } from '../types.ts';
import { z } from 'zod';

// middleware that parses newPatientEntry from request body
const newPatientParser = (request: Request, _response: Response, next: NextFunction) => {
    try {
        // calls schema parser on request body
        NewPatientEntrySchema.parse(request.body);
        next();
    }
    // if error caught, passed to error handling middleware
    catch (error: unknown) {
        next(error);
    }
};

// middleware that parses newEntry from request body
const newEntryParser = (request: Request, _response: Response, next: NextFunction) => {
    try {
        // calls schema parser on request body
        NewEntrySchema.parse(request.body);
        next();
    }
    // if error caught, passed to error handling middleware
    catch (error: unknown) {
        next(error);
    }
};


const router = express.Router();

router.get('/', (_request, response: Response<NonSensitivePatient[]>) => {
    const data = patientService.getNonSensitiveEntries();
    response.send(data);
});

router.get('/:id', (request: Request, response: Response<Patient>) => {
    const data = patientService.getEntries();
    const user = data.find(patient => patient.id.toString() === request.params.id);
    if (!user) {
        response.status(404).end();
    }
    else {
        response.send(user);
    }
});


router.post('/', newPatientParser, (request: Request<unknown, unknown, NewPatientEntry>, response: Response<Patient>) => {
    const addedPatient = patientService.addPatient(request.body);
    response.json(addedPatient);
});

router.post('/:id/entries', newEntryParser, (request: Request<{id: string}, unknown, NewEntry>, response: Response<Patient>) => {
        const patient = patientService.addEntryToPatient(request.params.id, request.body);
        if (!patient) {
            response.status(404).end();
        } else {
            response.json(patient);
        }

});


// middleware to handle errors
const errorMiddleware = (error: unknown, _request: Request, response: Response, next: NextFunction) => {
    if (error instanceof z.ZodError) {
        response.status(400).send({ error: error.issues });
    } else {
        next(error);
    }
};

router.use(errorMiddleware);

export default router;



