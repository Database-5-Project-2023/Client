import { useNavigate } from "react-router-dom";
import "./styles.css";


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
    function goAdmin(url){
        window.open(url,'_blank', 'noopener, noreferrer');
    }

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
               
            </div>
        </div>
    );
}