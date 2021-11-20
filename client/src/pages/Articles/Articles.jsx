import React, { useContext, useEffect, useState } from 'react'
import SingleArt from '../../Components/SingleArticle/SingleArt'
import "./articles.css"
import axios from 'axios'
import { useLocation } from 'react-router';
import { Context } from '../../Context/Context';


export default function Articles({articles}) {

    const {user} = useContext(Context);

    const [arts, setArts] = useState([]);
    const [loading, setLoading] = useState(false)
    
    const location = useLocation().search;
    const key = new URLSearchParams(location);
    const apiKey = key.get('apikey')
    //We are extracting the apikey from the request URL looking something like '/public/articles?apikey=10209124912804'

        
    const url = `public/getArticles?apikey=${apiKey}`

    useEffect(()=> {

        const getArticles = async () => {
            setLoading(true)
            try {
                const res = await axios.get(user ? '/getArticles' : url);
                setArts(res.data.data); 
                setLoading(false);
            } catch (err) {
                console.log(err);
            }
        }
        getArticles();
    },[])    
        


    return (
        <div className="articles">
            {loading ? <img className="loadingImg "src="https://icon-library.com/images/spinner-icon-gif/spinner-icon-gif-26.jpg" alt="" /> 
            : arts.map((el, idx) => <SingleArt article={el}/>)}
        </div>
    )
}
