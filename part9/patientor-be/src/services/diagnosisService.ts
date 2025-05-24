import diagnosisData from '../../data/diagnoses';
import { Diagnosis } from '../types';

const getEntries = () => {
  return diagnosisData as Diagnosis[];
};

export {
  getEntries,
};
