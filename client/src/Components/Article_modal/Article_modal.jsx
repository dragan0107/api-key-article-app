import React, { useContext, useState } from 'react'
import './article_modal.css'
import axios from 'axios'
import { Context } from '../../Context/Context';

export default function Article_modal({setShowArt}) {
    
    const { user } = useContext(Context);

    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [img, setImg] = useState('');
    const [loading, setLoading] = useState(false)
    const [sent, setSent] = useState(false);

    const handleSubmit = e => {
        e.preventDefault();
        setSent(false);
        try {
            axios.post('/addArticle', {
                title: title,
                subtitle: subtitle,
                image: img,
                author: user.username
            });
            setSent(true);
            // window.location.replace('/articles');

        }catch (err) {
            setSent(false);
            console.log(err);
        }
    }

    const handleChange = async e => {
        const files = e.target.files;

        const data = new FormData();
        data.append('file',files[0]);
        data.append('upload_preset','test_upload_react');
        setLoading(true);

        const res = await axios.post('https://api.cloudinary.com/v1_1/dripcloud/image/upload',data);

        setImg(res.data.secure_url);
        setLoading(false);
    }

    return (
        <div className="modalBackground">

        <div className="artModal">
        <h3>Add new article.</h3>
        <div className="closeIcon" onClick={()=>setShowArt(false)}><i class="fas fa-times"></i></div>
        <div className="wrap">
        <form action="" onSubmit={handleSubmit}>

            <label htmlFor="">Title</label>
            <input type="text" className="titleInput" onChange={(e)=> setTitle(e.target.value)} maxLength="50"/>
            <label htmlFor="">Subtitle</label>
            <textarea name="" id="" cols="30" rows="10" onChange={(e)=> setSubtitle(e.target.value)}></textarea>
            <label className="imgLabel" htmlFor="">Upload Image.</label>
            <input type="file" className="fileInput" onChange={handleChange}/> 
            {sent && <label className="submittedMsg" htmlFor="">Successfully submitted!</label> }
            <button className="" type="submit" disabled={loading ? true : false}class="addButton btn btn-success">Submit article.</button>
        </form>
        </div>
        </div>
        </div>
    )
}
