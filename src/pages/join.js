import { useNavigate } from "react-router-dom";
import "./styles.css";


export default function Join(){
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
                <h1>회원가입</h1>
                <form name="signupForm" method="post">
                    
                    <input type="text" id="id" name="id" placeholder="아이디" required></input>

                    <input type="password" id="password" name="password" placeholder="비밀번호" required></input>

                    <input type="password" id="confirmPassword" name="confirmPassword" placeholder="비밀번호 재확인" required></input>

                    <input type="email" id="email" name="email" placeholder="이메일" required></input>

                    <input type="text" id="name" name="name" placeholder="이름" required></input>

                    <input type="date" id="birthdate" name="birthdate" placeholder="생년월일" required></input>

                    <label for="gender">성별:</label>
                    <select id="gender" name="gender" required>
                        <option value="male">남성</option>
                        <option value="female">여성</option>
                    </select>

                    <input type="tel" id="phone" name="phone" placeholder="휴대전화" required></input>

                    <input type="text" id="location" name="location" placeholder="거주지" required></input>

                    <input type="number" id="weight" name="weight" placeholder="체중" required></input>

                    <button type="submit">가입하기</button>

                </form>
            </div>
        </div>
    );
}