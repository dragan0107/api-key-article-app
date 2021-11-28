import React, { useContext, useEffect, useState } from 'react'
import SingleArt from '../../Components/SingleArticle/SingleArt'
import CommentModal from '../../Components/CommentModal/CommentModal'
import "./articles.css"
import axios from 'axios'
import { useLocation } from 'react-router';
import { Context } from '../../Context/Context';
import Pagination from '../../Components/Pagination/Pagination';
import { ReadingModal } from '../../Components/ReadingModal/ReadingModal';
import { ConfirmDelete } from '../../Components/ConfirmDelete/ConfirmDelete'
import UpdateArtModal from '../../Components/updateArtModal.jsx/UpdateArtModal'


export default function Articles({articles}) {

    const {user, isFetching} = useContext(Context);

    const [arts, setArts] = useState([]); //All articles from DB.
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(6);
    const [apiKeyError, setApiKeyError] = useState(false);
    const [showComment, setShowComment] = useState(false);
    const [postedComm, setPostedComm] = useState(false);
    const [showReadingModal, setShowReadingModal] = useState(false); // Reading modal state
    const [articleId, setArticleId] = useState('');
    const [readArt, setReadArt] = useState(); // State for modal for reading articles 
    const [confirmDel, setConfirmDel] = useState(false);
    const [showUpdateMod, setShowUpdateMod] = useState(false);
    
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

    },[postedComm]);    
    //Calculating the range of current posts to display.
    const idxOfLastPost = currentPage * postsPerPage;
    const idxOfFirstPost = idxOfLastPost - postsPerPage;
    const currentPosts = arts.slice(idxOfFirstPost,idxOfLastPost);

    return (
        <div className="fullSection">

        <div className="articles">

            {/* If the APIKey passed in the query is invalid, it will show this error header. */}
            {apiKeyError && <h1 className="apiKeyErrorMsg">You have no access to this page, without valid API Key!</h1>}

            {/* Pagination component automatically calculating and updating the number of pages. */}
             <div className="pageSelectors">
                <Pagination postsPerPage={postsPerPage} totalPosts={arts.length} setPage={setCurrentPage}/>
            </div>
            
            {/* If its not loading, it will start rendering all the article cards on the page */}
            {loading ? <img className="loadingImg "src="https://icon-library.com/images/spinner-icon-gif/spinner-icon-gif-26.jpg" alt="" /> 
            : currentPosts.map((el, idx) => <SingleArt key={idx} article={el} 
            setShowComment={setShowComment} setArticleId={setArticleId} setShowReadingModal={setShowReadingModal} setReadArt={setReadArt}  setConfirmDel={setConfirmDel}
            setShowUpdateMod={setShowUpdateMod}
            /> )}

            {/* Toggle for Updating article modal. */}
            {showUpdateMod && <UpdateArtModal setShowUpdateMod={setShowUpdateMod} readArt={readArt} setPostedComm={setPostedComm}/>}

            {/* Toggle for showing comment modal.. */}
            {showComment && <CommentModal setShowComment={setShowComment} articleId={articleId} setPostedComm={setPostedComm}/>}

            {/* Toggle for showing Reading modal.. */}
            {showReadingModal && <ReadingModal readArt={readArt} setShowReadingModal={setShowReadingModal}/>}

            {/* Toggle for showing deletion confirmation modal.. */}
            {confirmDel && <ConfirmDelete setConfirmDel={setConfirmDel} articleId={articleId} setArticleId={setArticleId}
                postedComm={postedComm} setPostedComm={setPostedComm}
            />}
        </div>
        </div>
    )
}
