import React, { useState, useEffect, useRef } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import Helmet from "react-helmet"
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Formik} from 'formik';
import * as Yup from 'yup';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import {GetProjetsByUser , DelProjet } from '../services/ProjetService';

const MesProjets = () => {
    const url = 'https://lablib-api.herokuapp.com/api/v1/image';
    let emptyProjet = {
        id: null,
        title: '',
        description: '',
    };

    const [projets, setProjets] = useState(null);
    const [ProjetDialog, setProjetDialog] = useState(false);
    const [deleteProjetDialog, setDeleteProjetDialog] = useState(false);
    const [deleteProjetsDialog, setDeleteProjetsDialog] = useState(false);
    const [projet, setProjet] = useState(emptyProjet);
    const [selectedProjets, setSelectedProjets] = useState(null);
    const [filters, setFilters] = useState(null);
    const [globalFilter, setGlobalFilter] = useState('');
    const toast = useRef(null);
    const dt = useRef(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isDeleted, setIsDeleted] = useState(false);
    const [isEdited, setIsEdited] = useState(false);
    const [file, setFile] = useState(null);
    const [readFile , setReadFile] = useState(null);
    const [readFileDialog , setReadFileDialog] = useState(false);
    const [fileDataURL, setFileDataURL] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        GetProjetsByUser().then(data => {
            setProjets(data);
            setIsLoading(false);
        });
        initFilters();
        let fileReader, isCancel = false;
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

    const imageMimeType = /image\/(png|jpg|jpeg)/i;
    const resumeMimeType = /application\/(msword|vnd.oasis.opendocument.text |vnd.openxmlformats-officedocument.wordprocessingml.document) | text\/plain/i;
    const rapportMimeType = /application\/(pdf|msword|vnd.openxmlformats-officedocument.wordprocessingml.document)/i;
    const presentationMimeType =/application\/(vnd.ms-powerpoint|vnd.openxmlformats-officedocument.presentationml.presentation)/i ;
    const videoMimeType =/video\/(x-msvideo|mpeg|ogg|mp4)/i ;
    const codeMimeType = /application\/(zip|vnd.rar)/i;

    const inputRef = useRef(null);

    const resetFileInput = () => {
        inputRef.current.value = null;
    };

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };
        _filters['global'].value = value;
        setFilters( _filters);
        setGlobalFilter(value);
    }
    
    const clearFilter = () => {
        initFilters();
    }

    const initFilters = () => {
        setFilters({
            'global': { value: null, matchMode: FilterMatchMode.CONTAINS }, 
            'date': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
        });
        setGlobalFilter('');
    }

    const hideDialog = () => {
        setProjetDialog(false);
    }

    const hideFileDialog = () => {
        setReadFileDialog(false);
    }

    const hideDeleteCategoryDialog = () => {
        setDeleteProjetDialog(false);
    }

    const hideDeleteCategoriesDialog = () => {
        setDeleteProjetsDialog(false);
    }

    const editProjet = (projet) => {
        setProjet({...projet});
        setProjetDialog(true);
        setFileDataURL(false);
    }

    const setFileToRead = (file) => {
        setReadFile(file);
        setReadFileDialog(true);
    }

    const confirmDeleteCategory = (projet) => {
        setProjet(projet);
        setDeleteProjetDialog(true);
    }

    const deleteCategory = async () => {
        let _categories = projets.filter((val) => {
            val.id !== category.id;
        });
        setProjets(_categories);
        try{
            let res = await DelProjet(category.id)
            if (!res.ok){
                if(Array.isArray(res) && res.length === 0) return "error";
                let r = await res.json()
                throw r[0].message;
            }
            else{
                toast.current.show({ severity: 'success', summary: 'Réussi', detail: 'Projet supprimé avec succès', life: 3000 });
            }
        }
        catch (err){
            toast.current.show({ severity: 'error', summary: 'Failed', detail: err, life: 3000 });
        } 
        setIsDeleted(preIsDeleted => (!preIsDeleted));
        setDeleteProjetDialog(false);
        setProjet(emptyProjet);
    }

    return (
        <div ></div >  
    )

}
export default MesProjets;