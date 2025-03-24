document.addEventListener("DOMContentLoaded", function () {
  // 슬라이드쇼 기능 구현
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");
  let currentSlideIndex = 0;
  let slideInterval;

  // 슬라이드 전환 함수
  function showSlide(index) {
    // 현재 활성화된 슬라이드와 닷 비활성화
    slides.forEach((slide) => slide.classList.remove("active"));
    dots.forEach((dot) => dot.classList.remove("active"));

    // 새 슬라이드와 닷 활성화
    slides[index].classList.add("active");
    dots[index].classList.add("active");

    currentSlideIndex = index;
  }

  // 다음 슬라이드로 이동
  function nextSlide() {
    let nextSlideIndex = (currentSlideIndex + 1) % slides.length;
    showSlide(nextSlideIndex);
  }

  // 이전 슬라이드로 이동
  function prevSlide() {
    let prevSlideIndex =
      (currentSlideIndex - 1 + slides.length) % slides.length;
    showSlide(prevSlideIndex);
  }

  // 자동 슬라이드 시작
  function startSlideShow() {
    // 처음 슬라이드 활성화
    showSlide(0);

    // 일정 간격으로 슬라이드 전환
    slideInterval = setInterval(nextSlide, 3000); // 3초마다 전환
  }

  // 닷 클릭 이벤트
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      clearInterval(slideInterval); // 자동 전환 중지
      showSlide(index);

      // 잠시 후 자동 전환 재시작
      slideInterval = setInterval(nextSlide, 3000);
    });
  });

  // 터치 슬라이드 이벤트 처리
  const slideshowContainer = document.querySelector(".slideshow-container");
  let startX = 0;
  let endX = 0;

  slideshowContainer.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    clearInterval(slideInterval); // 터치 시 자동 전환 중지
  });

  slideshowContainer.addEventListener("touchmove", (e) => {
    endX = e.touches[0].clientX;
  });

  slideshowContainer.addEventListener("touchend", () => {
    const threshold = 50; // 스와이프 감지 임계값

    if (startX - endX > threshold) {
      // 왼쪽으로 스와이프 - 다음 슬라이드
      nextSlide();
    } else if (endX - startX > threshold) {
      // 오른쪽으로 스와이프 - 이전 슬라이드
      prevSlide();
    }

    // 자동 전환 재시작
    slideInterval = setInterval(nextSlide, 3000);
  });

  // 슬라이드쇼 시작
  startSlideShow();

  // 퀴즈 기능 구현
  const quizItems = document.querySelectorAll(".quiz-item");
  const progressItems = document.querySelectorAll(".quiz-progress-item");
  const optionBtns = document.querySelectorAll(".option-btn");
  const submitBtn = document.querySelector(".submit-btn");
  const quizResult = document.querySelector(".quiz-result");
  const nicknameInput = document.getElementById("nickname");
  const nicknameDisplay = document.getElementById("nickname-display");

  // 현재 퀴즈 상태
  let currentQuizId = 1;
  let answers = {};

  // 답변 선택 처리
  optionBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const quizId = parseInt(this.closest(".quiz-item").dataset.id);
      const optionValue = this.dataset.value;

      // 같은 퀴즈 내의 다른 옵션 선택 해제
      const siblings =
        this.closest(".quiz-options").querySelectorAll(".option-btn");
      siblings.forEach((sib) => sib.classList.remove("selected"));

      // 현재 옵션 선택
      this.classList.add("selected");

      // 답변 저장
      answers[quizId] = optionValue;

      // 마지막 문항(5번)을 선택했고 닉네임이 입력되어 있으면 자동 제출
      if (quizId === 5) {
        if (nicknameInput.value.trim() !== "") {
          // 선택 효과를 보여주기 위해 약간의 지연 후 제출
          setTimeout(() => {
            submitQuiz();
          }, 800);
        } else {
          // 닉네임이 입력되지 않았으면 알림 표시
          alert("퀴즈 응모를 위해 닉네임을 입력해주세요!");
          nicknameInput.focus();
          // 닉네임 입력란으로 스크롤
          nicknameInput.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }
      // 마지막 문항이 아니면 다음 문항으로 이동
      else if (quizId < 5) {
        setTimeout(() => {
          nextQuiz();
        }, 500);
      }
    });
  });

  // 진행 상태 아이템 클릭 처리
  progressItems.forEach((item) => {
    item.addEventListener("click", function () {
      const targetId = parseInt(this.dataset.id);

      // 완료된 문항까지만 이동 가능
      if (targetId <= currentQuizId) {
        showQuizItem(targetId);
      }
    });
  });

  // 다음 문항으로 이동
  function nextQuiz() {
    if (currentQuizId < 5) {
      currentQuizId++;
      showQuizItem(currentQuizId);

      // 이전 단계 완료 표시
      const prevProgress = document.querySelector(
        `.quiz-progress-item[data-id="${currentQuizId - 1}"]`
      );
      prevProgress.classList.remove("active");
      prevProgress.classList.add("completed");
    }
  }

  // 특정 문항 표시
  function showQuizItem(id) {
    // 모든 문항 숨기기
    quizItems.forEach((item) => {
      item.classList.remove("active");
    });

    // 진행 상태 표시 업데이트
    progressItems.forEach((item) => {
      item.classList.remove("active");
      if (parseInt(item.dataset.id) === id) {
        item.classList.add("active");
      }
    });

    // 지정 문항 표시
    const targetItem = document.querySelector(`.quiz-item[data-id="${id}"]`);
    if (targetItem) {
      targetItem.classList.add("active");
      currentQuizId = id;
    }
  }

  // 제출 버튼 활성화 확인 함수는 더 이상 필요하지 않으므로 제거 또는 비활성화
  function checkSubmitButton() {
    // 자동 제출을 위해 이 함수는 더 이상 필요하지 않지만 다른 코드에서 호출하므로 빈 함수로 유지
  }

  // 닉네임 입력 확인
  nicknameInput.addEventListener("input", function () {
    // 제출 버튼을 사용하지 않으므로 버튼 활성화 코드 제거
    // 대신 마지막 퀴즈까지 답변했고 닉네임이 있으면 자동 제출
    if (answers[5] && this.value.trim() !== "") {
      setTimeout(() => {
        submitQuiz();
      }, 800);
    }
  });

  // 퀴즈 제출 처리를 위한 새로운 함수
  function submitQuiz() {
    // 닉네임 입력 영역 숨기기
    const nicknameInputArea = document.querySelector(".nickname-input");
    if (nicknameInputArea) nicknameInputArea.style.display = "none";

    // 퀴즈 소개 영역 숨기기
    const quizIntro = document.querySelector(".quiz-intro");
    if (quizIntro) quizIntro.style.display = "none";

    // 진행 상태 영역 숨기기
    const progressContainer = document.querySelector(".quiz-progress");
    if (progressContainer) progressContainer.style.display = "none";

    // 결과 표시
    quizItems.forEach((item) => {
      item.style.display = "none";
    });

    // 제출 버튼 숨기기 (혹시 HTML에 남아있는 경우)
    if (submitBtn) submitBtn.style.display = "none";

    // 닉네임 표시
    nicknameDisplay.textContent = nicknameInput.value;
    quizResult.style.display = "block";

    // 퀴즈 결과 영역으로 스크롤
    quizResult.scrollIntoView({ behavior: "smooth" });

    // 실제로는 여기서 서버에 데이터를 전송하는 코드가 들어갈 수 있음
    console.log("제출된 답변:", answers);
    console.log("닉네임:", nicknameInput.value);
  }

  // 제출 버튼 이벤트 리스너 제거 (HTML에서 버튼을 제거했지만 코드 안전성을 위해 남겨둠)
  if (submitBtn) {
    submitBtn.style.display = "none"; // 버튼 숨기기
  }

  // 메시지 폼 처리 개선
  const messageForm = document.querySelector(".message-form");
  const messageThanks = document.querySelector(".message-thanks");
  const nameInput = document.getElementById("sender-name");
  const messageInput = document.getElementById("congratulation-message");
  const submitMessageBtn = document.querySelector(".submit-message-btn");

  if (messageForm) {
    // 입력 필드 초기화 및 포커스 이벤트 추가
    if (nameInput) {
      nameInput.value = "";
      nameInput.addEventListener("focus", function () {
        console.log("이름 입력 필드 포커스");
      });
      nameInput.addEventListener("click", function (e) {
        e.stopPropagation();
        console.log("이름 입력 필드 클릭");
      });
    }

    if (messageInput) {
      messageInput.value = "";
      messageInput.addEventListener("focus", function () {
        console.log("메시지 입력 필드 포커스");
      });
      messageInput.addEventListener("click", function (e) {
        e.stopPropagation();
        console.log("메시지 입력 필드 클릭");
      });
    }

    // 터치 이벤트 추가
    if (nameInput) {
      nameInput.addEventListener("touchstart", function (e) {
        e.stopPropagation();
        console.log("이름 입력 필드 터치 시작");
      });
    }

    if (messageInput) {
      messageInput.addEventListener("touchstart", function (e) {
        e.stopPropagation();
        console.log("메시지 입력 필드 터치 시작");
      });
    }

    messageForm.addEventListener("submit", function (e) {
      e.preventDefault();
      console.log("폼 제출 시도");

      if (nameInput.value.trim() !== "" && messageInput.value.trim() !== "") {
        // 메시지 데이터 저장
        const messageData = {
          name: nameInput.value,
          message: messageInput.value,
          timestamp: new Date().toISOString(),
        };

        console.log("저장된 메시지:", messageData);

        // 폼 숨기기
        messageForm.style.display = "none";

        // 감사 메시지 표시
        messageThanks.style.display = "block";

        // 부드러운 스크롤 애니메이션으로 감사 메시지 영역으로 이동
        messageThanks.scrollIntoView({ behavior: "smooth" });
      } else {
        alert("이름과 메시지를 모두 입력해주세요.");
      }
    });

    // 제출 버튼 별도 이벤트 처리
    if (submitMessageBtn) {
      submitMessageBtn.addEventListener("click", function (e) {
        console.log("메시지 제출 버튼 클릭");
        if (nameInput.value.trim() === "" || messageInput.value.trim() === "") {
          e.preventDefault();
          alert("이름과 메시지를 모두 입력해주세요.");
        }
      });
    }
  }

  // 연락하기 버튼 처리
  const groomBtn = document.querySelector(".contact-btn.groom");
  const brideBtn = document.querySelector(".contact-btn.bride");
  const kakaoBtn = document.querySelector(".contact-btn.kakao");

  // 신랑, 신부 전화번호 설정
  const groomPhoneNumber = "010-1234-5678";
  const bridePhoneNumber = "010-8765-4321";

  if (groomBtn) {
    groomBtn.addEventListener("click", function () {
      // 모바일 환경인지 확인
      if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
        // 전화 걸기 기능 실행
        window.location.href = `tel:${groomPhoneNumber.replace(/-/g, "")}`;
      } else {
        // 데스크톱에서는 알림창으로 표시
        alert(`신랑에게 연락하기: ${groomPhoneNumber}`);
      }
    });
  }

  if (brideBtn) {
    brideBtn.addEventListener("click", function () {
      // 모바일 환경인지 확인
      if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
        // 전화 걸기 기능 실행
        window.location.href = `tel:${bridePhoneNumber.replace(/-/g, "")}`;
      } else {
        // 데스크톱에서는 알림창으로 표시
        alert(`신부에게 연락하기: ${bridePhoneNumber}`);
      }
    });
  }

  if (kakaoBtn) {
    kakaoBtn.addEventListener("click", function () {
      // 카카오톡 공유 기능 (추후 구현 예정)
      alert("카카오톡으로 공유하기 기능은 준비 중입니다.");
    });
  }

  // 이미지 효과
  const mainImage = document.querySelector(".main-image");
  if (mainImage) {
    // 슬라이드쇼에서는 마우스 효과가 필요 없으므로 제거
    // 필요한 경우 여기에 추가 이미지 효과 코드 작성
  }

  // 꽃 장식 추가
  const container = document.querySelector(".container");
  if (container) {
    const flowerSymbols = ["❀", "✿", "❁", "✾"];

    for (let i = 0; i < 4; i++) {
      const flower = document.createElement("div");
      flower.className = `flower-decoration flower-${i + 1} floating`;
      flower.textContent = flowerSymbols[i % flowerSymbols.length];
      flower.style.animationDelay = `${i * 0.5}s`;
      container.appendChild(flower);
    }
  }

  // 카카오맵 초기화 (API 로드 후)
  window.addEventListener("load", function () {
    if (typeof kakao !== "undefined" && kakao.maps) {
      const mapContainer = document.getElementById("map");

      if (mapContainer) {
        // 포스코센터 좌표 (테헤란로 440)
        const latitude = 37.506629;
        const longitude = 127.055586;

        const mapOption = {
          center: new kakao.maps.LatLng(latitude, longitude),
          level: 3, // 확대 레벨
        };

        // 지도 객체 생성
        const map = new kakao.maps.Map(mapContainer, mapOption);

        // 마커 생성
        const markerPosition = new kakao.maps.LatLng(latitude, longitude);
        const marker = new kakao.maps.Marker({
          position: markerPosition,
        });

        // 마커 표시
        marker.setMap(map);

        // 인포윈도우 생성
        const infowindow = new kakao.maps.InfoWindow({
          content:
            '<div style="padding:5px;font-size:12px;text-align:center;">포스코센터 아트홀</div>',
        });

        // 인포윈도우 표시
        infowindow.open(map, marker);

        // 지도 크기 변경 시 중심점 재설정
        window.addEventListener("resize", function () {
          map.setCenter(markerPosition);
        });

        // 지도 확대/축소 컨트롤 추가
        const zoomControl = new kakao.maps.ZoomControl();
        map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

        console.log("카카오맵이 성공적으로 로드되었습니다.");
      }
    } else {
      console.error(
        "카카오맵 API를 불러오는데 실패했습니다. API 키를 확인하세요."
      );
    }
  });
});
