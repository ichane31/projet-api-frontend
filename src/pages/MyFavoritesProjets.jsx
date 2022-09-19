import React, { useState, useEffect, useRef } from 'react';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import {AllFavoriteProjets ,UnFavProjet} from '../services/ProjetService';
import parse from 'html-react-parser';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import Helmet from 'react-helmet';
import {getItemFromStorage , numFormatter} from '../helpers/helper';
import projet0 from '../data/projet0.jpg';
import {useAuth} from '../hoc/useAuth';
import '../css/Fav.css';

const MyFavoritesProjets = () => {

    const url = 'https://projet-apis.herokuapp.com/api/v1/file';
    const [projets, setProjets] = useState(null);

    const [loading, setLoading] = useState(true);
    const [first, setFirst] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0);
    const rows = useRef(6);
    const datasource = useRef(null);
    const isMounted = useRef(false);
    const token = getItemFromStorage('token');
    const {user} = useAuth();
    

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
            AllFavoriteProjets(token).then(data => {
                datasource.current = data;
                setTotalRecords(data.length);
                setProjets(datasource.current.slice(0, rows.current));
                setLoading(false);
                console.log(projets)
            });
        }, 1000);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const onPage = (event) => {
        setLoading(true);

        //imitate delay of a backend call
        setTimeout(() => {
            const startIndex = event.first;
            const endIndex = Math.min(event.first + rows.current, totalRecords - 1);
            const newProjets = startIndex === endIndex ? datasource.current.slice(startIndex) : datasource.current.slice(startIndex, endIndex);

            setFirst(startIndex);
            setProjets(newProjets);
            setLoading(false);
        }, 1000);
    }
    const unfavProjet = async (projetId ) => {
        
        const updateProjets = projets.filter((p) => p.id !== projetId);
        try {
            let res = await UnFavProjet(projetId  ,token)
            if (!res.ok){
                if(Array.isArray(res) && res.length === 0) return "error";
                let r =  res.json()
                throw r[0].message;
            }
            else{
                setProjets(updateProjets) 
                toast.current.show({ severity: 'success', summary: 'Réussi', detail: 'Projet supprimé des favoris', life: 3000 });    
            }
        } catch (error) {
            
        }
    }

    const FavoriteAction = ({projet}) => {
        const favorited = projet?.favoritedBy?.filter(f => (f.id === user.id)).length ;
        return (
                <button  className=" text-dark" onClick={() => unfavProjet(projet.id)}>
                    {favorited ===0 ?
                  <i  className="pi pi-heart-fill  projet-category-icon" />
                  :
                  <i  className="pi pi-heart-fill text-danger projet-category-icon" />
                    }
                </button>
            ) 
        }

    const renderGridItem = (data) => {
        return( 
            <div className="d-flex">
                <div className="projet-grid-item card">
                    <div className="projet-grid-item-top">
                        <div>
                        <div>
                            <FavoriteAction projet={data}></FavoriteAction>
                            <span className="projet-notes">{ numFormatter(data.favoritesCount)}  </span>
                        </div>
                        </div>
                     
                    </div>
                    <div className="projet-grid-item-content">
                            {data.image ?
                        <img src={`${url}/${data.image}`} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={data.name} />
                        :
                        <img src={projet0} alt="" />}
                            <div className="projet-title"><a href={`/${data.id}/ProjetDetail`}>{data.title}</a></div>
                            {data?.description ? 
                        <div className="projet-description">{parse(data.description)}</div>:
                        <div className="projet-description">{data.description}</div>}
                        
                    </div>
                    <div className="projet-grid-item-bottom">
                        <span className="projet-price">${data.prix}</span>
                        <button  label="Consulter"> <a className="btn border-dark ch_btn" href={`/${data.id}/ProjetDetail`}>Consulter</a> </button>
                    </div>
                    <div className="projet-grid-item-contact">
                        <div>
                           {data.prix !==0 ?
                            <button type="submit" > <a href={`mailto:${data?.author?.email}`} className='btn'> Contacter l'auteur</a> </button>: null 
                        }
                        </div>
                    </div> 
                </div>
            </div>
        )
    } 


  return (
    <>
      <Helmet>
            <script>
                document.title = "Mes Projets Favorits"
            </script>
      </Helmet>
      <div>
      <h3 className="projets mt-5"></h3>
      <div className="dataview-projet">
         {projets?.length !== 0? 
            <DataView value={projets} 
            itemTemplate={renderGridItem} lazy paginator paginatorPosition={'bottom'} rows={rows.current}
            totalRecords={totalRecords} first={first} onPage={onPage} loading={loading} />
        :
        <div> <h3>Aucun Favoris</h3> </div>
        }
       </div>
      </div>
      
    </>
  )
}

export default MyFavoritesProjets
