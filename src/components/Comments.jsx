import React from 'react'
import { Formik, Field} from 'formik';
import * as Yup from 'yup';
import { Toast } from 'primereact/toast';
const Comments = () => {
    const [OpenReply, setOpenReply] = useState(false);
    const openReply = () => {
        setOpenReply(!OpenReply)
    }
    // const actions = [
    //     <span onClick={openReply} key="comment-basic-reply-to">Reply to </span>
    // ]
  return (
    <div className="container">
        <div className="row">
            <div className="col-12">
                <div className="comments">
                <div className="comments-details">
                    <span className="total-comments comments-sort">117 Comments</span>
                    <span className="dropdown">
                    <button type="button" className="btn dropdown-toggle" data-toggle="dropdown">Sort By <span className="caret" /></button>
                    <div className="dropdown-menu">
                        <a href="#" className="dropdown-item">Top Comments</a>
                        <a href="#" className="dropdown-item">Newest First</a>
                    </div>
                    </span>     
                </div>
                <div className="comment-box add-comment">
                    <form action="">
                        <span className="commenter-pic">
                            <img src="/images/user-icon.jpg" className="img-fluid" />
                        </span>
                        <span className="commenter-name">
                            <input type="text" placeholder="Add a public comment" name="Add Comment" />
                            <button type="submit" className="btn btn-default">Comment</button>
                            <button type="cancel" className="btn btn-default">Cancel</button>
                        </span>
                    </form>
          
                </div>
                <div className="comment-box">
                    <span className="commenter-pic">
                        <img src="/images/user-icon.jpg" className="img-fluid" />
                    </span>
                    <span className="commenter-name">
                        <a href="#">Happy markuptag</a> <span className="comment-time">2 hours ago</span>
                    </span>       
                    <p className="comment-txt more">Suspendisse massa enim, condimentum sit amet maximus quis, pulvinar sit amet ante. Fusce eleifend dui mi, blandit vehicula orci iaculis ac.</p>
                    <div className="comment-meta">
                        <button className="comment-like"><i className="fa fa-thumbs-o-up" aria-hidden="true" /> 99</button>
                        <button className="comment-dislike"><i className="fa fa-thumbs-o-down" aria-hidden="true" /> 149</button> 
                        <button onClick={openReply} className="comment-reply reply-popup"><i className="fa fa-reply-all" aria-hidden="true" /> Reply</button>
                        <button className="comment-edit"><i className="" aria-hidden="true" /> Edit</button>
                        <button className="comment-delete"><i className="" aria-hidden="true" /> Delete</button>         
                    </div>
                    {openReply &&
                    <form action="">
                        <span className="commenter-pic">
                            <img src="/images/user-icon.jpg" className="img-fluid" />
                        </span>
                        <span className="commenter-name">
                            <input type="text" placeholder="Add a public comment" name="Add Comment" />
                            <button type="submit" className="btn btn-default">Comment</button>
                            <button type="cancel" className="btn btn-default">Cancel</button>
                        </span>
                    </form>
                }
                </div>
                </div>
            </div>
        </div>
    </div>
    
  )
}

export default Comments
