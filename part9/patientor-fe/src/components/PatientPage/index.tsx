import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { Typography } from '@mui/material';

import { Diagnosis, Patient } from "../../types";
import patientService from "../../services/patients";
import { formatDate } from "../../utils";
import EntryList from "./EntryList";
import NewEntryForm from "./NewEntryForm";

const PatientPage: React.FC<{ diagnosesMap: Record<string, Diagnosis> }>  = ({ diagnosesMap }) => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState<boolean>(true);
  const [patient, setPatient] = useState<Patient | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setPatient(null);
      setLoading(false);
      return;
    }
    const fetchPatient = async () => {
      try {
        const fetchedPatient = await patientService.getById(id);
        setPatient(fetchedPatient);
      } catch (e: unknown) {
        setPatient(null);
        if (axios.isAxiosError(e) && e?.response?.data && typeof e.response.data === "string") {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          setError(message);
          console.error(message);
        } else {
          setError("Unknown error");
          console.error("Unknown error", e);
        }
      }
    };
    void fetchPatient();
    setLoading(false);
  }, [id]);

  if (!patient && !loading) {
    return (
      <Typography variant="h5" sx={{ paddingTop: '1em' }}>{ error || 'Patient not found'}</Typography>
    );
  }

  return (
    patient && <div>
      <Typography variant="h4" sx={{ paddingBottom: '1em', paddingTop: '1em' }}>{patient.name}</Typography>
      <table>
        <tbody>
          <tr>
            <td><Typography variant="subtitle2" sx={{ paddingRight: '1em' }}>Date of birth</Typography></td>
            <td><Typography>{formatDate(patient.dateOfBirth)}</Typography></td>
          </tr>
          <tr>
            <td><Typography variant="subtitle2">SSN</Typography></td>
            <td><Typography>{patient.ssn}</Typography></td>
          </tr>
          <tr>
            <td><Typography variant="subtitle2">Gender</Typography></td>
            <td><Typography>{patient.gender}</Typography></td>
          </tr>
          <tr>
            <td><Typography variant="subtitle2">Occupation</Typography></td>
            <td><Typography>{patient.occupation}</Typography></td>
          </tr>
        </tbody>
      </table>
      <Typography variant="h5" sx={{ paddingBottom: '1em', paddingTop: '1em' }}>Entries</Typography>
      <NewEntryForm patientId={patient.id} setPatient={setPatient}/>
      <EntryList entries={patient.entries} diagnosesMap={diagnosesMap} />
    </div>
  );
};

export default PatientPage;
