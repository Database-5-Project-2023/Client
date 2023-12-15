import { useNavigate } from "react-router-dom";
import "../styles.css";
import { useEffect, useState } from "react";
import axios from "axios";


export default function AdminBoard({loginSession, setLoginSession, adminSession, setAdminSession}) {
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
        axios('/admin/post_manage')
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

    const handleSearch =() =>{
        axios('/admin/post_manage')
            .then(res=>{
                setData(res.data);
            })
    }


    function changePage(pageNum) {
        setStartIndex((pageNum - 1) * 10);
        if (pageNum * 10 >= data.length) {
            setEndIndex(data.length);
        }
        else {
            setEndIndex((pageNum) * 10);
        }
    }
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
                <div className="search_container" style={{marginTop:'30px'}}>
                    <a>게시판 관리</a>
                    <input type="text" placeholder="게시판 검색" id="search_input" style={{width : '200px'}}/>
                    <button type="button" id="search_btn">검색</button>
                </div>
            </div>
            <div className="admin_container" style={{paddingBottom:'20px'}}>
                <div className="result_table">
                    <table border='1'>
                        <tbody>
                            <th>번호</th>
                            <th>제목</th>
                            <th>사용자</th>
                            <th>조회수</th>
                            <th>날짜</th>
                            {visibleRows.map((row, index) => (
                                <tr key={index}>
                                    <td style={{ cursor: 'pointer' }}>{row.post_id}</td>
                                    <td>{row.title}</td>
                                    <td>{row.creator_id}</td>
                                    <td>{row.hit}</td>
                                    <td>{row.created_at.split('T')[0]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="pagination">
                            <button disabled="true">이전</button>
                            <button onClick={() => changePage(1)}>1</button>
                            <button onClick={() => changePage(2)}>2</button>
                            <button onClick={() => changePage(3)}>3</button>
                            <button >다음</button>
                        </div>
        </div>
    );
}