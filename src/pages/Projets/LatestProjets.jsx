import React , {useState, useEffect} from 'react';
import {Carousel} from 'primereact/carousel';
import {LatestsProjets} from '../../services/ProjetService';
import projet0 from '../../data/projet0.jpg';
import '../../css/LatestProjets.css';
import '../../css/Projets.css';
import Projets from './Projets';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

const LatestProjets = () => {

    const url = 'https://projet-apis.herokuapp.com/api/v1/file';
    const [projets , setProjets] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    const responsiveOptions = [
        {
            breakpoint: '1200px',
            numVisible: 2,
            numScroll: 2
        },
        {
            breakpoint: '1024px',
            numVisible: 2,
            numScroll: 2
        },
        
        {
            breakpoint: '940px',
            numVisible: 2,
            numScroll: 2
        },
        {
            breakpoint: '800px',
            numVisible: 1,
            numScroll: 1
        },
        {
            breakpoint: '480px',
            numVisible: 1,
            numScroll: 1
        }
    ];

    useEffect(() => {
        setIsLoading(true);
        LatestsProjets(10).then((data) => {setProjets(data) ,
            setIsLoading(false);});
    } , []);

    console.log(projets)

    const createdAt = (projet) => {
        return new Date(projet.createdAt).toLocaleDateString();
    };
    const ProjetTemplate = (projet) => {
        return (
            <div className="d-flex mb-5 items-center justify-content-center">
                <div className="projet-grid-item card">
                    {/* <div className="card_header">
                        <span>Projet</span>
                        <hr/>
                    </div> */}
                    <div className="projet-grid-item-top">
                        <div>
                            <i className="pi pi-tag projet-category-icon"></i>
                            <span className="projet-category">{projet.category}</span>
                        </div>
                     
                    </div>
                    <div className="projet-grid-item-content">
                        {projet.image ?
                    <img src={`${url}/${projet.image}`} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={projet.name} />
                    :
                    <img src={projet0} alt="" />}
                        <div className="projet-title"><a href="/Projet">{projet.title}</a></div>
                        <div className="projet-description">{projet.description}</div>
                        
                    </div>
                    <div className="projet-grid-item-bottom">
                        {projet.prix === 0 ?
                        <span className="text-success fs-5">gratuit</span> 
                    :
                    <span className="projet-price">${projet.prix}</span>  }
                        <button  label="Consulter"> <a className="btn border-dark ch_btn" href={`/${projet.id}/ProjetDetail`}>Consulter</a> </button>
                    </div>
                    <div className="projet-grid-item-comment mb-4">
                        <div>
                           <span className="projet-comments"> <a href="/Comment">{projet.Comments} Commentaires</a> </span>
                        </div>
                        <div>
                           <span className="projet-notes"> <a href="/Note">{projet.notes} Notes</a> </span>
                        </div>
                    </div>
                    <div className="author">
                       {projet.author != null ?
                       <>
                       <h6>{projet.author.firstname} </h6> 
                       </>:
                       <><h6> Ichane roukeya</h6> </>} 
                       <small>{createdAt(projet)}</small>
                    </div>
                </div>
            </div>
        )
    }
  
    return (
        <>
            <div className="carousel mt-5">
                <h2 className="der_h2 mt-3">Derniers <span className="derniers">Projets</span></h2>
                <hr />
                {!isLoading ?
                <div className="owl-carousel owl-theme mt-5">
                <Carousel value={projets} numVisible={3} numScroll={1} responsiveOptions={responsiveOptions} className="custom-carousel" circular
                    autoplayInterval={3000} itemTemplate={ProjetTemplate}  />
                </div>
                :
                <div className=" py-4">
                <div className="flex flex-wrap justify-between mb-3">
                    <div className='flex'>
                        <div className='mr-3'>
                            <Skeleton width={100} height={50}/>
                        </div>
                        <div>
                            <Skeleton width={100} height={50}/>
                        </div>
                    </div>
                    <div className='pr-3'>
                        <Skeleton width={150} height={50}/>
                    </div>
                </div>
                <Skeleton height={30}/>
                <Skeleton count={8} height={25}/>
                <div className="flex flex-wrap justify-between mb-3">
                    <div className='flex'>
                        <div className='mr-3'>
                            <Skeleton width={100} height={50}/>
                        </div>
                        <div>
                            <Skeleton width={100} height={50}/>
                        </div>
                    </div>
                    <div className='pr-3'>
                        <Skeleton width={150} height={50}/>
                    </div>
                </div>
                <Skeleton height={30}/>
                <Skeleton count={8} height={25}/>
            </div>
                }
     
            </div>
            <div>
                <Projets/>
            </div>
        </>
  )
}

export default LatestProjets
