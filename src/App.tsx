import { useEffect, useState } from "react";
import "./App.css";
import Calendar from "./components/Calendar";
import Congratulation from "./components/Congratulation";
import Map from "./components/Map";
import Quiz from "./components/Quiz";
import Slideshow from "./components/Slideshow";

function App() {
  // 슬라이드쇼 이미지 배열
  const slideImages = [
    "https://sbqjslormffvdgnpnara.supabase.co/storage/v1/object/public/wedding/ds.jpeg",
    "https://sbqjslormffvdgnpnara.supabase.co/storage/v1/object/public/wedding/ds-1.jpeg",
    "https://sbqjslormffvdgnpnara.supabase.co/storage/v1/object/public/wedding/ds-2.jpeg",
    "https://sbqjslormffvdgnpnara.supabase.co/storage/v1/object/public/wedding/ds-3.jpeg",
  ];

  // 결혼식 날짜 설정
  const weddingDate = new Date("2026-03-28T15:30:00");

  // 카운트다운 상태
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // 카운트다운 계산 함수
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = weddingDate.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setCountdown({ days, hours, minutes, seconds });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  // 카카오톡 공유하기 기능
  const shareToKakao = () => {
    if (window.Kakao) {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init("YOUR_KAKAO_KEY");
      }

      window.Kakao.Link.sendDefault({
        objectType: "feed",
        content: {
          title: "김서현 ♥ 이근한 결혼식에 초대합니다",
          description: "2026년 3월 28일 토요일 오후 3시 30분, 더파티움 안양",
          imageUrl: slideImages[0],
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
        buttons: [
          {
            title: "초대장 보기",
            link: {
              mobileWebUrl: window.location.href,
              webUrl: window.location.href,
            },
          },
        ],
      });
    } else {
      alert("카카오톡 공유하기 기능을 사용할 수 없습니다");
    }
  };

  return (
    <div className="container">
      {/* 장식 요소 */}
      <div className="decoration deco-flower1"></div>
      <div className="decoration deco-flower2"></div>

      <header>
        <h1>
          김서현 <span className="heart-icon">♥</span> 이근한
        </h1>
      </header>

      <div className="main-image">
        <Slideshow images={slideImages} />
      </div>

      <div className="wedding-info">
        <div className="couple-names">
          김서현 <span className="heart-icon">♥</span> 이근한
        </div>
        <div className="wedding-date">2026년 3월 28일 토요일 오후 3시 30분</div>
        <div className="wedding-place">더파티움 안양 5층 브리에홀</div>
      </div>

      {/* 달력 섹션 */}
      <div className="calendar-section">
        <Calendar date={weddingDate} />
      </div>

      {/* 카운트다운 섹션 */}
      <div className="countdown-container">
        <div className="countdown-title">결혼식까지 남은 시간</div>
        <div className="countdown-timer">
          <div className="countdown-item">
            <div className="countdown-number">{countdown.days}</div>
            <div className="countdown-label">일</div>
          </div>
          <div className="countdown-item">
            <div className="countdown-number">{countdown.hours}</div>
            <div className="countdown-label">시간</div>
          </div>
          <div className="countdown-item">
            <div className="countdown-number">{countdown.minutes}</div>
            <div className="countdown-label">분</div>
          </div>
          <div className="countdown-item">
            <div className="countdown-number">{countdown.seconds}</div>
            <div className="countdown-label">초</div>
          </div>
        </div>
      </div>

      <div className="intro-message">
        서로의 마음을 함께 나누며 걸어온 소중한 시간
        <br />
        이제 저희 두 사람이 하나가 되어
        <br />
        새로운 시작을 함께 하려 합니다.
        <br />
        <br />
        귀한 걸음으로 축복해 주시면
        <br />
        더없는 기쁨으로 간직하겠습니다.
      </div>

      <div className="section-container">
        <Quiz />
        <Map />
        <Congratulation />
      </div>

      <div className="contact-buttons">
        <a href="tel:01037722858" className="contact-btn groom">
          신랑에게 연락하기
        </a>
        <a href="tel:01037722858" className="contact-btn bride">
          신부에게 연락하기
        </a>
        <button className="contact-btn kakao" onClick={shareToKakao}>
          카카오톡으로 공유
        </button>
      </div>

      <footer>
        <p>
          김서현 <span className="heart-icon">♥</span> 이근한의 결혼을
          축하해주셔서 감사합니다!
        </p>
      </footer>
    </div>
  );
}

// 타입스크립트에서 Kakao API를 사용하기 위한 타입 선언
declare global {
  interface Window {
    Kakao: any;
  }
}

export default App;
