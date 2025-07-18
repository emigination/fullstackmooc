import { useState } from "react";
import axios from 'axios';
import { TextField, Button, Typography } from '@mui/material';

import { Patient } from "../../types";
import patientService from "../../services/patients";

interface Props {
  patientId: string;
  setPatient: React.Dispatch<React.SetStateAction<Patient | null>>;
}

const NewEntryForm = ({ patientId, setPatient }: Props) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState(0);
  const [diagnosisCodes, setDiagnosisCodes] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const addedEntry = await patientService.addEntry(patientId, {
        type: "HealthCheck",
        description,
        date,
        specialist,
        healthCheckRating,
        diagnosisCodes: diagnosisCodes.split(",").map(code => code.trim()).filter(code => code !== ""),
      });
      if (addedEntry) {
        setPatient((prevPatient) => {
          if (!prevPatient) return null;
          return {
            ...prevPatient,
            entries: [...prevPatient.entries, addedEntry],
          };
        });
      }
      setDescription("");
      setDate("");
      setSpecialist("");
      setHealthCheckRating(0);
      setDiagnosisCodes("");
      setError(null);
    } catch (e: unknown) {
      let message;
      if (axios.isAxiosError(e) && e?.response?.data?.error && Array.isArray(e.response.data.error)) {
        message = e.response.data.error.map((err: Error) => err.message).join(', ');
      } else {
        message = "Failed to create entry: " + (e instanceof Error ? e.message : "Unknown error");
      }
      setError(message);
      console.error(message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h6">Add new entry</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Date"
        placeholder="YYYY-MM-DD"
        fullWidth
        value={date}
        onChange={({ target }) => setDate(target.value)}
      />
      <TextField
        label="Specialist"
        value={specialist}
        onChange={(e) => setSpecialist(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Health Check Rating"
        type="number"
        value={healthCheckRating}
        onChange={(e) => setHealthCheckRating(Number(e.target.value))}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Diagnosis codes"
        value={diagnosisCodes}
        onChange={(e) => setDiagnosisCodes(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary" sx={{ marginTop: '1em', marginBottom: '2em' }}>
        Create entry
      </Button>
    </form>
  );
};

export default NewEntryForm;
