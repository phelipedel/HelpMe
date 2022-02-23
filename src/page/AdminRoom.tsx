
import { FormEvent, useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/button';
import { Question } from '../components/Questions';
import { RoomCode } from '../components/RoomCode';
//import { useAuth } from '../hooks/useAuth';
import { useRoom } from '../hooks/useRoom';
import database from '../services/firebase';
import '../styles/room.scss';
import deleteImg from '../assets/images/delete.svg';
import chekImg from '../assets/images/check.svg';
import answerImg from '../assets/images/answer.svg';

  
type RoomParams = {
    id: string;
  }
  
  export function AdminRoom() {
    //const { user } = useAuth();
    const params = useParams<RoomParams>();
    const [newQuestion, setNewQuestion] = useState('');
    const roomId = params.id;
    const navigate = useNavigate();
    const { title, questions } = useRoom(String(params.id));

    
  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    })

    navigate('/')
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm('Tem certeza que você deseja excluir esta pergunta?')) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }

  async function handleCheckQuestionAsAnswer(questionId: string){
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
      
    });
  }

  async function handleHighlightQuestion(questionId: string){
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true,
    });
  }


     return (
         <div id="page-room">
             <header>
                 <div className="content">
                     <a href="/"><img src={logoImg} alt="logo" /></a>
                    
                    <div>
                    <RoomCode code={String(params.id)} />
                    
                     <Button isOutlined >Encerrar Sala</Button>
                    </div>
                 </div>
             </header>
        
             <main className='content'>
                    <div className="room-title">
                        
                    <h1>Sala {title}</h1>

                        { questions.length > 0 && <span>{questions.length} perguntas</span>}
                    </div>
                        
                    <div className="question-list">
          {questions.map(question => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
                isHighlighted={question.isHighlighted}
                isAnswered={question.isAnswered}
              >
                                <button
                  type="button"
                  onClick={() => handleCheckQuestionAsAnswer(question.id)}
                >
                  <img src={chekImg} alt="Marcar pergunta como respondida" />
                </button>

                <button
                  type="button"
                  onClick={() => handleHighlightQuestion(question.id)}
                >
                  <img src={answerImg} alt="Destacar perguntar" />
                </button>

                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <img src={deleteImg} alt="Remover pergunta" />
                </button>
              </Question>
            );
          })}
        </div>
      </main>
    </div>
  );
}



// disabled={!user} para caso o usuario nao esteja autenticado