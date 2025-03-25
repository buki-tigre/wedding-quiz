import React from "react";

interface CalendarProps {
  date: Date;
}

const Calendar: React.FC<CalendarProps> = ({ date }) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const dayOfMonth = date.getDate();
  const dayOfWeek = date.getDay();

  // 한국어 요일 이름
  const weekdayNames = ["일", "월", "화", "수", "목", "금", "토"];

  // 월 이름 (한글)
  const monthNames = [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ];

  // 해당 월의 첫 날
  const firstDayOfMonth = new Date(year, month, 1);

  // 해당 월의 첫 날의 요일 (0: 일요일, 1: 월요일, ...)
  const firstDayOfWeek = firstDayOfMonth.getDay();

  // 해당 월의 마지막 날짜
  const lastDayOfMonth = new Date(year, month + 1, 0).getDate();

  // 달력에 표시할 날짜 배열 생성
  const days = [];

  // 첫 주의 이전 달 날짜들 (비어있는 부분)
  for (let i = 0; i < firstDayOfWeek; i++) {
    days.push(null);
  }

  // 현재 달의 날짜들
  for (let i = 1; i <= lastDayOfMonth; i++) {
    days.push(i);
  }

  // 6주 분량으로 채우기 위한 다음 달 날짜들 (필요한 경우)
  const totalDays = Math.ceil((firstDayOfWeek + lastDayOfMonth) / 7) * 7;
  for (let i = days.length; i < totalDays; i++) {
    days.push(null);
  }

  // 주 단위로 날짜 그룹화
  const weeks = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <div className="calendar-year-month">
          {year}년 {monthNames[month]}
        </div>
      </div>
      <table className="calendar-table">
        <thead>
          <tr>
            {weekdayNames.map((name, index) => (
              <th
                key={index}
                className={
                  index === 0 ? "sunday" : index === 6 ? "saturday" : ""
                }
              >
                {name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weeks.map((week, weekIndex) => (
            <tr key={weekIndex}>
              {week.map((day, dayIndex) => {
                const isToday = day === dayOfMonth;
                const isSunday = dayIndex === 0;
                const isSaturday = dayIndex === 6;

                return (
                  <td
                    key={dayIndex}
                    className={`
                      ${isToday ? "today" : ""}
                      ${day === null ? "empty" : ""}
                      ${isSunday ? "sunday" : ""}
                      ${isSaturday ? "saturday" : ""}
                    `}
                  >
                    {day}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="calendar-footer">
        <div className="wedding-time">
          {date.getHours() > 12 ? "오후" : "오전"}{" "}
          {date.getHours() > 12 ? date.getHours() - 12 : date.getHours()}시{" "}
          {date.getMinutes()}분
        </div>
      </div>
    </div>
  );
};

export default Calendar;
