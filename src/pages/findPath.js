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

                setVisibleInfo(true);
            })
            markers.push(marker);
        }
    }, [data]);


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

    useEffect(() => {
        console.log(bikeInfo);
        setGeneralCnt(bikeInfo.general_bike);
        setSproutCnt(bikeInfo.sprout_bike);
        setStationId(bikeInfo.id);
        setStationName(bikeInfo.station_addr2);
        setHolderCnt(bikeInfo.remainder_holder)
    }, [bikeInfo]);

    const closeInfo = () => {
        setVisibleInfo(false)
    };
    
    const [startId, setStartId] = useState(0);
    const [startLat, setStartLat] = useState(0);
    const [startLog, setStartLog] = useState(0);
    const [destId, setDestId] = useState(0);
    const [destLat, setDestLat] = useState(0);
    const [destLog, setDestLog] = useState(0);
    const [pathValue, setPathValue] = useState([]);



    const startLocBtn = (id) => {
        setStartId(id)
    };
    const destLocBtn = (id) => {
        setDestId(id)
    };

    useEffect(()=>{
        const foundItem = data.find(item=> item.station_id === startId);
        if(foundItem!=null){
            setStartLat(foundItem.station_latitude);
            setStartLog(foundItem.station_longitude);
        }
    }, [startId]);
    useEffect(()=>{
        const foundItem = data.find(item=> item.station_id === destId)
        if(foundItem!=null){
            setDestLat(foundItem.station_latitude);
            setDestLog(foundItem.station_longitude);
        }
    }, [destId]);

    const url = `https://cors-anywhere.herokuapp.com/https://naveropenapi.apigw.ntruss.com/map-direction-15/v1/driving?start=${startLog},${startLat}&goal=${destLog},${destLat}&option=traavoidcaronly`

    const getPath = async () =>{

        try{
            const response = await axios.get(url,{
                headers:{
                    'X-NCP-APIGW-API-KEY-ID': clientID,
                    'X-NCP-APIGW-API-KEY': clientSecret
                }
            });
            console.log(response.data)
            if (response.data.route && response.data.route.traavoidcaronly && response.data.route.traavoidcaronly.length > 0) {
                setPathValue(response.data.route.traavoidcaronly[0].path);
              }
        }
        catch(error){
            console.error(error);
        }
    };

    useEffect(()=>{
        for(let i =0;i<pathValue.length;i++){
            Allpaths.push(new naver.maps.LatLng(pathValue[i][1],pathValue[i][0]));
        }
    },[pathValue])

    var Allpaths = [];
    
    useEffect(()=>{
        console.log(Allpaths);
        var polyLine = new naver.maps.Polyline({
            map: mapRef.current,
            path: Allpaths,
            strokeWeight: 5,
            strokeOpacity: 0.9
        })
    },[Allpaths]);

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
                <div style={{backgroundColor:'rgb(48 226 145)', width:'20%',height:'40px',lineHeight:'40px',color:'white', marginLeft:'40%',borderRadius:'5px'}}>
                    <a>출발지 ID: </a>
                    <a>{startId}</a>
                </div>
                <div style={{backgroundColor:'#3d5567', width:'20%',height:'40px',lineHeight:'40px',color:'white', marginLeft:'40%',borderRadius:'5px'}}>
                    <a>도착지 ID:</a>
                    <a>{destId}</a>
                </div>
                <div>
                    <button onClick={getPath} style={{width:'100px', height:'30px', margin:'10px'}}>길찾기</button>
                </div>
                <div className="mapContainer">
                    <div>
                        <div id="map" style={{ width: "900px", height: "700px" }}>
                            <img src="/images/curLoc_btn.png" className="currentLocation" onClick={curLocHandler}></img>
                            <div className="location_info" style={{ display: visibleInfo ? "block" : "none" }}>
                                <div className="location_info_wrap" >
                                    <div className="loc_info_header">
                                        <a>{stationId}.</a>
                                        <a>{stationName}</a>
                                        <img onClick={closeInfo} src="/images/close_02.png" className="closeBtn"></img>
                                    </div>
                                    <div className="loc_info_bottom">
                                        <button onClick={()=>startLocBtn(stationId)}>출발지로</button>
                                        <button onClick={()=>destLocBtn(stationId)}>도착지로</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}