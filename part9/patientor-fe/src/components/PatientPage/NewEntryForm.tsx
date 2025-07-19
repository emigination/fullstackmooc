import { useState } from "react";
import axios from 'axios';
import { InputLabel, TextField, Button, Typography, Select, MenuItem } from '@mui/material';

import { EntryFormValues, EntryType, Patient } from "../../types";
import patientService from "../../services/patients";

interface Props {
  patientId: string;
  setPatient: React.Dispatch<React.SetStateAction<Patient | null>>;
}

const NewEntryForm = ({ patientId, setPatient }: Props) => {
  const [entryType, setEntryType] = useState<EntryType>("HealthCheck");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState(0);
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState("");
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState("");
  const [error, setError] = useState<string | null>(null);

  const getCreateEntryArgs  = () : EntryFormValues => {
    const baseEntryArgs = {
      description, date, specialist,
      diagnosisCodes: diagnosisCodes.split(",").map(code => code.trim()).filter(code => code !== "")
    };
    switch (entryType) {
      case "HealthCheck":
        return { ...baseEntryArgs, type: "HealthCheck", healthCheckRating };
      case "Hospital":
        return { ...baseEntryArgs, type: "Hospital", discharge:  { date: dischargeDate, criteria: dischargeCriteria }};
      case "OccupationalHealthcare":
        if (sickLeaveStartDate && sickLeaveEndDate) {
          return { ...baseEntryArgs, type: "OccupationalHealthcare", employerName, sickLeave: { startDate: sickLeaveStartDate, endDate: sickLeaveEndDate }};
        } else {
          return { ...baseEntryArgs, type: "OccupationalHealthcare", employerName };
        }
      default:
        throw new Error("Unsupported entry type");
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const entryArgs = getCreateEntryArgs();
    try {
      const addedEntry = await patientService.addEntry(patientId, entryArgs);
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
      setDiagnosisCodes("");
      setHealthCheckRating(0);
      setDischargeDate("");
      setDischargeCriteria("");
      setEmployerName("");
      setSickLeaveStartDate("");
      setSickLeaveEndDate("");
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

  const HealthCheckFields = (
    <div style={{ marginBottom: '1em' }}>
      <InputLabel id="healthCheckRating">Health check rating</InputLabel>
      <Select
        id="healthCheckRating"
        defaultValue={0}
        onChange={(e) => setHealthCheckRating(Number(e.target.value))}
        fullWidth
      >
        <MenuItem value={0}>Healthy</MenuItem>
        <MenuItem value={1}>Low risk</MenuItem>
        <MenuItem value={2}>High risk</MenuItem>
        <MenuItem value={3}>Critical risk</MenuItem>
      </Select>
    </div>
  );

  const HospitalFields = (
    <div>
      <div style={{ marginBottom: '1em' }}>
        <TextField
          label="Discharge date"
          id="dischargeDate"
          placeholder="YYYY-MM-DD"
          fullWidth
          value={dischargeDate}
          onChange={(e) => setDischargeDate(e.target.value)}
        />
      </div>
      <div style={{ marginBottom: '1em' }}>
        <TextField
          label="Discharge criteria"
          id="dischargeCriteria"
          value={dischargeCriteria}
          onChange={(e) => setDischargeCriteria(e.target.value)}
          fullWidth
          margin="normal"
        />
      </div>
    </div>
  );

  const OccupationalHealthcareFields = (
    <div>
      <div style={{ marginBottom: '1em' }}>
        <TextField
          label="Employer name"
          id="employerName"
          value={employerName}
          onChange={(e) => setEmployerName(e.target.value)}
          fullWidth
          margin="normal"
        />
      </div>
      <div style={{ marginBottom: '1em' }}>
        <TextField
          label="Sick leave start date"
          id="sickLeaveStartDate"
          placeholder="YYYY-MM-DD"
          fullWidth
          value={sickLeaveStartDate}
          onChange={(e) => setSickLeaveStartDate(e.target.value)}
        />
      </div>
      <div style={{ marginBottom: '1em' }}>
        <TextField
          label="Sick leave end date"
          id="sickLeaveEndDate"
          placeholder="YYYY-MM-DD"
          fullWidth
          value={sickLeaveEndDate}
          onChange={(e) => setSickLeaveEndDate(e.target.value)}
        />
      </div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h6" sx={{marginBottom: '1em' }}>Add new entry</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <div style={{ marginBottom: '1em' }}>
        <TextField
          label="Description"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          margin="normal"
        />
      </div>
      <div style={{ marginBottom: '1em' }}>
        <TextField
          label="Date"
          id="date"
          placeholder="YYYY-MM-DD"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
      </div>
      <div style={{ marginBottom: '1em' }}>
        <TextField
          label="Specialist"
          id="specialist"
          value={specialist}
          onChange={(e) => setSpecialist(e.target.value)}
          fullWidth
          margin="normal"
        />
      </div>
      <div style={{ marginBottom: '1em' }}>
        <TextField
          label="Diagnosis codes (comma separated)"
          id="diagnosisCodes"
          value={diagnosisCodes}
          onChange={(e) => setDiagnosisCodes(e.target.value)}
          fullWidth
          margin="normal"
        />
      </div>
      <div style={{ marginBottom: '1em' }}>
        <InputLabel id="entryType">Entry type</InputLabel>
        <Select
          id="entryType"
          defaultValue="HealthCheck"
          onChange={(e) => setEntryType(e.target.value as EntryType)}
          fullWidth
        >
          <MenuItem value="HealthCheck">Health check</MenuItem>
          <MenuItem value="Hospital">Hospital</MenuItem>
          <MenuItem value="OccupationalHealthcare">Occupational healthcare</MenuItem>
        </Select>
      </div>
      {entryType === "HealthCheck" && HealthCheckFields}
      {entryType === "Hospital" && HospitalFields}
      {entryType === "OccupationalHealthcare" && OccupationalHealthcareFields}
      <Button type="submit" variant="contained" color="primary" sx={{ marginTop: '1em', marginBottom: '2em' }}>
        Create entry
      </Button>
    </form>
  );
};

export default NewEntryForm;
