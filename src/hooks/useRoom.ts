import { useEffect, useState } from "react";
import database from "../services/firebase";
import { useAuth } from "./useAuth";

type FirebaseQuestions = Record<string, {
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
  likes: Record<string, { 
    autorId: string;
  }>;
  
}>

type Questiontype = {
    id: string;
    author: {
      name: string;
      avatar: string;
      
    }
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
    likeCount: number;
    likeId: string | undefined;
  }
  
  type RoomParams = {
    id: string;

  }


export function useRoom(roomId: string) {
    const { user } = useAuth();
    const [questions, setQuestions] = useState<Questiontype[]>([])
    const [title, setTitle] = useState('');

    useEffect(() => {
        const roomRef = database.ref(`rooms/${roomId}`);
    
      roomRef.on('value', room => {
          const databaseRoom = room.val();
          const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};
    
          const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
            return {
              id: key,
              content: value.content,
              author: value.author,
              isHighlighted: value.isHighlighted,
              isAnswered: value.isAnswered,
              likeCount: Object.values(value.likes ?? {}).length,
              likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.autorId === user?.id)?.[0], // eslint-disable-line
            }
          })

          setTitle(databaseRoom.title);
          setQuestions(parsedQuestions);
        })

        return () => {
          roomRef.off('value');
        }
      },  [roomId, user?.id]); 
  
      return{questions, title}
}