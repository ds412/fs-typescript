import { Typography } from "@mui/material";
import { HospitalEntry as HospitalEntryType } from "../../types";


interface Props {
    entry: HospitalEntryType;
}

const HospitalEntry = ({ entry }: Props) => {
    return (
        <>
            <div key={entry.id}>
                <Typography>{entry.date} <i>{entry.type}</i> </Typography>
                <Typography>Description: <i>{entry.description}</i> </Typography>
                <Typography>Discharge: {entry.discharge.date} - <i>{entry.discharge.criteria}</i></Typography>
                <Typography>Diagnosed by {entry.specialist}</Typography>
            </div>
        </>
    );
};

export default HospitalEntry;
