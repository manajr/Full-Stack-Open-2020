interface bmiEntries {
 height: number;
 weight: number;
}

const parseArguments = (args: Array<string>): bmiEntries => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if(!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
      }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

const bmiCalculator = (height: number, weight: number): string => {
  const bmi: number = weight/Math.pow(height/100, 2);
  if(bmi < 17) return 'Not Normal (weight much lower than expected)'
  else if(bmi >= 17 && bmi <= 18.49) return 'Not Normal (weight lower than expected)'
  else if(bmi >= 18.50 && bmi <= 24.99) return 'Normal (healthy weight)'
  else if(bmi >= 25 && bmi <= 29.99) return 'Not Normal (weight greater than expected)'
  else if(bmi >= 30 && bmi <= 34.99) return 'Not Normal (Obesity type I)'
  else if(bmi >= 35 && bmi <= 39.99) return 'Not Normal (Obesity type II)'
  else if(bmi >= 40) return 'Not Normal (Obesity type III)'
  else throw new Error('Wrong values')
}

try {
  const {height, weight } = parseArguments(process.argv);
  console.log(bmiCalculator(height, weight));
} catch (e) {
  console.log('Error, something bad happened, message:', e.message);
}