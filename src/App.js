import {Routes, Route, BrowserRouter}from "react-router-dom";
import MainPage from "./pages/main_page";
import Join from "./pages/join";
import Login from "./pages/login";
import StationMap from "./pages/stationMap";
import BoardList from "./pages/board/board_list";
import BoardDetail from "./pages/board/board_detail";
import BoardWrite from "./pages/board/board_write";
import BoardModify from "./pages/board/board_modify";
import Favorite from "./pages/favorite";
import Ranking from "./pages/ranking";
import Admin from "./pages/admin/admin";
import AdminMember from "./pages/admin/admin_member";
import AdminBike from "./pages/admin/admin_bike";
import AdminBikeAdd from "./pages/admin/admin_bike_add";
import AdminStation from "./pages/admin/admin_station";
import AdminStationAdd from "./pages/admin/admin_station_add";
import AdminBoard from "./pages/admin/admin_board";
import MyPageMODIFYINFO from "./pages/mypage/mypage_modifyInfo";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/*처음페이지*/}
        <Route path='/' element={<MainPage/>}/>

        {/*로그인*/}
        <Route path='/login' element={<Login/>}/>

        {/*회원가입*/}
        <Route path='/join' element={<Join/>}/>

        {/*대여소조회*/}
        <Route path='/stationMap' element={<StationMap/>}/>

        {/*문의게시판*/}
        <Route path='/board' element={<BoardList/>}/>

        {/*문의 상세페이지*/}
        <Route path="/board/detail/:id" element={<BoardDetail/>}/>

        {/*문의 작성페이지*/}
        <Route path="/board/write" element={<BoardWrite/>}/>

        {/*문의 수정페이지*/}
        <Route path="/board/modify" element={<BoardModify/>}/>

        {/*즐겨찾기*/}
        <Route path='/favorite' element={<Favorite/>}/>

        {/*따릉이랭킹*/}
        <Route path='/ranking' element={<Ranking/>}/>

        {/*관리자_대시보드*/}
        <Route path='/admin' element={<Admin/>}/>

        {/*관리자_회원관리*/}
        <Route path='/admin/member' element={<AdminMember/>}/>

        {/*관리자_따릉이시설관리*/}
        <Route path='/admin/bike' element={<AdminBike/>}/>

        {/*관리자_따릉이_추가페이지*/}
        <Route path='/admin/bike/add' element={<AdminBikeAdd/>}/>

        {/*관리자_따릉이대여소개설및폐쇄*/}
        <Route path='/admin/station' element={<AdminStation/>}/>

        {/*관리자_대여소_추가페이지*/}
        <Route path='/admin/station/add' element={<AdminStationAdd/>}/>

        {/*관리자_게시판관리*/}
        <Route path='/admin/board' element={<AdminBoard/>}/>

        {/*마이페이지 중 */}
        <Route path='/mypage/modifyInfo' element={<MyPageMODIFYINFO/>}/>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
