import { Typography } from "@mui/material";
import { HealthCheckEntry as HealthCheckEntryType } from "../../types";


interface Props {
    entry: HealthCheckEntryType;
}

const HealthCheckEntry = ({ entry }: Props) => {
    return (
        <>
            <div key={entry.id}>
                <Typography>{entry.date} <i>{entry.type}</i></Typography>
                <Typography>Description: <i>{entry.description}</i> </Typography>
                <Typography>Health risk rating: {entry.healthCheckRating}</Typography>
                <Typography>Diagnosed by {entry.specialist}</Typography>
            </div>
        </>
    );
};

export default HealthCheckEntry;
