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
    function goHeatMap() {
        movePage('/heatmap');
    }
    function goFindPath() {
        movePage('/findpath');
    }
    function goAdmin(url) {
        window.open(url, '_blank', 'noopener, noreferrer');
    }
    function logout(){
        localStorage.setItem("loginSession",null);
        movePage('/');
        window.location.reload();
    }
    function goBikeList(){
        movePage('/bikelist');
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

    var markers = [];
    var infoWindow = [];

    const [data, setData] = useState(() => []);
    const [bikeInfo, setBikeInfo] = useState(() => []);

    useEffect(() => {
        mapRef.current = new naver.maps.Map("map", {
            tileTransition: false,
            zoomControl: true,
            disableKineticPan: false,
            mapTypes: new naver.maps.MapTypeRegistry({
                'normal': naver.maps.NaverStyleMapTypeOptions.getNormalMap(
                  {
                    overlayType: 'bg.br.ol.lko'
                  }
                )
              })
        })

        var kw = new naver.maps.LatLng(37.6227794, 127.0614598);
        mapRef.current.setCenter(kw);
        axios('/station/location')
            .then(res => {
                setData(res.data);
            })
        
            axios('/station/borrow/bike')
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
            var position = new naver.maps.LatLng(data[i].station_latitude, data[i].station_longitude);
            var marker = new naver.maps.Marker({
                position: position,
                map: mapRef.current,
                icon: {
                    url: '/images/icon_big1.png',
                    size: { width: 50, height: 50 },
                    scaledSize: { width: 20, height: 20 },
                    origin: new naver.maps.Point(0, 0),
                    anchor: new naver.maps.Point(0, 0),
                },
            })
            marker.addListener('click', () => {
                const tmpid = data[i].station_id;
                axios(`/station/?stationId=${tmpid}`)
                    .then(res => {
                        setBikeInfo(res.data);
                    })
                    axios('/bike/report')
                    .then(res => {
                        setData(res.data);
                    })
                setVisibleInfo(true);
            })
            markers.push(marker);
        }
    }, [data]);

    useEffect(() => {
        console.log(bikeInfo);
        setGeneralCnt(bikeInfo.general_bike);
        setSproutCnt(bikeInfo.sprout_bike);
        setStationId(bikeInfo.id);
        setStationName(bikeInfo.station_addr2);
        setHolderCnt(bikeInfo.remainder_holder)
        axios('/station/return/bike')
            .then(res => {
                setData(res.data);
            })
    }, [bikeInfo]);

    /*현위치 marker로 표시하기 */

    const curLocHandler = () => {
        if (typeof myLocation !== "string") {
            const currentPosition = [myLocation.latitude, myLocation.longitude];
            var kw = new naver.maps.LatLng(currentPosition[0], currentPosition[1]);
            mapRef.current.setCenter(kw);
            mapRef.current.setOptions({
                zoom: 18
            })

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
    };

    const closeInfo = () => {
        setVisibleInfo(false)
    };

    const [isClick,setIsClick]=useState(false);
    const handleClick = () =>{
        setIsClick(!isClick);
    }

    const [showRental, setShowRental] = useState(false);
    const rentalHandler = () =>{
        alert("일반따릉이를 대여신청하였습니다.")
    }

    const [showReturn, setShowReturn]=useState(false);
    const returnHandler = () =>{
        setShowReturn(true);
    }

    const haveError = () =>{
        alert("고장 등록되었습니다.")
        setShowReturn(false);
    }

    const noError = () =>{
        alert("반납처리되었습니다.")
        setShowReturn(false);
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
                            <div className="location_info" style={{ display: visibleInfo ? "block" : "none" }}>
                                <div className="location_info_wrap" >
                                    <div className="loc_info_header">
                                        <a>{stationId}.</a>
                                        <a>{stationName}</a>
                                        <img src={isClick? "/images/yellowStar.png":"/images/star.png"} onClick={handleClick} className="bookmarkStar" ></img>
                                        <img onClick={closeInfo} src="/images/close_02.png" className="closeBtn"></img>
                                    </div>
                                    <div className="loc_info_body">
                                        <div className="bikeCntInfo">
                                            <a>일반 따릉이</a> 
                                            <a>{generalCnt}</a>
                                        </div>
                                        <div className="bikeCntInfo">
                                            <a>새싹 따릉이</a> 
                                            <a>{sproutCnt}</a>
                                        </div>
                                        <div className="bikeCntInfo">
                                            <a>남은 거치대 수</a> 
                                            <a>{holderCnt}</a>
                                        </div>
                                    </div>
                                    <div className="loc_info_bottom">
                                        <button onClick={rentalHandler}>대여하기</button>
                                        <button onClick={returnHandler}>반납하기</button>
                                    </div>
                                    {showReturn&&(
                                        <a>따릉이 고장이 있었나요?</a>
                                    )}
                                    {showReturn&&(<button onClick={haveError}>예</button>)}
                                    {showReturn&&(<button onClick={noError}>아니오</button>)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="heatDotMap">
                <button onClick={goDotMap}>점지도 보러 가기</button>
                <button onClick={goHeatMap}>열지도 보러 가기</button>
                <button onClick={goFindPath}>길 찾기</button>
            </div>
        </div>
    );
}