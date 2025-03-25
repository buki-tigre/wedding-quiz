import React, { useState } from "react";

const Congratulation: React.FC = () => {
  const [senderName, setSenderName] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSenderName(e.target.value);
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 실제로는 여기서 서버에 데이터를 전송하는 코드가 들어갈 수 있음
    console.log("제출된 축하 메시지:", { senderName, message });

    // 폼 숨기고 감사 메시지 표시
    setIsSubmitted(true);

    // 메시지 영역으로 스크롤
    const messageSection = document.querySelector(".message-section");
    if (messageSection) {
      messageSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="message-section">
      <div className="section-title">
        <h2>축하 메시지</h2>
      </div>

      {!isSubmitted ? (
        <form className="message-form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={senderName}
            onChange={handleNameChange}
            placeholder="이름"
            autoComplete="off"
            required
          />
          <textarea
            value={message}
            onChange={handleMessageChange}
            placeholder="축하 메시지를 남겨주세요..."
            autoComplete="off"
            required
          />
          <button type="submit" className="submit-message-btn">
            메시지 남기기
          </button>
        </form>
      ) : (
        <div className="message-thanks">
          <p>소중한 축하 메시지 감사합니다! ❤️</p>
          <p>결혼식 후 모든 메시지를 소중히 읽어볼 예정입니다.</p>
          <p>따뜻한 축복에 진심으로 감사드립니다.</p>
        </div>
      )}
    </div>
  );
};

export default Congratulation;
