import { z } from 'zod';

export const Gender = { Male: 'male', Female: 'female', Other: 'other' } as const;
export type Gender = typeof Gender[keyof typeof Gender];

export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}

// export interface Patient {
//     id: string;
//     name: string;
//     dateOfBirth: string;
//     ssn: string;
//     gender: Gender;
//     occupation: string;
// }

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
}

export type NonSensitivePatient = Omit<Patient, 'ssn'>;
