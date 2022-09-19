import React , {useState , useEffect , useRef} from 'react';
import Comment from './Comment';
import CommentForm from './CommentForm';
import {GetCommentByProjet, PostComment , PostReplyComment,PutComment,DelComment,LikeComment,UnLikeComment } from '../../services/CommentService';
import { Toast } from 'primereact/toast';



const Comments = ({projetId , currentUserId ,token ,image}) => {

    const [comments , setComments] = useState([]);
    const [activeComment, setActiveComment] = useState(null);
    const [replies , setReplies] = useState([]);
    const toast = useRef(null);
    
    
    const commentsParents = comments.filter((comment) => comment?.commentParent ===null)
    .sort((a,b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());


    const addComment = async ( text ) =>  {
        var data = new FormData();
        data.append('body', text);
        let requestOptions = {
            method: 'POST',
            body: data, 
            headers: {"Authorization":"Bearer " + token}, 
            redirect:'follow' 
        };
        
        try{
            let res = await  PostComment(projetId ,requestOptions )
            if(res.ok) {
                let d = await res.json();
                setComments([d , ...comments]);
                setActiveComment(null);
                toast.current.show({ severity: 'success', summary: 'Created!', detail: "Comment has been Created Successfully", life: 3000 });
            }
            else {
                if(Array.isArray(res) && res.length === 0) return "error";
                let r =  res.json()
                throw r[0]?.message;
            }
        }
        catch (err) {
            console.log("err : " , err );
            toast.current.show({ severity: 'error', summary: 'Failed', detail: err, life: 3000 });
        }
    
    }

    const replyToComment = async (parentId , text) => {
        var data = new FormData();
        data.append('body', text);
         let requestOptions = {
             method: 'POST',
             body: data,
             headers: {"Authorization": "Bearer " +token},
             redirect: 'follow'
             
         };

         try{
            let res = await  PostReplyComment( parentId , requestOptions )
            if(res.ok) {
                let d = await res.json();
                setComments([d , ...comments]);
                setActiveComment(null);
                toast.current.show({ severity: 'success', summary: 'Created!', detail: "Comment has been Created Successfully", life: 3000 });
            }
            else {
                if(Array.isArray(res) && res.length === 0) return "error";
                let r =  res.json()
                throw r[0];
            }
        }
        catch (err) {
            console.log("err : " , err );
            toast.current.show({ severity: 'error', summary: 'Failed', detail: err, life: 3000 });
        }
    }

    const updateComment = async (commentId , text) => {
        var data = new FormData();
        data.append('body', text);
         let requestOptions = {
             method: 'PUT',
             body: data,
             headers: {"Authorization": "Bearer " +token},
             redirect: 'follow'
         };

         try {
            
            let res = await  PutComment(commentId, requestOptions)
            if (res.ok){
                let d = await res.json();
                const updateComments = comments.map((comment) =>{
                    if (comment.id === commentId) {
                        return {...comment, body : text}
                    }
                    return comment;
                });
                setComments(updateComments);
                setActiveComment(null);
                
                toast.current.show({ severity: 'success', summary: 'modifié avec succès!', detail: "Mis à jour avec succés", life: 3000 });
            }
            else{
                if(Array.isArray(res) && res.length === 0) return "error";
                let r =  res.json()
                throw r[0];
            }
        }
        catch (err){
            console.log("err: ", err);
            toast.current.show({ severity: 'error', summary: 'Failed', detail: err, life: 3000 });
        } 
    }
 
    const getReplies = (commentId) => {
       return comments.filter((comment) => comment.commentParent?.id === commentId)
        .sort((a,b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    }
    console.log(getReplies(1))

    const deleteComment = async (id ) => {
        const updateComments = comments.filter((comment) => comment.id !== id);
        if(window.confirm('Etes-vous sur de vouloir supprimer ce commentaire?')) {
        try{
            let res = await  DelComment(id ,token)
            if (!res.ok){
                if(Array.isArray(res) && res.length === 0) return "error";
                let r = await res.json()
                throw r[0];
                
            }
            else{
                
                setComments(updateComments);
                toast.current.show({ severity: 'success', summary: 'Réussi', detail: 'Commentaire supprimé avec succès', life: 3000 });
            }
        }
        catch (err){
            toast.current.show({ severity: 'error', summary: 'Failed', detail: err, life: 3000 });
        } 
    }
    }

    const likeComment = async (id ) => {
      
        try {
            let res = await LikeComment(id ,token)
            if (!res.ok){
                if(Array.isArray(res) && res.length === 0) return "error";
                let r = await res.json()
                throw r[0]?.message;
            }
            else{
                toast.current.show({ severity: 'success', summary: 'Réussi', detail: 'Commentaire liké avec succès', life: 3000 });
            }
        } catch (error) {
            
        }
    }

    const dislikeComment = async (id ) => {
       
        try {
            let res = await UnLikeComment(id , token)
            if (!res.ok){
                if(Array.isArray(res) && res.length === 0) return "error";
                let r = await res.json()
                throw r[0]?.message;
            }
            else{
                toast.current.show({ severity: 'success', summary: 'Réussi', detail: 'Commentaire disliké avec succès', life: 3000 });
            }
        } catch (error) {
            
        }
    }

    useEffect(() => {
        GetCommentByProjet(projetId).then((data) => {
        setComments(data);})
    }, []);
    
  return (
    <>
    <Toast ref={toast} />
    <div className="comments">
      
      <div className="comment-form-title">Ecrire un commentaire</div>
      <CommentForm submitLabel="Ecrire" handleSubmit={addComment} />
      <div className="comments-container">
        
        {commentsParents.map((comment) => 
        //    
            <Comment
              key = {comment.id}
              comment={comment}
              getReplies={getReplies}
              replies={getReplies(comment.id)}
              repliesCount={comment.nbrereplies}
              activeComment={activeComment}
              setActiveComment={setActiveComment}
              updateComment={updateComment}
              deleteComment={deleteComment}
              replyToComment={replyToComment}
              likeComment={likeComment}
              likeCount={comment.likesCount}
              dislikeComment={dislikeComment}
              currentUserId={currentUserId} 
              image= {image}/>    
        )
        }
      </div>
    </div>
    </>
  )
}

export default Comments;
