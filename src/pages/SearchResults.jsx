import React  , {useState , useEffect  , useRef} from 'react';
import { Link  , useNavigate} from 'react-router-dom';
import {useLocation} from 'react-router-dom';
import {GetSearchResults , GetSearchProjets , GetSearchCategorys} from '../services/SearchService';
import SearchCategories from '../components/SearchCategories';
import SearchProjets from '../components/SearchProjets';

const SearchResults = () => {
    const url = 'https://projet-apis.herokuapp.com/api/v1/file';

    const navigate = useNavigate();
    const location = useLocation();
    const query = new URLSearchParams(location.search).get("q");
    const [results , setResults] = useState([]);
    const [projets , setProjets] = useState([]);
    const [categories , setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [first, setFirst] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0);
    const rows = useRef(6);
    const [firstP, setFirstP] = useState(0);
    const [totalRecordsP, setTotalRecordsP] = useState(0);
    const rowsP = useRef(3);
    const datasource = useRef(null);
    const isMounted = useRef(false);
   

    useEffect(() => {
      if (isMounted.current) {
          setTimeout(() => {
              setLoading(false);
          }, 1000);
      }
  }, [loading]); // eslint-disable-line react-hooks/exhaustive-deps


  return (
    <div className=" ">
      {/* <div className=" ">
          <SearchCategories query={query} />
      </div> */}
      <div className=" ">
      <SearchProjets query={query} />
      </div>
    </div >
  )
}

export default SearchResults
