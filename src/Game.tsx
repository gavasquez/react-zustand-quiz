import { IconButton, Card, Typography, List, ListItem, ListItemButton, ListItemText, Stack } from "@mui/material";
import { useQuestionsStore } from './store/questions';
import { type Question as QuestionType } from './types';
import SyntaxHighlighter from "react-syntax-highlighter";
import { gradientDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';
import { Footer } from './Footer';


const getBackgroundColor = ( info: QuestionType, index: number ) => {
  const { userSelectedAnswer, correctAnswer } = info;

  // usuario no ha seleccionado nada todavia
  if ( userSelectedAnswer == null ) return 'transparent';
  // Si ya selecciono pero la solución es incorrecta
  if ( index !== correctAnswer && index !== userSelectedAnswer ) return 'transparent';
  // Si es la solución correcta
  if ( index === correctAnswer ) return 'green';
  // Si esta es la seleccion del usuario pero no es correcta
  if ( index === userSelectedAnswer ) return 'red';
  // Si no es ninguna de las anteriores
  return 'transparent';
};

const Question = ( { info }: { info: QuestionType; } ) => {

  const selectAnswer = useQuestionsStore( state => state.selectAnswer );

  const handleClick = ( answerIndex: number ) => {
    selectAnswer( info.id, answerIndex );
  };


  return (
    <Card variant='outlined' sx={ { padding: 2, bgcolor: '#222', marginTop: 4 } }>
      <Typography variant='h5' textAlign='left' color='white'>
        { info.question }
      </Typography>
      <SyntaxHighlighter language='javascript' style={ gradientDark }>
        { info.code }
      </SyntaxHighlighter>

      {/* Lista de respuestas */ }
      <List sx={ { bgcolor: '#333' } } disablePadding>
        {
          info.answers.map( ( answer, index ) => (
            <ListItem key={ index } disablePadding divider>
              <ListItemButton sx={ {
                backgroundColor: getBackgroundColor( info, index )
              } }
                disabled={ info.userSelectedAnswer != null }
                onClick={ () => handleClick( index ) }>
                <ListItemText primary={ answer } sx={ { textAlign: 'center' } } />
              </ListItemButton>
            </ListItem>
          ) )
        }
      </List>
    </Card>
  );
};

export const Game = () => {

  const questions = useQuestionsStore( state => state.questions );
  const currentQuestion = useQuestionsStore( state => state.currentQuestion );
  const questionInfo = questions[ currentQuestion ];


  const goNextQuestion = useQuestionsStore( state => state.goNextQuestion );
  const goPreviousQuestion = useQuestionsStore( state => state.goPreviousQuestion );


  return (
    <>
      <Stack direction='row' gap={ 2 } alignItems='center' justifyContent='center'>
        <IconButton onClick={ goPreviousQuestion } disabled={ currentQuestion === 0 }>
          <ArrowBackIosNew />
        </IconButton>
        { currentQuestion + 1 } / { questions.length }
        <IconButton onClick={ goNextQuestion } disabled={ currentQuestion > questions.length - 1 }>
          <ArrowForwardIos />
        </IconButton>
      </Stack>
      <Question info={ questionInfo } />
      <Footer />
    </>
  );
};