interface ExerciseValues {
    dailyHrs: number[],
    target: number
}

interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

// calculates average time of daily exercise, compares it to a target amount and returns Result object
export const calculateExercises = (dailyHrs: number[], target: number): Result => {
    const periodLength: number = dailyHrs.length;
    let trainingDays: number = 0;
    let totalHrs: number = 0;
    for (const entry of dailyHrs) {
        totalHrs += entry;
        if (entry > 0) {
            ++trainingDays;
        }
    }
    const average: number = totalHrs / periodLength;
    const success: boolean = average >= target;
    let rating: number;
    let ratingDescription: string;
    if (success) {
        rating = 3;
        ratingDescription = "you met your target: well done";
    }
    else if (average >= (target / 2)) {
        rating = 2;
        ratingDescription = "not too bad but could be better";
    }
    else {
        rating = 1;
        ratingDescription = "not good, you should do better!";
    }
    return { periodLength, trainingDays, success, rating, ratingDescription, target, average };
};

const parseExerciseArguments = (args: string[]): ExerciseValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    let target: number;
    const dailyHrs: number[] = [];
    if (isNaN(Number(args[2]))) {
        throw new Error('Provided values were not numbers!');
    }
    else {
        target = Number(args[2]);
    }
    for (let i = 3; i < args.length; ++i) {
        if (isNaN(Number(args[i]))) {
            throw new Error('Provided values were not numbers!');
        }
        else {
            dailyHrs.push(Number(args[i]));
        }
    }
    return { dailyHrs, target };
};

if (process.argv[1] === import.meta.filename) {
    // do not run this code if the module is imported
    try {
        const { dailyHrs, target } = parseExerciseArguments(process.argv);
        console.log(calculateExercises(dailyHrs, target));
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong: ';
        if (error instanceof Error) {
            errorMessage += error.message;
        }
        console.log(errorMessage);
    }
}


