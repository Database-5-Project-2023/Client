import { useNavigate } from "react-router-dom";
import "../styles.css";
import { BarChart, Bar, XAxis, YAxis } from "recharts";
import axios from "axios";
import { useEffect, useState } from "react";

function transformData(data) {
    return Object.entries(data).map(([key, value]) => {
        return { month: `${key}월`, Cnt: value };
    });
}

export default function Admin() {
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
    const [memberdata, setMemberData] = useState(() => []);
    const [recentReport, setRecentReport] = useState(() => []);
    const [topBorough, setTopBorough] = useState(() => []);
    const [recentPost, setRecentPost] = useState(() => []);
    useEffect(() => {
        axios('/admin/dashboard/memGraph')
            .then(res => {
                setMemberData(res.data);
            })

        axios('/admin/dashboard/RecentBikeReport')
            .then(res => {
                setRecentReport(res.data);
            })
        axios('/admin/dashboard/borough')
            .then(res => {
                setTopBorough(res.data);
            })
        axios('/admin/dashboard/recentPost')
            .then(res => {
                setRecentPost(res.data);
            })
    }, []);
    const [barMemData, setBarMemData] = useState(() => []);
    useEffect(() => {
        setBarMemData(transformData(memberdata));
    }, [memberdata]);

    useEffect(() => {
        console.log(barMemData)
    }, [barMemData]);

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
            <div className="dashboard">
                <h1>Dashboard</h1>
                <div className="admin_container">
                    <div className="quadrant top-left">
                        <h4>월별 가입자 수</h4>
                        <BarChart width={750} height={200} data={barMemData}>
                            <Bar dataKey="Cnt" fill="black" />
                            <XAxis dataKey="month" />
                            <YAxis />
                        </BarChart>
                    </div>
                    <div className="quadrant top-right">
                        <h4>최근 게시물(5개)</h4>
                        <table border="1" style={{ width: '800px' }}>
                            <tbody>
                                <th>번호</th>
                                <th>제목</th>
                                <th>사용자</th>
                                <th>조회수</th>
                                <th>날짜</th>
                                <th>삭제</th>
                                {recentPost.map((row, index) => (
                                    <tr key={index}>
                                        <td style={{ cursor: 'pointer' }}>{row.post_id}</td>
                                        <td>{row.title}</td>
                                        <td>{row.creator_id}</td>
                                        <td>{row.hit}</td>
                                        <td>{row.created_at.split('T')[0]}</td>
                                        <td>
                                            <form action="/board/delete/~" method="post">
                                                <button type="submit">삭제</button>
                                            </form>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="quadrant bottom-left">
                        <h4>따릉이 대여 빈도수 높은 자치구</h4>
                        <BarChart width={1500} height={200} data={topBorough}>
                            <Bar dataKey="loan_count" fill="black" />
                            <XAxis dataKey="borough"/>
                            <YAxis />
                        </BarChart>
                    </div>
                    <div className="quadrant bottom-right">
                        <h4>최근 고장 신고(5개)</h4>
                        <table border="1" style={{ width: '800px' }}>
                            <tbody>
                                <th>자전거ID</th>
                                <th>정류장ID</th>
                                <th>타입</th>
                                <th>고장 여부</th>
                                {recentReport.map((row, index) => (
                                    <tr key={index}>
                                        <td>{row.bike_id}</td>
                                        <td>{row.station_id}</td>
                                        <td>{row.bike_type}</td>
                                        <td>{row.bike_status ? "고장" : "수리완료"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    );
}