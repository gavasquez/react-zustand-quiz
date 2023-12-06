import { Button } from "@mui/material";
import { useQuestionsStore } from './store/questions';

const LIMIT_QUESTIONS = 10;
export const Start = () => {
  const fecthQuestions = useQuestionsStore( state => state.fecthQuestions );


  const handleClick = () => {
    fecthQuestions( LIMIT_QUESTIONS );
  };

  return (
    <Button onClick={ handleClick } variant='contained'>
      !Empezar!
    </Button>
  );
};