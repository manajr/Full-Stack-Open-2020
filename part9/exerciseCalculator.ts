interface exerciseResult {
  daysNumber: number,
  daysTrainingNumber: number,
  targetValue: number,
  averageTime: number,
  isTargetReached: boolean,
  rating: number,
  info: string,
}

interface argsValues {
  exercises: Array<number>,
  target: number
}

const parseArgument = (args: Array<string>): argsValues => {
  if(Number(args[2]) > 3 || Number(args[2]) < 1) throw new Error('The target number must be between 1 and 3')
  const arrayToObject = args.slice(3).map(val => Number(val))

  return {
    exercises: arrayToObject,
    target: Number(args[2])
  }
}

const calculateExercises = (exercises: Array<number>, target: number): exerciseResult => {
  const sumArrayValues = (prev:number, iter:number) => {
      return prev + iter
  }

  const average = exercises.reduce(sumArrayValues)/exercises.length;
  
  return {
  daysNumber: exercises.length,
  daysTrainingNumber: exercises.filter(day => day !== 0).length,
  targetValue: target,
  averageTime: average,
  isTargetReached: target > average,
  rating: Math.round(average),
  info: `The rating ${Math.round(average)} is calculated based on the next closer value of the average`,
  }
}

try{
  const {exercises, target } = parseArgument(process.argv);
  console.log(calculateExercises(exercises, target));
} catch(e) {
  console.log('The following error was reached:', e.message)
}