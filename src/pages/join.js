import { useNavigate } from "react-router-dom";
import "./styles.css";
import { useState } from "react";
import axios from "axios";


export default function Join({loginSession, setLoginSession, adminSession, setAdminSession}) {
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
    function logout(){
        localStorage.setItem("loginSession",null);
        movePage('/');
        window.location.reload();
    }

    const [formData, setFormData] = useState({});

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData(prevState => ({...prevState, [name]: value}));
        console.log(formData);
    };
    
    const handleSubmit = async(event) =>{
        event.preventDefault();
        try{
            const response = await axios.post('/members/join', formData);
            alert("회원가입 되었습니다.");
            movePage('/');
        }catch(error){
            alert(`${error.message}`)
            console.error('Error:',error);
        }
        //window.close();
    };

    return (
        <div className="wrap">
            <div className="header_wrap">
                <div className="header">
                    <div className="logo">
                        <a onClick={goMain}>
                            <img src="/images/bike_logo.png" alt="로고" />
                        </a>
                    </div>
                </div>
            </div>
            <div className="mainContainer">
                <h1>회원가입</h1>
                <form onSubmit={handleSubmit}>

                    <input type="text" id="id" name="id" onChange={handleChange} placeholder="아이디" required></input>

                    <input type="password" id="pwd" name="pwd" onChange={handleChange} placeholder="비밀번호" required></input>

                    <input type="password" id="confirmPwd" name="confirmPwd" placeholder="비밀번호 재확인" required></input>

                    <input type="email" id="email" name="email" onChange={handleChange} placeholder="이메일" required></input>

                    <input type="text" id="name" name="name" onChange={handleChange} placeholder="이름" required></input>

                    <input type="text" id="age" name="age" onChange={handleChange} placeholder="나이" required></input>

                    <label for="gender">성별:</label>
                    <select id="gender" name="gender" onChange={handleChange} required>
                        <option value="M">남성</option>
                        <option value="F">여성</option>
                    </select>

                    <input type="tel" id="phone_num" name="phone_num" onChange={handleChange} placeholder="휴대전화" required></input>

                    <input type="text" id="address" name="address" onChange={handleChange} placeholder="거주지" required></input>

                    <input type="number" id="weight" name="weight" onChange={handleChange} placeholder="체중" required></input>

                    <button type="submit">가입하기</button>

                </form>
            </div>
        </div>
    );
}