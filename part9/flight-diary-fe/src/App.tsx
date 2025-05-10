import { useEffect, useState } from 'react';
import { getDiaries } from './services/diaryService';
import { Diary } from './types';
import { NewDiaryForm } from './components/NewDiaryForm';

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const fetchDiaries = async () => {
    const diariesData = await getDiaries();
    setDiaries(diariesData);
  };
  useEffect(() => {
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
      <NewDiaryForm fetchDiaries={fetchDiaries}/>
    </div>
  );
};

export default App;
