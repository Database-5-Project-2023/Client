import { useNavigate, useSearchParams } from "react-router-dom";
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
    function goBoardDetail(id) {
        movePage('/board/detail/' + id);
    }
    function goBoardWrite() {
        movePage('/board/write');
    }
    function goAdmin(url) {
        window.open(url, '_blank', 'noopener, noreferrer');
    }
    function logout(){
        localStorage.setItem("loginSession",null);
        movePage('/');
        window.location.reload();
    }
    /*
    const data = [
        { "id": 1, "title": "제목" },
        { "id": 2, "title": "제목" },
        { "id": 3, "title": "제목" },
        { "id": 4, "title": "제목" },
        { "id": 5, "title": "제목" },
        { "id": 6, "title": "제목" },
        { "id": 7, "title": "제목" },
        { "id": 8, "title": "제목" },
        { "id": 9, "title": "제목" },
        { "id": 10, "title": "제목" },
        { "id": 11, "title": "제목" },
        { "id": 12, "title": "제목" },
        { "id": 13, "title": "제목" },
        { "id": 14, "title": "제목" },
        { "id": 15, "title": "제목" },
        { "id": 16, "title": "제목" },
        { "id": 17, "title": "제목" },
        { "id": 18, "title": "제목" },
        { "id": 19, "title": "제목" }
    ]*/
    const [isLogin, setIsLogin] = useState(false);
    useEffect(() => {
        if(loginSession==null){
            setIsLogin(false);
        }else{
            setIsLogin(true);
        }
    },[]);
    const [data, setData] = useState(()=>[]);
    useEffect(()=>{
        axios('/admin/post_manage')
            .then(res => {
                setData(res.data);
            })
    },[])
    useEffect(()=>{
        console.log(data);
    },[data])
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(10);

    function changePage(pageNum) {
        setStartIndex((pageNum - 1) * 10);
        if (pageNum * 10 >= data.length) {
            setEndIndex(data.length);
        }
        else {
            setEndIndex((pageNum) * 10);
        }
    }



    const visibleRows = data.slice(startIndex, endIndex);

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
                <h2>게시글 리스트</h2>
                <button type="button" onClick={goBoardWrite} style={{width:'200px', fontSize:'20px'}}>게시글 작성</button>
                <div className="result_table">
                    <table border="1">
                        <tbody>
                            <th>번호</th>
                            <th>제목</th>
                            <th>사용자</th>
                            <th>조회수</th>
                            <th>날짜</th>
                            {visibleRows.map((row, index) => (
                                <tr key={index}>
                                    <td  >{row.post_id}</td>
                                    <td style={{ cursor: 'pointer' }} onClick={() => goBoardDetail(row.post_id)}>{row.title}</td>
                                    <td>{row.creator_id}</td>
                                    <td>{row.hit}</td>
                                    <td>{row.created_at.split('T')[0]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="pagination">
                    <button disabled="true">이전</button>
                    <button onClick={() => changePage(1)}>1</button>
                    <button onClick={() => changePage(2)}>2</button>
                    <button onClick={() => changePage(3)}>3</button>
                    <button >다음</button>
                </div>
                <div className="search_container" style={{marginLeft:'10%', textAlign:'center'}}>
                    <input type="text" placeholder="제목 검색" id="title_search" style={{width:'300px'}}/>
                    <button type="button" id="title_search_btn">검색</button>
                </div>
            </div>
        </div>
    );
}