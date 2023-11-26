import { useNavigate } from "react-router-dom";
import "../styles.css";


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
            <h2>회원정보 수정</h2>

<div class="result_table">
    <div class="mypage_button">
        <button type="button" id="modifyInfo" onclick="moveTo(event)">정보 수정</button>
        <button type="button" id="usageHistory" onclick="moveTo(event)">이용 내역</button>
        <button type="button" id="myList" onclick="moveTo(event)">작성 글/댓글</button>
    </div>
</div>

<div class="result_table">
    <div class="mypage_button">
        <button type="button" id="modifyMemInfo" onclick="moveTo(event)">회원정보 수정</button>
        <button type="button" id="deleteMemInfo" onclick="moveTo(event)">회원 탈퇴</button>
    </div>
</div>
<div class="result_table">
    <form id="dashboard_write_form">
        <table id="dashboard_write_table">
            <tr>
                <td>아이디</td>
                <td><input type="text" id="member_id" name="member_id" placeholder="기존 아이디 불러오기" disabled/></td>
            </tr>
            <tr>
                <td>비밀번호</td>
                <td><input type="password" id="password" name="password" placeholder="기존 비밀번호 불러오기" required/></td>
            </tr>
            <tr>
                <td>비밀번호 확인</td>
                <td><input type="password" id="confirm_password" name="confirm_password" placeholder="비밀번호 확인" required/></td>
            </tr>
            <tr>
                <td>이메일 주소</td>
                <td><input type="email" id="email" name="email" placeholder="기존 이메일 주소 불러오기" required/></td>
            </tr>
            <tr>
                <td>전화번호</td>
                <td><input type="tel" id="phone" name="phone" placeholder="기존 전화번호 불러오기" required/></td>
            </tr>
            <tr>
                <td>거주지</td>
                <td><input type="text" id="address" name="address" placeholder="기존 거주지 불러오기" required/></td>
            </tr>
        </table>
        <button type="button" onclick="submitForm()">게시글 수정</button>
        <button type="button" onclick="cancelForm()">수정 취소</button>
    </form>
</div>
            </div>
        </div>
    );
}