import React, {useState, useEffect } from "react";
import { connect } from "react-redux";
import { RootState } from "../redux/index";
import { Dispatch, bindActionCreators } from "redux";
import { addQuestion } from "../redux/modules/quiz";
import { Paper, Button } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

import { checkScore } from "../helpers/getScore";
import { withRouter, RouteComponentProps } from 'react-router';

const mapStateToProps = (state: RootState) => ({
  loading: state.quiz.loading,
  questionsReview :  state.quiz.questionsReview
});

type props = {
  question: Question;
  pageNumber: number;
  totalQuestions: number;
  handler: (questionNumber: number) => void;
  questions: Question[];  
};

interface Routing {
    history:any;
}



const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ addQuestion }, dispatch);

type Props = ReturnType<typeof mapStateToProps> &
  props &
  ReturnType<typeof mapDispatchToProps> & RouteComponentProps<Routing>;

const QuestionItemUnconnected: React.FC<Props> = ({
  loading,
  question,
  pageNumber,
  addQuestion,
  questions,
  totalQuestions,
  handler,
  history,
  questionsReview
  
}) => {
  useEffect(() => {

  

    if (pageNumber + 1 > totalQuestions && totalQuestions !== 0) {
     
      history.push({
        pathname:"/final",
        state: {totalQuestions}
    })
    }
    console.log(questions);
  }, [questions,pageNumber,totalQuestions]);

  const [questionNumberFixed, setQuestionNumber] = useState(pageNumber + 1);

  const SendQuestion = (event: any) => {
    const value = event.currentTarget.innerText as string;
    const camelCase =
      value[0] + (value.slice(1, value.length) as string).toLowerCase();
    const score = checkScore(question, camelCase);
    if (score){
        question.correct_answer = "True";        
    } else {
        question.correct_answer = "False";        
    }
    addQuestion(question, score);
    
    setQuestionNumber(questionNumberFixed + 1);
    handler(questionNumberFixed);
    if (questionNumberFixed > totalQuestions && totalQuestions !== 0) {       
        // any ???
        history.push({
            pathname:"/final",
            state: {totalQuestions}
        });
      }
    
  };

  return (
    <>
      <Paper elevation={4} variant="outlined" className="paper-customized">
        <div>
          <Typography variant="h4">{question && question.category}</Typography>
        </div>

        <div>
          <Typography variant="h5" className="questiontext-card">
            {question && question.question}{" "}
          </Typography>
        </div>
        <div>
          <Typography variant="h5">
            {questionNumberFixed} of {questions.length}
          </Typography>
        </div>
        <div>
          <p>respuesta deseada {question && question.correct_answer}</p>
        </div>
        <div className="buttons-container">
          <Button
            variant="contained"
            color="secondary"
            onClick={(e) => SendQuestion(e)}
          >
            
            False
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => SendQuestion(e)}
          >
            True
          </Button>
        </div>
      </Paper>
    </>
  );
};

export const QuestionItems = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(QuestionItemUnconnected));
