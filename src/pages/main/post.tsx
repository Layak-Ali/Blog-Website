//represents a single post
//query is a function we use to get data directly from the firebase
//but in doc we get everything so we use query
import { addDoc, getDocs, collection , query, where, deleteDoc, doc} from "firebase/firestore";
import { Post as IPost} from "./main";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import '../../App.css';

interface Props {
    post: IPost;
}

interface Like{
    likeId: string;
    userId: string;
}

export const Post = (props: Props) => {
    const { post } = props;
    //gives the data of current user logged in 
    const [user] = useAuthState(auth);

    //this just shows the total likes. but we need to change it if we want to unlike it
   // const [likeAmount, setLikeAmount] = useState<number | null>(0);
   const [likes, setLikes] = useState<Like[] | null>(null);

    const likesRef = collection(db, "likes");

    const likesDoc = query(likesRef, where("postId", "==", post.id));

    //we can get to know total likes just be knowing the length of the array
    //check using console.log and previous data in main.tsx
    const getLikes = async () => {
        const data = await getDocs(likesDoc);
        //setLikeAmount(data.docs.length);

        //this just contains userId
        //this also gives length and also the user which liked unlike only one
        setLikes(data.docs.map
            ((doc) => ({ userId: doc.data().userId, likeId: doc.id})));
    };

    //for likes. doing the same for posts
    //userId is for the current user logged in and likes
    //postId is for the post and we use it from the props
    const addLike = async () => {
        //we want to make sure it doesnt fail because we wantt to add likes
    try{
       const newDoc = await addDoc(likesRef, {
        userId: user?.uid,
        postId: post.id
       });

       //this is if we want to automatically update the likes
       //only if user exists
       if(user){
       setLikes((prev) => prev ? [...prev, {userId: user?.uid, likeId: newDoc.id}]: [{userId: user?.uid, likeId: newDoc.id}]
       );
       }
    } catch(err){
        console.log(err);
    }
    };

    const removeLike = async () => {
        //we want to make sure it doesnt fail because we wantt to add likes
    try{
        const likeToDeleteQuery = 
        query(likesRef, 
            where("postId", "==", post.id),
            where("userId", "==", user?.uid)
            );

        const likeToDeleteData = await getDocs(likeToDeleteQuery);
        const likeId = likeToDeleteData.docs[0].id
        const likeToDelete = doc(db, "likes", likeId); 
       await deleteDoc(likeToDelete);

        //this is if we want to automatically update the likes
       //only if user exists
       if(user){
       setLikes((prev) => prev && prev.filter((like) => like.likeId !== likeId));
       }
    } catch(err){
        console.log(err);
    }
    };

    const hasUserLiked = likes?.find((like)=> like.userId === user?.uid);

    useEffect(()=>{
        getLikes();
    }, []);

    return (
        <div className="single-post">
            <div className="title">
                <h1>{post.title}</h1>
            </div>
            <div className="body">
                <p>{post.description}</p>
            </div>
            <div className="footer">
                <p>@{post.username}</p>
                <div className="likes">
                <button className="like-button" onClick={hasUserLiked ? removeLike : addLike }> {hasUserLiked ? <>&#128078;</> : <>&#128077;</>} </button>
                {likes && <p> Likes: {likes?.length}</p>}
                </div>
            </div>
        </div>
    );
}