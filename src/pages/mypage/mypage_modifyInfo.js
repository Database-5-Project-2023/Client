import { json, useNavigate } from "react-router-dom";
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
    function logout(){
        localStorage.setItem("loginSession",null);
        movePage('/');
        window.location.reload();
    }

    function goAdmin(url) {
        window.open(url, '_blank', 'noopener, noreferrer');
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

    const [formData, setFormData] = useState({user:loginSession});

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData(prevState => ({...prevState, [name]: value}));
        console.log(formData);
    };
    
    const handleSubmit = async(event) =>{
        event.preventDefault();
        const queryString = Object.keys(formData)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(formData[key])}`)
        .join('&');
        
        try{
            const response = await axios.post(`/members/edit?${queryString}`, formData);
            alert("회원정보가 수정 되었습니다.");
            window.location.reload();
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
                <div className="result_table" style={{justifyContent:'center'}}>
                    <form onSubmit={handleSubmit}>
                        <table id="dashboard_write_table">
                            <tbody>
                                <tr>
                                    <td>아이디</td>
                                    <td><input type="text" id="member_id" name="member_id" onChange={handleChange} placeholder={loginSession} disabled /></td>
                                </tr>
                                <tr>
                                    <td>비밀번호</td>
                                    <td><input type="password" id="newPwd" name="newPwd" onChange={handleChange} placeholder="새로운 비밀번호" required /></td>
                                </tr>
                                <tr>
                                    <td>비밀번호 확인</td>
                                    <td><input type="password" id="confirm_password" name="confirm_password" placeholder="새로운 비밀번호 확인" required /></td>
                                </tr>
                                <tr>
                                    <td>이메일 주소</td>
                                    <td><input type="email" id="newEmail" name="newEmail" onChange={handleChange} placeholder="새로운 이메일 주소"  /></td>
                                </tr>
                                <tr>
                                    <td>전화번호</td>
                                    <td><input type="tel" id="newPhone" name="newPhone" onChange={handleChange} placeholder="새로운 전화번호"  /></td>
                                </tr>
                                <tr>
                                    <td>거주지</td>
                                    <td><input type="text" id="newAddr" name="newAddr" onChange={handleChange} placeholder="새로운 거주지"  /></td>
                                </tr>
                                <tr>
                                    <td>체중</td>
                                    <td><input type="text" id="newWeight" name="newWeight" onChange={handleChange} placeholder="새로운 거주지"  /></td>
                                </tr>
                                
                            </tbody>
                        </table>
                        <button type="submit">정보 수정</button>
                    </form>
                </div>
            </div>
        </div>
    );
}