import { useNavigate } from "react-router-dom";
import "../styles.css";
import { useEffect, useState } from "react";
import axios from "axios";


export default function AdminBike() {
    const movePage = useNavigate();
    function goAdmin() {
        movePage('/admin')
    }
    function goAdminBike() {
        movePage('/admin/bike')
    }
    function goAdminStation() {
        movePage('/admin/station')
    }
    function goAdminBoard() {
        movePage('/admin/board')
    }
    function goAdminMember() {
        movePage('/admin/member')
    }

    function openBikePopup() {
        window.open('/admin/bike/add', 'PopupWindow', 'width=800px,height=900px,left=200px,top=200px');
    }
    /*
    const data = [
        { "id": 1, "title": "제목" },
        { "id": 2, "title": "제목" },
        { "id": 3, "title": "제목" },
        { "id": 4, "title": "제목" },
        { "id": 5, "title": "제목" },
        { "id": 6, "title": "제목" },
        { "id": 7, "title": "제목" },
        { "id": 8, "title": "제목" },
        { "id": 9, "title": "제목" },
        { "id": 10, "title": "제목" },
        { "id": 11, "title": "제목" },
        { "id": 12, "title": "제목" },
        { "id": 13, "title": "제목" },
        { "id": 14, "title": "제목" },
        { "id": 15, "title": "제목" },
        { "id": 16, "title": "제목" },
        { "id": 17, "title": "제목" },
        { "id": 18, "title": "제목" },
        { "id": 19, "title": "제목" }
    ]*/
    const [data, setData] = useState(() => []);
    useEffect(() => {
        axios('/admin/bike_manage')
            .then(res => {
                setData(res.data);
            })
    }, [])
    useEffect(() => {
        console.log(data);
    }, [data])
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(10);
    const visibleRows = data.slice(startIndex, endIndex);

    return (
        <div className="wrap">
            <div className="header_wrap">
                <div className="top">

                </div>
                <div className="header">
                    <div className="logo">
                        <a onClick={goAdmin}>
                            <img src="/images/admin_logo.png" alt="로고" />
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
            <div className="admin_container">
                <div className="search_container">
                    <a>따릉이 시설 관리</a>
                    <input type="text" placeholder="자전거 검색" id="search_input" />
                    <button type="button" id="search_btn">검색</button>
                    <button type="button" id="add_btn" onClick={openBikePopup}>따릉이 추가</button>
                </div>
            </div>
            <div className="admin_container">
                <div className="result_table">
                    <table border="1">
                        <tbody>
                            <th>bike_ID</th>
                            <th>station_ID</th>
                            <th>타입</th>
                            <th>상태</th>
                            <th>삭제</th>
                            <th>수리 여부</th>
                            {visibleRows.map((row, index) => (
                                <tr key={index}>
                                    <td>{row.bike_id}</td>
                                    <td>{row.station_id}</td>
                                    <td>{row.bike_type}</td>
                                    <td>{row.bike_status ? "고장" : "정상"}</td>
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
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}