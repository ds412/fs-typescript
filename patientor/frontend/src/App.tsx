import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography } from '@mui/material';

import { apiBaseUrl } from "./constants";
import { Patient, Diagnosis } from "./types";

import patientService from "./services/patients";
import diagnosisService from "./services/diagnoses";
import PatientListPage from "./components/PatientListPage/PatientListPage";
import PatientDetails from "./components/PatientDetails";

const App = () => {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

    useEffect(() => {
        void axios.get<void>(`${apiBaseUrl}/ping`);

        const fetchPatientList = async () => {
            const patients = await patientService.getAll();
            setPatients(patients);
        };
        void fetchPatientList();
    }, []);

    useEffect(() => {
        const fetchDiagnosisList = async () => {
            const diagnoses = await diagnosisService.getAll();
            setDiagnoses(diagnoses);
        };
        void fetchDiagnosisList();
    }, []);

    const diagnosisMap = new Map(
        diagnoses.map(diagnosis => [diagnosis.code, diagnosis])
    );


    return (
        <div className="App">
            <Router>
                <Container>
                    <Typography variant="h3" sx={{ marginBottom: "0.5em" }}>
                        Patientor
                    </Typography>
                    <Button component={Link} to="/" variant="contained" color="primary">
                        Home
                    </Button>
                    <Divider sx={{ marginY: 2 }} />
                    <Routes>
                        <Route path="/" element={
                            <PatientListPage patients={patients} setPatients={setPatients} />
                        } />
                        <Route
                            path="/patients/:id" element={
                                <PatientDetails diagnoses={diagnoses} diagnosisMap={diagnosisMap}/>
                            }
                        />
                    </Routes>
                </Container>
            </Router>
        </div>
    );
};

export default App;
