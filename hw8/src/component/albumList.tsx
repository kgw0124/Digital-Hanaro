import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios'
import { AppContext, getStateFromLocalStorage } from './mycontext';

type AlbumType={
    userId:number;
    id:number;
    title:string;
}

function AlbumList() {
    const [albums, setAlbums] = useState<AlbumType[]>([]);
    const [selectAlbum, setSelectAlbum] =useState<AlbumType>({id:-1, userId:0, title:""}); // album 목록 중 선택한 값

    /* (1) Album List로 띄울 데이터 가져오기 */
    let context = useContext(AppContext);
    useEffect(()=>{
        const controller = new AbortController();
        context.state = getStateFromLocalStorage("appState");

        let userId = context.state.userid;
        let url = "https://jsonplaceholder.typicode.com/albums?userId=" + userId;

        axios.get(url, {signal:controller.signal})
        .then((res)=>{
            setAlbums(res.data);
        })
        .catch((error)=>{
            console.log( error );
        });

        const savedAlbum = localStorage.getItem('selectedAlbum'); // 만약, 선택된 행이 존재한다면 표시하기
        if (savedAlbum) {
            setSelectAlbum(JSON.parse(savedAlbum));
        }

        return()=>{
            controller.abort();
        }
    }, [])

    /* (2) Album List에서 선택한 행 데이터 저장 */
    let navigate = useNavigate();
    const albumClick = (album:AlbumType)=>{
        setSelectAlbum({...album});
        localStorage.setItem('selectedAlbum', JSON.stringify(album));
    }

    /* (3) Album List에서 Album Detail로 선택한 행 데이터 전달하기 */
    const buttonClick = () => {
        navigate("/album/detail", {state:selectAlbum});
    }    

    return ( 
        <div className="container-fluid container" style={{"marginTop":"100px"}}>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 className="m-0" style={{"fontWeight": "bold"}}>Album List</h3>
                <button type="button" className="btn btn-success" style={{"color": "#FFFFFF", "fontWeight": "bold" }} disabled={selectAlbum.id==-1? true:false} onClick={()=>buttonClick()}>Detail</button>
            </div>         
            {
                <ul className="list-group list-group-flush" style={{"marginTop":"40px", "textAlign": "left"}}>
                {
                    albums.map( (album: AlbumType, key:number)=>{
                        const isSelected = selectAlbum.id === album.id;

                        const selectedStyle: React.CSSProperties = {
                            border: "2px solid blue",
                            fontWeight: "bold",
                            color: "blue",
                            backgroundColor: "lightblue"
                        };
            
                        return(
                            <li className="list-group-item list-group-item-action" style={isSelected ? selectedStyle : {}} key={key} onClick={()=>albumClick(album)}>  
                                {key+1}. {album.title}
                            </li>
                        )
                    })
                }
                </ul>
            }
        </div>
    );
}

export default AlbumList;