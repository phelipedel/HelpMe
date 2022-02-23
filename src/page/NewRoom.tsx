import { Link, Navigate,  useNavigate } from 'react-router-dom';

import React, { useContext, FormEvent, useState } from 'react';
import illustationImg  from  '../assets/images/illustration.svg'; 
import logoImg from '../assets/images/logo.svg';

// img erro import solucionado apartir desse site = https://duncanleung.com/typescript-module-declearation-svg-img-assets/
import '../styles/auth.scss';
import { Button } from '../components/button';
import { AuthContext } from '../contexts/AuthContext';
import database from '../services/firebase';
import { useAuth } from '../hooks/useAuth';



export function NewRoom() {
 const { user } = useAuth();

const [newRoom, setNewRoom] = useState('');
const navigate = useNavigate();
    
   async function handleCreateRoom(event: FormEvent) { // evento de submit para crianca de salas banco de dados 
    event.preventDefault();

    if (newRoom.trim() === '') {
      return;
    }

    const roomRef = database.ref('rooms').push(); // cria uma sala nova categoria rooms
    // cria uma sala nova dentro da categoria rooms
    const firebaseRoom =  await roomRef.push({
        title: newRoom,
        authorId: user?.id,
    }); 
    
    
    navigate(`/rooms/${firebaseRoom.key}`)
   } 

    return (
        <div id='page-auth'>
            <aside>
                <img src={illustationImg} alt="ilustracao simbolizando perguntas e respostas" />
                <strong>Crie salas de ao-vivo</strong>
                <p>Tire as duvias da sua audiencia em tempo-real</p>
            </aside>
            <main>
                <div className='main-content'>
                    <img src={logoImg}  alt="logo" />
                    <h1>Bem vindo <br />{user?.name}</h1>
                      <div className='separator'> <p>Crie uma sala para começar a interagir.</p></div>
                    <form onSubmit={handleCreateRoom} > 
                        <input
                         type="text"
                         placeholder="Nome da sala"
                         onChange={event => setNewRoom(event.target.value)}
                         value={newRoom}
                         />
                        <Button type="submit">Criar sala</Button>
                        <p id='p'>Quer entrar em uma sala existente? <Link to="/">clique aqui</Link> </p>
                    </form>
                  
                </div>
            </main>
        </div>
    )
}

function setNewRoom(value: string): void {
    throw new Error('Function not implemented.');
}

