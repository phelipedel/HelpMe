import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FormEvent, useContext, useState } from 'react';
import illustationImg  from  '../assets/images/illustration.svg'; 
import logoImg from '../assets/images/logo.svg';
import googleIcon from '../assets/images/google-icon.svg';
// img erro import solucionado apartir desse site = https://duncanleung.com/typescript-module-declearation-svg-img-assets/
import '../styles/auth.scss';
import { Button } from '../components/button';
import { AuthContext } from '../contexts/AuthContext';
import { useAuth } from '../hooks/useAuth';
import firebase from 'firebase/compat';
import database from '../services/firebase';




export function Home() {
    const navigate = useNavigate();
    const { user, signInWithGoogle } = useAuth();
    const [roomCode, setRoomCode] = useState('');
        
   async function handleCreateRoom() {

        if (!user) {
           await signInWithGoogle();
            
            
        }
         navigate('/rooms/new');

    }
    
    async function handleJoinRoom(event: FormEvent) {
        event.preventDefault();

        if (roomCode.trim() === "") {
            return;
        } 
        const roomRef = await database.ref(`rooms/${roomCode}`).get();

        if (!roomRef.exists()) {
            
            Swal.fire({
                title: 'Error!',
                text: 'Sala não encontrada',
                icon: 'error',
                confirmButtonText: 'Ok'
              })
            
            return;
        }
        navigate(`/rooms/${roomCode}`);
    }


    return (
        <div id='page-auth'>
            <aside>
                <img src={illustationImg} alt="ilustracao simbolizando perguntas e respostas" />
                <strong>Crie salas de ao-vivo</strong>
                <p>Tire as duvias em tempo-real</p>
            </aside>
            <main>
                <div className='main-content'>
                    <img src={logoImg}  alt="logo" />
                    <button onClick={handleCreateRoom} className='google'>
                        <img src={googleIcon} alt="" />
                        Crie Sua sala com o Google
                    </button>
                    <div className='separator'>ou entre em uma sala</div>
                    <form onClick={handleJoinRoom} >
                        <input type="text"
                         placeholder="Codigo da sala"
                         onChange={(e) => setRoomCode(e.target.value)}
                         value={roomCode}
                         />
                        <Button type="submit">Entrar na sala</Button>
                    </form>
                </div>
            </main>
        </div>
    )
}

function swal(arg0: string, arg1: { buttons: (string | boolean)[]; }) {
    throw new Error('Function not implemented.');
}

