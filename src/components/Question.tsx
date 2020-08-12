import React, { useEffect,useState } from "react";
import { connect } from "react-redux";
import { RootState } from "../redux/index";

import { Dispatch, bindActionCreators } from "redux";
import { loadQuestions } from "../redux/modules/quiz";
import { RouteComponentProps } from "react-router";

import { QuestionItems } from "./QuestionItem";
import { Container } from "@material-ui/core";


const mapStateToProps = (state: RootState) => ({
  questions: state.quiz.questions,
});
const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ loadQuestions }, dispatch);

interface match {
  id: string;
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  RouteComponentProps<match>;

const QuestionUnconnected: React.FC<Props> = ({
  loadQuestions,
  questions,
  match,
}) => {
  useEffect(() => {
    loadQuestions();
    
  }, [loadQuestions]);

  const [questionNumber,setQuestionNumber] = useState(0);

  const changeQuestionNumber = (questionNumber:number) =>{
    setQuestionNumber(questionNumber);
  }

  return (
    <>
      <Container maxWidth="md" className="home-container">
          {questions.length > 0 && (
                 <QuestionItems
                 key={new Date().getMilliseconds()}
                 question={questions[questionNumber]}
                 pageNumber={questionNumber}
                 totalQuestions={questions.length}
                 handler = {changeQuestionNumber}
                 questions={questions}
               />

          )}
     
      </Container>
    </>
  );
};

export const Questions = connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionUnconnected);
