import React, { useState } from 'react'
import './readingmodal.css'

export const ReadingModal = ({setShowReadingModal, readArt}) => {

    

    return (
        <div className="readingModBckd">
            <div className="readingBox">
                <div className="closeReadingBox" onClick={()=> setShowReadingModal(false)} ><i class="fas fa-times"></i></div>
                <h1 className="readingTitle">{readArt.title}</h1>
            <div className="titleSubtitle">
                <p className="readingSubtitle">{readArt.subtitle}</p>
            </div>
            <ul className="commentList">
            <label htmlFor="" className="readingComments">Comments: {readArt.comments.length}</label>
                
                {(readArt.comments.length > 0) ? readArt.comments.map((el, idx)=> <div><hr /><li key={idx} className="commentListItem">{el.comment}</li></div> )
                : <div><hr /><li className="commentListItem">No comments for this article yet.</li></div>}
                
                <hr />
            </ul>
            </div>
        </div>
    )
}
