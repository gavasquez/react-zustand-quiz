import { create } from 'zustand';
import { type Question } from '../types';
import confetti from "canvas-confetti";
import { persist, devtools } from 'zustand/middleware';
import { getAllQuestons } from '../services/questions';

interface State {
  questions: Question[],
  currentQuestion: number,
  fecthQuestions: ( limit: number ) => Promise<void>,
  selectAnswer: ( questionId: number, answerIndex: number ) => void,
  goNextQuestion: () => void,
  goPreviousQuestion: () => void,
  reset: () => void,
}

export const useQuestionsStore = create<State>()(
  devtools(
    persist( ( set, get ) => {
      return {
        questions: [],
        currentQuestion: 0, // Posicion del array de questions
        fecthQuestions: async ( limit: number ) => {
          const json = await getAllQuestons();
          //* Sort para desordenar la data y el slice para devolver mediante el limit que se le envie
          const questions = json.sort( () => Math.random() - 0.5 ).slice( 0, limit );
          set( { questions }, false, 'FECTH_QUESTIONS' );
        },
        selectAnswer: ( questionId: number, answerIndex: number ) => {
          const { questions } = get();
          // Usamos structuredClone para clonar el objeto
          const newQuestions = structuredClone( questions );
          // Tenemos que buscar la pregunta por el id   
          // Buscamos el indice de esa pregunta
          const questionIndex = newQuestions.findIndex( q => q.id === questionId );
          // ya cuando tenemos el index recuperamos la información
          const questionInfo = newQuestions[ questionIndex ];
          // Averiguamos si el usuario a seleccionado la respueta correcta
          const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex;
          if ( isCorrectUserAnswer ) confetti();
          // Cambiar la información en la copia de la pregunta
          newQuestions[ questionIndex ] = {
            ...questionInfo,
            isCorrectUserAnswer,
            userSelectedAnswer: answerIndex
          };
          // Actualizar el estado
          set( {
            questions: newQuestions
          }, false, 'questions' );
        },
        goNextQuestion: () => {
          const { questions, currentQuestion } = get();
          const nextQuestion = currentQuestion + 1;
          if ( nextQuestion < questions.length ) {
            set( {
              currentQuestion: nextQuestion
            }, false, 'goNextQuestion' );
          }
        },
        goPreviousQuestion: () => {
          const { currentQuestion } = get();
          const previousQuestion = currentQuestion - 1;
          if ( previousQuestion >= 0 ) {
            set( {
              currentQuestion: previousQuestion
            }, false, 'goPreviousQuestion' );
          }
        },
        reset: () => {
          set( {
            questions: [],
            currentQuestion: 0
          }, false, 'RESET' );
        }
      };
    }, {
      name: 'questions',
    } ) ) );