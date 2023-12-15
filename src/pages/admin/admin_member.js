import { useNavigate } from "react-router-dom";
import "../styles.css";
import { useEffect, useState } from "react";
import axios from "axios";


export default function AdminMember({loginSession, setLoginSession, adminSession, setAdminSession}) {
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

    const [data, setData] = useState(() => []);
    useEffect(() => {
        axios('/admin/user_manage')
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

    const [searchValue, setsearchValue] = useState('');
    console.log(searchValue);


    const searchHandler =async() =>{
        try{
            const response = await axios(`/admin/user_manage?search=${searchValue}`)
            .then(res=>{
                setData(res.data);
            })
        }catch(error){

        }
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
                    <a>회원관리</a>
                    <input type="text" placeholder="회원 검색" id="search_input" onChange={e => setsearchValue(e.target.value)} style={{width : '200px'}} />
                    <button type="button" id="search_btn" onClick={searchHandler}>검색</button>
                </div>
            </div>
            <div className="admin_container" style={{paddingBottom:'20px'}}>
                <div className="result_table">
                    <table border="1">
                        <tbody>
                            <th>ID</th>
                            <th>이름</th>
                            <th>이메일</th>
                            <th>주소</th>
                            <th>전화번호</th>
                            <th>성별</th>
                            <th>나이</th>
                            {visibleRows.map((row, index) => (
                                <tr key={index}>
                                    <td>{row.id}</td>
                                    <td>{row.name}</td>
                                    <td>{row.email}</td>
                                    <td>{row.address}</td>
                                    <td>{row.phone_num}</td>
                                    <td>{row.gender}</td>
                                    <td>{row.age}</td>
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