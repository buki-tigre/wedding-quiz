import React, { useState } from "react";
interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  answer: string;
}
const calculateScore = (
  answers: Record<number, string>,
  correctAnswers: Record<number, string>
): number => {
  let correctCount = 0;
  Object.keys(answers).forEach((key) => {
    const questionId = parseInt(key);
    if (answers[questionId] === correctAnswers[questionId]) {
      correctCount++;
    }
  });
  return Math.round((correctCount / Object.keys(correctAnswers).length) * 100);
};
const getCorrectAnswers = (): Record<number, string> => {
  return {
    1: "3",
    2: "2",
    3: "1",
    4: "2",
    5: "2",
  };
};
const generateFeedback = (score: number): string => {
  if (score === 100) {
    return "신랑 신부에 대해 정말 잘 알고 계시네요! :박수::박수::박수:";
  }
  if (score === 80) {
    return "아 아쉽게 하나 틀리셨네요! 그래도 대단해요! :박수::박수:";
  }
  if (score === 60) {
    return "오..꽤 신랑 신부와 가까운 사이인가 봐요! :+1:";
  }
  if (score === 40) {
    return "나쁘지 않아요! 조금 더 신랑 신부에 대해 알아가면 좋겠네요! :미소짓는_상기된_얼굴:";
  }
  if (score === 20) {
    return "아 하나.. 그래도 맞춘게 어디에요!";
  }
  return "신랑 신부에 대해 더 알아갈 기회가 되셨길 바랍니다! 다음에 또 도전해보세요! :근육:";
};
const Quiz: React.FC = () => {
  const [nickname, setNickname] = useState<string>("");
  const [currentQuizId, setCurrentQuizId] = useState<number>(1);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResult, setShowResult] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>("");
  const quizData: QuizQuestion[] = [
    {
      id: 1,
      question: "1. 우리는 사내커플! 같이 다닌 회사 이름은?",
      options: ["현대소프트", "핸디소프트", "핸드스튜디오", "현대스튜디오"],
      answer: "3",
    },
    {
      id: 2,
      question: "2. 회사에서 만난 두 사람! 대화 도중 깜짝 놀란 이유는?",
      options: [
        "생긴게 너무 비슷해서",
        "같은 아파트에 살고 있어서",
        "같이 알바를 했던 사이라서",
        "서로 시비가 붙었던 적이 있어서",
      ],
      answer: "2",
    },
    {
      id: 3,
      question:
        "3. 그렇게 출퇴근을 같이 하게된 두 사람.. 퇴근 도중 신랑은 이것을 같이 먹자고 플러팅을 하게 되는데.. 같이 먹자고 한 음식은?",
      options: ["삼겹살", "닭발", "우동", "쭈꾸미"],
      answer: "1",
    },
    {
      id: 4,
      question:
        "4. 플러팅에 넘어간 신부.. 결국 사귀게 되었는데.. 두 사람이 사귀기 시작한 날은?",
      options: ["3월 27일", "5월 27일", "6월 2일", "12월 30일"],
      answer: "2",
    },
    {
      id: 5,
      question:
        '5. 즐거운 나날들을 보내는 두 사람. 배고픈 신부는 지나가던 길에 만두를 보고 "만두 하나 먹고싶다!" 라고 한다. 이 떄 신랑의 대답은?',
      options: [
        "만두 먹고싶어? 사줄까?",
        "만두말고 더 맛있는거 사줄게",
        "만두는 단백질이 부족해",
        "나는 다섯 개",
      ],
      answer: "2",
    },
  ];
  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };
  const calculateAndShowResult = () => {
    const correctAnswers = getCorrectAnswers();
    const userScore = calculateScore(answers, correctAnswers);
    const userFeedback = generateFeedback(userScore);
    setScore(userScore);
    setFeedback(userFeedback);
    setShowResult(true);
  };
  const handleOptionClick = (quizId: number, optionIndex: string) => {
    setAnswers((prev) => ({
      ...prev,
      [quizId]: optionIndex,
    }));
    if (quizId < 5) {
      return setTimeout(() => {
        setCurrentQuizId(quizId + 1);
      }, 500);
    }
    if (nickname.trim() !== "") {
      return setTimeout(() => {
        calculateAndShowResult();
      }, 800);
    }
    return alert("퀴즈 응모를 위해 닉네임을 입력해주세요!");
  };
  const handleProgressClick = (quizId: number) => {
    if (quizId <= Math.max(currentQuizId, Object.keys(answers).length)) {
      setCurrentQuizId(quizId);
    }
  };
  const handleRetryQuiz = () => {
    setAnswers({});
    setCurrentQuizId(1);
    setShowResult(false);
    setScore(0);
    setFeedback("");
  };
  return (
    <div className="quiz-section">
      <div className="section-title">
        <h2>신랑신부 이야기</h2>
      </div>
      {!showResult ? (
        <>
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
            저희 커플에 대한 재미있는 퀴즈가 준비되어 있어요!
            <br />
            모든 문제를 풀고 정답을 확인해 보세요!
            <br />
            <strong>100점 만점에 몇 점을 맞출 수 있을까요?</strong>
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
          <h3>퀴즈 결과</h3>
          <p className="nickname-result">
            <span id="nickname-display">{nickname}</span>님의 점수는{" "}
            <strong>{score}점</strong> 입니다!
          </p>
          <p className="feedback">{feedback}</p>
          <div className="answer-review">
            <h4>정답 확인</h4>
            {quizData.map((quiz) => (
              <div key={quiz.id} className="answer-item">
                <p className="question">{quiz.question}</p>
                <p
                  className={`answer ${
                    answers[quiz.id] === quiz.answer ? "correct" : "incorrect"
                  }`}
                >
                  나의 답: {quiz.options[parseInt(answers[quiz.id]) - 1]}
                  {answers[quiz.id] !== quiz.answer && (
                    <span className="correct-answer">
                      <br />
                      정답: {quiz.options[parseInt(quiz.answer) - 1]}
                    </span>
                  )}
                </p>
              </div>
            ))}
          </div>
          <button className="retry-btn" onClick={handleRetryQuiz}>
            다시 풀기
          </button>
        </div>
      )}
    </div>
  );
};
export default Quiz;
