import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, CircularProgress } from "@mui/material";

import patientService from "../services/patients";
import { Patient, Diagnosis, Entry } from "../types";
import HealthCheckEntry from "./Entry/HealthCheckEntry";
import HospitalEntry from "./Entry/HospitalEntry";
import OccupationalHealthcareEntry from "./Entry/OccupationalHealthcareEntry";

interface Props {
    diagnosisMap: Map<string, Diagnosis>;
}

const PatientDetails = ({ diagnosisMap }: Props) => {
    const { id } = useParams<{ id: string }>();

    const [patient, setPatient] = useState<Patient>();

    useEffect(() => {
        if (!id) {
            return;
        }
        const fetchPatient = async () => {
            const patient = await patientService.getById(id);
            setPatient(patient);
        };
        void fetchPatient();
    }, [id]);

    if (!patient) {
        return <CircularProgress />;
    }

    const EntryDetails = ({ entry }: { entry: Entry }) => {
        switch (entry.type) {
            case "HealthCheck":
                return <HealthCheckEntry entry={entry} />;
            case "Hospital":
                return <HospitalEntry entry={entry} />;
            case "OccupationalHealthcare":
                return <OccupationalHealthcareEntry entry={entry} />;
            default:
                return assertNever(entry);
        }
    };

    const assertNever = (value: never): never => {
        throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
    };


    return (
        <>
            <Typography variant="h5" gutterBottom> {patient.name} </Typography>
            <Typography>Gender: {patient.gender}</Typography>
            <Typography>SSN: {patient.ssn}</Typography>
            <Typography>Occupation: {patient.occupation}</Typography>
            <Typography gutterBottom>Date of Birth: {patient.dateOfBirth}</Typography>
            <Typography variant="h6" gutterBottom> Entries: </Typography>
            {patient.entries?.map(entry => (
                <>
                    <EntryDetails key={entry.id} entry={entry} />
                    <ul>
                        {entry.diagnosisCodes?.map(code => (
                            <li key={code}>
                                {code} {diagnosisMap.get(code)?.name}
                            </li>
                        ))}
                    </ul>
                </>
            ))}

        </>
    );
};

export default PatientDetails;


// {/* {patient.entries?.map(entry => (
//     <div key={entry.id}>
//         <Typography>{entry.date} <i>{entry.description}</i> </Typography>
//         <Typography> diagnosed by {entry.specialist}</Typography>
//         <ul>
//             {entry.diagnosisCodes?.map(code => (
//                 <li key={code}>
//                     {code} {diagnosisMap.get(code)?.name}
//                 </li>
//             ))}
//         </ul>
//     </div>
// ))} */}
