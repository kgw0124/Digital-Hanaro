import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios'
import { AppContext, getStateFromLocalStorage } from './mycontext';
import { useLocation, useNavigate } from 'react-router-dom';
import { PhotoType } from '../type/commonType';
import PhotoList from './photoList';

function AlbumDetail() {
    let navigate = useNavigate();
    let location = useLocation();
    let {id} = location.state;
    let [albumname, setAlbumname] = useState<String>("");
    let [photos, setPhotos] = useState<PhotoType[]>([]);

    /* (1) 띄울 데이터 가져오기 */
    let context = useContext(AppContext);
    useEffect(()=>{
        const controller = new AbortController();
    
        context.state = getStateFromLocalStorage("appState");

        // (1-1) 선택한 앨범명 [제공한 4가지 URL을 모두 사용하기 위해 한번 더 데이터를 받아왔습니다!]
        let albumNameUrl = "https://jsonplaceholder.typicode.com/albums/" + id;
        axios.get(albumNameUrl, {signal:controller.signal})
        .then((res)=>{
            setAlbumname(res.data.title);
        })
        .catch((error)=>{
            console.log( error );
        });

        // (1-2) 해당 앨범 속 사진 목록
        let photosUrl = "https://jsonplaceholder.typicode.com/photos?albumId=" + id;
        axios.get(photosUrl, {signal:controller.signal})
        .then((res)=>{
            setPhotos(res.data);
        })
        .catch((error)=>{
            console.log( error );
        });

        return()=>{
            controller.abort();
        }
    }, [id]);

    /* (2) 뒤로 가기 */
    const buttonClick = () => {
        navigate("/album/list");
    }   

    return ( 
        <div className="container-fluid container" style={{"marginTop":"100px", "textAlign":"left"}}>
            <h3 className="m-0" style={{"fontWeight": "bold"}}>{albumname}</h3>
            <PhotoList photos={photos}/>
            <button type="button"className="btn btn-primary" style={{"marginTop":"40px", "marginBottom":"40px", "fontWeight": "bold"}} onClick={()=>buttonClick()}>◀ Back</button>
        </div> 
    );
}

export default AlbumDetail;