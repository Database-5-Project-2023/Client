import { useNavigate, useParams, useSearchParams } from "react-router-dom";
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
    function logout(){
        localStorage.setItem("loginSession",null);
        movePage('/');
        window.location.reload();
    }

    function goBoardModify() {
        movePage('/board/modify');
    }

    function goAdmin(url) {
        window.open(url, '_blank', 'noopener, noreferrer');
    }

    const params = useParams();

    const id = params.id;
    

    const [visible, setVisible] = useState(false);
    const [data, setData] = useState([]);
    const [comment, setComment] = useState([]);

    useEffect(()=>{
        axios(`/posts/view?post_id=${id}`)
            .then(res => {
                setData(res.data);
                setVisible(true);
            })
        axios(`/comments?post_id=${id}`)
            .then(res=>{
                setComment(res.data);
            })
    },[id])

    console.log(data)
    console.log(comment)
    

    const [isLogin, setIsLogin] = useState(false);
    useEffect(() => {
        if(loginSession==null){
            setIsLogin(false);
        }else{
            setIsLogin(true);
        }


    },[]);

    const [writeComment, setWriteComment] = useState('');

    const searchHandler =async() =>{
        try{
            const response = await axios(`/comments?post_id=${loginSession}`)
            .then(res=>{
                setData(res.data);
            })
        }catch(error){

        }
    }

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
                <div className="detail_table">

                    <div id="postDetail">
                        <h2 id="postTitle">{visible? data.post.title: "0"}</h2>
                        <div id="postInfo">
                            작성자: <span id="postAuthor">{visible? data.post.creator_id:"1"} </span>
                            작성일: <span id="postDate">{visible? data.post.created_at.split('T')[0]: "2"} </span>
                            조회수: <span id="postViews">{visible? data.post.hit : "3"}</span>
                        </div>
                        <p id="postContent" style={{border:'1px solid',height: 300}}>{visible? data.post.content: "4"}</p>
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
                                <textarea id="commentContent" rows="3" cols="50"onChange={e => setWriteComment(e.target.value)}></textarea>
                                <button type="button">댓글 작성</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}