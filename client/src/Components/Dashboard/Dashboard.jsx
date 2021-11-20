import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../Context/Context';
import axios from 'axios';
import './dashboard.css'

export default function Dashboard({setShowArt}) {
    const {user} = useContext(Context);

    const [keys, setKeys] = useState(0);
    // const [keyId, setKeyId] = useState('');

    const deleteApiKey = async(id)=> {
            try{

                const res = await axios.post('/deleteKey', {
                    apikeyID: id
                });
                getApiKeys();

            } catch (err) {
                console.log(err);
            }
        }

    const createAPI = async()=> {
        try {
            const res = await axios.post('/generateKey', {
                username: user.username
            });
            getApiKeys();
            
        } catch (err) {
            console.log(err);
        }
    }

    const getApiKeys = async()=>{

        try {
            let res = await axios.post('/getKeys',{
                username: user.username
            })
            setKeys(res.data.result)

        } catch (err) {
            console.log(err);
        }
    }
    
  useEffect(() => {
        getApiKeys();
  },[]);
        
  
    return (
        <div>
            <div class="jumbotron">
                <h1 class="display-4">Forlogis Dashboard</h1>
                <p class="lead">This is where secret api keys will be shown</p>
                 <hr class="my-4"/>

                    {keys && keys.map(el =>
                    <div className="keyBlock">
                        <p className="apiKey">{el.api_key}</p>
                        <i class="delIcon fas fa-trash-alt" onClick={()=> deleteApiKey(el._id)}></i>
                    </div>
                    ) || <p className="notification">Loading API keys...</p> }
                    {keys.length < 1 && <p className="notification">No API keys yet, add some!</p>}

                <a class="btn btn-primary btn-lg" role="button" onClick={createAPI}>Create API Key</a>
                <br />
                <br />
                <a class="btn btn-secondary btn-lg" href="#" role="button" onClick={()=>setShowArt(true)}>Add new article</a>
            </div>
        </div>
    )
}
