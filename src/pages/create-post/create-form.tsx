import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
//addDoc is function when you want to add doc to database
//collection is function used to specify which collection to add data to
import {addDoc, collection} from "firebase/firestore";
//we created it and used the firestore database
import {auth, db} from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import '../../App.css';

//typescript
interface CreateFormData {
    title: string;
    description: string;
}

export const CreateForm = () => {
    //to get data. added later & import
    const [user] = useAuthState(auth);
    //to navigate to home page after submission
    const navigate = useNavigate();

    //validation from yup
    const schema = yup.object().shape({
        title: yup.string().required("You must add a title."),
        description: yup.string().required("You must have a description"),
    });

    //useForm hook & resolver is use to merge both libraries
    const {register, handleSubmit, formState: {errors}} = useForm<CreateFormData>({
        resolver: yupResolver(schema),
    });

    const postsRef = collection(db, "posts");

    //once submit it will post data
    //first pass the reference where to add & then the data to pass
    //we can use "...data" instead of title and desc too
    const onCreatePost = async (data: CreateFormData) => {
       await addDoc(postsRef, {
        title: data.title,
        description: data.description,
        username: user?.displayName,
        userId: user?.uid,
       });
       navigate("/");
    };

    return (
        <form onSubmit = {handleSubmit(onCreatePost)}>
            <input className="input" placeholder="Title..." {...register("title")}/>
            <p style={{color: "red"}}>{errors.title?.message}</p>
            <textarea className="description" placeholder="Description..." {...register("description")} />
            <p style={{color: "red"}}>{errors.description?.message}</p>
            <input className="submit" type="submit" />
        </form>
    );
};