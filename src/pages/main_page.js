import { useNavigate } from "react-router-dom";
import "./styles.css";
import { useEffect, useState } from "react";


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
    function goAdmin(url) {
        window.open(url, '_blank', 'noopener, noreferrer');
    }
    function logout(){
        localStorage.setItem("loginSession",null);
        movePage('/');
        window.location.reload();
    }

    const tempSection = document.querySelector('.temperature'); // 현재 기온
    const tempMaxSection = document.querySelector('.temp-max'); // 최고 기온
    const tempMinSection = document.querySelector('.temp-min'); // 최저 기온
    const placeSection = document.querySelector('.place'); // 현재 위치(시 단위로 표기)
    const descSection = document.querySelector('.description'); // 설명(맑음, 흐림 등)
    //const iconSection = document.querySelector('.icon'); // 날씨 아이콘
    const windSection = document.querySelector('.wind'); // 풍속
    const humiditySection = document.querySelector('.humidity'); // 습도


    const API_KEY = 'a4eef2ed0290a18772040188f87d1b65';

    const [temp, setTemp] = useState(0);
    const [maxTemp, setMaxTemp] = useState(0);
    const [minTemp, setMinTemp] = useState(0);
    const [place, setPlace] = useState('서울')
    const [desc, setDesc] = useState('맑음')
    const [iconURL, setIconURL] = useState('')
    const [wind, setWind] = useState(0)
    const [humidity, setHumidity] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [latitude, setLatitude] = useState(0);

    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        if(loginSession==null){
            setIsLogin(false);
        }else{
            setIsLogin(true);
        }

        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLatitude(position.coords.latitude);
                    setLongitude(position.coords.longitude);
                },
                (error) => {
                    console.error('Error getting location:', error);
                }
            );
        } else {
            console.error('Geolocation is not supported by your browser.')
        }
    }, [])
    useEffect(() => {
        fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=kr`
        )
            .then(response => response.json())
            .then(json => {
                setTemp(json.main.temp);
                setPlace(json.name);
                setDesc(json.weather[0].description);
                setWind(json.wind.speed);
                setHumidity(json.main.humidity);
                setMaxTemp(json.main.temp_max);
                setMinTemp(json.main.temp_min);
                const icon = json.weather[0].icon
                setIconURL(`http://openweathermap.org/img/wn/${icon}@2x.png`);
            })
            .catch((error) => {
                alert(error);
            });

    }, [latitude])

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
                <img src="/images/main_img.jpg" alt="메인이미지" />
            </div>
            <div className="dashboard_list">
                <h2>실시간 날씨 조회</h2>
                <div className="place">
                    <h2>{place}</h2>
                </div>
                <div id="result_table">
                    <table id="weather_table">
                        <tbody>
                            <tr>
                                <td colSpan="4"><img className="icon" src={iconURL} style={{ width: '150px', height: '150px' }} /></td>
                            </tr>
                            <tr>
                                <td colSpan="4"><div className="temperature">{temp}°C</div> / <div className="description">{desc}</div></td>
                            </tr>
                            <tr>
                                <td><img src="images/min.png" alt="최저온도" style={{ width: '80px', height: '100px', color: 'white' }} /></td>
                                <td><img src="images/max.png" alt="최고온도" style={{ width: '80px', height: '100px' }} /></td>
                                <td><img src="images/wind.png" alt="풍속" style={{ width: '80px', height: '80px' }} /></td>
                                <td><img src="images/humidity.png" alt="습도" style={{ width: '80px', height: '80px' }} /></td>
                            </tr>
                            <tr>
                                <td rowSpan="2">최저 온도 : <div className="temp-min">{minTemp}°C</div></td>
                                <td rowSpan="2">최고 온도 : <div className="temp-max">{maxTemp}°C</div></td>
                                <td rowSpan="2">풍속 : <div className="wind">{wind}m/s</div></td>
                                <td rowSpan="2">습도 : <div className="humidity">{humidity}%</div></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}