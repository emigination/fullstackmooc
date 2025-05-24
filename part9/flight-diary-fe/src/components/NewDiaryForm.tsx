import { useState } from 'react';
import { createDiary } from '../services/diaryService';
import { ErrorMessage, Weather, Visibility } from '../types';
import NotificationSection from './NotificationSection';

interface NewDiaryFormProps {
  fetchDiaries: () => Promise<void>;
}

export const NewDiaryForm = ({ fetchDiaries }: NewDiaryFormProps) => {
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState<Weather | ''>('');
  const [visibility, setVisibility] = useState<Visibility | ''>('');
  const [comment, setComment] = useState('');
  const [errors, setErrors] = useState<ErrorMessage[]>([]);


  const addError = (error: ErrorMessage) => {
    setErrors((previousErrors) => [error, ...previousErrors]);
    setTimeout(() => {
      setErrors((previousErrors) => previousErrors.filter((e) => e !== error));
    }, 7000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const createDiaryResult = await createDiary({ date, weather, visibility, comment });
    if ('error' in createDiaryResult) {
      addError(createDiaryResult);
      return;
    }
    setErrors([]);
    fetchDiaries();
    setDate('');
    setWeather('');
    setVisibility('');
    setComment('');
  };

  const weatherOptions: Weather[] = ['sunny', 'rainy', 'cloudy', 'stormy', 'windy'];
  const visibilityOptions: Visibility[] = ['great', 'good', 'ok', 'poor'];

  return (
    <>
      <h2>Create a new diary entry</h2>
      <NotificationSection errors={errors} />
      <form onSubmit={handleSubmit}>
        <p>
          <label>Date </label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </p>
        <p>
          <label>Weather: </label>
          {weatherOptions.map((weatherName) => (
            <span key={weatherName}>
              <input
                type="radio"
                value={weatherName}
                checked={weather === weatherName}
                onChange={() => setWeather(weatherName)}
              />
              {weatherName}
            </span>
          ))}
        </p>
        <p>
          <label>Visibility: </label>
          {visibilityOptions.map((visibilityName) => (
            <span key={visibilityName}>
              <input
                type="radio"
                value={visibilityName}
                checked={visibility === visibilityName}
                onChange={() =>  setVisibility(visibilityName) }
              />
              {visibilityName}
            </span>
          ))}
        </p>
        <p>
          <label>Comment </label>
          <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} />
        </p>
        <p>
          <button type="submit">Create</button>
        </p>
      </form>
    </>
  );
}
