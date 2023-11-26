import { useNavigate } from "react-router-dom";
import "./styles.css";
import { useEffect, useRef, useState } from "react";
import { Container as MapDiv, NaverMap, Marker, useNavermaps} from 'react-naver-maps'


export default function Main_page(){
    const movePage = useNavigate();
    function goMain(){
        movePage('/');
    }
    function goMap(){
        movePage('/stationMap');
    }
    function goBoard(){
        movePage('/board');
    }
    function goFavorite(){
        movePage('/favorite');
    }
    function goRanking(){
        movePage('/ranking');
    }
    function goLogin(){
        movePage('/login');
    }
    function goJoin(){
        movePage('/join');
    }
    function goMyPage(){
        movePage('/mypage/modifyInfo');
    }
    function goAdmin(url){
        window.open(url,'_blank', 'noopener, noreferrer');
    }

    var HOME_PATH = window.HOME_PATH || '.';

    const {naver} = window;
    const [myLocation, setMyLocation] = useState("");
    //const navermaps = useNavermaps();


        

    /*지도 띄우기 및 현재 위치 가져오기 */
    useEffect(() => {
        const map = new naver.maps.Map("map",{
            tileTransition: false,
            zoomControl:true,
            disableKineticPan: false,
        });
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setMyLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            });
        } else {
            window.alert("현재위치를 알수 없습니다.");
        }
        const test = new naver.maps.Marker({
            position: new naver.maps.LatLng(37.5679872,126.9771635),
            map,
            // 원하는 이미지로 마커 커스텀
             icon: {
                 url: '/images/reddot.png',
                 size: new naver.maps.Size(50, 52),
                 origin: new naver.maps.Point(0, 0),
                 anchor: new naver.maps.Point(25, 26),
               },
        });
    }, []);
    
    /*현위치 marker로 표시하기 */

    const curLocHandler =() =>{
        if (typeof myLocation !== "string") {
            const currentPosition = [myLocation.latitude, myLocation.longitude];
    
            const map = new naver.maps.Map("map", {
                center: new naver.maps.LatLng(currentPosition[0], currentPosition[1]),
                tileTransition: false,
                disableKineticPan: false,
                zoomControl: true,
            });
    
            const currentMarker = new naver.maps.Marker({
                position: new naver.maps.LatLng(currentPosition[0], currentPosition[1]),
                map,
                // 원하는 이미지로 마커 커스텀
                 icon: {
                     url: '/images/reddot.png',
                     size: new naver.maps.Size(50, 52),
                     origin: new naver.maps.Point(0, 0),
                     anchor: new naver.maps.Point(25, 26),
                   },
            });
            
        }
    }
    

    return(
        <div className="wrap">
            <div className="header_wrap">
                <div className="top">
                    <div className="joinlogin">
                        <a className="mypage" onClick={goMyPage}>마이페이지</a>
                        <a className="admin"onClick={() => goAdmin('/admin')}>관리자 페이지</a>
                        <a className="join" onClick={goJoin}>회원가입</a>
                        <a className="login" onClick={goLogin}>로그인</a>
                    </div>
                </div>
                <div className="header">
                    <div class="logo">
                        <a onClick={goMain}>
                            <img src="/images/bike_logo.png" alt="로고"/>
                        </a>
                    </div>
                    <div className="menu_web">
                        <ul>
                            <li>
                                <a onClick={goMap}>대여소 조회</a>
                            </li>
                            <li>
                                <a onClick={goBoard}>문의 게시판</a>
                            </li>
                            <li>
                                <a onClick={goFavorite}>즐겨찾기</a>
                            </li>
                            <li>
                                <a onClick={goRanking}>따릉이 랭킹</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="mainContainer">
                <div class="mapContainer">
                    <div>
                        <div id="map" style={{ width: "900px", height: "700px" }}>
                            <img src="/images/curLoc_btn.png" className="currentLocation" onClick={curLocHandler}></img>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    );
}