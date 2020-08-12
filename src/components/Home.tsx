import React, { useState,useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Paper, Button, Slide } from "@material-ui/core";
import { Link } from "react-router-dom";



export const Home = () => {

    const [leftAnimation, setAnimationLeft] = useState(false);
   

    useEffect(()=>{
        setTimeout(() => {            
            setAnimationLeft(true);
        }, 200);
    },[])   

  return (
    <>
      <CssBaseline />
      <Container maxWidth="md" className="home-container">

                
        <Slide direction="left" in={leftAnimation} mountOnEnter unmountOnExit>
          <Paper elevation={4} variant="outlined" className="paper-customized">
            <div style={{textAlign:"center"}}>
            <Typography variant="h4">
              Welcome to the Trivia Challenge!{" "}
            </Typography>

            </div>

            <div>

            <Typography variant="h5">
              You will be presented with 10 True or False questions.{" "}
            </Typography>
            </div>
            <div>
            <Typography variant="h5">Can you score 100%? </Typography>

            </div>
            <div>
            <Button variant="contained" color="primary" >
              <Link to="/questions" className="links" >Begin</Link>
            </Button>

            </div>
          </Paper>
        </Slide>
        
      </Container>
    </>
  );
};
