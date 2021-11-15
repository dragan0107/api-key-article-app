import React from 'react'
import './article_modal.css'

export default function Article_modal() {
    return (
        <div className="artModal">
        <h3>Add new article.</h3>
        <div className="wrap">

            <label htmlFor="">Title</label>
            <input type="text" className="titleInput" />
            <label htmlFor="">Subtitle</label>
            <textarea name="" id="" cols="30" rows="10"></textarea>
            <input type="file" />
        </div>
        </div>
    )
}
