import React, { useEffect } from "react";

const Map: React.FC = () => {
  useEffect(() => {
    // 카카오맵 스크립트가 이미 로드되어 있는지 확인
    const existingScript = document.querySelector(
      ".daum_roughmap_loader_script"
    );

    if (!existingScript) {
      // 다음 맵 로더 스크립트 추가
      const script = document.createElement("script");
      script.charset = "UTF-8";
      script.className = "daum_roughmap_loader_script";
      script.src =
        "https://ssl.daumcdn.net/dmaps/map_js_init/roughmapLoader.js";
      document.head.appendChild(script);

      script.onload = initializeMap;
    } else {
      // 이미 스크립트가 로드된 경우
      initializeMap();
    }

    // 맵 초기화 함수
    function initializeMap() {
      if (window.daum && window.daum.roughmap && window.daum.roughmap.Lander) {
        new window.daum.roughmap.Lander({
          timestamp: "1742903704202",
          key: "2ngif",
          mapWidth: "640",
          mapHeight: "360",
        }).render();
      }
    }

    return () => {
      // 컴포넌트 언마운트 시 필요한 정리 작업
    };
  }, []);

  return (
    <div className="map-section">
      <div className="section-title">
        <h2>오시는 길</h2>
      </div>
      <div className="map-container">
        {/* 다음 지도 컨테이너 */}
        <div
          id="daumRoughmapContainer1742903704202"
          className="root_daum_roughmap root_daum_roughmap_landing"
        ></div>
      </div>
      <div className="transportation-info">
        <p>
          <strong>주소:</strong> 안양시 동안구 시민대로 311 5층 브리에홀
        </p>
        <p>
          <strong>지하철:</strong> 4호선 평촌역 1번 출구에서 도보 5분
        </p>
        <p>
          <strong>주차:</strong> 사거리 모든 건물 주차장 이용
        </p>
      </div>
    </div>
  );
};

// 타입스크립트를 위한 전역 변수 선언
declare global {
  interface Window {
    daum: any;
  }
}

export default Map;
