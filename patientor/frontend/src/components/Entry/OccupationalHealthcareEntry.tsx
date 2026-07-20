import { Typography } from "@mui/material";
import { OccupationalHealthcareEntry as OccupationalHealthCareEntryType } from "../../types";


interface Props {
    entry: OccupationalHealthCareEntryType;
}

const OccupationalHealthcareEntry = ({ entry }: Props) => {
    return (
        <>
            <div key={entry.id}>
                <Typography>{entry.date} <i>{entry.type}</i></Typography>
                <Typography>Employer: {entry.employerName}</Typography>
                <Typography>Description: <i>{entry.description}</i> </Typography>
                {entry.sickLeave &&
                    (<Typography>Sick leave from {entry.sickLeave.startDate} until {entry.sickLeave.endDate}</Typography>)
                }
                <Typography>Diagnosed by {entry.specialist}</Typography>
            </div>
        </>
    );
};

export default OccupationalHealthcareEntry;
