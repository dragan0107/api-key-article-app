import React from 'react';
import "./singleart.css";
// import { Link } from "react-router-dom";

export default function SingleArt({article, setShowComment, setArticleId, setShowReadingModal, setReadArt}) {



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
            <a className="commentBtn btn btn-primary" onClick={()=> {
                setShowComment(true)
                setArticleId(article._id)
                }}>Comment..</a>
            </div>
        </div>
    )
}
