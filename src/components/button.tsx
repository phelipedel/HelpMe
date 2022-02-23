import { ButtonHTMLAttributes } from 'react';
import '../styles/button.scss';

type ButtonPorps = ButtonHTMLAttributes<HTMLButtonElement> & {
    isOutlined?: boolean,
}


export function Button({ isOutlined = false, ...props}: ButtonPorps) { 
    return (
        <button className={`button ${isOutlined ? 'outLined' : ''} `} {...props} />
     
    )
}


