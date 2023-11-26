import { useNavigate, useSearchParams } from "react-router-dom";
import "../styles.css";
import { useEffect, useState } from "react";


export default function Main_page(){
    const movePage = useNavigate();
    function goMain(){
        movePage('/');
    }
    function goMap(){
        movePage('/stationMap');
    }
    function goBoard(){
        movePage('/board');
    }
    function goFavorite(){
        movePage('/favorite');
    }
    function goRanking(){
        movePage('/ranking');
    }
    function goLogin(){
        movePage('/login');
    }
    function goJoin(){
        movePage('/join');
    }
    function goMyPage(){
        movePage('/mypage/modifyInfo');
    }

    function goBoardModify(){
        movePage('/board/modify');
    }

    function goAdmin(url){
        window.open(url,'_blank', 'noopener, noreferrer');
    }
    const data = [
        {"id": 1, "title": "제목"},
        {"id": 2, "title": "제목"},
        {"id": 3, "title": "제목"},
        {"id": 4, "title": "제목"},
        {"id": 5, "title": "제목"},
        {"id": 6, "title": "제목"},
        {"id": 7, "title": "제목"},
        {"id": 8, "title": "제목"},
        {"id": 9, "title": "제목"},
        {"id": 10, "title": "제목"},
        {"id": 11, "title": "제목"},
        {"id": 12, "title": "제목"},
        {"id": 13, "title": "제목"},
        {"id": 14, "title": "제목"},
        {"id": 15, "title": "제목"},
        {"id": 16, "title": "제목"},
        {"id": 17, "title": "제목"},
        {"id": 18, "title": "제목"},
        {"id": 19, "title": "제목"}
    ]
    

    return(
        <div className="wrap">
            <div className="header_wrap">
                <div className="top">
                    <div className="joinlogin">
                        <a className="mypage" onClick={goMyPage}>마이페이지</a>
                        <a className="admin"onClick={() => goAdmin('/admin')}>관리자 페이지</a>
                        <a className="join" onClick={goJoin}>회원가입</a>
                        <a className="login" onClick={goLogin}>로그인</a>
                    </div>
                </div>
                <div className="header">
                    <div class="logo">
                        <a onClick={goMain}>
                            <img src="/images/bike_logo.png" alt="로고"/>
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
                <div className="detail_table">

                    <div id="postDetail">
                        <h2 id="postTitle"></h2>
                        <div id="postInfo">
                            작성자: <span id="postAuthor"></span>
                            작성일: <span id="postDate"></span>
                            조회수: <span id="postViews"></span>
                        </div>
                        <p id="postContent"></p>
                    </div>
                    
                    <div id="modifyDeleteButtons">
                        <button type="button" onClick={goBoardModify}>게시글 수정</button>
                        <button type="button" >게시글 삭제</button>
                    </div>
                    <div id="comment">
                    <div id="comment_list">
                        <h3>댓글</h3>
                        <ul id="commentsList"></ul>
                        
                    </div>
                    <div id="comment_write">
                        <h3>댓글 작성</h3>
                        <div id="comment_write_form">
                            <textarea id="commentContent" rows="3" cols="50"></textarea>
                            <button type="button">댓글 작성</button>
                        </div>
                    </div>
                </div>

                </div>
            </div>
        </div>
    );
}