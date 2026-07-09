// !No longer used - replaced by zod schema in types.ts

// import type { NewPatientEntry } from './types.ts';
// import { Gender } from './types.ts';

// // parse request body (given 'unknown' type) into NewPatientEntry
// const parseNewPatientEntry = (object: unknown): NewPatientEntry => {
//     if (!object || typeof object !== 'object') {
//         throw new Error('Incorrect or missing data');
//     }
//     // ensure object has all the required fields (type narrowing)
//     if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
//         // parse all the fields from the object
//         const newEntry: NewPatientEntry = {
//             name: parseName(object.name),
//             dateOfBirth: parseDateOfBirth(object.dateOfBirth),
//             ssn: parseSSN(object.ssn),
//             gender: parseGender(object.gender),
//             occupation: parseOccupation(object.occupation)
//         };
//         return newEntry;
//     }

//     throw new Error('Incorrect data: some fields are missing');
// };


// // FIELD PARSE FUNCTIONS
// // parse comment field (string)
// const parseName = (name: unknown): string => {
//     if (!name || !isString(name)) {
//         throw new Error('Incorrect or missing name');
//     }
//     return name;
// };

// // parse date of birth field (string, in date format)
// const parseDateOfBirth = (dateOfBirth: unknown): string => {
//     if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
//         throw new Error('Incorrect or missing date of birth: ' + dateOfBirth);
//     }
//     return dateOfBirth;
// };

// // parse SSN field (string)
// const parseSSN = (ssn: unknown): string => {
//     if (!ssn || !isString(ssn)) {
//         throw new Error('Incorrect or missing SSN');
//     }
//     return ssn;
// };

// // parse gender field
// const parseGender = (gender: unknown): Gender => {
//     if (!gender || !isString(gender) || !isGender(gender)) {
//         throw new Error('Incorrect or missing gender: ' + gender);
//     }
//     return gender;
// };

// // parse occupation field (string)
// const parseOccupation = (occupation: unknown): string => {
//     if (!occupation || !isString(occupation)) {
//         throw new Error('Incorrect or missing occupation');
//     }
//     return occupation;
// };


// // TYPE GUARDS
// // type guard for string type - allows type narrowing
// const isString = (text: unknown): text is string => {
//     return typeof text === 'string' || text instanceof String;
// };

// // type guard for date format
// const isDate = (date: string): boolean => {
//     // check if date string can be parsed as a date
//     return Boolean(Date.parse(date));
// };

// // type guard for Gender object
// const isGender = (param: string): param is Gender => {
//     return (Object.values(Gender) as string[]).includes(param);
// };


// export default parseNewPatientEntry;
