export interface Diary {
  id: number;
  date: string;
  weather: string;
  visibility: string;
}

export interface NewDiary {
  date: string;
  weather: string;
  visibility: string;
  comment: string;
}

export interface ErrorMessage {
  error: string;
}

export type Weather = 'sunny' | 'rainy' | 'cloudy' | 'stormy' | 'windy';

export type Visibility = 'great' | 'good' | 'ok' | 'poor';
