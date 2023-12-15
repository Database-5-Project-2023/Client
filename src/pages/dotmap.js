import { useNavigate } from "react-router-dom";
import "./styles.css";
import { useEffect, useRef, useState } from "react";
import useFetch from './usefetch';
import axios from "axios";


export default function Main_page({loginSession, setLoginSession, adminSession, setAdminSession}) {
    const movePage = useNavigate();
    function goMain() {
        movePage('/');
    }
    function goMap() {
        movePage('/stationMap');
    }
    function goBoard() {
        movePage('/board');
    }
    function goFavorite() {
        movePage('/favorite');
    }
    function goRanking() {
        movePage('/mypage/ranking');
    }
    function goLogin() {
        movePage('/login');
    }
    function goJoin() {
        movePage('/join');
    }
    function goMyPage() {
        movePage('/mypage/modifyInfo');
    }
    function goDotMap() {
        movePage('/dotmap');
    }
    function goAdmin(url) {
        window.open(url, '_blank', 'noopener, noreferrer');
    }
    function logout(){
        localStorage.setItem("loginSession",null);
        movePage('/');
        window.location.reload();
    }
    const [visibleInfo, setVisibleInfo] = useState(false);
    const [stationId, setStationId] = useState(0);
    const [stationName, setStationName] = useState(null);
    const [generalCnt, setGeneralCnt] = useState(0);
    const [sproutCnt, setSproutCnt] = useState(0);
    const [holderCnt, setHolderCnt] = useState(0);
    const [isLogin, setIsLogin] = useState(false);
    useEffect(() => {
        if(loginSession==null){
            setIsLogin(false);
        }else{
            setIsLogin(true);
        }
    },[]);
    /*
    const data = [
        { "Lat": 37.6227794, "Lng": 127.0614598,"id":1234, "name": "광운대역", "generalCnt":10, "sproutCnt": 5},
        { "Lat": 37.6198535, "Lng": 127.0582835,"id":1235, "name": "광운대앞",  "generalCnt":11, "sproutCnt": 4},
        { "Lat": 37.6195076, "Lng": 127.0579355,"id":1236, "name": "광운대건너편",  "generalCnt":12, "sproutCnt": 3},
        { "Lat": 37.619835, "Lng": 127.0629324,"id":1237, "name": "광운대후문",  "generalCnt":13, "sproutCnt": 2}
    ]*/



    var HOME_PATH = window.HOME_PATH || '.';

    const { naver } = window;
    const [myLocation, setMyLocation] = useState("");
    //const navermaps = useNavermaps();

    const mapRef = useRef(null);

    var dotmaps = [];
    var infoWindow = [];

    const [data, setData] = useState(() => []);
    const [bikeInfo, setBikeInfo] = useState(() => []);

    useEffect(() => {
        mapRef.current = new naver.maps.Map("map", {
            zoom: 11,
            tileTransition: false,
            zoomControl: true,
            disableKineticPan: false,
        })
        axios('/station/location')
            .then(res => {
                setData(res.data);
            })
    }, [])

    useEffect(() => {
        console.log(data);
    }, [data])

    /*지도 띄우기 및 현재 위치 가져오기 */
    useEffect(() => {
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
        for (let i = 0; i < data.length; i++) {
            dotmaps.push(new naver.maps.LatLng(data[i].station_latitude, data[i].station_longitude));
        }
        console.log(dotmaps);
    }, [data]);

    useEffect(() => {
        var dotmap = new naver.maps.visualization.DotMap({
            map: mapRef.current,
            data: dotmaps
        });
    }, [dotmaps]);

    /*현위치 marker로 표시하기 */

    const curLocHandler = () => {
        if (typeof myLocation !== "string") {
            const currentPosition = [myLocation.latitude, myLocation.longitude];
            var kw = new naver.maps.LatLng(currentPosition[0], currentPosition[1]);
            mapRef.current.setCenter(kw);

            //맵에 현위치 마커 표시하기
            const currentMarker = new naver.maps.Marker({
                position: new naver.maps.LatLng(currentPosition[0], currentPosition[1]),
                map: mapRef.current,
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


    return (
        <div className="wrap">
            <div className="header_wrap">
                <div className="top">
                    <div className="joinlogin">
                    {isLogin&&(<a className="mypage" onClick={goMyPage}>마이페이지</a>)}
                        {isLogin&&(<a className="mypage" onClick={logout}>로그아웃</a>)}
                        {adminSession&&(<a className="admin" onClick={() => goAdmin('/admin')}>관리자 페이지</a>)}
                        {!isLogin&&(<a className="join" onClick={goJoin}>회원가입</a>)}
                        {!isLogin&&(<a className="login" onClick={goLogin}>로그인</a>)}
                    </div>
                </div>
                <div className="header">
                    <div className="logo">
                        <a onClick={goMain}>
                            <img src="/images/bike_logo.png" alt="로고" />
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
                <div className="mapContainer">
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