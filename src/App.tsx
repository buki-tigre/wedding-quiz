import "./App.css";
import Congratulation from "./components/Congratulation";
import Map from "./components/Map";
import Quiz from "./components/Quiz";
import Slideshow from "./components/Slideshow";

function App() {
  // 슬라이드쇼 이미지 배열
  const slideImages = [
    "https://sbqjslormffvdgnpnara.supabase.co/storage/v1/object/public/wedding//wedding.jpeg",
    "https://sbqjslormffvdgnpnara.supabase.co/storage/v1/object/public/wedding/wedding-1.jpeg",
    "https://sbqjslormffvdgnpnara.supabase.co/storage/v1/object/public/wedding/wedding-2.jpeg",
    "https://sbqjslormffvdgnpnara.supabase.co/storage/v1/object/public/wedding/wedding-3.jpeg",
    "https://sbqjslormffvdgnpnara.supabase.co/storage/v1/object/public/wedding/wedding-4.jpeg",
  ];

  // 카카오톡 공유하기 기능
  const shareToKakao = () => {
    if (window.Kakao) {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init("YOUR_KAKAO_KEY");
      }

      window.Kakao.Link.sendDefault({
        objectType: "feed",
        content: {
          title: "김현아 ♥ 박진수 결혼식에 초대합니다",
          description: "2025년 8월 30일 토요일 오후 2시, 포스코센터 아트홀",
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
      <header>
        <h1>
          김현아 <span className="heart-icon">♥</span> 박진수
        </h1>
      </header>

      <div className="main-image">
        <Slideshow images={slideImages} />
      </div>

      <div className="wedding-info">
        <div className="couple-names">
          김현아 <span className="heart-icon">♥</span> 박진수
        </div>
        <div className="wedding-date">2025년 8월 30일 토요일 오후 2시</div>
        <div className="wedding-place">포스코센터 아트홀</div>
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
          김현아 <span className="heart-icon">♥</span> 박진수의 결혼을
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
