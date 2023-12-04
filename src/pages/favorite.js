import { useNavigate } from "react-router-dom";
import "./styles.css";
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

    const data = [
        { "id": 2908, "title": "광운대학교 중앙도서관" },
        { "id": 5314, "title": "월계 1동 주민센터 앞" },
        { "id": 1602, "title": "광운대역 앞" }
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
                <h1 style={{textAlign: 'center'}}>'user101'님의 즐겨찾기</h1>
                <div class="result_table">
                    <table border="1">
                        <tbody>
                            <th>정류장 ID</th>
                            <th>정류장 이름</th>
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