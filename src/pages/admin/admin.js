import { useNavigate } from "react-router-dom";
import "../styles.css";


export default function Admin(){
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
            <div class="dashboard">
                <h1>Dashboard</h1>
                <div class="admin_container">
                    <div class="quadrant top-left">1분면</div>
                    <div class="quadrant top-right">2분면</div>
                    <div class="quadrant bottom-left">3분면</div>
                    <div class="quadrant bottom-right">4분면</div>
                </div>
            </div>
            
        </div>
    );
}