import { isNumber } from "./numberValidator";

const validateBmiArguments = (args: string[]): string[] => {
  const errors: string[] = [];
  if (args.length < 4) {
    errors.push("not enough arguments");
  } else {
    if (!isNumber(args[2])) errors.push("height is not a number");
    if (!isNumber(args[3])) errors.push("mass is not a number");
  }

  return errors;
};

const calculateBmi = (height: number, mass: number): string => {
  const bmi: number = mass / (height / 100) ** 2;
  let result: string;
  if (bmi < 18.5) {
    result = "Underweight";
  } else if (bmi < 25) {
    result = "Normal range";
  } else if (bmi < 30) {
    result = "Overweight";
  } else {
    result = "Obese";
  }

  return result;
};

if (require.main === module) {
  const argumentValidationErrors: string[] = validateBmiArguments(process.argv);
  if (argumentValidationErrors.length > 0) {
    console.log("Error: ", argumentValidationErrors.join(", "));
    process.exit(1);
  }
  const height: number = Number(process.argv[2]);
  const mass: number = Number(process.argv[3]);
  console.log(calculateBmi(height, mass));
}

export default calculateBmi;
