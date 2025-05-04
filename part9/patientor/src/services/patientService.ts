import patientData from '../../data/patients';
import { PatientWithoutSsn } from '../types';

const getEntries = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return patientData.map(({ ssn, ...rest }) => rest) as PatientWithoutSsn[];
};

export {
  getEntries,
};
