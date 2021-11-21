import React, { useContext, useEffect, useState } from 'react'
import SingleArt from '../../Components/SingleArticle/SingleArt'
import CommentModal from '../../Components/CommentModal/CommentModal'
import "./articles.css"
import axios from 'axios'
import { useLocation } from 'react-router';
import { Context } from '../../Context/Context';
import Pagination from '../../Components/Pagination/Pagination';
import { ReadingModal } from '../../Components/ReadingModal/ReadingModal';


export default function Articles({articles}) {

    const {user} = useContext(Context);

    const [arts, setArts] = useState([]); //All articles from DB.
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(4);
    const [apiKeyError, setApiKeyError] = useState(false);
    const [showComment, setShowComment] = useState(false);
    const [postedComm, setPostedComm] = useState(false);
    const [showReadingModal, setShowReadingModal] = useState(false);
    const [articleId, setArticleId] = useState('');
    const [readArt, setReadArt] = useState();
    
    const location = useLocation().search;
    const key = new URLSearchParams(location);
    const apiKey = key.get('apikey')
    //We are extracting the apikey from the request URL looking something like '/public/articles?apikey=10209124912804'

    const url = `getArticles?apikey=${apiKey}`;

    useEffect(()=> {

        const getArticles = async () => {
            setLoading(true);
            setApiKeyError(false);
            try {
                if(!apiKey && !user) {
                    setApiKeyError(true);
                } else {
                    const res = await axios.get(user ? '/getArticles' : url);
                    setArts(res.data.data);
                    setLoading(false);
                }
            } catch (err) {
                setApiKeyError(true);
                setLoading(false);
                // console.log(err);
            }
        }
        getArticles();
    },[postedComm])    
    //Calculating the range of current posts to display.
    const idxOfLastPost = currentPage * postsPerPage;
    const idxOfFirstPost = idxOfLastPost - postsPerPage;
    const currentPosts = arts.slice(idxOfFirstPost,idxOfLastPost);

    return (
        <div className="articles">
            {apiKeyError && <h1>You have no access to this page, without valid API Key!</h1>}    
             <div className="pageSelectors">
                <Pagination postsPerPage={postsPerPage} totalPosts={arts.length} setPage={setCurrentPage}/>
            </div>
            {loading ? <img className="loadingImg "src="https://icon-library.com/images/spinner-icon-gif/spinner-icon-gif-26.jpg" alt="" /> 
            : currentPosts.map((el, idx) => <SingleArt key={idx} article={el} 
            setShowComment={setShowComment} setArticleId={setArticleId} setShowReadingModal={setShowReadingModal} setReadArt={setReadArt}/> )}
            {showComment && <CommentModal setShowComment={setShowComment} articleId={articleId} setPostedComm={setPostedComm}/>}
            {showReadingModal && <ReadingModal readArt={readArt} setShowReadingModal={setShowReadingModal}/>}
        </div>
    )
}
