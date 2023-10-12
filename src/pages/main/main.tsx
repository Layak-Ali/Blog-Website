import { getDocs, collection} from "firebase/firestore";
import { db } from "../../config/firebase";
import { useEffect, useState } from "react";
import { Post } from "./post";

export interface Post {
    id:string;
    userId: string;
    title: string;
    username: string;
    description: string;
}
//react query is used because we dont have backend
export const Main = () => {
    const [postsList, setPostsList] = useState<Post[] | null>(null);
    const postsRef = collection(db, "posts");

    //all firestore data is async
    //this fetches posts from firestore & has multiple complex things so we use map
    //there are multiple doc so we need to map each
    //the following will have post[] format because we dont know and we can cast it into it by adding "as Post[]"
    const getPosts = async () => {
        const data = await getDocs(postsRef);
        setPostsList(
            data.docs.map((doc) => ({...doc.data(), id:doc.id})) as Post[]
        );
    };

    useEffect(()=>{
        getPosts();
    }, []);

    return (
    <div> 
        {postsList?.map((post) => <Post post={post}/>)}
        </div>);
};