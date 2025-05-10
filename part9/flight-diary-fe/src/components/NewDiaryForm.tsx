import { useState } from 'react';
import { createDiary } from '../services/diaryService';

interface NewDiaryFormProps {
  fetchDiaries: () => Promise<void>;
}

export const NewDiaryForm = ({ fetchDiaries }: NewDiaryFormProps) => {
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState('');
  const [visibility, setVisibility] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createDiary({ date, weather, visibility, comment });
    fetchDiaries();
    setDate('');
    setWeather('');
    setVisibility('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create a new diary entry</h2>
      <p>
        <label>Date </label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </p>
      <p>
        <label>Weather </label>
        <input type="text" value={weather} onChange={(e) => setWeather(e.target.value)} />
      </p>
      <p>
        <label>Visibility </label>
        <input type="text" value={visibility} onChange={(e) => setVisibility(e.target.value)} />
      </p>
      <p>
        <label>Comment </label>
        <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} />
      </p>
      <p>
        <button type="submit">Create</button>
      </p>
    </form>
  );
}
