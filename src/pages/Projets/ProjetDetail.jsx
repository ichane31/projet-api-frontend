import React, {useEffect, useRef, useState} from 'react';
import { useParams } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import Helmet from "react-helmet";
import { Toast } from 'primereact/toast';
import {GetProjetId} from '../../services/ProjetService';
import {GetComments ,GetCommentParentByProjet ,GetCommentByProjet, GetComment, PostComment , PutComment , DelComment , PostReplyComment , GetReplyByComment , LikeComment , UnLikeComment} from '../../services/CommentService';
import {GetNoteByProjet , PostNote , PutNote , DelNote} from '../../services/NoteService';
import { GetMe } from '../../services/UserService';
import Note from '../../components/NotesFolder/Note';
import NoteForm from '../../components/NotesFolder/NoteForm';
import video1 from '../../data/video/video2.mp4';
import video0 from '../../data/video/video0.mp4';
import pdf0 from '../../data/pdf/pdf0.pdf';
import odt0 from '../../data/odt/odt0.odt';
import text0 from '../../data/text/text0.txt';
import pppt from '../../data/ppt/ppppt.pptx';
import Notes from '../../components/NotesFolder/Notes';
import Comments from '../../components/CommentsFolder/Comments';
import {numFormatter , getItemFromStorage} from '../../helpers/helper';
import {useAuth} from '../../hoc/useAuth';
import parse from 'html-react-parser';


