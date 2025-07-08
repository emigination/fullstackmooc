import diagnosisData from '../../data/diagnoses';
import { Diagnosis } from '../types';

const getDiagnoses = () => {
  return diagnosisData as Diagnosis[];
};

export {
  getDiagnoses,
};
