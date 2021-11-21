import React, { useContext, useEffect, useState } from 'react'
import SingleArt from '../../Components/SingleArticle/SingleArt'
import "./articles.css"
import axios from 'axios'
import { useLocation } from 'react-router';
import { Context } from '../../Context/Context';
import Pagination from '../../Components/Pagination/Pagination';


export default function Articles({articles}) {

    const {user} = useContext(Context);

    const [arts, setArts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(4);
    
    const location = useLocation().search;
    const key = new URLSearchParams(location);
    const apiKey = key.get('apikey')
    //We are extracting the apikey from the request URL looking something like '/public/articles?apikey=10209124912804'

    const url = `getArticles?apikey=${apiKey}`;

    useEffect(()=> {

        const getArticles = async () => {
            setLoading(true)
            try {
                const res = await axios.get(user ? '/getArticles' : url);
                setArts(res.data.data);
                console.log(res); 
                setLoading(false);
            } catch (err) {
                setLoading(false);
                // console.log(err);
            }
        }
        getArticles();
    },[])    
        
    const idxOfLastPost = currentPage * postsPerPage;
    const idxOfFirstPost = idxOfLastPost - postsPerPage;
    const currentPosts = arts.slice(idxOfFirstPost,idxOfLastPost);

    return (
        <div className="articles">
             <div className="pageSelectors">
                <Pagination postsPerPage={postsPerPage} totalPosts={arts.length} setPage={setCurrentPage}/>
            </div>
            {loading ? <img className="loadingImg "src="https://icon-library.com/images/spinner-icon-gif/spinner-icon-gif-26.jpg" alt="" /> 
            : currentPosts.map((el, idx) => <SingleArt article={el}/>)}
            
        </div>
    )
}
