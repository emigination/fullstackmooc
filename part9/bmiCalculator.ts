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

console.log(calculateBmi(160, 50));
