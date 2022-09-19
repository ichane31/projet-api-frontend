import React  , {useState , } from 'react';
import { Link  , useNavigate} from 'react-router-dom';
import {useLocation} from 'react-router-dom';


const Search = () => {
    
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const url = location.pathname;
    console.log(location)
    const nav = () => {
        navigate(`/Results?q=${search}`);
    }
  return (
    <div className="input-group search-box ">
        <input type="seach" className='  form-control text-black focus:bg-gray-700'  aria-label='Search' 
            placeholder='Chercher ici .....'
            onChange={(event) => {
            setSearch(event.target.value)} }
         />
        <div className="input-group-append ">
            <button type='submit' className='bg-primary border-0 px-3' onClick={nav} > <i className="pi pi-search text-white bg-blue"/> </button>
        </div>
    </div>
  )
}

export default Search
