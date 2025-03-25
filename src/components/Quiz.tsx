import React, { useState } from "react";

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
}

const Quiz: React.FC = () => {
  const [nickname, setNickname] = useState<string>("");
  const [currentQuizId, setCurrentQuizId] = useState<number>(1);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResult, setShowResult] = useState<boolean>(false);

  const quizData: QuizQuestion[] = [
    {
      id: 1,
      question: "1. 신랑 신부가 첫 소개팅 때 먹은 음식은?",
      options: ["① 양꼬치", "② 회", "③ 순대국밥", "④ 파스타"],
    },
    {
      id: 2,
      question: "2. 신랑 누나 부부가 운영하는 음식점의 이름은?",
      options: [
        "① 간참치&스시",
        "② 건참치&스시",
        "③ 군참치&스시",
        "④ 곤참치&스시",
      ],
    },
    {
      id: 3,
      question: "3. 신랑의 차 색깔은?",
      options: ["① 빨강", "② 파랑", "③ 초록", "④ 노랑"],
    },
    {
      id: 4,
      question: "4. 신랑이 프로포즈했을 때 신부가 한 말은?",
      options: [
        '① "네!"',
        '② "드디어!"',
        '③ "생각해볼게요"',
        '④ "오늘 뭐 먹었어?"',
      ],
    },
    {
      id: 5,
      question: "5. 신랑과 신부가 가장 좋아하는 여행지는?",
      options: ["① 제주도", "② 일본", "③ 하와이", "④ 유럽"],
    },
  ];

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const handleOptionClick = (quizId: number, optionIndex: string) => {
    // 답변 저장
    setAnswers((prev) => ({
      ...prev,
      [quizId]: optionIndex,
    }));

    // 마지막 문항이 아니면 다음 문항으로 자동 이동
    if (quizId < 5) {
      setTimeout(() => {
        setCurrentQuizId(quizId + 1);
      }, 500);
    } else if (nickname.trim() !== "") {
      // 마지막 문항이고 닉네임이 입력되어 있으면 결과 표시
      setTimeout(() => {
        setShowResult(true);
      }, 800);
    } else {
      // 닉네임이 없으면 알림
      alert("퀴즈 응모를 위해 닉네임을 입력해주세요!");
    }
  };

  const handleProgressClick = (quizId: number) => {
    // 완료된 문항까지만 이동 가능
    if (quizId <= Math.max(currentQuizId, Object.keys(answers).length)) {
      setCurrentQuizId(quizId);
    }
  };

  return (
    <div className="quiz-section">
      <div className="section-title">
        <h2>신랑신부 이야기</h2>
      </div>

      {!showResult ? (
        <>
          {/* 닉네임 입력 영역 */}
          <div className="nickname-input">
            <label>퀴즈 참여 닉네임</label>
            <input
              type="text"
              value={nickname}
              onChange={handleNicknameChange}
              placeholder="닉네임을 입력해주세요"
              required
            />
          </div>

          <div className="quiz-intro">
            저희 커플에 대한 재미있는 퀴즈가 준비되어 있어요! 🎮
            <br />
            모든 문제를 풀고 결혼식에서 정답을 확인해 보세요!
            <br />
            <strong>추첨을 통해 소정의 상품도 드립니다! ✨</strong>
          </div>

          <div className="quiz-progress">
            {quizData.map((quiz) => (
              <div
                key={quiz.id}
                className={`quiz-progress-item ${
                  quiz.id === currentQuizId
                    ? "active"
                    : quiz.id in answers
                    ? "completed"
                    : ""
                }`}
                data-id={quiz.id}
                onClick={() => handleProgressClick(quiz.id)}
              >
                {quiz.id}
              </div>
            ))}
          </div>

          <div className="quiz-container">
            {quizData.map((quiz) => (
              <div
                key={quiz.id}
                className={`quiz-item ${
                  quiz.id === currentQuizId ? "active" : ""
                }`}
                data-id={quiz.id}
              >
                <div className="quiz-question">{quiz.question}</div>
                <div className="quiz-options">
                  {quiz.options.map((option, index) => (
                    <button
                      key={index}
                      className={`option-btn ${
                        answers[quiz.id] === (index + 1).toString()
                          ? "selected"
                          : ""
                      }`}
                      data-value={index + 1}
                      onClick={() =>
                        handleOptionClick(quiz.id, (index + 1).toString())
                      }
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="quiz-result">
          성공적으로 응모되었습니다! ✨<br />
          <span id="nickname-display">{nickname}</span>님, 퀴즈 참여 감사합니다!
          ❤️
          <br />
          정답은 결혼식 당일 공개되며, 추첨을 통해 소정의 상품을 드립니다.
          <br />
          결혼식에서 만나요!
        </div>
      )}
    </div>
  );
};

export default Quiz;
