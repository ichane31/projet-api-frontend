import React  , {useState , useEffect , useRef} from 'react';
import { GetSearchProjets ,PostSearchProjets} from '../services/SearchService';
import Helmet from 'react-helmet';
import { DataView, } from 'primereact/dataview';
import parse from 'html-react-parser';
import '../css/Projets.css';
import projet0 from '../data/projet1.jpg';


const SearchProjets = ({query}) => {
    const url = 'https://projet-apis.herokuapp.com/api/v1/file';
    const [projets , setProjets] = useState([]);
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
      
    } , [loading])

    useEffect(() => {
        setTimeout(() => {
            isMounted.current = true;
            GetSearchProjets(query).then(data => {
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
            const newProducts = startIndex === endIndex ? datasource.current.slice(startIndex) : datasource.current.slice(startIndex, endIndex);

            setFirst(startIndex);
            setProjets(newProducts);
            setLoading(false);
        }, 1000);
    }
    console.log(projets)
    const renderGridItem = (data) => {
        return (
            <>
            <Helmet>
                <script>
                    document.title = "Search results Projets"
                </script>
            </Helmet>
            <div className="d-flex">
                <div className="projet-grid-item card">
                    <div className="projet-grid-item-top">
                        <div>
                            <i className="pi pi-tag projet-category-icon"></i>
                            <span className="projet-category">{data.category?.name}</span> 
                        </div>
                     
                    </div>
                    <div className="projet-grid-item-content">
                        {data.image ?
                    <img src={`${url}/${data.image}`} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={data.name} />
                    :
                    <img src={projet0} alt="" />}
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
                </div>
            </div>
               
            </>
        );
    }

    return (
        
        <div className="dataview-projet">
             
             {/* <div className="card-group">  */}
             {projets.length > 0 ?
                <DataView value={projets} 
                        itemTemplate={renderGridItem} lazy paginator paginatorPosition={'bottom'} rows={rows.current}
                        totalRecords={totalRecords} first={first} onPage={onPage}  loading={loading} 
                        />
                :
                <div className="justify-center">
                    <div className='search_icon_not'> <i className= 'pi pi-search' > </i> </div>
                    <h3 className='mt-4'>Aucun résultat trouvé</h3>
                    <div className='messageNot'>
                       <p>Nous n'avons pas trouvé ce que vous cherchez.Essayez d'utiliser d'autres mots.</p>
                    </div> 
                </div>
                
             }
              {/* </div>   */}
            
            
        </div>
    );
}

export default SearchProjets
