import { useNavigate } from "react-router-dom";
import "../styles.css";
import { useEffect, useState } from "react";
import axios from "axios";


export default function Main_page({loginSession, setLoginSession, adminSession, setAdminSession}) {
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
    function goMyPage() {
        movePage('/mypage/modifyInfo');
    }
    function goAdmin(url) {
        window.open(url, '_blank', 'noopener, noreferrer');
    }
    function goMyPage_myPost() {
        movePage('/mypage/myPost')
    }
    function goMyPage_usageHistory() {
        movePage('/mypage/usageHistory')
    }
    function goMyPage_ranking() {
        movePage('/mypage/ranking')
    }
    function logout(){
        localStorage.setItem("loginSession",null);
        movePage('/');
        window.location.reload();
    }
/*
    const data = [
        { "id": 1, "title": "랭킹1" },
        { "id": 2, "title": "랭킹2" },
        { "id": 3, "title": "랭킹3" },
        { "id": 4, "title": "랭킹4" },
        { "id": 5, "title": "랭킹5" }
    ]*/

    const [data, setData] = useState(()=>[]);
    useEffect(()=>{
        axios('/history/ranking?month=month')
            .then(res => {
                setData(res.data);
            })
    },[])
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(10);
    const visibleRows = data.slice(startIndex, endIndex);
    const [isLogin, setIsLogin] = useState(false);
    useEffect(() => {
        if(loginSession==null){
            setIsLogin(false);
            alert('로그인을 먼저 진행해야합니다.');
            movePage('/');
        }else{
            setIsLogin(true);
        }
    },[]);


    const monthHandler =async() =>{
        try{
            const response = await axios(`/history/ranking?month=month`)
            .then(res=>{
                setData(res.data);
            })
        }catch(error){

        }
    };
    const weekHandler =async() =>{
        try{
            const response = await axios(`/history/ranking?week=week`)
            .then(res=>{
                setData(res.data);
            })
        }catch(error){

        }
    };
    const maleHandler =async() =>{
        try{
            const response = await axios(`/history/ranking?month=month&gender=M`)
            .then(res=>{
                setData(res.data);
            })
        }catch(error){

        }
    };
    const femaleHandler =async() =>{
        try{
            const response = await axios(`/history/ranking?month=month&gender=F`)
            .then(res=>{
                setData(res.data);
            })
        }catch(error){

        }
    };
    const boroughHandler =async() =>{
        try{
            const response = await axios(`/history/ranking?month=month&borough=노원구`)
            .then(res=>{
                setData(res.data);
            })
        }catch(error){

        }
    };

    const ageHandler =async() =>{
        try{
            const response = await axios(`/history/ranking?month=month&range=60`)
            .then(res=>{
                setData(res.data);
            })
        }catch(error){

        }
    };
    return (
        <div className="wrap">
            <div className="header_wrap">
                <div className="top">
                    <div className="joinlogin">
                    {isLogin&&(<a className="mypage" onClick={goMyPage}>마이페이지</a>)}
                        {isLogin&&(<a className="mypage" onClick={logout}>로그아웃</a>)}
                        {adminSession&&(<a className="admin" onClick={() => goAdmin('/admin')}>관리자 페이지</a>)}
                        {!isLogin&&(<a className="join" onClick={goJoin}>회원가입</a>)}
                        {!isLogin&&(<a className="login" onClick={goLogin}>로그인</a>)}
                    </div>
                </div>
                <div className="header">
                    <div className="logo">
                        <a onClick={goMain}>
                            <img src="/images/bike_logo.png" alt="로고" />
                        </a>
                    </div>
                    <div className="menu_web">
                        <ul>
                            <li>
                                <a onClick={goMap}>대여소 조회</a>
                            </li>
                            <li>
                                <a onClick={goBoard}>문의 게시판</a>
                            </li>
                            <li>
                                <a onClick={goFavorite}>즐겨찾기</a>
                            </li>
                            <li>
                                <a onClick={goRanking}>따릉이 랭킹</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="mainContainer">
                <h2>이용 내역</h2>
                <div className="result_table">
                    <div className="mypage_button">
                        <button type="button" id="modifyInfo" onClick={goMyPage}>정보 수정</button>
                        <button type="button" id="usageHistory" onClick={goMyPage_usageHistory}>이용 내역</button>
                        <button type="button" id="myList" onClick={goMyPage_myPost}>작성 글/댓글</button>
                    </div>
                </div>

                <div className="result_table">
                    <div className="mypage_button">
                        <button type="button" id="history" onClick={goMyPage_usageHistory}>대여반납이력</button>
                        <button type="button" id="ranking" onClick={goMyPage_ranking}>따릉이랭킹</button>
                    </div>
                </div>
                <div>
                    <button onClick={monthHandler}>월간</button>
                    <button onClick={weekHandler}>주간</button>
                    <button onClick={maleHandler}>남성</button>
                    <button onClick={femaleHandler}>여성</button>
                </div>
                <div className="result_table">
                    <table border="1">
                        <tbody>
                            {visibleRows.map((row, index) => (
                                <tr key={index}>
                                    <td >{row.rank}</td>
                                    <td >{row.user_id}</td>
                                    <td >{row.distance}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}