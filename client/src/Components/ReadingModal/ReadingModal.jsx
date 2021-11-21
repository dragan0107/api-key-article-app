import React, { useState } from 'react'
import './readingmodal.css'

export const ReadingModal = ({setShowReadingModal, readArt}) => {

    

    return (
        <div className="readingModBckd">
            <div className="readingBox">
                <h1 className="readingTitle">{readArt.title}</h1>
                <div className="closeReadingBox" onClick={()=> setShowReadingModal(false)} ><i class="fas fa-times"></i></div>
                <p className="readingSubtitle">{readArt.subtitle}</p>
            <label htmlFor="" className="readingComments">Comments: {readArt.comments.length}</label>
            <ul className="commentList">
                
                {(readArt.comments.length > 0) ? readArt.comments.map((el, idx)=> <div><hr /><li key={idx} className="commentListItem">{el.comment}</li></div> )
                : <div><hr /><li className="commentListItem">No comments for this article yet.</li></div>}
                
                <hr />
            </ul>
            </div>
        </div>
    )
}
