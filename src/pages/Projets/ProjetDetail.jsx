import React, {useEffect, useRef, useState} from 'react';
import { useParams } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import Helmet from "react-helmet";
import { Toast } from 'primereact/toast';
import {GetProjetsById} from '../../services/ProjetService';
import {GetComments ,GetCommentParentByProjet ,GetCommentByProjet, GetComment, PostComment , PutComment , DelComment , PostReplyComment , GetReplyByComment , LikeComment , UnLikeComment} from '../../services/CommentService';
import {GetNoteByProjet , PostNote , PutNote , DelNote} from '../../services/NoteService';
import { GetMe } from '../../services/UserService';
import CommentForm from '../../components/Comments/CommentForm';
import Comment from '../../components/Comments/Comment';
import Note from '../../components/Notes/Note';
import NoteForm from '../../components/Notes/NoteForm';
import video1 from '../../data/video/video1.mp4';
import video0 from '../../data/video/video0.mp4';
import pdf0 from '../../data/pdf/pdf0.pdf';
import odt0 from '../../data/odt/odt0.odt';
import text0 from '../../data/text/text0.txt';
import pppt from '../../data/ppt/ppppt.pptx';


const ProjetDetail = () => {
    
    const url = 'https://projet-apis.herokuapp.com/api/v1/file';
    const {id} = useParams();

    const [projet , setProjet] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const toast = useRef(null);
    const dt = useRef(null);
    const [projetId , setProjetId] = useState(id);
    const [currentUser , setCurrentUser] = useState(null);  
    
    const [commentsParents , setCommentsParents] = useState([]);
    const [comments , setComments] = useState([]);
    const [singleComment , setSingleComment] = useState(null);
    const [activeComment, setActiveComment] = useState(null);
    const [replies , setReplies] = useState([]);
    const [notes , setNotes ] = useState([]);
    
    useEffect( () =>  {
        GetComments().then(data => setComments(data));
        GetMe().then(data => setCurrentUser(data));
        GetProjetsById(id).then(data => setProjet(data))  
        GetCommentByProjet(id).then(data1 => {
            setCommentsParents(data1);
            
        });
        GetNoteByProjet(id).then(data2 => {
            setNotes(data2);
        });
       
    } , [] );
   
    const getCommentById = (id) => {
        try {
            useEffect(() => {
                GetComment(id).then((data) => setSingleComment(data))
                
            }, []);
            
        } catch (error) {
            
        }
    }
    
    const addComment = (projetId = id , text ) =>  {
        let variable = {
        body : text ,
        userId: currentUser.id
        }
        let requestOptions = {
            method: 'POST',
            body: JSON.stringify(variable)
        };
        
        try{
            let res =  PostComment(projetId ,requestOptions)
            if(res.ok) {
                let d =  res.json();
                setCommentsParents([d , ...commentsParents]);
                setActiveComment(null);
                toast.current.show({ severity: 'success', summary: 'Created!', detail: "Comment has been Created Successfully", life: 3000 });
            }
            else {
                if(Array.isArray(res) && res.length === 0) return "error";
                let r =  res.json()
                throw r[0].message;
            }
        }
        catch (err) {
            console.log("err : " , err );
            toast.current.show({ severity: 'error', summary: 'Failed', detail: err, life: 3000 });
        }
    
    }

    const replyToComment = (parentId , text) => {
        let variable = {
            body : text ,
            userId: currentUser.id
         }
         let requestOptions = {
             method: 'POST',
             body: JSON.stringify(variable)
         };

         try{
            let res =  PostReplyComment( parentId , requestOptions)
            if(res.ok) {
                let d =  res.json();
                setReplies([d , ...replies]);
                setActiveComment(null);
                toast.current.show({ severity: 'success', summary: 'Created!', detail: "Comment has been Created Successfully", life: 3000 });
            }
            else {
                if(Array.isArray(res) && res.length === 0) return "error";
                let r =  res.json()
                throw r[0].message;
            }
        }
        catch (err) {
            console.log("err : " , err );
            toast.current.show({ severity: 'error', summary: 'Failed', detail: err, life: 3000 });
        }
    }

    const updateComment = (commentId , text) => {
        let variable = {
            body : text ,
            userId: currentUser.id
         }
         let requestOptions = {
             method: 'PUT',
             body: JSON.stringify(variable),
             redirect: 'follow'
         };

         try {
            
            let res =  PutComment(commentId, requestOptions)
            if (res.ok){
                let d =  res.json();
                // getCommentById(commentId);
                if(d.commentParent === null) {
                     const updatedComments = commentsParents.map((commentParent) => {
                        if (commentParent.id === commentId) {
                            return { ...commentParent , body: text};
                        } 
                     return commentParent;
                     } );

                    setCommentsParents(updatedComments);
                    setActiveComment(null)
                }
                else {
                    const updatedComments = replies.map((reply) => {
                        if (reply.id === commentId) {
                            return { ...reply , body: text};
                        } 
                     return reply;
                     } );

                    setReplies(updatedComments);
                    setActiveComment(null)
                }
                toast.current.show({ severity: 'success', summary: 'modifié avec succès!', detail: "Mis à jour avec succés", life: 3000 });
            }
            else{
                if(Array.isArray(res) && res.length === 0) return "error";
                let r =  res.json()
                throw r[0].message;
            }
        }
        catch (err){
            console.log("err: ", err);
            toast.current.show({ severity: 'error', summary: 'Failed', detail: err, life: 3000 });
        } 
    }
 
    const getReplies = (commentId) => {
        try {
            let res =  GetReplyByComment(commentId);
            if (res.ok) {
                let data =  res.jon();
                setReplies(data);
            }
            else {
                let err =  res.json();
                throw err[0].message;
            }
        } catch (error) {
            console.log(err);
            toast.current.show({ severity: 'error', summary: 'Failed', detail: err, life: 6000 });
        }
    }

    const deleteComment = (id) => {
        try{
            let res =  DelComment(id)
            if (!res.ok){
                if(Array.isArray(res) && res.length === 0) return "error";
                let r =  res.json()
                throw r[0].message;
                

            }
            else{
                toast.current.show({ severity: 'success', summary: 'Réussi', detail: 'Commentaire supprimé avec succès', life: 3000 });
            }
        }
        catch (err){
            toast.current.show({ severity: 'error', summary: 'Failed', detail: err, life: 3000 });
        } 
    }

    const likeComment = (id ) => {
        let variable = {
            userId: currentUser.id
            }
        let requestOptions = {
            method: 'POST',
            body: JSON.stringify(variable)
        };
        try {
            let res =  LikeComment(id)
            if (!res.ok){
                if(Array.isArray(res) && res.length === 0) return "error";
                let r =  res.json()
                throw r[0].message;
            }
            else{
                toast.current.show({ severity: 'success', summary: 'Réussi', detail: 'Commentaire supprimé avec succès', life: 3000 });
            }
        } catch (error) {
            
        }
    }

    const dislikeComment = (id ) => {
        let variable = {
            userId: currentUser.id
            }
        let requestOptions = {
            method: 'DELETE',
            body: JSON.stringify(variable)
        };
        try {
            let res =  UnLikeComment(id)
            if (!res.ok){
                if(Array.isArray(res) && res.length === 0) return "error";
                let r =  res.json()
                throw r[0].message;
            }
            else{
                toast.current.show({ severity: 'success', summary: 'Réussi', detail: 'Commentaire supprimé avec succès', life: 3000 });
            }
        } catch (error) {
            
        }
    }

    const addNote = (projetId , value ) =>  {
        let variable = {
           value : value ,
           userId: currentUser.id
        }
        let requestOptions = {
            method: 'POST',
            body: JSON.stringify(variable)
        };
        
        try{
            let res =  PostNote(projetId ,requestOptions);
            if(res.ok) {
                let d =  res.json();
                setNotes([d , ...notes]);
                toast.current.show({ severity: 'success', summary: 'Created!', detail: "Note has been Created Successfully", life: 3000 });
            }
            else {
                if(Array.isArray(res) && res.length === 0) return "error";
                let r =  res.json()
                throw r[0].message;
            }
        }
        catch (err) {
            console.log("err : " , err );
            toast.current.show({ severity: 'error', summary: 'Failed', detail: err, life: 3000 });
        }
        
    }

    const updateNote = (noteId , text) => {
        let variable = {
            value : text ,
            userId: currentUser.id
         }
         let requestOptions = {
             method: 'PUT',
             body: JSON.stringify(variable),
             redirect: 'follow'
         };

         try {
            
            let res =  PutNote(noteId, requestOptions)
            if (res.ok){
                let d =  res.json();
                toast.current.show({ severity: 'success', summary: 'modifié avec succès!', detail: "Mis à jour avec succés", life: 3000 });
                
                const updatedNotes = notes.map((note) => {
                    if(note.id === noteId) {
                        return {... notes , value : text};
                    }
                    return notes;
                });
                setNotes(updatedNotes);
            }
            else{
                if(Array.isArray(res) && res.length === 0) return "error";
                let r =  res.json()
                throw r[0].message;
            }
        }
        catch (err){
            console.log("err: ", err);
            toast.current.show({ severity: 'error', summary: 'Failed', detail: err, life: 3000 });
        } 
    }

    const deleteNote = (id) => {
        try{
            let res =  DelNote(id)
            if (!res.ok){
                if(Array.isArray(res) && res.length === 0) return "error";
                let r =  res.json()
                throw r[0].message;
            }
            else{
                toast.current.show({ severity: 'success', summary: 'Réussi', detail: 'Note supprimé avec succès', life: 3000 });
                const updatedNotes = notes.filter(note => note.id !==id);
                setNotes(updatedNotes);
            }
        }
        catch (err){
            toast.current.show({ severity: 'error', summary: 'Failed', detail: err, life: 3000 });
        } 
    }


    return(
        <div className="container">
            <section className="py-4">
                <div id="projet" className="row">
                    <div className="col-lg-8 order-1 order-lg-0">
                        <div className=" d-lg-block">
                            <h1 className="mb-1 fs-3 fw-bold"> Titre du projet</h1>
                            <p className="fs--1 d-flex align-items-center lh-14px mt-3">Description du projet
                            Their names were Stephen and Joseph Montgolfier, they were papermakers by trade, and were noted as possessing thoughtful minds and a deep interest in all scientific knowledge and new discovery.</p>
                            <div className="projet--columns-4" data-columns ="4" style={{opacity:"1" , transition:"opacity 0.25s ease-in-out 0s"}}>
                                <video width="1000" heigth="736" controls className="pt-3 mt-4" >
                                    <source src={video1} type="" />
                                </video>
                            </div>
                        </div>
                        <div id="projet-tab" className="d-flex justify-content-between align-items-center review-tab mt-5">
                            <ul id="projetTab" className="nav nav-tabs" role="tablist">
                                <li id="tab-title-resume" className="nav-item resume-tab">
                                    <a className="nav-link show active" data-bs-toggle="tab" role="tab" aria-controls='tab-resume' aria-selected="true" href="#tab-resume">Resume</a>
                                </li>
                                <li id="tab-title-comments" className="nav-item comments-tab">
                                    <a className="nav-link " data-bs-toggle="tab" role="tab" aria-controls='tab-comments' aria-selected="false" href="#tab-comments">Commentaires</a>
                                </li>
                                <li id="tab-title-notes" className="nav-item notes-tab">
                                    <a className="nav-link " data-bs-toggle="tab" role="tab" aria-controls='tab-notes' aria-selected="false" href="#tab-notes">Notes</a>
                                </li>
                            </ul>
                            
                        </div>
                        <div id="tab-content" className="tab-content px-0">
                            <div id="tab-resume" className="tab-pane pt-4 fade active show" role="tabpanel" aria-labelledby='tab-title-resume'>
                                <h4>Resume du projet</h4>
                            </div>
                            <div id="tab-comments" className="tab-pane pt-4 fade " role="tabpanel" aria-labelledby='tab-title-comments'>
                            <div className="comments">
                                {/* <h3 className="comments-title">Comments</h3> */}
                                <div className="comment-form-title fs-5">Ecrire commentaire</div>
                                <CommentForm submitLabel="Ecrire"  />
                                <div className="comments-container"></div>
                                </div>
                            </div>
                            <div id="tab-notes" className="tab-pane pt-4 fade " role="tabpanel" aria-labelledby='tab-title-notes'>
                                <h5>Notes du projet</h5>
                                <NoteForm submitLabel="Attibuer"  />
                                {/* <div className="comments-container">
                                    <Note
                                        key =""/>
                                </div> */}
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 ps-xl-5">
                        <div className="card bprder rounded-3 mb-4">
                            <div className="card-header py-3 px-card border-bottom border-200 d-flex justify-content-between align-items-center">
                                <h3 className="fs-0 fw-bold mb-0 text-700">Fichier rapport</h3>
                            </div>
                            <div className="card-body">
                                <div className="rapport">
                                    <h4 className="fs-0 text-700 pt-4 justify-content-center align-items-center">Telecharger le rapport</h4>
                                     <a className="btn btn-outline-success w-100 " href={pppt} target="_blank" rel="noreferrer" onClick ={()=> console.log(projet) }>Telecharger</a> 
                                     <ul className="list-unstyled mt-4 mb-0 fs--1">
                                        <li>     
                                            <i className="pi pi-check text-success" style={{'fontSize': '1em' , 'fontWeight': '700'}}></i>  pdf 
                                        </li>
                                        <li><i className="pi pi-check text-success" style={{'fontSize': '1em' , 'fontWeight': '700'}}></i>  doc</li>
                                        <li><i className="pi pi-check text-success" style={{'fontSize': '1em' , 'fontWeight': '700'}}></i>  odt</li>
                                        <li><i className="pi pi-check text-success" style={{'fontSize': '1em' , 'fontWeight': '700'}}></i>  docx</li>
                                     </ul>
                                </div>
                            </div>
                            <div className="card-footer py-2 border-top border-200">
                                <i className="pi pi-cloud-download" style={{'fontSize': '1em' , 'fontWeight': '700'}}> </i>{' '}
                                <span className="text-700">  </span>{' '}
                                <span className="text-600"> Telechargements</span>
                            </div>
                        </div>
                        <div className="card bprder rounded-3 mb-4">
                            <div className="card-header py-3 px-card border-bottom border-200 d-flex justify-content-between align-items-center">
                                <h3 className="fs-0 fw-bold mb-0 text-700">Fichier presentation</h3>
                            </div>
                            <div className="card-body">
                                <div className="presentation">
                                    <h4 className="fs-0 text-700 pt-4 justify-content-center align-items-center">Telecharger la presentation ppt</h4>
                                     <a className="btn btn-outline-success w-100 " href={pppt} target="_blank" rel="noreferrer" onClick ={()=> console.log(commentsParents) }>Telecharger</a> 
                                     <ul className="list-unstyled mt-4 mb-0 fs--1">
                                        <li>     
                                            <i className="pi pi-check text-success" style={{'fontSize': '1em' , 'fontWeight': '700'}}></i>  ppt 
                                        </li>
                                        <li><i className="pi pi-check text-success" style={{'fontSize': '1em' , 'fontWeight': '700'}}></i>  pptx</li>
                                 
                                     </ul>
                                </div>
                            </div>
                            <div className="card-footer py-2 border-top border-200">
                                <i className="pi pi-cloud-download" style={{'fontSize': '1.3em' , 'fontWeight': '700'}}> </i>{' '}
                                {/* <span className="text-700"> {count} </span>{' '} */}
                                <span className="text-600"> Telechargements</span>
                            </div>
                        </div>
                        <div className="card bprder rounded-3 mb-4">
                            <div className="card-header py-3 px-card border-bottom border-200 d-flex justify-content-between align-items-center">
                                <h3 className="fs-0 fw-bold mb-0 text-700">Code source</h3>
                                <span className="fs-5 fw-semi-bold">100 $</span>
                            </div>
                            <div className="card-body">
                                <div className="code source">
                                    <h4 className="fs-0 text-700 pt-4 justify-content-center align-items-center">Telecharger le code source</h4>
                                     <a className="btn btn-outline-success w-100 " href={pppt} target="_blank" rel="noreferrer" onClick ={()=> setCount(count +1) }>Telecharger</a> 
                                     <ul className="list-unstyled mt-4 mb-0 fs--1">
                                        <li>     
                                            <i className="pi pi-check text-success" style={{'fontSize': '1em' , 'fontWeight': '700'}}></i>  zip 
                                        </li>
                                        <li><i className="pi pi-check text-success" style={{'fontSize': '1em' , 'fontWeight': '700'}}></i>  rar</li>
                                 
                                     </ul>
                                </div>
                            </div>
                            <div className="card-footer py-2 border-top border-200">
                                <i className="pi pi-cloud-download" style={{'fontSize': '1.3em' , 'fontWeight': '700'}}> </i>{' '}
                                {/* <span className="text-700"> {count} </span>{' '} */}
                                <span className="text-600"> Telechargements</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ProjetDetail;