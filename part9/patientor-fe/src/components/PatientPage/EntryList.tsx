import { Typography } from '@mui/material';

import { Diagnosis, Entry } from "../../types";
import { formatDate } from "../../utils";

interface Props {
  entries: Entry[];
  diagnosesMap: Record<string, Diagnosis>;
}

const EntryList = ({ entries, diagnosesMap }: Props) => {
  if (!entries || entries.length === 0) {
    return <Typography variant="subtitle1">No entries</Typography>;
  }

  return (
    <div>
      {entries.map((entry) => (
        <div key={entry.id} style={{ marginBottom: '1em' }}>
          <Typography sx={{ fontWeight: 'bold', marginBottom: '0.5em' }}>{formatDate(entry.date)}</Typography>
          <Typography>{entry.description}</Typography>
          {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
            <ul>
              {entry.diagnosisCodes.map((code) => {
                return <li key={code}><Typography>{code} {diagnosesMap[code]?.name}</Typography></li>;
              })}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};


export default EntryList;
