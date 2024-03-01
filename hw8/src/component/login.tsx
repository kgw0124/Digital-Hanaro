import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "./mycontext";
import axios from 'axios';

function Login() {
    let navigate = useNavigate(); 
    let context = useContext(AppContext);

    const [userid, setUserid] = useState<string>(""); // 입력 받은 id
    const [passLogin, setPassLogin] = useState<boolean>(true); // 로그인 성공 여부
    const [msg, setMsg] = useState<string>(""); // 로그인 성공/실패 시 출력할 msg

    let onChange = (e:any)=>{
        setUserid(e.target.value);
    }

    let login=()=>{
        if( parseInt(userid)>=1 && parseInt(userid)<=10) // 입력 받은 id는 1 이상 10 이하
        {
            let url = "https://jsonplaceholder.typicode.com/users/" + userid;
            axios.get(url)
            .then((res)=>{
                context.dispatch( 
                    {
                        type:"LOGIN", 
                        value:{
                            userid:userid, 
                            username:res.data.username, 
                            isLogin:true
                        }
                }
                );  
    
                setTimeout( ()=>{ navigate("/album/list", {})}, 1000);
                setPassLogin(true);
                setMsg("😄 Welcome"); 
            }) 
            .catch(error=>{
                console.log(error);
            });
        }
        else{
            context.dispatch(
                {
                    type:"LOGOUT", 
                    value:{
                        userid:"",   
                        username:"", 
                        isLogin:false
                    }
                }
            );
            
            setPassLogin(false);
            setMsg("⚠ User ID는 1~10번만 가능합니다.");
        } 
    }

    const passStyle: React.CSSProperties = {
        marginTop: "10px",
        color: "blue",
        fontWeight: "bold"
    };

    const nonPassStyle: React.CSSProperties = {
        marginTop: "10px",
        color: "red",
        fontWeight: "bold"
    };

    return (
        <div className="container-fluid container" style={{"marginTop":"100px"}}>
            <div className="card" style={{"marginLeft":"auto", "marginRight":"auto", "width":"400px"}}>
                <img className="card-img-top" src="/image/loginImage.png"/>
                <div className="card-body">
                    <input type="text" id="userid" onChange={onChange} value={userid} className="form-control" placeholder="User ID"/>
                    <h6 style={passLogin ? passStyle : nonPassStyle}>{msg}</h6>
                    <button type="button" className="btn btn-success" style={{"fontWeight": "bold"}} onClick={login}>Sign In</button>
                </div>
            </div>
        </div>
    );
}

export default Login;

