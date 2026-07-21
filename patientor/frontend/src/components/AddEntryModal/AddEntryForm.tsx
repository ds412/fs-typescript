import { useState, SyntheticEvent } from "react";

import { TextField, Grid, Button, MenuItem, FormControl, InputLabel, Select, OutlinedInput } from '@mui/material';

import { Diagnosis, EntryFormValues, type EntryType, HealthCheckRating } from "../../types";

interface Props {
    onCancel: () => void;
    onSubmit: (values: EntryFormValues) => void;
    diagnoses: Diagnosis[];
}

const AddEntryForm = ({ onCancel, onSubmit, diagnoses }: Props) => {
    // Common fields
    const [type, setType] = useState<EntryType>("HealthCheck");
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [specialist, setSpecialist] = useState('');
    const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

    // HealthCheckEntry fields
    const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(HealthCheckRating.Healthy);

    // HospitalEntry fields
    const [dischargeDate, setDischargeDate] = useState("");
    const [dischargeCriteria, setDischargeCriteria] = useState("");

    // OccupationalHealthcareEntry fields
    const [employerName, setEmployerName] = useState("");
    const [sickLeaveStart, setSickLeaveStart] = useState("");
    const [sickLeaveEnd, setSickLeaveEnd] = useState("");

    const addEntry = (event: SyntheticEvent) => {
        event.preventDefault();

        const commonFields = {
            date,
            description,
            specialist,
            diagnosisCodes: diagnosisCodes.length > 0 ? diagnosisCodes : undefined
        };

        switch (type) {
            case "HealthCheck":
                onSubmit({
                    ...commonFields,
                    type: "HealthCheck",
                    healthCheckRating
                });
                break;
            case "Hospital":
                onSubmit({
                    ...commonFields,
                    type: "Hospital",
                    discharge: { date: dischargeDate, criteria: dischargeCriteria }
                });
                break;
            case "OccupationalHealthcare":
                onSubmit({
                    ...commonFields,
                    type: "OccupationalHealthcare",
                    employerName,
                    sickLeave:
                        sickLeaveStart && sickLeaveEnd ? { startDate: sickLeaveStart, endDate: sickLeaveEnd } : undefined
                });
                break;
        }
    };
    return (
        <form onSubmit={addEntry}>
            <TextField select fullWidth label="Entry type" value={type} sx={{ mb: 2 }}
                onChange={(event) => setType(event.target.value as EntryType)}>
                <MenuItem value="HealthCheck">Health Check</MenuItem>
                <MenuItem value="Hospital">Hospital</MenuItem>
                <MenuItem value="OccupationalHealthcare">Occupational Healthcare</MenuItem>
            </TextField>
            <TextField label="Date" type="date" fullWidth value={date} sx={{ mb: 2 }}
                slotProps={{ inputLabel: { shrink: true, }, }}
                onChange={({ target }) => setDate(target.value)}
            />
            <TextField label="Description" fullWidth value={description} sx={{ mb: 2 }}
                onChange={({ target }) => setDescription(target.value)}
            />
            <TextField label="Specialist" fullWidth value={specialist} sx={{ mb: 2 }}
                onChange={({ target }) => setSpecialist(target.value)}
            />
            <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Diagnosis Codes</InputLabel>
                <Select multiple value={diagnosisCodes} input={<OutlinedInput label="Diagnosis Codes" />}
                    onChange={(event) => setDiagnosisCodes(
                        typeof event.target.value === "string" ? event.target.value.split(",") : event.target.value
                    )}
                    renderValue={(selected) => selected.join(", ")}
                >
                    {diagnoses.map((diagnosis) => (
                        <MenuItem key={diagnosis.code} value={diagnosis.code}>
                            {diagnosis.code} — {diagnosis.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            {type === "HealthCheck" && (
                <TextField select fullWidth label="Health check rating" value={healthCheckRating} sx={{ mb: 2 }}
                    onChange={({ target }) => setHealthCheckRating(Number(target.value) as HealthCheckRating)}>
                    <MenuItem value={HealthCheckRating.Healthy}>Healthy</MenuItem>
                    <MenuItem value={HealthCheckRating.LowRisk}>Low risk</MenuItem>
                    <MenuItem value={HealthCheckRating.HighRisk}>High risk</MenuItem>
                    <MenuItem value={HealthCheckRating.CriticalRisk}>Critical risk</MenuItem>
                </TextField>
            )}

            {type === "Hospital" && (<>
                <TextField label="Discharge date" type="date" fullWidth value={dischargeDate} sx={{ mb: 2 }}
                    slotProps={{ inputLabel: { shrink: true, }, }}
                    onChange={({ target }) => setDischargeDate(target.value)} />
                <TextField label="Discharge criteria" fullWidth value={dischargeCriteria} sx={{ mb: 2 }}
                    onChange={({ target }) => setDischargeCriteria(target.value)} />
            </>
            )}

            {type === "OccupationalHealthcare" && (<>
                <TextField label="Employer name" fullWidth value={employerName} sx={{ mb: 2 }}
                    onChange={({ target }) => setEmployerName(target.value)} />
                <TextField label="Sick leave start date" type="date" fullWidth value={sickLeaveStart} sx={{ mb: 2 }}
                    slotProps={{ inputLabel: { shrink: true, }, }}
                    onChange={({ target }) => setSickLeaveStart(target.value)} />
                <TextField label="Sick leave end date" type="date" fullWidth value={sickLeaveEnd} sx={{ mb: 2 }}
                    slotProps={{ inputLabel: { shrink: true, }, }}
                    onChange={({ target }) => setSickLeaveEnd(target.value)} />
            </>
            )}

            <Grid container justifyContent="space-between">
                <Grid>
                    <Button color="secondary" variant="contained" type="button" onClick={onCancel}>
                        Cancel
                    </Button>
                </Grid>
                <Grid>
                    <Button variant="contained" type="submit"> Add
                    </Button>
                </Grid>
            </Grid>

        </form>
    );
};


export default AddEntryForm;
