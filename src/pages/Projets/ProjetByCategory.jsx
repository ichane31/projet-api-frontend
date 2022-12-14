import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import Helmet from "react-helmet";
import {GetCategory , GetCategoryItem } from '../../services/CategoryService';
import {GetProjets , GetProjetsById , DelProjet , PutProjet , FavProjet , UnFavProjet} from '../../services/ProjetService';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Editor} from 'primereact/editor';
import { Dialog } from 'primereact/dialog';
import { Formik, Field} from 'formik';
import * as Yup from 'yup';
import '../../css/Form.css';
import Projet1 from '../../data/projet1.jpg';
import {AiOutlinePlus} from'react-icons/ai';
import {getItemFromStorage , numFormatter} from '../../helpers/helper';
import {useAuth} from '../../hoc/useAuth';
import parse from 'html-react-parser';


const ProjetByCategory = () => {
    const url = 'https://projet-apis.herokuapp.com/api/v1/file';
    let emptyProjet = {
        id: null,
        title: '',
        description:"",
        image: '',
        resume:"",
        rapport:"",
        presentation:"",
        videoDemo:"",
        codeSource:"",
        prix:0,
        favoritedBy : [] ,
        createdAt:null,
        updatedAt:null
    };
   

    const {id} = useParams();
    const token = getItemFromStorage('token');
    
    const {user} = useAuth();
   

    const [projets , setProjets] = useState(null);
    const [projetDialog, setProjetDialog] = useState(false);
    const [deleteProjetDialog, setDeleteProjetDialog] = useState(false);
    const [categories , setCategories] = useState([]);
    const [projet, setProjet] = useState(emptyProjet);
    const [singleProjet , setSingleProjet] = useState(null);
    const [loading, setLoading] = useState(true);
    const toast = useRef(null);
    const [isDeleted, setIsDeleted] = useState(false);
    const [isEdited, setIsEdited] = useState(false);
    const [file, setFile] = useState(null);
    const [fileDataURL, setFileDataURL] = useState(null);
    const [first, setFirst] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0);
    const rows = useRef(3);
    const datasource = useRef(null);
    const isMounted = useRef(false);

    
    useEffect(() => {
        if (isMounted.current) {
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }
    }, [loading]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        setTimeout(() => {
            isMounted.current = true;
            GetCategory().then(data => setCategories(data));
            GetCategoryItem(id).then(data => {
                datasource.current = data;
                setTotalRecords(data.length);
                setProjets(datasource.current.slice(0, rows.current));
                setLoading(false);
            });
        }, 1000);
        let fileReader , isCancel = false;
        if (file) {
            fileReader = new FileReader();
            fileReader.onload = (e) => {
                const { result } = e.target;
                if (result && !isCancel) {
                setFileDataURL(result)
                }
            }
            fileReader.readAsDataURL(file);
        }
        return () => {
            isCancel = true;
            if (fileReader && fileReader.readyState === 1) {
                fileReader.abort();
            }
        }
    }, [isDeleted, isEdited, file]); // eslint-disable-line react-hooks/exhaustive-deps

    
    const onPage = (event) => {
        setLoading(true);

        //imitate delay of a backend call
        setTimeout(() => {
            const startIndex = event.first;
            const endIndex = Math.min(event.first + rows.current, totalRecords - 1);
            const newProjets = startIndex === endIndex ? datasource.current.slice(startIndex) : datasource.current.slice(startIndex, endIndex);

            setFirst(startIndex);
            setProducts(newProjets);
            setLoading(false);
        }, 1000);
    }

    const imageMimeType = /image\/(png|jpg|jpeg)/i;
    const resumeMimeType = /application\/(msword|vnd.openxmlformats-officedocument.wordprocessingml.document)/i;
    const rapportMimeType = /application\/(pdf|msword|vnd.openxmlformats-officedocument.wordprocessingml.document)/i;
    const presentationMimeType =/application\/(vnd.ms-powerpoint|vnd.openxmlformats-officedocument.presentationml.presentation)|multipart\/x-zip/i ;
    const videoMimeType =/video\/(x-msvideo|mpeg|ogg|mp4)/i ;
    const codeMimeType = /application\/(zip|vnd.rar|x-rar-compressed|octet-stream|x-zip-compressed)/i;

    const inputRef = useRef(null);

    const resetFileInput = () => {
        inputRef.current.value = null;
    };

    const formatDate = (value) => {
        if(value){
            return value.toLocaleString('fr-FR');
        }
        return 
    }
    const hideDialog = () => {
        setProjetDialog(false);
    }
    const hideDeleteProjetDialog = () => {
        setDeleteProjetDialog(false);
    }
    const editProjet = (projet) => {
        setProjet({...projet});
        setProjetDialog(true);
        setFileDataURL(false);
        
    }

    const findIdCategory = (name) => {
        const _category =  categories.filter(item => (
            item.name === name
        ));
        if(_category.length) return _category[0].id
    }
    const confirmDeleteProjet = (projet) => {
        setProjet(projet);
        setDeleteProjetDialog(true);
    }
    const deleteProjet = async () => {
        let _projets = projets.filter((val) => {
            val.id !== projet.id;
        });
        setProjets(_projets);
        const token = getItemFromStorage('token');
        try{
            let res = await DelProjet(projet.id , token)
            if (!res.ok){
                if(Array.isArray(res) && res.length === 0) return "error";
                let r = await res.json()
                throw r[0].message;
            }
            else{
                toast.current.show({ severity: 'success', summary: 'R??ussi', detail: 'Le Projet supprim?? avec succ??s', life: 3000 });
            }
        }
        catch (err){
            toast.current.show({ severity: 'error', summary: 'Failed', detail: err, life: 3000 });
        } 
        setIsDeleted(preIsDeleted => (!preIsDeleted));
        setDeleteProjetDialog(false);
        setProjet(emptyProjet);
    }

    const deleteProjetDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProjetDialog} />
            <Button label="Oui" icon="pi pi-check" className="p-button-text" onClick={deleteProjet} />
        </React.Fragment>
    );

    const FavoriteAction = ({projet}) => {
        const favorited = projet?.favoritedBy.filter(f => (f.id === user.id)).length ;
        return (
                <button  className=" text-dark" onClick={() => handleFavorite(projet.id)}>
                    {favorited ===0 ?
                  <i  className="pi pi-heart-fill  projet-category-icon" />
                  :
                  <i  className="pi pi-heart-fill text-danger projet-category-icon" />
                    }
                </button>
            
            )
              
    }

   


    const  handleFavorite = async (projetId) => {
        try {
            let res = await GetProjetsById(projetId);
            if(res.ok) {
                let data = await res.json()
                setSingleProjet(data);
                console.log(singleProjet)
                if(user) {
                    data.favoritedBy?.filter(u => (u.id === user.id)).length ===0 ?
                    favProjet(data.id) : unfavProjet(data.id)
                    console.log(singleProjet)
                }
            }
        } catch (error) {
            
        }
    }
    

    const favProjet = async (projetId ) => {
       
        try {
            let res =  await FavProjet(projetId  ,token)
            if (!res.ok){
                if(Array.isArray(res) && res.length === 0) return "error";
                let r =  res.json()
                throw r[0].message;
            }
            else{
                toast.current.show({ severity: 'success', summary: 'R??ussi', detail: 'Projet ajout?? aux favoris', life: 3000 });
            }
        } catch (error) {
            
        }
    }

    const unfavProjet = async (projetId ) => {
       
        try {
            let res = await UnFavProjet(projetId  ,token)
            if (!res.ok){
                if(Array.isArray(res) && res.length === 0) return "error";
                let r =  res.json()
                throw r[0].message;
            }
            else{
                toast.current.show({ severity: 'success', summary: 'R??ussi', detail: 'Projet supprim?? des favoris', life: 3000 });
            }
        } catch (error) {
            
        }
    }

    
   

    const renderGridItem = (data) => {
        return( 
            <>
            <div className="d-flex">
                <div className="projet-grid-item card">
                    <div className="projet-grid-item-top">
                        <div>
                            <FavoriteAction projet={data}></FavoriteAction>
                            <span className="projet-notes">{ numFormatter(data.favoritesCount)}  </span>
                        </div> 
                        
                    </div>
                    <div className="projet-grid-item-content">
                        {data.image ?
                        <img src={`${url}/${data.image}`} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={data.name} />
                        :
                        <img src={Projet1} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={data.name} />
                       }
                        <div className="projet-title"><a href={`/${data.id}/ProjetDetail`}>{data.title}</a></div>
                        <div className="projet-description">{parse(data.description)}</div>
                        
                    </div>
                    <div className="projet-grid-item-bottom">
                        <span className="projet-price">${data.prix}</span>
                        <button  label="Consulter"> <a className="btn border-dark ch_btn" href={`/${data.id}/ProjetDetail`}>Consulter</a> </button>
                    </div>
                    <div className="projet-grid-item-comment">
                        <div>
                           <span className="projet-comments"> <a href={`/${data.id}/ProjetDetail#tab-comments`}>{data.comments} Commentaires</a> </span>
                        </div>
                        <div>
                           <span className="projet-notes"> <a href={`/${data.id}/ProjetDetail#tab-notes`}>{data.notes} Notes</a> </span>
                        </div>
                    </div>
                    <div className="btn-group dropup mb-18">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Action</button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                            <button className="dropdown-item" type="button" onClick={() => editProjet(data)}><i className="pi pi-pencil"></i>Modifier</button>
                            <button className="dropdown-item" type="button" onClick={() => confirmDeleteProjet(data)}><i className="fa fa-trash"></i>Supprimer</button>
                        </div>
                    </div>
                </div>
            </div>
            
            </>
        )
    } 

  return (
    <>
      <Helmet>
            <script>
                document.title = "ProjetsByCategory"
            </script>
      </Helmet>
      <div className="dataview-projet">
            <Toast ref={toast} />
            <div className=""> 
            <button className="w-16 h-16 rounded-full bg-gray-200"> <a href="/NewProjet">{<AiOutlinePlus className='w-16 h-16' />}</a> </button>
                <DataView value={projets}
                        itemTemplate={renderGridItem} lazy paginator paginatorPosition={'bottom'} rows={rows.current}
                        totalRecords={totalRecords} first={first} onPage={onPage} loading={loading} />
                
            </div> 
            {projet.id ?
             <Dialog visible={projetDialog} style={{ width: '650px' }} header="Modifier Projet" modal  className="p-fluid" onHide={hideDialog}>
                <Formik
                    initialValues = {{title:projet.title , description:projet.description , category:projet.category ,image:`${url}/${projet.image}` , resume:'',rapport:'',presentation:'',videoDemo:'',codeSource:'',prix:projet.prix}}
                    validationSchema = {Yup.object({
                        title: Yup.string()
                        .min(10 , '10 characters or plus')
                        .max(40 , 'Must be 40 characters or less')
                        .required('Required'),
                        description: Yup.string()
                        .max(250 , 'Must be 250 characters or less'),
                        category: Yup.string()
                        .required('Required'),
                        image: Yup.mixed(),
                        resume: Yup.mixed(),
                        rapport: Yup.mixed(),
                        presentation: Yup.mixed(),
                        videoDemo: Yup.mixed(),
                        codeSource: Yup.mixed(),
                    })}
                    onSubmit = {async (values , {setSubmitting, resetForm}) =>  {
                        let data = new FormData();
                        for (let value in values) {
                            data.append(value, values[value]);
                        }
                        setSubmitting(true);
                        let requestOptions = {
                            method: 'PUT',
                            body: data,
                            headers: new Headers({"Authorization":"Bearer " +token}),
                            redirect: 'follow'
                        };
                       

                        try{
                            let res = await PutProjet(projet.id ,requestOptions )
                            if (res.ok){
                                let d = await res.json();
                                toast.current.show({ severity: 'success', summary: 'Created!', detail: "Projet has been updated Successfully", life: 3000 });
                                setIsEdited(preIsEdited =>(!preIsEdited));
                                setProjetDialog(false)
                                resetForm();
                                resetFileInput();
                            }
                            else{
                                if(Array.isArray(res) && res.length === 0) return "error";
                                let r = await res.json()
                                throw r[0].message;
                            }
                        }
                        catch (err){
                            console.log("err: ", err);
                            toast.current.show({ severity: 'error', summary: 'Failed', detail: err, life: 3000 });
                        } 
                        setSubmitting(false);

                    }} >
                       {(formik) => (
                <form className="p-fluid " onSubmit={formik.handleSubmit} encType="multipart/form-data">
                    <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-0 mb-0 md:mb-0">
                        <label className='' htmlFor="title">Titre*</label>
                        <InputText
                            
                            className=" bg-white py-2 text-gray-600 border leading-tight focus:outline-none focus:bg-white" 
                            id="title" 
                            type="text"
                            placeholder="titre du projet" 
                            {...formik.getFieldProps('title')}
                        />
                        {formik.touched.title && formik.errors.title ? (
                            <div className="text-red-500 text-xs italic">{formik.errors.title}</div>
                        ) : null}
                    </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-0 mb-3 md:mb-0">
                        <label className='' htmlFor="description">Description</label>
                        <Editor 
                            className=" bg-white text-gray-600 border leading-tight focus:outline-none focus:bg-white" 
                            id="description" 
                            autoResize
                            value={formik.values.description}
                            placeholder="description du projet" 
                            onChange={(event) => {
                               
                                formik.setFieldValue("description", event.htmlValue)
                                }}
                        />
                        {formik.touched.description && formik.errors.description ? (
                            <div className="text-red-500 text-xs italic">{formik.errors.description}</div>
                        ) : null}
                    </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-0 mb-0 md:mb-0">
                        <label className='' htmlFor="category">S??lectionnez une Cat??gorie</label>
                        <Field 
                            id="category" name="category" as="select" 
                            value={formik.values.category ? formik.values.category : "S??lectionnez une Cat??gorie"} onChange={(e) => {formik.setFieldValue("category", e.target.value)}}
                            className="block w-full bg-white text-gray-700 border rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-info" 
                        >
                            <option disabled>S??lectionnez une Cat??gorie</option>
                            {categories.map((item) => (
                                <option key={item.id} value={item.name}>{item.name}</option>
                            ))}
                        </Field>
                        {formik.touched.category && formik.errors.category ? (
                            <div className="text-red-500 text-xs italic">{formik.errors.category}</div>
                        ) : null}
                    </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-0 mb-0 md:mb-0">
                     <label className="" htmlFor="image">Upload une image (<span className="text-red-500">.png , .jpeg , .jpg</span>) </label>
                    <input
                        ref={inputRef}
                        className="input-group  appearance-none block w-full bg-white text-gray-600 border rounded py-2 px-3 mb-2 leading-tight focus:outline-none focus:bg-white active:border-info" 
                        id="image" 
                        type="file"
                        name="image"
                        accept='image/png ,image/jpeg'
                        onChange={(event) => {
                            const file = event.currentTarget.files[0];
                            if (!file.type.match(imageMimeType) ) {
                                toast.current.show({severity : 'danger' , summary:'Faild' , detail:'Image mime type est invalide' , life:'3000'});
                                return;
                            }
                            setFile(file);
                            formik.setFieldValue("image", event.currentTarget.files[0])
                            }}
                        />
                        {formik.touched.image && formik.errors.image ? (
                            <div className="text-red-500 text-xs italic">{formik.errors.image}</div>
                        ) : null}
                         {fileDataURL ?
                            <div className="flex justify-center py-3 bg-slate-200 rounded-sm	">
                                <div>
                                    <h3 className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Image precedente </h3>
                                    <img src={fileDataURL} alt="preview" />    
                                </div>
                            </div> : 
                            <div className="flex justify-center py-3 bg-slate-200 rounded-sm	">
                                <div>
                                    <h3 className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Image precedente</h3>
                                    <img src={formik.values.image} alt="preview" />    
                                </div>
                            </div> 
                                    }
                    </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-0 mb-0 md:mb-0">
                     <label className="" htmlFor="resume">Fichier r??sume(<span className="text-red-500">.doc , .docx , .odt , .txt</span>) </label>
                    <input
                        ref={inputRef}
                        className="appearance-none block w-full bg-white text-gray-600 border rounded py-2 px-3 mb-2 leading-tight focus:outline-none focus:bg-white focus:border-blue" 
                        id="resume" 
                        type="file"
                        name="resume"
                        accept='.doc , .docx, '
                        onChange={(event) => {
                            const file = event.currentTarget.files[0];
                            if (!file.type.match(resumeMimeType) ) {
                                toast.current.show({severity : 'danger' , summary:'Faild' , detail:'mime type du fichier resume est invalide' , life:'3000'});
                                return;
                            }
                            formik.setFieldValue("resume", event.currentTarget.files[0])
                            }}
                        />
                        {formik.touched.resume && formik.errors.resume ? (
                            <div className="text-red-500 text-xs italic">{formik.errors.resume}</div>
                        ) : null}
                    </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-0 mb-0 md:mb-0">
                     <label className="" htmlFor="rapport">Fichier rapport(<span className="text-red-500">.pdf , .doc , .docx </span>) </label>
                    <input
                        ref={inputRef}
                        className="appearance-none block w-full bg-white text-gray-600 border rounded py-2 px-3 mb-2 leading-tight focus:outline-none focus:bg-white focus:border-blue" 
                        id="rapport" 
                        type="file"
                        name="rapport"
                        accept='.pdf , .doc , .docx '
                        onChange={(event) => {
                            const file = event.currentTarget.files[0];
                            if (!file.type.match(rapportMimeType) ) {
                                toast.current.show({severity : 'danger' , summary:'Faild' , detail:'mime type du fichier rapport est invalide' , life:'3000'});
                                return;
                            }
                            formik.setFieldValue("rapport", event.currentTarget.files[0])
                            }}
                        />
                        {formik.touched.rapport && formik.errors.rapport ? (
                            <div className="text-red-500 text-xs italic">{formik.errors.rapport}</div>
                        ) : null}
                    </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-0 mb-0 md:mb-0">
                     <label className="" htmlFor="presentation">Fichier presentation(<span className="text-red-500">.ppt , .pptx</span>) </label>
                    <input
                        ref={inputRef}
                        className="appearance-none block w-full bg-white text-gray-600 border rounded py-2 px-3 mb-2 leading-tight focus:outline-none focus:bg-white focus:border-blue" 
                        id="presentation" 
                        type="file"
                        name="presentation"
                        accept='.ppt , .pptx'
                        onChange={(event) => {
                            const file = event.currentTarget.files[0];
                            if (!file.type.match(presentationMimeType) ) {
                                toast.current.show({severity : 'danger' , summary:'Faild' , detail:'mime type du fichier presentation est invalide' , life:'3000'});
                                return;
                            }
                            formik.setFieldValue("presentation", event.currentTarget.files[0])
                            }}
                        />
                        {formik.touched.presentation && formik.errors.presentation ? (
                            <div className="text-red-500 text-xs italic">{formik.errors.presentation}</div>
                        ) : null}
                    </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-0 mb-0 md:mb-0">
                     <label className="" htmlFor="videoDemo">Fichier videoDemo(<span className="text-red-500">.avi , .mpeg , .ogv , .mp4</span>) </label>
                    <input
                        ref={inputRef}
                        className="appearance-none block w-full bg-white text-gray-600 border rounded py-2 px-3 mb-2 leading-tight focus:outline-none focus:bg-white focus:border-blue" 
                        id="videoDemo" 
                        type="file"
                        name="videoDemo"
                        accept='.avi , .mpeg , .ogv , .mp4'
                        onChange={(event) => {
                            const file = event.currentTarget.files[0];
                            if (!file.type.match(videoMimeType) ) {
                                toast.current.show({severity : 'danger' , summary:'Faild' , detail:'mime type du fichier video est invalide' , life:'3000'});
                                return;
                            }
                            formik.setFieldValue("videoDemo", event.currentTarget.files[0])
                            }}
                        />
                        {formik.touched.videoDemo && formik.errors.videoDemo ? (
                            <div className="text-red-500 text-xs italic">{formik.errors.videoDemo}</div>
                        ) : null}
                    </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-0 mb-0 md:mb-0">
                     <label className="" htmlFor="codeSource">Fichier codeSource(<span className="text-red-500">.zip , .rar</span>) </label>
                    <input
                        ref={inputRef}
                        className="appearance-none block w-full bg-white text-gray-600 border rounded py-2 px-3 mb-2 leading-tight focus:outline-none focus:bg-white focus:border-blue" 
                        id="codeSource" 
                        type="file"
                        name="codeSource"
                        accept='.zip , .rar'
                        onChange={(event) => {
                            const file = event.currentTarget.files[0];
                            if (!file.type.match(codeMimeType) ) {
                                toast.current.show({severity : 'danger' , summary:'Faild' , detail:'mime type du fichier codeSource est invalide' , life:'3000'});
                                return;
                            }
                            formik.setFieldValue("codeSource", event.currentTarget.files[0])
                            }}
                        />
                        {formik.touched.codeSource && formik.errors.codeSource ? (
                            <div className="text-red-500 text-xs italic">{formik.errors.codeSource}</div>
                        ) : null}
                    </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-0 mb-0 md:mb-0">
                        <label className='' htmlFor="title">Prix</label>
                        <InputText
                            className=" bg-white text-gray-600 border py-2 leading-tight focus:outline-none focus:bg-white" 
                            id="prix" 
                            type="number"
                            placeholder="prix du projet" 
                            {...formik.getFieldProps('prix')}
                        />
                        {formik.touched.prix && formik.errors.prix ? (
                            <div className="text-red-500 text-xs italic">{formik.errors.prix}</div>
                        ) : null}
                    </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6 pt-3">
                        <div className="flex justify-between w-full px-3">
                            <button className="shadow bg-indigo-600 hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-6 rounded" type="submit">
                                {formik.isSubmitting ? "Updating..." : "Modifier projet"}
                            </button>
                        </div>
                    </div>
                </form>
               )} 
                </Formik>
             </Dialog>
            :
            null
            }
            <Dialog visible={deleteProjetDialog} style={{ width: '450px' }} header="Confirmer" modal footer={deleteProjetDialogFooter} onHide={hideDeleteProjetDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle text-red-400 mr-3" style={{ fontSize: '2rem'}} />
                    {projet && <span>??tes-vous s??r de vouloir supprimer <b>{projet.title}</b>?</span>}
                </div>
            </Dialog>
        </div>
    </>
  )
}

export default ProjetByCategory
