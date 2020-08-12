export const checkScore = (question:Question,response:string):number =>{
    
    const regex = /True/i;
    return regex.test((question.correct_answer) as string) === regex.test(response) ? 1 : 0; 

}

export const totalPercentage = (question:Question[],totalScore:number):number =>{
  const totalQuestions =  question.length;
  return (100 * totalScore)  / totalQuestions;
}

