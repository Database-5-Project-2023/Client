# 데이터베이스 및 데이터 시각화 프로젝트

<img src="https://github.com/Database-5-Project-2023/Client/assets/92677088/1359e62f-1803-4878-bc2e-f2863e7db4f3"/>


## 1.	웹 애플리케이션 소개
 본 프로젝트는 데이터베이스 관리 시스템(DBMS)를 사용하는 웹 애플리케이션을 개발하는 프로젝트로, "따릉이 플랫폼"을 주제로 한다.<br/>
 
 "따릉이 플랫폼"은 현재 서울특별시 서울시설공단에서 운영하는 완전 무인 공공자전거 대여 서비스 "서울자전거 따릉이"를 기반으로 둔 개발 프로젝트로, "서울자전거 따릉이"의 공식 홈페이지 및 공식 애플리케이션을 참고해 보다 나은 서비스를 제공하고자 하는 데 목적을 둔다.<br/>
 
 "따릉이 플랫폼" 웹 애플리케이션은 서버와 클라이언트로 구성되어 있다. 본 프로젝트에서는 웹 서버와 데이터베이스 관리 시스템(DBMS)를 연동하여 서버 부분을 구현하며, 동시에 웹 브라우저가 클라이언트의 역할을 수행하여 사용자와의 상호작용을 처리하도록 한다.<br/>
 
**기능적 측면에서, "따릉이 플랫폼" 웹 애플리케이션은 관리자 기능(회원 관리, 따릉이 시설 관리, 따릉이 대여소 개설 및 폐쇄, 게시판 관리 등), 이용자 기능(회원가입 및 개인 정보 조회, 게시글 작성 등), 따릉이 위치 정보 조회, 따릉이 대여소 현황 조회, 따릉이 고장(장애) 신고, 데이터 시각화 등을 기본 기능으로 포함한다. 또한 특별 기능으로써 실시간 날씨 조회 서비스, 경로 탐색, 따릉이 예약 서비스, 따릉이 대여소 즐겨찾기 기능, 랭킹 세분화 등을 추가로 구현한다.** <br/>

 이를 구현하기 위한 각 테이블의 기능은 다음 표와 같으며, 프로젝트의 주요 기능 및 테이블 상세 설명은 모두 후술하도록 한다. 데이터셋은 서울특별시 "서울 열린데이터 광장"에서 제공하는 "공공자전거 대여소 정보(23.06월 기준).csv"을 사용하여 제작되었다.
<br/>

## 2. 특별 기능
**데이터시각화**
**대여소 별 일일 대여량 시각화**
<br/>
<img width="298" alt="image" src="https://github.com/Database-5-Project-2023/Client/assets/92677088/1d1252ea-9f72-4837-b186-61335e35d1f7">


<img width="303" alt="image" src="https://github.com/Database-5-Project-2023/Client/assets/92677088/e4fd92ff-a372-46b2-9b6e-550692c30f48">


**경로 찾기**
<br/>
<img width="345" alt="image" src="https://github.com/Database-5-Project-2023/Client/assets/92677088/ec5308ab-4b81-4dca-819f-1659454d7d41">


**실시간 날씨 조회**
<br/>
<img width="284" alt="image" src="https://github.com/Database-5-Project-2023/Client/assets/92677088/45fdf87a-c460-4a1a-82d2-530fcad8d8d8">


**관리자 대시보드**
<br/>
<img width="348" alt="image" src="https://github.com/Database-5-Project-2023/Client/assets/92677088/02534fe8-3291-4bdc-99f4-074d1809684a">


## 팀원 소개
>  **FE 2명 & BE 2명**
> 


<table>
  <tr>
    <td><img src="https://github.com/JungSungYeob.png" width="100px" /></td>
    <td><img src="https://github.com/kyeongjeong.png" width="100px" /></td>
    <td><img src="https://github.com/Kim-Min-Gyeong.png" width="100px" /></td>
    <td><img src="https://github.com/sonshn.png" width="100px" /></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/JungSungYeob">정성엽</a>
    </td>
    <td align="center"><a href="https://github.com/kyeongjeong">최경정</a>
    </td>
    <td align="center"><a href="https://github.com/Kim-Min-Gyeong">김민경</a>
    </td>
    <td align="center"><a href="https://github.com/sonshn">손승현</a>
    </td>

  </tr>
  <tr>
    <td align="center">Frontend
    </td>
    <td align="center">Frontend
    </td>
    <td align="center">Backend
    </td>
    <td align="center">Backend
    </td>
  </tr>
</table>
