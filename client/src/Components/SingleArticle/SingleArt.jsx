import React, { useContext } from 'react';
import { Context } from '../../Context/Context';
import "./singleart.css";
// import { Link } from "react-router-dom";

export default function SingleArt({article, setShowComment, setArticleId, setShowReadingModal, setReadArt, setConfirmDel,setShowUpdateMod}) {

    const {user} = useContext(Context);


    return (
        // <div className="singleArt">
        //     <h1 className="artTitle">Article Title</h1>
        //     <p className="artDesc">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus alias esse blanditiis vero, iste velit minima sequi inventore dolore eius eligendi. Amet laborum unde repellendus excepturi accusantium ab distinctio ducimus?</p>
        //     <button className="commentButton">Comment</button>
        // </div>
        <div class="card" style={{width: 22 + 'rem'}}>
            <img src={article.image || "https://d5nunyagcicgy.cloudfront.net/external_assets/hero_examples/hair_beach_v391182663/original.jpeg"} class="card-img-top" alt="..."/>
            <div className="card-body">
            {/* <Link to={`/article/`}> */}
                <h5 className="card-title" onClick={()=> {
                    setShowReadingModal(true)
                    setReadArt(article);
                }}>{article.title}</h5>
            {/* </Link> */}
            <p className="card-text">{article.subtitle}</p>
            <a className="commentBtn btn" onClick={()=> {
                setShowComment(true)
                setArticleId(article._id)
                }}>Comment <i class="fas fa-comments"></i> </a>
                {/* if there is user, it's gonna check if the user matches article author, and add delete and edit icons */}
                {(user && (user.username === article.author)) && <div className="editDelete">
                    <i onClick={() => {setConfirmDel(true); setArticleId(article._id)}} class="deleteArtBtn botIcon fas fa-trash"></i>
                    <i onClick={() => {setShowUpdateMod(true); setReadArt(article)}} class="editArtBtn botIcon fas fa-edit"></i>
                </div>}
            </div>
        </div>
    )
}
