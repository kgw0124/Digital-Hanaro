import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { AppContext, getStateFromLocalStorage } from './mycontext';
import Logout from './logout';


function Layout() {
    let context = useContext(AppContext);
    context.state = getStateFromLocalStorage("appState");
    let content;
    if (context.state.isLogin) { // 로그인 상태일 때 추가할 사용자 아이디, 사용자명, 로그아웃 버튼
        content = (
            <div className="d-flex justify-content-end align-items-center" style={{"marginRight":"10px", "padding":"4px", "backgroundColor":"#FFFFFF", "border":"none", "borderRadius":"4px"}}>
                <img className="rounded-pill" src="/image/loginImage.png" style={{"width":"40px"}}/> 
                <span className="navbar-text mr-2" style={{ "marginLeft": "10px", "color": "#777777", "fontWeight": "bold" }}>{context.state.userid}</span>
                <span className="navbar-text mr-2" style={{ "marginLeft": "10px", "color": "#000000", "fontWeight": "bold" }}>{context.state.username}</span>
                <Logout/>
            </div>
        );
    }

    return (
        <div>
            <nav className="navbar navbar-expand-sm bg-primary navbar-dark fixed-top">
                <div className="container-fluid">
                    <span className="navbar-text" style={{ "marginLeft": "10px", "color": "#FFFFFF", "fontSize":"20px", "fontWeight": "bold" }}>Hanaro Album</span>
                </div>
                {content}
            </nav>
            <Outlet/>
        </div>  
    );
}

export default Layout;