import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../Context/Context';
import './singleart.css';
import axios from 'axios';
// import { Link } from "react-router-dom";

export default function SingleArt({
  article,
  setShowComment,
  setArticleId,
  setShowReadingModal,
  setReadArt,
  setConfirmDel,
  setShowUpdateMod,
}) {
  const { user } = useContext(Context);
  const [likes, setLikes] = useState(article.likes.length);
  const [dislikes, setDislikes] = useState(article.dislikes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);

  const handleLike = async () => {
    try {
      if (!isLiked) {
        if (isDisliked) setDislikes((prevValue) => (prevValue -= 1));
        setIsLiked(true);
        setLikes((prevValue) => (prevValue += 1));
        setIsDisliked(false);
      } else {
        setIsLiked(false);
        setLikes((prevValue) => (prevValue -= 1));
      }
      await axios.put(`${article._id}/like`, {
        user: user.username,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDislike = async () => {
    try {
      if (!isDisliked) {
        if (isLiked) setLikes((prevValue) => (prevValue -= 1));
        setIsDisliked(true);
        setDislikes((prevValue) => (prevValue += 1));
        setIsLiked(false);
      } else {
        setIsDisliked(false);
        setDislikes((prevValue) => (prevValue -= 1));
      }
      await axios.put(`${article._id}/dislike`, {
        user: user.username,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const username = localStorage.getItem('user');
    const reactionChecker = () => {
      if (username) {
        if (article.likes.includes(username)) {
          setIsLiked(true);
          console.log(isLiked);
        } else if (article.dislikes.includes(username)) {
          setIsDisliked(true);
        }
      }
    };
    reactionChecker();
  }, []);

  return (
    // <div className="singleArt">
    //     <h1 className="artTitle">Article Title</h1>
    //     <p className="artDesc">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus alias esse blanditiis vero, iste velit minima sequi inventore dolore eius eligendi. Amet laborum unde repellendus excepturi accusantium ab distinctio ducimus?</p>
    //     <button className="commentButton">Comment</button>
    // </div>
    <div class="card" style={{ width: 26 + 'rem' }}>
      <img
        src={
          article.image ||
          'https://d5nunyagcicgy.cloudfront.net/external_assets/hero_examples/hair_beach_v391182663/original.jpeg'
        }
        class="card-img-top"
        alt="..."
      />
      <div className="card-body">
        <span className="authorTag">author: {article.author}</span>
        <h5
          className="card-title"
          onClick={() => {
            setShowReadingModal(true);
            setReadArt(article);
          }}
        >
          {article.title}
        </h5>
        <p className="card-text">{article.subtitle}</p>
        <div className="like-dislike">
          <i
            class={
              'like--btn fas fa-thumbs-up ' +
              (isLiked ? 'liked' : '') +
              (!user ? 'disabled' : '')
            }
            onClick={handleLike}
          >
            <span className="like--number">{likes}</span>{' '}
          </i>
          <i
            class={
              'dislike--btn fas fa-thumbs-down ' +
              (isDisliked ? 'disliked' : '') +
              (!user ? 'disabled' : '')
            }
            onClick={handleDislike}
          >
            <span className="dislike--number">{dislikes}</span>
          </i>
        </div>
        <a
          className="commentBtn btn"
          onClick={() => {
            setShowComment(true);
            setArticleId(article._id);
          }}
        >
          Comment <i class="fas fa-comments"></i>{' '}
        </a>
        {/* if there is user, it's gonna check if the user matches article author, and add delete and edit icons */}
        {user && user.username === article.author && (
          <div className="editDelete">
            <i
              onClick={() => {
                setConfirmDel(true);
                setArticleId(article._id);
              }}
              class="deleteArtBtn botIcon fas fa-trash"
            ></i>
            <i
              onClick={() => {
                setShowUpdateMod(true);
                setReadArt(article);
              }}
              class="editArtBtn botIcon fas fa-edit"
            ></i>
          </div>
        )}
      </div>
    </div>
  );
}
