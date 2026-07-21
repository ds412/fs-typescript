import { useEffect, useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import { Typography, CircularProgress, Button } from "@mui/material";
import axios from 'axios';

import patientService from "../services/patients";
import { Patient, Diagnosis, Entry, EntryFormValues } from "../types";
import HealthCheckEntry from "./Entry/HealthCheckEntry";
import HospitalEntry from "./Entry/HospitalEntry";
import OccupationalHealthcareEntry from "./Entry/OccupationalHealthcareEntry";
import AddEntryModal from "./AddEntryModal/AddEntryModal";

interface Props {
    diagnoses: Diagnosis[];
    diagnosisMap: Map<string, Diagnosis>;
}

const PatientDetails = ({ diagnoses, diagnosisMap }: Props) => {
    const { id } = useParams<{ id: string }>();

    const [patient, setPatient] = useState<Patient>();
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [error, setError] = useState<string>();

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


    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    const addNewEntry = async (values: EntryFormValues) => {
        try {
            const updatePatient = await patientService.addNewEntry(patient.id, values);
            setPatient(updatePatient);
            setModalOpen(false);
        } catch (e: unknown) {
            if (axios.isAxiosError(e)) {
                if (e?.response?.data && typeof e?.response?.data === "string") {
                    const message = e.response.data.replace('Something went wrong. Error: ', '');
                    console.error(message);
                    setError(message);
                } else {
                    setError("Unrecognized axios error");
                }
            } else {
                console.error("Unknown error", e);
                setError("Unknown error");
            }
        }
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
                <Fragment key={entry.id}>
                    <EntryDetails entry={entry} />
                    <ul>
                        {entry.diagnosisCodes?.map(code => (
                            <li key={code}>
                                {code} {diagnosisMap.get(code)?.name}
                            </li>
                        ))}
                    </ul>
                </Fragment>
            ))}
            <AddEntryModal
                modalOpen={modalOpen}
                onSubmit={addNewEntry}
                error={error}
                onClose={closeModal}
                diagnoses={diagnoses}
            />
            <Button variant="contained" onClick={() => openModal()}>
                Add New Entry
            </Button>

        </>
    );
};

export default PatientDetails;
