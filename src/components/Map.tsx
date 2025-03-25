import React, { useEffect } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

const Map: React.FC = () => {
  useEffect(() => {
    // 카카오맵 스크립트 동적 로드
    const script = document.createElement("script");
    script.async = true;
    script.src =
      "https://dapi.kakao.com/v2/maps/sdk.js?appkey=YOUR_APP_KEY&autoload=false";
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("kakaoMap");
        const options = {
          center: new window.kakao.maps.LatLng(37.506502, 127.054955), // 포스코센터 좌표
          level: 3,
        };
        const map = new window.kakao.maps.Map(container, options);

        // 마커 생성
        const marker = new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(37.506502, 127.054955),
        });

        // 마커 표시
        marker.setMap(map);

        // 인포윈도우 생성
        const infowindow = new window.kakao.maps.InfoWindow({
          content: '<div class="infowindow">포스코센터 아트홀</div>',
        });

        // 마커 클릭시 인포윈도우 표시
        infowindow.open(map, marker);
      });
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="map-section">
      <div className="section-title">
        <h2>오시는 길</h2>
      </div>
      <div className="map-container">
        <div id="kakaoMap" style={{ width: "100%", height: "300px" }}></div>
      </div>
      <div className="transportation-info">
        <p>
          <strong>주소:</strong> 서울 강남구 테헤란로 440 포스코센터
        </p>
        <p>
          <strong>지하철:</strong> 2호선 선릉역 1번 출구에서 도보 10분
        </p>
        <p>
          <strong>주차:</strong> 포스코센터 주차장 이용
        </p>
      </div>
    </div>
  );
};

export default Map;
