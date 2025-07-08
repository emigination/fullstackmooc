import { Typography } from '@mui/material';

import { Entry } from "../../types";
import { formatDate } from "../../utils";

const EntryList: React.FC<{ entries: Entry[] }> = ({ entries }) => {
  if (!entries || entries.length === 0) {
    return <Typography variant="subtitle1">No entries</Typography>;
  }

  return (
    <div>
      {entries.map((entry) => (
        <div key={entry.id} style={{ marginBottom: '1em' }}>
          <Typography sx={{ fontWeight: 'bold', marginBottom: '0.5em' }}>{formatDate(entry.date)}</Typography>
          <Typography>{entry.description}</Typography>
          <Typography>
            {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
              <ul>
                {entry.diagnosisCodes.map((code) => <li key={code}>{code}</li>)}
              </ul>
            )}
          </Typography>
        </div>
      ))}
    </div>
  );
};


export default EntryList;
