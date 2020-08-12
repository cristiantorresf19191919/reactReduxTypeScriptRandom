import { Dispatch } from "react";
import { AnyAction } from "redux";
import { typedAction } from '../helpers';
import axios from 'axios';


const servidor = "https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean";

const initialState: QuizState = {
    questions: [],
    loading: true,
    score: 0,    
    percentage:0,
    questionsReview:[]
}

const loadScore = (score:number) =>{
    return typedAction("quiz/LOAD_SCORE",score);
}

export const addQuestion = (question:Question,score:number) => {    
    return typedAction("quiz/ADD_QUESTION",{question,score});
}

const loadQuestion = (question:Array<Question>) =>{
    return typedAction("quiz/LOAD_QUESTIONS",question);
} 

const errorQuestion = () => {
    return typedAction("quiz/ERROR_QUESTION");
}

export const reset = () => {
    return typedAction("quiz/reset");
}

export const loadQuestions = () => async (dispatch:Dispatch<AnyAction>) => {
    try{
        
        const questions =  (await axios.get(servidor)).data.results as Question[];
        dispatch(loadQuestion(questions));

    }catch(error){
        console.log(error);
        
        dispatch(errorQuestion());
    }

}

type QuizAction = ReturnType<typeof addQuestion | typeof loadQuestion | typeof errorQuestion | typeof loadScore | typeof reset >

export function quizReducer(
    state = initialState,
    action: QuizAction
):QuizState {
    switch(action.type){
         case "quiz/LOAD_QUESTIONS":
             return {
                 ...state,
                 questions:[...action.payload]
             };
        case "quiz/ADD_QUESTION":
                return {
                    ...state,
                    questions:[...state.questions],
                    questionsReview:[...state.questionsReview, action.payload.question],                    
                    loading:false,
                    score: state.score + action.payload.score
                };
        case "quiz/LOAD_SCORE":
            return {
                ...state,
                score: action.payload
            };
     
        case "quiz/ERROR_QUESTION":
            return {
                ...state,
                loading:false
            };
        case "quiz/reset":
            return {
                ...state,
                questionsReview: [],
                score:0                
            }
        default: 
            return state;

    }

}
