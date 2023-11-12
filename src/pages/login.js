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

    return(
        <div className="wrap">
            <div className="header_wrap">
                <div className="header">
                    <div class="logo">
                        <a onClick={goMain}>
                            <img src="/images/bike_logo.png" alt="로고"/>
                        </a>
                    </div>
                </div>
            </div>
            <div className="mainContainer">
                <h1>로그인</h1>
                <form name="signupForm" method="post">
                    
                    <input type="text" id="id" name="id" placeholder="아이디" required></input>

                    <input type="password" id="password" name="password" placeholder="비밀번호" required></input>

                    <button type="submit">로그인</button>
                </form>
                <a id="joinBtn" onClick={goJoin}>회원가입</a>
            </div>
        </div>
    );
}