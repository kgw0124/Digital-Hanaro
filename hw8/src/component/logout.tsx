import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "./mycontext";

function Logout() {
    let navigate = useNavigate();
    let context = useContext(AppContext);
    
    let logout = () => {
        localStorage.clear(); // localstorage 비우기

        context.dispatch(
            {
                type: "LOGOUT", 
                value: {
                    userid: "",   
                    username: "", 
                    isLogin: false
                }
            }
        );

        navigate("/", {}); // 로그인 화면으로 이동
    }

    return ( 
        <div>
            <button type="button" className="btn btn-success" style={{"width": '100px', "marginLeft": "10px", "fontWeight": "bold"}} onClick={()=>logout()}>Sign Out</button>
        </div>
     );
}

export default Logout;