import React, { useEffect,useState } from "react";
import { connect } from "react-redux";
import { RootState } from "../redux/index";
import { Dispatch, bindActionCreators } from "redux";
import { reset } from "../redux/modules/quiz";
import { Paper, Button } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { withRouter, RouteComponentProps } from 'react-router';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import DoneOutlineRoundedIcon from '@material-ui/icons/DoneOutlineRounded';
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';
const mapStateToProps = (state: RootState) => ({
  questionsReview: state.quiz.questions,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ reset }, dispatch);

interface match {
  id: string;
  location:any;
  history:any; 
}  
type Props = RouteComponentProps<match> &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export const FinalUnconnected: React.FC<Props> = ({
  reset,
  questionsReview,
  location,
  history
}) => {
  useEffect(() => {

      if (questionsReview.length == 0){
          history.push("/");
      }


  }, [questionsReview]);
  const [rightAnsw, setRightAnsw] = useState(
    questionsReview.filter(question => question.correct_answer == "True")
  )
  const [wrongAnsw, setWrongtAnsw] = useState(
    questionsReview.filter(question => question.correct_answer == "False")
  );
  const [totalQuestions, setTotalQuestions] = useState(
    (location.state as any).totalQuestions
  );
  return (<>
   <Paper elevation={4} variant="outlined" className="paper-customized">
        <div className="final_title">
  <Typography variant="h4">Your Scored</Typography>
  <Typography variant="h4">{rightAnsw.length} / {totalQuestions && totalQuestions}</Typography>
        </div>

        <div className="resume-card">
  {questionsReview.map(question => (
      <>
      {question.correct_answer == "True" ? (
          <>
          <div className="success-chip">
          <DoneOutlineRoundedIcon fontSize="large" style={{color:"green", marginRight:"5%"}} />
           <Typography variant="h5">  {question.question} </Typography>
          </div>
           </>
      ) : (
        <>
        <div className="wrong-chip">
        <HighlightOffOutlinedIcon fontSize="large" style={{color:"red", marginRight:"5%"}}/> 
        <Typography variant="h5"> {question.question}  </Typography>

        </div>
        </>

      )}
      </>
  ))}
        </div>
        <div>
  <Typography variant="h5"> {}</Typography>
        </div>
     
        <div className="buttons-container">
      
          <Button
            variant="contained"
            color="primary"
            onClick={()=>{
                reset();
                history.push("/questions")
            }}
          >
            Start Again
          </Button>
        </div>
      </Paper>

     
  </>)
};

export const Final = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(FinalUnconnected));
