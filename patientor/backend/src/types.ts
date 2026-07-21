import { z } from 'zod';

export const Gender = { Male: 'male', Female: 'female', Other: 'other' } as const;
export type Gender = typeof Gender[keyof typeof Gender];

export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}

export const HealthCheckRating = {
    Healthy: 0,
    LowRisk: 1,
    HighRisk: 2,
    CriticalRisk: 3,
} as const;

export type HealthCheckRating = typeof HealthCheckRating[keyof typeof HealthCheckRating];

// Shared fields
export const BaseEntrySchema = z.object({
    id: z.string(),
    description: z.string(),
    date: z.iso.date(),
    specialist: z.string(),
    diagnosisCodes: z.array(z.string()).optional()
});


// Entry schemas
export const HealthCheckEntrySchema = BaseEntrySchema.extend({
    type: z.literal("HealthCheck"),
    healthCheckRating: z.union([
        z.literal(HealthCheckRating.Healthy),
        z.literal(HealthCheckRating.LowRisk),
        z.literal(HealthCheckRating.HighRisk),
        z.literal(HealthCheckRating.CriticalRisk),
    ])
});

export const HospitalEntrySchema = BaseEntrySchema.extend({
    type: z.literal("Hospital"),
    discharge: z.object({
        date: z.iso.date(),
        criteria: z.string()
    })
});

export const OccupationalHealthcareEntrySchema = BaseEntrySchema.extend({
    type: z.literal("OccupationalHealthcare"),
    employerName: z.string(),
    sickLeave: z.object({
        startDate: z.iso.date(),
        endDate: z.iso.date()
    }).optional()
});


// Types inferred from schemas
export type HealthCheckEntry = z.infer<typeof HealthCheckEntrySchema>;
export type HospitalEntry = z.infer<typeof HospitalEntrySchema>;
export type OccupationalHealthcareEntry = z.infer<typeof OccupationalHealthcareEntrySchema>;

export type Entry = | HealthCheckEntry | HospitalEntry | OccupationalHealthcareEntry;


// New entries do not contain id
export const NewEntrySchema = z.discriminatedUnion("type", [
    HealthCheckEntrySchema.omit({ id: true }),
    HospitalEntrySchema.omit({ id: true }),
    OccupationalHealthcareEntrySchema.omit({ id: true })
]);

export type NewEntry = z.infer<typeof NewEntrySchema>;


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
