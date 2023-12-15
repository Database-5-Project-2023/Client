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
    function goMyPage_delete() {
        movePage('/mypage/deleteInfo');
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
    /*const data = [
        { "id": 1, "title": "이력1" },
        { "id": 2, "title": "이력2" },
        { "id": 3, "title": "이력3" },
        { "id": 4, "title": "이력4" },
        { "id": 5, "title": "이력5" }
    ]*/
    const [data, setData] = useState(()=>[]);
    useEffect(()=>{
        axios(`/history?id=${loginSession}`)
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

                <div class="result_table">
                    <div class="mypage_button">
                        <button type="button" id="history" onClick={goMyPage_usageHistory}>대여반납이력</button>
                        <button type="button" id="ranking" onClick={goMyPage_ranking}>따릉이랭킹</button>
                    </div>
                </div>
                <div class="result_table">
                    <table border="1">
                        <tbody>
                            <th>UserId</th>
                            <th>BikeID</th>
                            <th>시작주소</th>
                            <th>도착주소</th>
                            <th>시작시간</th>
                            <th>도착시간</th>
                            <th>거리</th>
                            <th>반납처리</th>
                            {visibleRows.map((row, index) => (
                                <tr key={index}>
                                    <td >{row.user_id}</td>
                                    <td >{row.bike_id}</td>
                                    <td >{row.starting_station_addr}</td>
                                    <td >{row.arrival_station_addr}</td>
                                    <td >{row.starting_time}</td>
                                    <td >{row.arrival_time}</td>
                                    <td >{row.distance}</td>
                                    <td >{row.return_status ? '완료': '미완'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}