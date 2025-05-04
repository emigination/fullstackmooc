import { useEffect, useState } from 'react';
import { getDiaries } from './services/diaryService';
import { Diary } from './types';

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  useEffect(() => {
    const fetchDiaries = async () => {
      const diariesData = await getDiaries();
      setDiaries(diariesData);
    };

    fetchDiaries();
  }, []);

  return (
    <div>
      <h1>Diary entries</h1>
      {diaries.map((diary) => (
        <div key={diary.id}>
          <h4>{diary.date}</h4>
          <p>Weather: {diary.weather}<br />Visibility: {diary.visibility}</p>
        </div>
      ))}
    </div>
  );
};

export default App;
