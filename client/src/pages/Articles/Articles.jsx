import React, { useEffect, useState } from 'react'
import SingleArt from '../../Components/SingleArticle/SingleArt'
import "./articles.css"
import axios from 'axios'


export default function Articles({articles}) {

    const [arts, setArts] = useState([]);



    useEffect(()=> {

        const getArticles = async () => {

            try {

                const res = await axios.get('/getArticles');
                setArts(res.data.data);
                console.log(arts);

            } catch (err) {
                console.log(err);
            }
        }
        getArticles();
    },[])    
        


    return (
        <div className="articles">
            {arts.map((el, idx) => <SingleArt article={el}/>)}
            
        </div>
    )
}
