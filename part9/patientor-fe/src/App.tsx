import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { fi } from 'date-fns/locale';


import { apiBaseUrl } from "./constants";
import { Diagnosis, Patient } from "./types";

import patientService from "./services/patients";
import diagnosisService from "./services/diagnoses";
import PatientListPage from "./components/PatientListPage";
import PatientPage from "./components/PatientPage";

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [diagnosesMap, setDiagnosesMap] = useState<Record<string, Diagnosis>>({});

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };
    void fetchPatientList();

    const fetchDiagnoses = async () => {
      const diagnoses = await diagnosisService.getAll();
      const diagnosesMap: Record<string, Diagnosis> = diagnoses.reduce((acc, diagnosis) => {
        acc[diagnosis.code] = diagnosis;
        return acc;
      }, {} as Record<string, Diagnosis>);
      setDiagnosesMap(diagnosesMap);
    };
    void fetchDiagnoses();
  }, []);

  return (
    <div className="App">
      <Router>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fi}>
          <Container>
            <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
              Patientor
            </Typography>
            <Button component={Link} to="/" variant="contained" color="primary">
              Home
            </Button>
            <Divider hidden />
            <Routes>
              <Route path="/" element={<PatientListPage patients={patients} setPatients={setPatients} />} />
              <Route path="/patients/:id" element={<PatientPage diagnosesMap={diagnosesMap}/>} />
            </Routes>
          </Container>
        </LocalizationProvider>
      </Router>
    </div>
  );
};

export default App;