const ProjetDetail = () => {
    
    const url = 'https://projet-apis.herokuapp.com/api/v1/file';
    const {id} = useParams();
    const {user} = useAuth();
    const token = getItemFromStorage('token');

    const [projet , setProjet] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const toast = useRef(null);
    const dt = useRef(null);
    const [projetId , setProjetId] = useState(id);
    const [currentUser , setCurrentUser] = useState(null);  
    
    const fileName =(val) =>{
        return `https://projet-apis.herokuapp.com/api/v1/file/${val}/original_name`;
    }
    
    
    useEffect( () =>  {
        // GetMe().then(data => setCurrentUser(data));
        GetProjetId(id).then(data => setProjet(data))  
        console.log(projet) 
       
    } , [] );    


    return(
        <div className="container">
            <section className="sectionDetail pt-5">
                <div id="projet" className=" projetDet row">
                    <div className="col-lg-8 order-1 order-lg-0">
                        <div className=" d-lg-block">
                            <h1 className="mb-1 fs-4 fw-bold"> {projet?.title}</h1>
                            {projet?.description ?
                             <div className="description d-flex align-items-center lh-14px mt-3 ">{parse(projet.description)}</div>
                             :
                             <div className="description d-flex align-items-center lh-14px mt-3 ">{projet?.description}</div>
                            }
                            <div className="projet--columns-4" data-columns ="4" style={{opacity:"1" , transition:"opacity 0.25s ease-in-out 0s"}}>
                                <video width="1000" heigth="736" controls className="pt-3 mt-4" >
                                    {projet?.videoDemo ?
                                    <source src={`${url}/${projet?.videoDemo}`} type="" />
                                    :
                                    <source src={video1} type="" />}
                                    
                                </video>
                            </div>
                        </div>
                        <div id="projet-tab" className="d-flex justify-content-between align-items-center review-tab mt-5">
                            <ul id="projetTab" className="nav nav-tabs" role="tablist">
                                <li id="tab-title-resume" className="nav-item resume-tab">
                                    <a className="nav-link show active" data-bs-toggle="tab" role="tab" aria-controls='tab-resume' aria-selected="true" href="#tab-resume">Resume du projet</a>
                                </li>
                                <li id="tab-title-comments" className="nav-item comments-tab">
                                    <a className="nav-link " data-bs-toggle="tab" role="tab" aria-controls='tab-comments' aria-selected="false" href="#tab-comments"> ({numFormatter(projet?.Comments)}) Commentaires</a>
                                </li>
                                <li id="tab-title-notes" className="nav-item notes-tab">
                                    <a className="nav-link " data-bs-toggle="tab" role="tab" aria-controls='tab-notes' aria-selected="false" href="#tab-notes">({numFormatter(projet?.Notes)}) Notes</a>
                                </li>
                            </ul>
                            
                        </div>
                        <div id="tab-content" className="tab-content px-0 pb-5 ">
                            <div id="tab-resume" className="tab-pane pt-5 fade active show" role="tabpanel" aria-labelledby='tab-title-resume'>
                                
                                {projet?.resume ?
                                <div value=""></div>  :
                                <div> Désolé le resumé n'est pas disponible.</div>  
                              }
                            </div>
                            <div id="tab-comments" className="tab-pane pt-4 fade " role="tabpanel" aria-labelledby='tab-title-comments'>
                                <Comments
                                  projetId={id}
                                  currentUserId={user?.id}
                                  token={token}
                                  image={user?.image} />
                            </div>
                            <div id="tab-notes" className="tab-pane pt-4 fade " role="tabpanel" aria-labelledby='tab-title-notes'>
                                <Notes
                                  projetId={id}
                                  currentUserId={user?.id}
                                  token={token}
                                  image={user?.image} />
                            </div>
                        </div>
                    </div>
                    <div className=" fichier col-lg-4 ps-xl-5 order-2">
                        <div className="card border rounded-3 mb-4">
                            <div className="card-header py-3 px-card border-bottom border-200 d-flex justify-content-between align-items-center">
                                <h4 className="fs-0 fw-bold mb-0 text-500">Fichier rapport</h4>
                            </div>
                            <div className="card-body">
                                <div className="rapport">
                                    <h4 className="fs-0 text-700 pt-4 justify-content-center align-items-center">Telecharger le rapport</h4>
                                    {projet?.rapport ?
                                    <a className="btn btn-outline-success w-100 " href={`${url}/${projet.rapport}`} target="_blank" rel="noreferrer" download={`${url}/${projet.rapport}/original_name`} >Telecharger</a> 
                                    :
                                    <p className="btn btn-outline-success w-100 "   rel="noreferrer"  >Fichier non disponible</p> 
                                    }
                                     
                                     <ul className="list-unstyled mt-4 mb-0 fs--1">
                                        <li>     
                                            <i className="pi pi-check text-success" style={{'fontSize': '1em' , 'fontWeight': '700'}}></i>  pdf 
                                        </li>
                                        <li><i className="pi pi-check text-success" style={{'fontSize': '1em' , 'fontWeight': '700'}}></i>  doc</li>
   
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
                        <div className="card border rounded-3 mb-4">
                            <div className="card-header py-3 px-card border-bottom border-200 d-flex justify-content-between align-items-center">
                                <h4 className="fs-0 fw-bold mb-0 text-700">Fichier presentation</h4>
                            </div>
                            <div className="card-body">
                                <div className="presentation">
                                    <h4 className="fs-0 text-700 pt-4 justify-content-center align-items-center">Telecharger la presentation ppt</h4>
                                    {projet?.presentation ?
                                    <a className="btn btn-outline-success w-100 " href={`${url}/${projet.presentation}`} target="_blank" rel="noreferrer" download={`${url}/${projet.presentation}/original_name`} >Telecharger</a> 
                                    :
                                    <p className="btn btn-outline-success w-100 "  rel="noreferrer"  >Fichier non disponible</p> 
                                    }
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
                        <div className="card border rounded-3 mb-4">
                            <div className="card-header py-3 px-card border-bottom border-200 d-flex justify-content-between align-items-center">
                                <h4 className="fs-0 fw-bold mb-0 text-700">Code source</h4>
                               {projet?.prix ?
                                 <span className="fs-5 fw-semi-bold text-green-500">{projet.prix} DH <i className='pi pi-lock '></i> </span>:
                                 null
                            }
                            </div>
                            <div className="card-body">
                                <div className="code source">
                                    <h4 className="fs-0 text-700 pt-4 justify-content-center align-items-center">Telecharger le code source</h4>
                                     {projet?.prix ? 
                                     <div>
                                        {projet?.codeSource ? 
                                        <a className="btn btn-outline-success w-100 "  href={`mailto:${projet?.author?.email}`}   rel="noreferrer"  >Contacter l'auteur</a>:
                                        <a className="btn btn-outline-success w-100 "   rel="noreferrer"  >Fichier non disponible</a>}
                                     </div> :
                                     <div>
                                        {projet?.codeSource ? 
                                        <a className="btn btn-outline-success w-100 " href={`${url}/${projet?.codeSource}`} target="_blank" rel="noreferrer"  >Telecharger</a>:
                                        <a className="btn btn-outline-success w-100 "   rel="noreferrer"  >Fichier non disponible</a>}
                                     </div>
                                      }
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