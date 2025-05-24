import axios from 'axios';
import { Diary, NewDiary, ErrorMessage } from '../types';

const baseUrl = 'http://localhost:3000/api/diaries'

export const getDiaries = async (): Promise<Diary[]> => {
  const response = await axios.get<Diary[]>(baseUrl);
  return response.data;
}

export const createDiary = async (newDiary: NewDiary): Promise<Diary | ErrorMessage> => {
  try {
    const response = await axios.post<Diary>(baseUrl, newDiary);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { error: error.response?.data || 'An error occurred while creating the diary entry.'};
    } else {
      return { error: 'An unexpected error occurred.' };
    }
  }
}

