import { useNavigate } from "react-router-dom";
import "./styles.css";
import { useEffect, useState } from "react";
import axios from "axios";


export default function Login({loginSession, setLoginSession, adminSession, setAdminSession}) {
    const movePage = useNavigate();
    function goMain() {
        movePage('/');
    }
    function goMap() {
        movePage('/stationMap');
    }
    function goBoard() {
        movePage('/board');
    }
    function goFavorite() {
        movePage('/favorite');
    }
    function goRanking() {
        movePage('/mypage/ranking');
    }
    function goLogin() {
        movePage('/login');
    }
    function goJoin() {
        movePage('/join');
    }
    function logout(){
        localStorage.setItem("loginSession",null);
        movePage('/');
        window.location.reload();
    }

    const [isLogin, setisLogin] = useState(false);
    useEffect(()=>{
        if(isLogin==true){
            setLoginSession(id);
            movePage('/');
        }
        
    },[isLogin])
    useEffect(()=>{
        localStorage.setItem("loginSession",JSON.stringify(loginSession));
        
    },[loginSession]);
    

    const [id,setId] =useState('');
    const [pwd,setPwd] =useState('');
    

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`/members/login?id=${id}&pwd=${pwd}`);
            console.log(response.data)
            if(response.data!=null){
                setisLogin(true);
            }
        } catch (error) {
            alert(`${error.message}`)
            console.error('Error:', error);
        }
    };

    

    return (                
        <div className="wrap">
            <div className="header_wrap">
                <div className="header">
                    <div className="logo">
                        <a onClick={goMain}>
                            <img src="/images/bike_logo.png" alt="로고" />
                        </a>
                    </div>
                </div>
            </div>
            <div className="mainContainer">
                <form onSubmit={handleSubmit}>
                    <input type="text" value={id} name="id" onChange= {(e)=>setId(e.target.value)} placeholder="ID"></input>

                    <input type="password" value={pwd} name="pwd" onChange={(e) => setPwd(e.target.value)} placeholder="비밀번호"></input>

                    <button type="submit">로그인</button>
                </form>
            </div>
        </div>
    );
}