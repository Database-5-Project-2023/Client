import { useNavigate } from "react-router-dom";
import "../styles.css";


export default function AdminBoard(){
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
                    <a>게시판 관리</a>
                    <input type="text" placeholder="게시판 검색" id="search_input"/>
                    <button type="button" id="search_btn">검색</button>
                </div>
            </div>
            <div class="admin_container">
                <div class="result_table">
                    <table border="1">
                        <tr>
                            <th>Post_id</th>
                            <th>creator_id</th>
                            <th>title</th>
                            <th>content</th>
                            <th>image</th>
                            <th>hit</th>
                            <th>삭제</th>
                        </tr>
                        <tr>
                            <td>ex_id</td>
                            <td>ex_creator</td>
                            <td>ex_title</td>
                            <td>ex_content</td>
                            <td>ex_image</td>
                            <td>ex_hit</td>
                            <td>
                                <form action="/board/delete/~" method="post">
                                    <button type="submit">삭제</button>
                                </form>
                            </td>
                        </tr>
                        <tr>
                            <td>ex_id</td>
                            <td>ex_creator</td>
                            <td>ex_title</td>
                            <td>ex_content</td>
                            <td>ex_image</td>
                            <td>ex_hit</td>
                            <td>
                                <form action="/board/delete/~" method="post">
                                    <button type="submit">삭제</button>
                                </form>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            
        </div>
    );
}