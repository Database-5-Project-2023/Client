import { useNavigate, useSearchParams } from "react-router-dom";
import "../styles.css";
import { useEffect, useState } from "react";
import axios from "axios";


export default function Main_page({ loginSession, setLoginSession, adminSession, setAdminSession }) {
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
    function logout() {
        localStorage.setItem("loginSession", null);
        movePage('/');
        window.location.reload();
    }
    function goAdmin(url) {
        window.open(url, '_blank', 'noopener, noreferrer');
    }
    const [formData, setFormData] = useState({creator_id:loginSession});

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData(prevState => ({...prevState, [name]: value}));
        console.log(formData);
    };

    const [file, setFile] = useState(null);
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
        console.log(file);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        
        const NewForm = new FormData();
        console.log(file);
        NewForm.append('image', file);
        console.log(formData);
        NewForm.append('post',JSON.stringify(formData));
        
        try {
            const response = await axios.post('/posts/write', NewForm,{
                headers:{
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('게시글이 정상적으로 추가되었습니다.');
            movePage('/board')
        } catch (error) {
            alert(`${error.message}`)
            console.error('Error:', error);
        }
        //window.close();
    };

    const [isLogin, setIsLogin] = useState(false);
    useEffect(() => {
        if (loginSession == null) {
            setIsLogin(false);
        } else {
            setIsLogin(true);
        }
    }, []);
    return (
        <div className="wrap">
            <div className="header_wrap">
                <div className="top">
                    <div className="joinlogin">
                        {isLogin && (<a className="mypage" onClick={goMyPage}>마이페이지</a>)}
                        {isLogin && (<a className="mypage" onClick={logout}>로그아웃</a>)}
                        {adminSession && (<a className="admin" onClick={() => goAdmin('/admin')}>관리자 페이지</a>)}
                        {!isLogin && (<a className="join" onClick={goJoin}>회원가입</a>)}
                        {!isLogin && (<a className="login" onClick={goLogin}>로그인</a>)}
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
                <h2>게시글 작성</h2>

                <div className="result_table">
                    <form id="dashboard_write_form" onSubmit={handleSubmit}>
                        <table id="dashboard_write_table" border="1">
                            <tr>
                                <td>제목</td>
                                <td><input type="text" id="title" name="title" onChange={handleChange} required /></td>
                            </tr>
                            <tr>
                                <td>작성글</td>
                                <td>
                                    <textarea rows="10" cols="50" name="content" onChange={handleChange}></textarea>
                                </td>
                            </tr>
                        </table>
                        <button type="submit">게시글 작성</button>
                    </form>
                </div>
            </div>
        </div>
    );
}