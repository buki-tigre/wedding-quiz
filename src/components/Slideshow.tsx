import React, { useCallback, useEffect, useState } from "react";

interface SlideProps {
  images: string[];
}

const Slideshow: React.FC<SlideProps> = ({ images }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [startX, setStartX] = useState(0);
  const [endX, setEndX] = useState(0);

  // 슬라이드 전환 함수
  const showSlide = useCallback((index: number) => {
    setCurrentSlideIndex(index);
  }, []);

  // 다음 슬라이드로 이동
  const nextSlide = useCallback(() => {
    const nextIndex = (currentSlideIndex + 1) % images.length;
    showSlide(nextIndex);
  }, [currentSlideIndex, images.length, showSlide]);

  // 이전 슬라이드로 이동
  const prevSlide = useCallback(() => {
    const prevIndex = (currentSlideIndex - 1 + images.length) % images.length;
    showSlide(prevIndex);
  }, [currentSlideIndex, images.length, showSlide]);

  // 터치 이벤트 핸들러
  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    const threshold = 50; // 스와이프 감지 임계값

    if (startX - endX > threshold) {
      // 왼쪽으로 스와이프 - 다음 슬라이드
      nextSlide();
    } else if (endX - startX > threshold) {
      // 오른쪽으로 스와이프 - 이전 슬라이드
      prevSlide();
    }
  };

  // 자동 슬라이드 효과
  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 3000); // 3초마다 전환

    return () => {
      clearInterval(slideInterval);
    };
  }, [nextSlide]);

  return (
    <div
      className="slideshow-container"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {images.map((image, index) => (
        <div
          key={index}
          className={`slide ${index === currentSlideIndex ? "active" : ""}`}
        >
          <img src={image} alt={`신랑 신부 사진 ${index + 1}`} />
        </div>
      ))}
      <div className="slide-dots">
        {images.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentSlideIndex ? "active" : ""}`}
            onClick={() => showSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Slideshow;
