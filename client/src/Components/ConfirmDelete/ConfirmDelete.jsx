import React from 'react'
import './confirmDelete.css'
import axios from 'axios'

export const ConfirmDelete = ({setConfirmDel, articleId, setArticleId, setPostedComm, postedComm}) => {

    const handleClick = async()=> {
        setPostedComm(true);
        try {
            await axios.delete(`/deleteArticle/${articleId}`);
            setPostedComm(false);
            setArticleId('')
            setConfirmDel(false)
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className="confirmBackground">
            <div className="dialogBox">
                <p className="infoMsg">Are you sure you want to delete this article?</p>
                <div className="btns">
                    <button className="confirmBtn noBtn" onClick={()=> {setConfirmDel(false); setArticleId('')}}><span className="confirmSpan">No <i class="fas fa-times"></i></span></button>
                    <button className="confirmBtn yesBtn" onClick={handleClick}><span className="confirmSpan">Yes <i class="fas fa-check"></i></span></button>
                </div>
            </div>
        </div>
    )
}
