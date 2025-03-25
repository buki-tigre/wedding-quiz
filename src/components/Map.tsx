import React from "react";

const Map: React.FC = () => {
  // 간단한 Google Maps iframe을 사용하여 지도 표시
  return (
    <div className="map-section">
      <div className="section-title">
        <h2>오시는 길</h2>
      </div>
      <div className="map-container">
        <iframe
          title="더파티움 안양 위치"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3168.0935072205203!2d126.94982087676056!3d37.39082993339762!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357b60c20d333fef%3A0xd9495687af8aed3!2z642U7YOA7Yq4IOyViOyWke2ZlOuPhOyEnA!5e0!3m2!1sko!2skr!4v1714277171209!5m2!1sko!2skr"
          width="100%"
          height="100%"
          style={{ border: 0, borderRadius: "10px" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
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

export default Map;
