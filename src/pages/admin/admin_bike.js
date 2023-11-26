import { useNavigate } from "react-router-dom";
import "../styles.css";


export default function AdminBike(){
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

    const openPopupWindow2 = () => {
        const popupWindow = window.open('', '_blank', 'width=600,height=400,left=200,top=200');
        popupWindow.document.write(
            '<h1>팝업 창</h1>'
            );
        // 추가적인 HTML 콘텐츠나 스크립트를 여기에 작성할 수 있습니다.
    };

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
                    <a>따릉이 시설 관리</a>
                    <input type="text" placeholder="자전거 검색" id="search_input"/>
                    <button type="button" id="search_btn">검색</button>
                    <button type="button" id="add_btn" onClick={openPopupWindow2}>따릉이 추가</button>
                </div>
            </div>
            <div class="admin_container">
                <div class="result_table">
                    <table border="1">
                        <tr>
                            <th>bike_id</th>
                            <th>station_id</th>
                            <th>bike_type</th>
                            <th>bike_status</th>
                            <th>삭제</th>
                            <th>수리 여부</th>
                        </tr>
                        <tr>
                            <td>ex_id</td>
                            <td>ex_station</td>
                            <td>ex_type</td>
                            <td>ex_status</td>
                            <td>
                                <form action="/bike/delete/~" method="post">
                                    <button type="submit">삭제</button>
                                </form>
                            </td>
                            <td>
                                <form action="/bike/fix/~" method="post">
                                    <button type="submit">수리완료</button>
                                </form>
                            </td>
                        </tr>
                        <tr>
                            <td>ex_id</td>
                            <td>ex_station</td>
                            <td>ex_type</td>
                            <td>ex_status</td>
                            <td>
                                <form action="/bike/delete/~" method="post">
                                    <button type="submit">삭제</button>
                                </form>
                            </td>
                            <td>
                                <form action="/bike/fix/~" method="post">
                                    <button type="submit">수리완료</button>
                                </form>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            
        </div>
    );
}