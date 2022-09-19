import React , {useState} from 'react';
import CommentForm from './CommentForm';
import { numFormatter } from '../../helpers/helper';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import DeleteModal from './DeleteModal';
import userImage from '../../data/user.jpg';
import parse  from 'html-react-parser';

const Comment = ({
    comment , 
    replies,
    repliesCount,
    setActiveComment ,
    activeComment,
    updateComment ,
    deleteComment,
    replyToComment,
    likeComment,
    likeCount,
    dislikeComment,
    parentId = null,
    currentUserId,
    image
}) => {
    const isEditing = activeComment && activeComment.id === comment.id &&
    activeComment.type ==="editing";

    const isReplying = activeComment && activeComment.id === comment.id &&
    activeComment.type === "replying";

    const fiveMinutes = 300000;
    const timePassed = new Date() - new Date(comment.createdAt) > fiveMinutes;
    const canDelete =
       currentUserId === comment.author?.id && comment.replies.length === 0 ;

    const canReply = Boolean(currentUserId);
    const canLike = Boolean(currentUserId);
    const canEdit = currentUserId === comment.author?.id && !timePassed;
    const replyId = parentId ? parentId : comment?.id;
    const createdAt  = new Date(comment.createdAt).toLocaleDateString();
    const [OpenReplyComments, setOpenReplyComments] = useState(false);
    const [count , setCount] = useState(likeCount);

    
    const handleRepliesChange = () => {
        setOpenReplyComments(!OpenReplyComments)
    }
    let handleLike = e => {
        e.preventDefault()
        comment.likedBy.filter(user => (user.id === currentUserId)).length === 0 ? likeComment(comment.id)  : dislikeComment(comment.id)
    }
 
  const url = 'https://projet-apis.herokuapp.com/api/v1/file';
 

  return (
    <div key={comment.id} className="comment">
      <div className="comment-image-container">
       {comment.author?.image ?
        <img src={`${url}/${comment?.image}`} className="w-12 h-12 mr-3 rounded-full" />:
        <img src={userImage} className="w-12 h-12 mr-3 rounded-full" />}
      </div>
      <div className="comment-right-part">
        <div className="comment-content">
          {comment?.author ?
          <div className="comment-author">{`${comment.author?.firstname} ${comment?.author?.lastname}`} </div>:
          <div className="comment-author">{`${comment.author?.firstname} ${comment?.author?.lastname}`} </div>}
          <div className='mt-0 date'>{createdAt}</div>
        </div>
        {!isEditing && <div className="comment-text">{parse(comment.body)}</div>}
        {isEditing && (
          <CommentForm
            submitLabel="Modifier"
            hasCancelButton
            initialText={comment?.body}
            handleSubmit={(text) => updateComment(comment.id, text)}
            handleCancel={() =>{setActiveComment(null)}}
            image={image} 
           
          />
        )}
        <div className="comment-actions">
        {/* {canLike && ( */}
            <div
              className="comment-action"
              onClick={handleLike}
            >
              { comment.likedBy.filter(user => (user.id === currentUserId)).length === 0 ?
              <i  className=" pi pi-thumbs-up " />
              :
              <i className=" pi pi-thumbs-up text-primary" />
              }
              <span className=" likeCount m-2">{numFormatter(likeCount)}</span>
            </div>
          {/* )} */}
          {/* {canReply && ( */}
            <div
              className="comment-action"
              onClick={() =>
                setActiveComment({ id: comment.id, type: "replying" })
              }
            >
              <i className='pi pi-comment mr-1 '></i>
              repondre
            </div>
          {/* )} */}
          {/* {canEdit && ( */}
            <div
              className="comment-action"
              onClick={() =>
                setActiveComment({ id: comment.id, type: "editing" })
              }
            >
              <i className="pi pi-pencil"></i>
              Modifier
            </div>
          {/* )} */}
          {canDelete && (
            <div
              className="comment-action"
              onClick={() => deleteComment(comment.id)}
            >
              <i className="pi pi-trash"></i>
              Supprimer
            </div>
          )}
          
        </div>
        {isReplying && (
          <CommentForm
            submitLabel="Repondre"
            hasCancelButton
            handleSubmit={(text) => replyToComment( replyId , text)}
            handleCancel={() => setActiveComment(null)}
            image={image}
          />
        )}
        { comment.replies?.length > 0 && 
            <p style={{ fontSize: '15px', margin: 0, color: 'gray' }} className="mt-2"
                onClick={handleRepliesChange} >
                Voir {repliesCount}  reponse(s)
            </p>
        }
        { OpenReplyComments  &&
            <div className="replies">
            {replies?.map((reply) => (
              <Comment
                key={reply.id}
                comment={reply}
                replies={reply.replies}
                repliesCount={reply.replies?.length}
                setActiveComment={setActiveComment}
                activeComment={activeComment}
                updateComment={updateComment}
                deleteComment={deleteComment}
                replyToComment={replyToComment}
                likeComment={likeComment}
                likeCount={reply.likesCount}
                dislikeComment={dislikeComment}
                parentId={comment.id}
                currentUserId={currentUserId}
                image={image}
              />
            ))}
          </div>
        }
      </div>
    </div>
  )
}

export default Comment;
