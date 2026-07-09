import { v1 as uuid } from 'uuid';
import patients from '../../data/patients.ts';
import type { Patient, NonSensitivePatient, NewPatientEntry } from '../types.ts';

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
    // need to explicitly remove omitted fields since typeScript doesn't prohibit use of excess fields
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addPatient = (entry: NewPatientEntry): Patient => {
    const newPatient = {
        id: uuid(),
        ...entry
    };
    patients.push(newPatient);
    return newPatient;
};


export default {
    getNonSensitiveEntries,
    addPatient
};
