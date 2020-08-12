import { combineReducers } from "redux";
import { quizReducer } from './modules/quiz';



export const rootReducer = combineReducers({
    quiz: quizReducer
})

export type RootState = ReturnType<typeof rootReducer>;