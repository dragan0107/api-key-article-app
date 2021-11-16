import React from 'react'
import './article_modal.css'

export default function Article_modal({setShowArt}) {
    return (
        <div className="modalBackground">

        <div className="artModal">
        <h3>Add new article.</h3>
        <div className="closeIcon" onClick={()=>setShowArt(false)}><i class="fas fa-times"></i></div>
        <div className="wrap">

            <label htmlFor="">Title</label>
            <input type="text" className="titleInput" />
            <label htmlFor="">Subtitle</label>
            <textarea name="" id="" cols="30" rows="10"></textarea>
            <input type="file" className="fileInput"/>
            <button type="submit" class="btn btn-success">ADD!</button>
        </div>
        </div>
        </div>
    )
}
