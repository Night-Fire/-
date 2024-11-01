interface ProblemRange {
  min: number;
  max: number;
}

const RANGES: Record<string, ProblemRange> = {
  addition: { min: 1, max: 20 },
  subtraction: { min: 1, max: 20 },
  multiplication: { min: 1, max: 10 }
};

export interface Problem {
  expression: string;
  correctAnswer: number;
  answers: number[];
}

const generateRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateWrongAnswers = (correctAnswer: number, range: ProblemRange): number[] => {
  const answers = new Set<number>();
  answers.add(correctAnswer);

  while (answers.size < 4) {
    let wrongAnswer = correctAnswer;
    
    // Generate wrong answer within ±5 of correct answer, but within problem range
    const offset = generateRandomNumber(-5, 5);
    wrongAnswer = correctAnswer + offset;
    
    // Ensure wrong answer is within valid range
    if (wrongAnswer >= range.min && 
        wrongAnswer <= range.max * 2 && // Allow up to double the max for results
        wrongAnswer !== correctAnswer) {
      answers.add(wrongAnswer);
    }
  }

  return Array.from(answers).sort(() => Math.random() - 0.5);
};

export const generateProblem = (usedProblems: Set<string>): Problem => {
  let problem: Problem;
  let expression: string;
  
  do {
    const operation = Math.random() < 0.7 
      ? (Math.random() < 0.5 ? 'addition' : 'subtraction')
      : 'multiplication';
    
    const range = RANGES[operation];
    let num1: number, num2: number, answer: number;

    switch (operation) {
      case 'addition':
        num1 = generateRandomNumber(range.min, range.max);
        num2 = generateRandomNumber(range.min, range.max);
        answer = num1 + num2;
        expression = `${num1} + ${num2}`;
        break;
      
      case 'subtraction':
        num1 = generateRandomNumber(range.min, range.max);
        num2 = generateRandomNumber(range.min, num1); // Ensure positive result
        answer = num1 - num2;
        expression = `${num1} - ${num2}`;
        break;
      
      case 'multiplication':
        num1 = generateRandomNumber(range.min, range.max);
        num2 = generateRandomNumber(range.min, range.max);
        answer = num1 * num2;
        expression = `${num1} × ${num2}`;
        break;
      
      default:
        throw new Error('Invalid operation');
    }

    problem = {
      expression,
      correctAnswer: answer,
      answers: generateWrongAnswers(answer, range)
    };
  } while (usedProblems.has(problem.expression));

  return problem;
};