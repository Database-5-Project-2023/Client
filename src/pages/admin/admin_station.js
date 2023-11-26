import { useNavigate } from "react-router-dom";
import "../styles.css";
import { useState } from "react";



export default function AdminStation(){
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
    function openStationPopup(){
        window.open('/admin/station/add', 'PopupWindow', 'width=600,height=400,left=200,top=200');
    }

    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const openPopup = () => {
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
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
                    <a>따릉이 대여소 개설 및 폐쇄</a>
                    <input type="text" placeholder="따릉이 대여소 검색" id="search_input"/>
                    <button type="button" id="search_btn">검색</button>
                    <button type="button" onClick={openStationPopup} id="add_btn">대여소 개설</button>
                </div>
            </div>
            <div class="admin_container">
                <div class="result_table">
                    <table border="1">
                        <tr>
                            <th>station_id</th>
                            <th>station_addr1</th>
                            <th>station_addr2</th>
                            <th>borough</th>
                            <th>general_bike</th>
                            <th>sprout_bike</th>
                            <th>holder_num</th>
                            <th>install_date</th>
                            <th>폐쇄</th>
                        </tr>
                        <tr>
                            <td>ex_station</td>
                            <td>ex_addr1</td>
                            <td>ex_addr2</td>
                            <td>ex_borough</td>
                            <td>ex_general</td>
                            <td>ex_sprout</td>
                            <td>ex_holder</td>
                            <td>ex_install_date</td>
                            <td>
                                <form action="/station/delete/~" method="post">
                                    <button type="submit">폐쇄</button>
                                </form>
                            </td>
                        </tr>
                        <tr>
                            <td>ex_station</td>
                            <td>ex_addr1</td>
                            <td>ex_addr2</td>
                            <td>ex_borough</td>
                            <td>ex_general</td>
                            <td>ex_sprout</td>
                            <td>ex_holder</td>
                            <td>ex_install_date</td>
                            <td>
                                <form action="/station/delete/~" method="post">
                                    <button type="submit">폐쇄</button>
                                </form>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            
        </div>
    );
}