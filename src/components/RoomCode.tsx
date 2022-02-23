import copyImg from '../assets/images/copy.svg';
import '../styles/room-code.scss';


type RoomCodeProps = {
    code:string;
  } 
  export function RoomCode(props: RoomCodeProps) {
      
    // copiar o codigo da sala 
    function handleCopy() {
        navigator.clipboard.writeText(props.code);
    }

    return(
        <button className="room-code" onClick={handleCopy}>
            <div>
                <img src={copyImg} alt="copy room code" />
            </div>
            <span>Sala #{props.code}</span>
        </button>
    )
}