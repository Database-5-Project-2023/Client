import {Routes, Route, BrowserRouter}from "react-router-dom";
import MainPage from "./pages/main_page";
import Join from "./pages/join";
import Login from "./pages/login";
import StationMap from "./pages/stationMap";
import Board from "./pages/board";
import Favorite from "./pages/favorite";
import Ranking from "./pages/ranking";
import Admin from "./pages/admin";
import AdminMember from "./pages/admin_member";
import AdminBike from "./pages/admin_bike";
import AdminStation from "./pages/admin_station";
import AdminBoard from "./pages/admin_board";
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
        <Route path='/board' element={<Board/>}/>
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
        {/*관리자_따릉이대여소개설및폐쇄*/}
        <Route path='/admin/station' element={<AdminStation/>}/>
        {/*관리자_게시판관리*/}
        <Route path='/admin/board' element={<AdminBoard/>}/>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
