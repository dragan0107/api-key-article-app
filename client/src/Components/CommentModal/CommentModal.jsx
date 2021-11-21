import axios from 'axios';
import React, { useRef, useState } from 'react'
import './commentmodal.css'

function CommentModal({setShowComment, articleId, setPostedComm}) {

    const commentRef = useRef();
    const [posting, setPosting] = useState(false);

    const handleSubmit = async e => {
        e.preventDefault();
        setPosting(true)
        setPostedComm(true)
        const data = {
            comment: commentRef.current.value,
            artId: articleId
        }
        try {
            await axios.post('/commentArticle', data);
            setPosting(false);
            setPostedComm(false)
        } catch (error) {
            setPosting(false)
        }
    }
    return (
        <div className="commentBoxBackground">
        <form action="" className="commentBox" onSubmit={handleSubmit}>
            <label htmlFor="" className="commentLabel">{posting ? 'Comment submitting...' : 'Input your comment!'}</label>
            <div className="closeCommentBox" onClick={()=> {
                setShowComment(false)
            }}><i class="fas fa-times"></i></div>
            <textarea ref={commentRef} className="commentInput" name="" id="" cols="30" rows="10"></textarea>
            <button className="submitCommentBtn btn btn-danger" type="submit">Submit Comment</button>
        </form>
        </div>
    )
}

export default CommentModal
