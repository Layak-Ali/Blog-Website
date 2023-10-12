import {auth, provider} from "../config/firebase";
import {signInWithPopup} from 'firebase/auth';
import { useNavigate } from "react-router-dom";

export const Login = () => {

    //to navigate to the home page and have and show that we logged in
    const navigate = useNavigate();

    //can use (.then) too but async await is better
    const signInWithGoogle = async () => {
        const result = await signInWithPopup(auth, provider);
        console.log(result);
        navigate('/'); 
    };
    return (
    <div>
        <p>Sign In With Google to Continue</p>
        <button onClick={signInWithGoogle}>Sign In With Google</button>
    </div>
    );
};