type Question = {
    category?:string;
    type?:string;
    difficulty?:string;
    question:string;
    correct_answer?:string;
    incorrect_answers?:Array<string>;
}

type QuizState = {
    score: number;
    questions: Question[];
    loading: boolean;
    percentage?:number;
    questionsReview:Question[];
}

