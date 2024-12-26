interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean,
  rating: number;
  ratingDescription: string,
  target: number;
  average: number;
};

const calculateExercises = (dailyExerciseHours: number[], target: number): Result => {
  const nOfDays: number = dailyExerciseHours.length;
  const average: number = dailyExerciseHours.reduce((hours, sum) => sum + hours) / nOfDays;
  const nOfTrainingDays: number = dailyExerciseHours.reduce((count, hours) => hours > 0 ? count + 1 : count, 0);
  let rating: number = 1;
  if (average >= target) {
    rating = 3
  } else if (average > 0.75 * target) {
    rating = 2
  };
  let ratingDescription: string;
  switch(rating) {
    case 1:
      ratingDescription = "There is room for improvement";
    case 2:
      ratingDescription = "Almost there";
    case 3:
      ratingDescription = "Well done";
  };

  return {
    periodLength: nOfDays, trainingDays: nOfTrainingDays, success: average >= target,
    rating, ratingDescription, target, average
  };
};

console.log(calculateExercises([1, 2, 3, 0, 4], 2))
