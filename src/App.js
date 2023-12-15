import {Routes, Route, BrowserRouter, json}from "react-router-dom";
import MainPage from "./pages/main_page";
import Join from "./pages/join";
import Login from "./pages/login";
import StationMap from "./pages/stationMap";
import BoardList from "./pages/board/board_list";
import BoardDetail from "./pages/board/board_detail";
import BoardWrite from "./pages/board/board_write";
import BoardModify from "./pages/board/board_modify";
import Favorite from "./pages/favorite";
import MypageRanking from "./pages/mypage/mypage_ranking";
import Admin from "./pages/admin/admin";
import AdminMember from "./pages/admin/admin_member";
import AdminBike from "./pages/admin/admin_bike";
import AdminBikeAdd from "./pages/admin/admin_bike_add";
import AdminStation from "./pages/admin/admin_station";
import AdminStationAdd from "./pages/admin/admin_station_add";
import AdminBoard from "./pages/admin/admin_board";
import MypageModifyInfo from "./pages/mypage/mypage_modifyInfo";
import MypageDeleteInfo from "./pages/mypage/mypage_deleteInfo";
import MypageMyComment from "./pages/mypage/mypage_myComment";
import MypageMyPost from "./pages/mypage/mypage_myPost";
import MypageUsageHistory from "./pages/mypage/mypage_usageHistory";
import DotMap from "./pages/dotmap";
import HeatMap from "./pages/heatmap";
import FindPath from "./pages/findPath";
import { useEffect, useState } from "react";

function App() {
  const [loginSession, setLoginSession] = useState(()=>{
    const saved = localStorage.getItem("loginSession");
    console.log(saved);
    return saved!==null ? JSON.parse(saved): false;
  });
  useEffect(()=>{
    localStorage.setItem("loginSession",JSON.stringify(loginSession));
  },[loginSession]);

  const [adminSession, setAdminSession] = useState(()=>{
    const saved = localStorage.getItem("adminSession");
    console.log(saved);
    return saved!==null ? JSON.parse(saved): false;
  });
  return (
    <BrowserRouter>
      <Routes>
        {/*처음페이지*/}
        <Route path='/' element={<MainPage loginSession={loginSession} setLoginSession={setLoginSession} adminSession={adminSession} setAdminSession={setAdminSession}/>}/>

        {/*로그인*/}
        <Route path='/login' element={<Login loginSession={loginSession} setLoginSession={setLoginSession} adminSession={adminSession} setAdminSession={setAdminSession}/>}/>

        {/*회원가입*/}
        <Route path='/join' element={<Join/>}/>

        {/*대여소조회*/}
        <Route path='/stationMap' element={<StationMap loginSession={loginSession} setLoginSession={setLoginSession} adminSession={adminSession} setAdminSession={setAdminSession}/>}/>

        {/*문의게시판*/}
        <Route path='/board' element={<BoardList loginSession={loginSession} setLoginSession={setLoginSession} adminSession={adminSession} setAdminSession={setAdminSession}/>}/>

        {/*문의 상세페이지*/}
        <Route path="/board/detail/:id" element={<BoardDetail loginSession={loginSession} setLoginSession={setLoginSession} adminSession={adminSession} setAdminSession={setAdminSession}/>}/>

        {/*문의 작성페이지*/}
        <Route path="/board/write" element={<BoardWrite loginSession={loginSession} setLoginSession={setLoginSession} adminSession={adminSession} setAdminSession={setAdminSession}/>}/>

        {/*문의 수정페이지*/}
        <Route path="/board/modify" element={<BoardModify loginSession={loginSession} setLoginSession={setLoginSession} adminSession={adminSession} setAdminSession={setAdminSession}/>}/>

        {/*즐겨찾기*/}
        <Route path='/favorite' element={<Favorite loginSession={loginSession} setLoginSession={setLoginSession} adminSession={adminSession} setAdminSession={setAdminSession}/>}/>

        {/*관리자_대시보드*/}
        <Route path='/admin' element={<Admin loginSession={loginSession} setLoginSession={setLoginSession} adminSession={adminSession} setAdminSession={setAdminSession}/>}/>

        {/*관리자_회원관리*/}
        <Route path='/admin/member' element={<AdminMember loginSession={loginSession} setLoginSession={setLoginSession} adminSession={adminSession} setAdminSession={setAdminSession}/>}/>

        {/*관리자_따릉이시설관리*/}
        <Route path='/admin/bike' element={<AdminBike loginSession={loginSession} setLoginSession={setLoginSession} adminSession={adminSession} setAdminSession={setAdminSession}/>}/>

        {/*관리자_따릉이_추가페이지*/}
        <Route path='/admin/bike/add' element={<AdminBikeAdd loginSession={loginSession} setLoginSession={setLoginSession} adminSession={adminSession} setAdminSession={setAdminSession}/>}/>

        {/*관리자_따릉이대여소개설및폐쇄*/}
        <Route path='/admin/station' element={<AdminStation loginSession={loginSession} setLoginSession={setLoginSession} adminSession={adminSession} setAdminSession={setAdminSession}/>}/>

        {/*관리자_대여소_추가페이지*/}
        <Route path='/admin/station/add' element={<AdminStationAdd loginSession={loginSession} setLoginSession={setLoginSession} adminSession={adminSession} setAdminSession={setAdminSession}/>}/>

        {/*관리자_게시판관리*/}
        <Route path='/admin/board' element={<AdminBoard loginSession={loginSession} setLoginSession={setLoginSession} adminSession={adminSession} setAdminSession={setAdminSession}/>}/>

        {/*마이페이지_정보수정 */}
        <Route path='/mypage/modifyInfo' element={<MypageModifyInfo loginSession={loginSession} setLoginSession={setLoginSession} adminSession={adminSession} setAdminSession={setAdminSession}/>}/>
        {/*마이페이지_회원탈퇴 */}
        <Route path='/mypage/deleteInfo' element={<MypageDeleteInfo loginSession={loginSession} setLoginSession={setLoginSession} adminSession={adminSession} setAdminSession={setAdminSession}/>}/>
        {/*마이페이지_내댓글 */}
        <Route path='/mypage/myComment' element={<MypageMyComment loginSession={loginSession} setLoginSession={setLoginSession} adminSession={adminSession} setAdminSession={setAdminSession}/>}/>
        {/*마이페이지_내글 */}
        <Route path='/mypage/myPost' element={<MypageMyPost loginSession={loginSession} setLoginSession={setLoginSession} adminSession={adminSession} setAdminSession={setAdminSession}/>}/>
        {/*마이페이지_사용이력 */}
        <Route path='/mypage/usageHistory' element={<MypageUsageHistory loginSession={loginSession} setLoginSession={setLoginSession} adminSession={adminSession} setAdminSession={setAdminSession}/>}/>
        {/*따릉이랭킹*/}
        <Route path='/mypage/ranking' element={<MypageRanking loginSession={loginSession} setLoginSession={setLoginSession} adminSession={adminSession} setAdminSession={setAdminSession}/>}/>

        {/*점지도*/}
        <Route path='/dotmap' element={<DotMap loginSession={loginSession} setLoginSession={setLoginSession} adminSession={adminSession} setAdminSession={setAdminSession}/>}/>
        {/*열지도*/}
        <Route path='/heatmap' element={<HeatMap loginSession={loginSession} setLoginSession={setLoginSession} adminSession={adminSession} setAdminSession={setAdminSession}/>}/>

        {/*길찾기*/}
        <Route path='/findpath' element={<FindPath loginSession={loginSession} setLoginSession={setLoginSession} adminSession={adminSession} setAdminSession={setAdminSession}/>}/>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
