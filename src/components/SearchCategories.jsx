import React  , {useState , useEffect , useRef} from 'react';
import { GetSearchCategorys} from '../services/SearchService';
import Helmet from 'react-helmet';
import { DataView, } from 'primereact/dataview';
import '../css/Categories.css'


const SearchCategories = ({query}) => {
    const url = 'https://projet-apis.herokuapp.com/api/v1/file';
    const [categories , setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [first, setFirst] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0);
    const rows = useRef(6);
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
            GetSearchCategorys(query).then(data => {
                datasource.current = data;
                setTotalRecords(data.length);
                setCategories(datasource.current.slice(0, rows.current));
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
            setCategories(newProducts);
            setLoading(false);
        }, 1000);
    }

    const renderGridItem = (data) => {
        return (
            <>
            <Helmet>
                <script>
                    document.title = "Search results Categories"
                </script>
            </Helmet>
             <div className="d-flex">
                <div className="category-grid-item card" >
                    <div className="category-grid-item-content">
                    <img src={`${url}/${data.image}`} onError={(e) => e.target.src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC8AAAAvCAYAAABzJ5OsAAAABmJLR0QA/wD/AP+gvaeTAAAE9ElEQVRoge2Ze2xTVRzHP/f2tmtHH2u3sQePhQ3lsYSgPEJC1EEIiCivgRgICzImI0wIExAVNJI4EzATGTrCIwoBIYIhIcFACCgKiCAvN2JiEGGQzbCtZYy+H9c/yupK260bhULS7z899/f7nfP73HNOT36nFQaMnqzD66sUoBAw8uTLAuxXqDXl0n3wBfEm6oKMQInXYUcUYHq8abqpQgkwtT2VyhZyfS4ADotajgs9ABjUy0rZy3UAuDwCy3YMDIzgfQkwCgAItTLi1ceEDiap/VOuz0U+TgAuoA7YdRoPQ3JaAT98e8npIPf0txXXBUB+hLzBEh9bpkegoJk/LGoDM17TbuZvmdVsO9YbAI8veObFWgG0/tkWGoJ9j1rCwFGvPr51jrGe7m0zVHbEm6HbEv4eMSSxbeKhBHy8lICPlxLw8VJ08IKAZuQoEKMLV6Snk/xiAT0KxqLsm9MFGtGfR4iuRpI6DwHDrNmklq+kYVEx9vO/R86tN5D27gdox40PAnBcPE/jJx/jrrvRYR5j8UKMJaXcmj0T19W/Hh5eYUjBuGAh7uvXcFy+FBlcqyV7y9eocvOwnjiO7cRPyE4H6uEj0U+ZTvb2ndQXF0V8ASkjk5S583D+eQXXtehuNJ3CmxYvQdQbuL3mPWSPJ2KcceFiVLl5NH++npY9uwL2e0ePYD12lKyN1aS//yH1pcVh+6cuW4GgUtG0rgJ8vqjgO9zESQMGops8DeuJH7H9eipinCBJ6CZNxllbQ8ve3SF++9kz3D2wH/Xzw1H26Rvi1wwbQY+x42g9dBDnldqowDuGFwRSy1cie72YN1aiMJrQvTYlbKiUkYmo1WK/cA7k8HWe7fRJAFT9n3mAQCT1nZX4bFbM1VVIGZloJ7zycPDa8RNRPzeMll07cN+sQztxEulr1qLs3Sf0PdX+W5fXYomYSLbb/bEaTZBdP2MWqv7PYtm6GW9TE7pphfRcW4Go03cPXlCrMS1egqfxNnd2bPfbJKXfKUV1QEUlUW/AWFKK+2Ydd/ftvZ9HAkHwf3bWP5zR+GYJUmYW5qoN+Gy2mME+KNOiMhSGFJor1yG7XF3uHwKv7NUbw5y5OGouc+/IDzGBDCdVbh66qYXYTv6M7dQv3RojZG1Mby9DUCUhSBIZFesCdmVOPwDSylfgs1oB8DQ3Y97wWbcSpy5fhaBQIOr1ZHy6PmBv+0Knr/4osBru+nrMmzaEHAYh8ApTKgBJg/JJGpQfklQzanSg7bWYubNtc+BcFhQd7NO20sLrj1WkpgGgHjI0bHjyCwWBtuffBixbq5EdwfftkGz1b80LO1hK0XxMZUu5+fpU3Nf/CfLJPhlkGVVuXkT2tlPK29QIwK1Z08LGmcqWklI0nxsTxuC1mCOOBzGqKn13W3BeqSW5YAxSVnaIX1CrMcwpwtfaiqPmj1ikBGJYEpurqxDVGrK++JKkwf9vNykrm8zKKpR9+mLZ8hWyyxmrlNFVldHIfu43GivWkrZqNb2++RZ33Q1ktxtVv1wQRVp276Tluz2xSgd0Ad5x8Tz2M6fxNNRHjGk9eADHpQvoZ75B0uB8BKWK1kMH/fYOKtL2sp87izKnH96WO53GJn50ipcS8PFSAj5eSsDHS089fMel25MrsyjD9/Gm6JYEeZ/ktHnLNcmSLCPPoN1f+U+wzAjyPofVt/w/cSyJn0mj7McAAAAASUVORK5CYII="} alt={data.name} />
                        <div className="category-name"> <a href="/Projet">{data.name}</a> </div>
                        <div className="category-description">{data.description}</div>
                    </div>
                    <div className="category-grid-item-bottom">
                       <div className="ch_card_body">
                         <a href={`/Categories/${data.id}/ProjetByCategory`} className="btn border-dark ch_btn">Explorer</a>
                       </div>
                        <div className="category-projet">
                         <span className="mx-2"> <a href={`/Categories/${data.id}/ProjetByCategory`}>{data.projets} Projets</a> </span>
                        </div>
                    </div>
                </div>
            </div> 
               
            </>
        );
    }

    return (
        
        <div className="dataview-category">
            
             {/* <div className="card-group">  */}
                {categories.length > 0 ? 
                    <DataView value={categories} 
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

export default SearchCategories
