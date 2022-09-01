import React from 'react';
import CommentForm from './CommentForm';
import { numFormatter } from '../../helpers/helper';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import DeleteModal from './DeleteModal';

const Comment = ({
    comment , 
    replies ,
    repliesCount,
    setActiveComment ,
    activeComment,
    updateComment ,
    deleteComment,
    setDeleting,
    deleting,
    setDeleteModalState,
    replyToComment,
    likeComment,
    likeCount,
    dislikeComment,
    parentId = null,
    currentUserId,
}) => {
    const isEditing = activeComment && activeComment.id === comment.id &&
    activeComment.type ==="editing";

    const isReplying = activeComment && activeComment.id === comment.id &&
    activeComment.type === "replying";

    // const isdeleting = activeComment && activeComment.id === comment.id &&
    // activeComment.type === "deleting";

    const fiveMinutes = 300000;
    const timePassed = new Date() - new Date(comment.createdDate) > fiveMinutes;
    const canDelete =
       currentUserId === comment.author.id && replies.length === 0 && !timePassed;

    const canReply = Boolean(currentUserId);
    const canLike = Boolean(currentUserId);
    const canEdit = currentUserId === comment.author.id && !timePassed;
    const replyId = parentId ? parentId : comment.id;
    const createdAt  = new Date(comment.createdDate).toLocaleDateString();
    const [OpenReplyComments, setOpenReplyComments] = useState(false);
    
    const handleRepliesChange = () => {
        setOpenReplyComments(!OpenReplyComments)
    }
    let handleLike = e => {
        e.preventDefault()
        comment.likedBy.filter(user => (user.id === currentUserId)) === 0 ? likeComment(comment.id)  : dislikeComment(comment.id)
    }
    // delete comment
    const showDeleteModal = () => {
      setDeleting(true);
      setDeleteModalState(true);
  };

  return (
    <div key={comment.id} className="comment">
      <div className="comment-image-container">
        <img src="/user-icon.png" />
      </div>
      <div className="comment-right-part">
        <div className="comment-content">
          <div className="comment-author">{comment.author.firstname} </div>
          <div>{createdAt}</div>
        </div>
        {!isEditing && <div className="comment-text">{comment.body}</div>}
        {isEditing && (
          <CommentForm
            submitLabel="Update"
            hasCancelButton
            initialText={comment.body}
            handleSubmit={(text) => updateComment(comment.id, text)}
            handleCancel={() => {
              setActiveComment(null);
            }}
          />
        )}
        <div className="comment-actions">
        {canLike && (
            <div
              className="comment-action"
              onClick={handleLike}
            >
              { comment.likedBy.filter(user => (user.id === currentUserId)) === 0 ?
              <FontAwesomeIcon icon="fa-solid fa-thumbs-up" classNaùe="text-primary" />
              :
              <FontAwesomeIcon icon="fa-thin fa-thumbs-up" />
              }
              <small className="m-1">{numFormatter(likeCount)}</small>
            </div>
          )}
          {canReply && (
            <div
              className="comment-action"
              onClick={() =>
                setActiveComment({ id: comment.id, type: "replying" })
              }
            >
              Reply
            </div>
          )}
          {canEdit && (
            <div
              className="comment-action"
              onClick={() =>
                setActiveComment({ id: comment.id, type: "editing" })
              }
            >
              Edit
            </div>
          )}
          {canDelete && (
            <div
              className="comment-action"
              onClick={showDeleteModal}
            >
              Delete
            </div>
          )}
          {deleting && 
          <DeleteModal
             setDeleting ={setDeleting}
             commentDelete={deleteComment(comment.id)}
             setDeleteModalState={setDeleteModalState}
        />}
        </div>
        {isReplying && (
          <CommentForm
            submitLabel="Reply"
            handleSubmit={(text) => replyToComment(text, replyId)}
          />
        )}
        { replies.length > 0 && 
            <p style={{ fontSize: '14px', margin: 0, color: 'gray' }}
                onClick={handleRepliesChange} >
                Voir {repliesCount}  reponse(s)
            </p>
        }
        { OpenReplyComments  &&
            <div className="replies">
            {replies.map((reply) => (
              <Comment
                comment={reply}
                key={reply.id}
                setActiveComment={setActiveComment}
                activeComment={activeComment}
                updateComment={updateComment}
                deleteComment={deleteComment}
                addComment={addComment}
                parentId={comment.id}
                replies={[]}
                currentUserId={currentUserId}
              />
            ))}
          </div>
        }
      </div>
    </div>
  )
}

export default Comment;
