import { z } from 'zod';

export const Gender = { Male: 'male', Female: 'female', Other: 'other' } as const;
export type Gender = typeof Gender[keyof typeof Gender];

export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}

const HealthCheckRating = {
    Healthy: 0,
    LowRisk: 1,
    HighRisk: 2,
    CriticalRisk: 3,
} as const;

type HealthCheckRating = typeof HealthCheckRating[keyof typeof HealthCheckRating];


interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnosis['code']>;
}

interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}


interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: {
        date: string,
        criteria: string
    };
}

interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave?: {
        startDate: string,
        endDate: string
    }
}

export type Entry = | HealthCheckEntry | HospitalEntry | OccupationalHealthcareEntry;

// Define special omit for unions
// type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
// Define Entry without the 'id' property
// type EntryWithoutId = UnionOmit<Entry, 'id'>;

export const NewPatientEntrySchema = z.object({
    name: z.string(),
    dateOfBirth: z.iso.date(),
    ssn: z.string(),
    gender: z.enum(Gender),
    occupation: z.string()
});

export type NewPatientEntry = z.infer<typeof NewPatientEntrySchema>;

export interface Patient extends NewPatientEntry {
    id: string;
    entries: Entry[];
}

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;
