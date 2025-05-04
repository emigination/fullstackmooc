import { isNumber } from "./numberValidator";

const validateExerciseArguments = (args: string[]): string[] => {
  const errors: string[] = [];
  if (args.length < 4) {
    errors.push("not enough arguments");
  } else {
    if (!isNumber(args[2])) errors.push("target is not a number");
    for (let i = 3; i < args.length; i++) {
      if (!isNumber(args[i])) errors.push(`hours for day ${i-2} is not a number`);
    }
  }

  return errors;
};

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
    rating = 3;
  } else if (average > 0.75 * target) {
    rating = 2;
  };
  let ratingDescription: string;
  switch(rating) {
    case 1:
      ratingDescription = "There is room for improvement";
      break;
    case 2:
      ratingDescription = "Almost there";
      break;
    case 3:
      ratingDescription = "Well done";
      break;
    default:
      ratingDescription = "";
      break;
  };

  return {
    periodLength: nOfDays, trainingDays: nOfTrainingDays, success: average >= target,
    rating, ratingDescription, target, average
  };
};

if (require.main === module) {
  const argumentValidationErrors: string[] = validateExerciseArguments(process.argv);
  if (argumentValidationErrors.length > 0) {
    console.log("Error: ", argumentValidationErrors.join(", "));
    process.exit(1);
  }

  const target: number = Number(process.argv[2]);
  const hours: number[] = process.argv.slice(3).map(hoursString => Number(hoursString));
  console.log(calculateExercises(hours, target));
}

export default calculateExercises;
