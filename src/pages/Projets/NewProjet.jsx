import React, {useRef , useState, useEffect} from 'react'
import Helmet from "react-helmet"
import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import {Editor} from 'primereact/editor';
import { Formik, Field} from 'formik';
import * as Yup from 'yup';
import {GetCategory } from '../../services/CategoryService';
import {PostProjet} from '../../services/ProjetService';
import '../../css/Form.css';
import {getItemFromStorage} from '../../helpers/helper';

export default function NewProjet (){
    const [categories, setCategories] = useState([]);
    const toast = useRef(null);

    useEffect(() => {
        GetCategory().then(data => setCategories(data));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const inputRef = useRef(null);

    const resetFileInput = () => {
        inputRef.current.value = null;
    };

    const imageMimeType = /image\/(png|jpg|jpeg)/i;
    const resumeMimeType = /application\/(msword|vnd.oasis.opendocument.text |vnd.openxmlformats-officedocument.wordprocessingml.document) | text\/plain/i;
    const rapportMimeType = /application\/(pdf|msword|vnd.openxmlformats-officedocument.wordprocessingml.document)/i;
    const presentationMimeType =/application\/(vnd.ms-powerpoint|vnd.openxmlformats-officedocument.presentationml.presentation)/i ;
    const videoMimeType =/video\/(x-msvideo|mpeg|ogg|mp4)/i ;
    const codeMimeType = /application\/(zip|vnd.rar)/i;


    return (
        <>
        <Helmet>
            <script>
                document.title = "Nouveau Projet"
            </script>
        </Helmet>
        <Toast ref={toast} />

        <div className="flex justify-content-center border-2 p-3 m-20 bg-gray-200">
        <div className="max-w-screen-md mx-auto p-5">
        <h5 className="text-center ">Nouveau projet</h5>
          
        <Formik 
            initialValues = {{title:'' , description:'' , category:'' ,image:'' , resume:'',rapport:'',presentation:'',videoDemo:'',codeSource:'',prix:0}}
            validationSchema = {Yup.object({
                title: Yup.string()
                .min(10 , '10 characters or plus')
                // .max(40 , 'Must be 40 characters or less')
                .required('Required'),
                description: Yup.string()
                .max(250 , 'Must be 250 characters or less'),
                category: Yup.string()
                .required('Required'),
            })} 
            onSubmit= {async (values , {setSubmitting , resetForm}) =>  {
                let data = new FormData();
                for (let value in values) {
                    data.append(value, values[value]);
                }
                setSubmitting(true);
                const token = getItemFromStorage('token');
                var requestOptions = {
                    method: 'POST',
                    body: data,
                    headers: new Headers({"Authorization": "Bearer " + token}),
                    redirect: 'follow'
                };


                try{
                    let res = await PostProjet(requestOptions )
                    if (res.ok){
                        let d = await res.json();
                        toast.current.show({ severity: 'success', summary: 'Created!', detail: "Projet has been Created Successfully", life: 3000 });
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
                console.log(values);
                setSubmitting(false);
            }}
            >

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
                            onTextChange={(event) => {
                   
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
                        <label className='' htmlFor="category">Sélectionnez une Catégorie</label>
                        <Field 
                            id="category" name="category" as="select" 
                            value={formik.values.category ? formik.values.category : "Sélectionnez une Catégorie"} onChange={(e) => {formik.setFieldValue("category", e.target.value)}}
                            className="block w-full bg-white text-gray-700 border rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-info" 
                        >
                            <option disabled>Sélectionnez une Catégorie</option>
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
                     <label className="" htmlFor="image">Upload une image (png ,jpeg , jpg )</label>
                    <input
                        ref={inputRef}
                        className="input-group  appearance-none block w-full bg-white text-gray-600 border rounded py-2 px-3 mb-2 leading-tight focus:outline-none focus:bg-white active:border-info" 
                        id="image" 
                        type="file"
                        name="image"
                        accept='image/png ,image/jpeg'
                        onChange={(event) => {
                            const file = event.currentTarget.files[0];
                            if (!file.match(imageMimeType) ) {
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
                    </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-0 mb-0 md:mb-0">
                     <label className="" htmlFor="resume">Fichier résume(.doc , .docx , .odt , .txt) </label>
                    <input
                        ref={inputRef}
                        className="appearance-none block w-full bg-white text-gray-600 border rounded py-2 px-3 mb-2 leading-tight focus:outline-none focus:bg-white focus:border-blue" 
                        id="resume" 
                        type="file"
                        name="resume"
                        accept='.doc , .docx , .odt , .txt'
                        onChange={(event) => {
                            const file = event.currentTarget.files[0];
                            if (!file.match(resumeMimeType) ) {
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
                     <label className="" htmlFor="rapport">Fichier rapport(.pdf , .doc , .docx ) </label>
                    <input
                        ref={inputRef}
                        className="appearance-none block w-full bg-white text-gray-600 border rounded py-2 px-3 mb-2 leading-tight focus:outline-none focus:bg-white focus:border-blue" 
                        id="rapport" 
                        type="file"
                        name="rapport"
                        accept='.pdf , .doc , .docx '
                        onChange={(event) => {
                            const file = event.currentTarget.files[0];
                            if (!file.match(rapportMimeType) ) {
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
                     <label className="" htmlFor="presentation">Fichier presentation(.ppt , .pptx) </label>
                    <input
                        ref={inputRef}
                        className="appearance-none block w-full bg-white text-gray-600 border rounded py-2 px-3 mb-2 leading-tight focus:outline-none focus:bg-white focus:border-blue" 
                        id="presentation" 
                        type="file"
                        name="presentation"
                        accept='.ppt , .pptx'
                        onChange={(event) => {
                            const file = event.currentTarget.files[0];
                            if (!file.match(presentationMimeType) ) {
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
                     <label className="" htmlFor="videoDemo">Fichier videoDemo(.avi , .mpeg , .ogv , .mp4) </label>
                    <input
                        ref={inputRef}
                        className="appearance-none block w-full bg-white text-gray-600 border rounded py-2 px-3 mb-2 leading-tight focus:outline-none focus:bg-white focus:border-blue" 
                        id="videoDemo" 
                        type="file"
                        name="videoDemo"
                        accept='.avi , .mpeg , .ogv , .mp4'
                        onChange={(event) => {
                            const file = event.currentTarget.files[0];
                            if (!file.match(videoMimeType) ) {
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
                     <label className="" htmlFor="codeSource">Fichier codeSource(.zip , .rar) </label>
                    <input
                        ref={inputRef}
                        className="appearance-none block w-full bg-white text-gray-600 border rounded py-2 px-3 mb-2 leading-tight focus:outline-none focus:bg-white focus:border-blue" 
                        id="codeSource" 
                        type="file"
                        name="codeSource"
                        accept='.zip , .rar'
                        onChange={(event) => {
                            const file = event.currentTarget.files[0];
                            if (!file.match(codeMimeType) ) {
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
                                {formik.isSubmitting ? "Creating..." : "Créer un projet"}
                            </button>
                        </div>
                    </div>
                </form>
               )} 
            </Formik>
            </div>
        </div>
        </>
    )
}

