interface BmiValues {
    height: number;
    weight: number;
}

const parseBMIArguments = (args: string[]): BmiValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height: Number(args[2]),
            weight: Number(args[3])
        };
    }
    else {
        throw new Error('Provided values were not numbers!');
    }
};


// Calculates a BMI value based on a given height (in cm) and weight (in kg)
// Returns the range the BMI falls in
export const calculateBmi = (height: number, weight: number): string => {
    if (height === 0) {
        throw new Error("Can't divide by 0!");
    }
    else if (height < 0 || weight < 0) {
        throw new Error("Height and weight have to be positive!");
    }

    const bmi: number = (weight / ((height / 100) ** 2));
    if (bmi < 18.5) {
        return "Underweight";
    }
    if (bmi < 25) {
        return "Normal range";
    }
    if (bmi < 30) {
        return "Overweight";
    }
    else {
        return "Obese";
    }
};

if (process.argv[1] === import.meta.filename) {
    // do not run this code if the module is imported
    try {
        const { height, weight } = parseBMIArguments(process.argv);
        console.log(calculateBmi(height, weight));
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong: ';
        if (error instanceof Error) {
            errorMessage += error.message;
        }
        console.log(errorMessage);
    }
}

