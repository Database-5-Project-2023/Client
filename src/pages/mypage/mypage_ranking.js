import { useNavigate } from "react-router-dom";
import "../styles.css";
import { useState } from "react";


export default function Main_page() {
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

    const data = [
        { "id": 1, "title": "랭킹1" },
        { "id": 2, "title": "랭킹2" },
        { "id": 3, "title": "랭킹3" },
        { "id": 4, "title": "랭킹4" },
        { "id": 5, "title": "랭킹5" }
    ]
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(10);
    const visibleRows = data.slice(startIndex, endIndex);

    return (
        <div className="wrap">
            <div className="header_wrap">
                <div className="top">
                    <div className="joinlogin">
                        <a className="mypage" onClick={goMyPage}>마이페이지</a>
                        <a className="admin" onClick={() => goAdmin('/admin')}>관리자 페이지</a>
                        <a className="join" onClick={goJoin}>회원가입</a>
                        <a className="login" onClick={goLogin}>로그인</a>
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
                            {visibleRows.map((row, index) => (
                                <tr key={index}>
                                    <td style={{ cursor: 'pointer' }}>{row.id}</td>
                                    <td style={{ cursor: 'pointer' }}>{row.title}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}