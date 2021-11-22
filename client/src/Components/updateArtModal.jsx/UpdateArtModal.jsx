import React, { useContext, useState } from 'react'
import './updateArtModal.css'
import axios from 'axios'
import { Context } from '../../Context/Context';

export default function UpdateArtModal({setShowUpdateMod, readArt, setPostedComm}) {
    
    const { user } = useContext(Context);

    const [title, setTitle] = useState(readArt.title);
    const [subtitle, setSubtitle] = useState(readArt.subtitle);

    const [img, setImg] = useState('');
    const [loading, setLoading] = useState(false)
    const [sent, setSent] = useState(false);

    const handleSubmit = async e => {
        e.preventDefault();
        setSent(false);
        setPostedComm(false);

        const updatedArt = {
                title: title,
                subtitle: subtitle,
                author: user.username
        }

        if(img) updatedArt.image = img;

        try {
            let updated = await axios.put(`/updateArticle/${readArt._id}`, updatedArt);
            console.log(updated);
            setSent(true);
            setPostedComm(true);
            // window.location.replace('/articles');

        }catch (err) {
            setSent(false);
            setPostedComm(false);
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
        <h3 className="titleHeader">Update this Article <i className="fas fa-edit"></i></h3>
        <div className="closeIcon" onClick={()=> setShowUpdateMod(false)}><i class="fas fa-times"></i></div>
        <div className="wrap">
        <form action="" onSubmit={handleSubmit}>

            <label htmlFor="">Title</label>
            <input type="text" className="titleInput" onChange={(e)=> setTitle(e.target.value)} maxLength="50" value={title}/>
            <label htmlFor="">Subtitle</label>
            <textarea className="subtitleInput" name="" id="" cols="30" rows="9" onChange={(e)=> setSubtitle(e.target.value)} value={subtitle}></textarea>
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
