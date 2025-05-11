import { useState, useEffect } from 'react';
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

const RsvpContainer = styled(motion.div)`
  width: 100%;
  max-width: 90%;
  margin: 0 auto;
  border: 1px solid ${props => props.theme.colors.accent};
  padding: 40px 30px;
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

const Description = styled(motion.p)`
  font-family: ${props => props.theme.fonts.body};
  font-size: 1.1rem;
  margin-bottom: 2rem;
  line-height: 1.6;
  color: ${props => props.theme.colors.text};
`;

const Form = styled(motion.form)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 30px;
`;

const InputGroup = styled(motion.div)`
  display: flex;
  flex-direction: column;
  text-align: left;
  
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    gap: 20px;
  }
`;

const Label = styled.label`
  font-family: ${props => props.theme.fonts.title};
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.colors.primary};
  flex: 1;
  
  @media (min-width: 768px) {
    margin-bottom: 0;
    min-width: 120px;
  }
`;

const Input = styled.input`
  font-family: ${props => props.theme.fonts.body};
  font-size: 1rem;
  padding: 10px 15px;
  border: 1px solid ${props => props.theme.colors.accent};
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.8);
  color: ${props => props.theme.colors.text};
  flex: 2;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const TextArea = styled.textarea`
  font-family: ${props => props.theme.fonts.body};
  font-size: 1rem;
  padding: 10px 15px;
  border: 1px solid ${props => props.theme.colors.accent};
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.8);
  color: ${props => props.theme.colors.text};
  flex: 2;
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const RadioGroup = styled.div`
  display: flex;
  gap: 20px;
  flex: 2;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: ${props => props.theme.fonts.body};
  cursor: pointer;
`;

const SubmitButton = styled(motion.button)`
  font-family: ${props => props.theme.fonts.body};
  font-size: 1.1rem;
  padding: 12px 30px;
  margin-top: 10px;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #6d3510;
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const ThankYouMessage = styled(motion.div)`
  font-family: ${props => props.theme.fonts.title};
  font-size: 1.2rem;
  margin-top: 20px;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid ${props => props.theme.colors.accent};
  border-radius: 5px;
  color: ${props => props.theme.colors.primary};
`;

const Rsvp = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    attending: 'yes',
    count: '1',
    message: '',
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
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
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // 실제 구현시에는 서버로 데이터 전송 로직 추가 필요
    // 여기서는 시뮬레이션
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      console.log('Form submitted:', formData);
    }, 1500);
  };
  
  return (
    <SectionContainer
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
    >
      <Title variants={itemVariants}>참석 여부</Title>
      <RsvpContainer variants={itemVariants}>
        <Description variants={itemVariants}>
          귀한 시간 내어 저희의 결혼식에 참석해주실 수 있는지<br />
          아래 양식을 통해 알려주시면 감사하겠습니다.
        </Description>
        
        {!isSubmitted ? (
          <Form onSubmit={handleSubmit}>
            <InputGroup variants={itemVariants}>
              <Label htmlFor="name">이름</Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="이름을 입력해주세요"
              />
            </InputGroup>
            
            <InputGroup variants={itemVariants}>
              <Label htmlFor="phone">연락처</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="010-0000-0000"
              />
            </InputGroup>
            
            <InputGroup variants={itemVariants}>
              <Label>참석 여부</Label>
              <RadioGroup>
                <RadioLabel>
                  <input
                    type="radio"
                    name="attending"
                    value="yes"
                    checked={formData.attending === 'yes'}
                    onChange={handleChange}
                  />
                  참석
                </RadioLabel>
                <RadioLabel>
                  <input
                    type="radio"
                    name="attending"
                    value="no"
                    checked={formData.attending === 'no'}
                    onChange={handleChange}
                  />
                  불참석
                </RadioLabel>
              </RadioGroup>
            </InputGroup>
            
            {formData.attending === 'yes' && (
              <InputGroup variants={itemVariants}>
                <Label htmlFor="count">참석 인원</Label>
                <Input
                  id="count"
                  name="count"
                  type="number"
                  min="1"
                  max="10"
                  value={formData.count}
                  onChange={handleChange}
                  required
                />
              </InputGroup>
            )}
            
            <InputGroup variants={itemVariants}>
              <Label htmlFor="message">메시지</Label>
              <TextArea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="축하 메시지를 남겨주세요 (선택사항)"
              />
            </InputGroup>
            
            <SubmitButton
              type="submit"
              variants={itemVariants}
              disabled={isLoading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isLoading ? '제출 중...' : '제출하기'}
            </SubmitButton>
          </Form>
        ) : (
          <ThankYouMessage
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {formData.attending === 'yes' 
              ? '참석 의사를 알려주셔서 감사합니다! 결혼식에서 뵙겠습니다.'
              : '소중한 회신 감사합니다. 아쉽지만 마음으로 축하해주세요.'}
          </ThankYouMessage>
        )}
      </RsvpContainer>
    </SectionContainer>
  );
};

export default Rsvp; 