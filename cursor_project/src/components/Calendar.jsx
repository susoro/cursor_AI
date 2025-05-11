import { useEffect } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const SectionContainer = styled(motion.section)`
  padding: 60px 20px;
  text-align: center;
  position: relative;
  
  @media (min-width: 768px) {
    padding: 100px 20px;
  }
`;

const Title = styled(motion.h2)`
  font-family: ${props => props.theme.fonts.title};
  font-size: 2rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 3rem;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -0.5rem;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 2px;
    background-color: ${props => props.theme.colors.accent};
  }
`;

const CalendarContainer = styled(motion.div)`
  width: 100%;
  max-width: 90%;
  margin: 0 auto;
  border: 1px solid ${props => props.theme.colors.accent};
  padding: 30px;
  background-color: rgba(255, 255, 255, 0.5);
  position: relative;
  
  @media (min-width: 768px) {
    max-width: 600px;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 10px;
    left: 10px;
    right: 10px;
    bottom: 10px;
    border: 1px solid ${props => props.theme.colors.accent};
    opacity: 0.5;
    pointer-events: none;
  }
`;

const MonthTitle = styled(motion.h3)`
  font-family: ${props => props.theme.fonts.title};
  font-size: 1.8rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1.5rem;
`;

const DaysContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
  margin-bottom: 20px;
`;

const DayName = styled.div`
  font-family: ${props => props.theme.fonts.body};
  font-weight: 700;
  font-size: 0.9rem;
  padding: 5px 0;
  color: ${props => props.theme.colors.text};
  
  &:first-child {
    color: #d9534f;
  }
`;

const Day = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  font-family: ${props => props.theme.fonts.body};
  font-size: 0.9rem;
  color: ${props => props.theme.colors.text};
  position: relative;
  
  ${({ isToday, theme }) =>
    isToday &&
    `
    color: #fff;
    
    &::after {
      content: '';
      position: absolute;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background-color: ${theme.colors.primary};
      z-index: -1;
    }
  `}
  
  ${({ isDisabled }) =>
    isDisabled &&
    `
    color: #aaa;
  `}
`;

const TimeLocation = styled(motion.div)`
  margin-top: 40px;
  text-align: center;
`;

const TimeInfo = styled(motion.p)`
  font-family: ${props => props.theme.fonts.title};
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.primary};
`;

const AddressInfo = styled(motion.p)`
  font-family: ${props => props.theme.fonts.body};
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.colors.text};
`;

const Calendar = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });
  
  const controls = useAnimation();
  
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.2,
      },
    },
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };
  
  // 2025년 5월 달력 데이터
  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  // 2025년 5월 1일은 목요일(인덱스 4)
  const firstDayIndex = 4;
  
  // 달력에 표시할 날짜 배열 생성
  const calendarDays = [];
  
  // 첫 날 이전의 빈 칸
  for (let i = 0; i < firstDayIndex; i++) {
    calendarDays.push(null);
  }
  
  // 실제 날짜
  for (let i = 1; i <= 31; i++) {
    calendarDays.push(i);
  }
  
  return (
    <SectionContainer
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
    >
      <Title variants={itemVariants}>날짜 및 장소</Title>
      <CalendarContainer variants={itemVariants}>
        <MonthTitle variants={itemVariants}>2025년 5월</MonthTitle>
        <DaysContainer>
          {dayNames.map((day, index) => (
            <DayName key={index}>{day}</DayName>
          ))}
          {calendarDays.map((day, index) => (
            <Day 
              key={index}
              isToday={day === 25}
              isDisabled={day === null}
            >
              {day}
            </Day>
          ))}
        </DaysContainer>
        <TimeLocation>
          <TimeInfo variants={itemVariants}>2025년 5월 25일 일요일 오후 1시</TimeInfo>
          <AddressInfo variants={itemVariants}>남산골한옥마을</AddressInfo>
          <AddressInfo variants={itemVariants}>서울특별시 중구 퇴계로 34길 28</AddressInfo>
        </TimeLocation>
      </CalendarContainer>
    </SectionContainer>
  );
};

export default Calendar; 