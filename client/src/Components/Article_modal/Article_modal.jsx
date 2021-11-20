import React, { useState } from 'react'
import './article_modal.css'
import axios from 'axios'

export default function Article_modal({setShowArt}) {

    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [img, setImg] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        try {
            const res = axios.post('/addArticle', {
                title: title,
                subtitle: subtitle,
                image: img
            });
            window.location.replace('/articles');

        }catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="modalBackground">

        <div className="artModal">
        <h3>Add new article.</h3>
        <div className="closeIcon" onClick={()=>setShowArt(false)}><i class="fas fa-times"></i></div>
        <div className="wrap">
        <form action="" onSubmit={handleSubmit}>

            <label htmlFor="">Title</label>
            <input type="text" className="titleInput" onChange={(e)=> setTitle(e.target.value)}/>
            <label htmlFor="">Subtitle</label>
            <textarea name="" id="" cols="30" rows="10" onChange={(e)=> setSubtitle(e.target.value)}></textarea>
            <input type="file" className="fileInput"/>
            <button className="addButton" type="submit" class="btn btn-success">ADD!</button>
        </form>
        </div>
        </div>
        </div>
    )
}
