import { useNavigate } from "react-router-dom";
import "../styles.css";


export default function AdminMember(){
    const movePage = useNavigate();
    function goAdmin(){
        movePage('/admin')
    }
    function goAdminBike(){
        movePage('/admin/bike')
    }
    function goAdminStation(){
        movePage('/admin/station')
    }
    function goAdminBoard(){
        movePage('/admin/board')
    }
    function goAdminMember(){
        movePage('/admin/member')
    }

    return(
        <div className="wrap">
            <div className="header_wrap">
                <div className="top">
                    
                </div>
                <div className="header">
                    <div class="logo">
                        <a onClick={goAdmin}>
                            <img src="/images/admin_logo.png" alt="로고"/>
                        </a>
                    </div>
                    <div className="menu_web">
                        <ul>
                            <li>
                                <a onClick={goAdminMember}>회원 관리</a>
                            </li>
                            <li>
                                <a onClick={goAdminBike}>따릉이 시설 관리</a>
                            </li>
                            <li>
                                <a onClick={goAdminStation}>따릉이 대여소 개설 및 폐쇄</a>
                            </li>
                            <li>
                                <a onClick={goAdminBoard}>게시판 관리</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="admin_container">
                <div class="search_container">
                    <a>회원관리</a>
                    <input type="text" placeholder="회원 검색" id="search_input"/>
                    <button type="button" id="search_btn">검색</button>
                </div>
            </div>
            <div class="admin_container">
                <div class="result_table">
                    <table border="1">
                        <tr>
                            <th>user_id</th>
                            <th>user_name</th>
                            <th>address</th>
                            <th>user_email</th>
                            <th>birthday</th>
                            <th>gender</th>
                            <th>user_phone_num</th>
                            <th>user_status</th>
                            <th>탈퇴</th>
                        </tr>
                        <tr>
                            <td>ex_id</td>
                            <td>ex_name</td>
                            <td>ex_address</td>
                            <td>ex_email</td>
                            <td>ex_birthday</td>
                            <td>ex_gender</td>
                            <td>ex_phone</td>
                            <td>ex_status</td>
                            <td>
                                <form action="/member/delete/~" method="post">
                                    <button type="submit">탈퇴</button>
                                </form>
                            </td>
                        </tr>
                        <tr>
                            <td>ex_id</td>
                            <td>ex_name</td>
                            <td>ex_address</td>
                            <td>ex_email</td>
                            <td>ex_birthday</td>
                            <td>ex_gender</td>
                            <td>ex_phone</td>
                            <td>ex_status</td>
                            <td>
                                <form action="/member/delete/~" method="post">
                                    <button type="submit">탈퇴</button>
                                </form>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            
        </div>
    );
}