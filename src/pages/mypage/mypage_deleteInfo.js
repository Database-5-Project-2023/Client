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
    function goMyPage_myPost() {
        movePage('/mypage/myPost')
    }
    function goMyPage_usageHistory() {
        movePage('/mypage/usageHistory')
    }
    function goAdmin(url) {
        window.open(url, '_blank', 'noopener, noreferrer');
    }
    function logout(){
        localStorage.setItem("loginSession",null);
        movePage('/');
        window.location.reload();
    }
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
    
    const handleSubmit = async(event) =>{
        event.preventDefault();
        
        try{
            const response = await axios.delete(`/members/delete?id=${loginSession}`);
            alert("회원정보가 탈퇴되었습니다.");
            setLoginSession(null);
            movePage('/')
        }catch(error){
            alert(`${error.message}`)
            console.error('Error:',error);
        }
        //window.close();
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
                <h2>회원정보 수정</h2>

                <div className="result_table">
                    <div className="mypage_button">
                        <button type="button" id="modifyInfo" onClick={goMyPage}>정보 수정</button>
                        <button type="button" id="usageHistory" onClick={goMyPage_usageHistory}>이용 내역</button>
                        <button type="button" id="myList" onClick={goMyPage_myPost}>작성 글/댓글</button>
                    </div>
                </div>

                <div className="result_table">
                    <div className="mypage_button">
                        <button type="button" id="modifyMemInfo" onClick={goMyPage}>회원정보 수정</button>
                        <button type="button" id="deleteMemInfo" onClick={goMyPage_delete}>회원 탈퇴</button>
                    </div>
                </div>
                <div className="result_table">
                    <div className="info_message">
                        <p>
                            <a style={{color:'red'}}>회원탈퇴를 </a><a>신청합니다.</a>
                        </p>
                        <p>서울자전거를 이용해 주셔서 감사합니다.</p>
                        <p>회원탈퇴를 하실 경우 아래와 같이 회원정보가 처리됩니다.</p>
                        <div style={{backgroundColor:'lightgray'}}>
                            <ul className="deleteInfo">
                                <li>
                                    탈퇴 신청 즉시 회원탈퇴 처리되며, 해당 아이디의 회원정보 및 마일리지는 삭제처리되며, 복원할 수 없습니다.
                                </li>
                                <li>
                                    회원탈퇴 이후 같은 아이디로는 재가입이 불가능 합니다.
                                </li>
                                <li>
                                    이용권 기간이 남아있는 경우 즉시 탈퇴가 불가능 하오니 고객센터에 문의 바랍니다.
                                </li>
                            </ul>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <button className="memberDeleteBtn" type="submit" >회원 탈퇴</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}