import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, CircularProgress } from "@mui/material";

import patientService from "../services/patients";
import { Patient } from "../types";

const PatientDetails = () => {
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

    return (
        <>
            <Typography variant="h5" gutterBottom> {patient.name} </Typography>
            <Typography>Gender: {patient.gender}</Typography>
            <Typography>SSN: {patient.ssn}</Typography>
            <Typography>Occupation: {patient.occupation}</Typography>
            <Typography>Date of Birth: {patient.dateOfBirth}</Typography>
        </>
    );
};

export default PatientDetails;
