import React, { useState, useEffect, useRef } from 'react';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import Helmet from 'react-helmet';
import {GetProjets} from '../../services/ProjetService';
import '../../css/Projets.css';
import projet0 from '../../data/projet0.jpg';

const Projets = () => {
    const url = 'https://projet-apis.herokuapp.com/api/v1/file';
    const [projets, setProjets] = useState(null);
    const [layout, setLayout] = useState('grid');
    const [loading, setLoading] = useState(true);
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
            GetProjets().then(data => {
                datasource.current = data;
                setTotalRecords(data.length);
                setProjets(datasource.current.slice(0, rows.current));
                setLoading(false);
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


    const renderGridItem = (data) => {
        return( 
            <div className="d-flex">
                <div className="projet-grid-item card">
                    <div className="projet-grid-item-top">
                        <div>
                            <i className="pi pi-tag projet-category-icon"></i>
                            <span className="projet-category">{data.category}</span>
                        </div>
                     
                    </div>
                    <div className="projet-grid-item-content">
                        {data.image ?
                    <img src={`${url}/${data.image}`} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={data.name} />
                    :
                    <img src={projet0} alt="" />}
                        <div className="projet-title"><a href="/Projet">{data.title}</a></div>
                        <div className="projet-description">{data.description}</div>
                        
                    </div>
                    <div className="projet-grid-item-bottom">
                        <span className="projet-price">${data.prix}</span>
                        <button  label="Consulter"> <a className="btn border-dark ch_btn" href="">Consulter</a> </button>
                    </div>
                    <div className="projet-grid-item-comment">
                        <div>
                           <span className="projet-comments"> <a href="/Comment">{data.Comments} Commentaires</a> </span>
                        </div>
                        <div>
                           <span className="projet-notes"> <a href="/Note">{data.notes} Notes</a> </span>
                        </div>
                    </div>
                </div>
            </div>
        )
    } 

    const renderHeader = () => {
        // let onOptionChange = (e) => {
        //     setLoading(true);
        //     setLayout(e.value);
        // };

        return (
            <div>
                <div style={{ textAlign: 'right' }}>
                    <button className="btn btn-success bg-white text-white"> <a href="/NewProjet">Ajouter un Projet</a> </button>
                </div>
                {/* <div style={{ textAlign: 'left' }}>
                    <DataViewLayoutOptions layout={layout} onChange={onOptionChange} />
                </div> */}
            </div>
        );
    }

    const header = renderHeader();
  return (
    <>
      <Helmet>
            <script>
                document.title = "ProjetsPage"
            </script>
      </Helmet>
      <h3 className="projets">Tous les projets</h3>
      <div className="dataview-projet">
            {/* <div className="card"> */}
                <DataView value={projets} layout={layout} header={header}
                        itemTemplate={renderGridItem} lazy paginator paginatorPosition={'bottom'} rows={rows.current}
                        totalRecords={totalRecords} first={first} onPage={onPage} loading={loading} />
            {/* </div> */}
            
        </div>
    </>
  )
}

export default Projets
