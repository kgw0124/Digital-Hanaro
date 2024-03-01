import './photoList.css';
import { PhotoType } from '../type/commonType';

function PhotoList({photos}:{photos:PhotoType[]}) {
    return ( 
        <div className="image-grid" style={{"marginTop":"40px"}}>
            {photos.map((item:PhotoType, key:number)=>{
                    return(
                        <img key={key} src={item.thumbnailUrl} style={{"width":"100px"}}/>
                    )
            })}
        </div>
     );
}

export default PhotoList;

