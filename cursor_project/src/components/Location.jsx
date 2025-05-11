import { useEffect } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faBus, faSubway } from '@fortawesome/free-solid-svg-icons';

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

const LocationContainer = styled(motion.div)`
  width: 100%;
  max-width: 90%;
  margin: 0 auto;
  
  @media (min-width: 992px) {
    max-width: 800px;
  }
`;

const MapContainer = styled(motion.div)`
  width: 100%;
  height: 400px;
  margin-bottom: 40px;
  border: 1px solid ${props => props.theme.colors.accent};
  
  @media (max-width: 768px) {
    height: 300px;
  }
`;

// 실제 구현시에는 실제 지도 API 연동 필요
// 임시 지도 이미지로 대체
const MapPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  background-color: #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${props => props.theme.colors.text};
  background-image: url('/images/map-placeholder.jpg');
  background-size: cover;
  background-position: center;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.3);
  }
`;

const MapText = styled.p`
  font-family: ${props => props.theme.fonts.body};
  font-size: 1.2rem;
  font-weight: 600;
  position: relative;
  z-index: 2;
`;

const TransportationContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  border: 1px solid ${props => props.theme.colors.accent};
  padding: 30px;
  background-color: rgba(255, 255, 255, 0.5);
`;

const TransportItem = styled(motion.div)`
  display: flex;
  align-items: flex-start;
  gap: 15px;
  text-align: left;
`;

const TransportIcon = styled.div`
  color: ${props => props.theme.colors.primary};
  font-size: 1.5rem;
  margin-top: 3px;
`;

const TransportInfo = styled.div`
  flex: 1;
`;

const TransportTitle = styled.h3`
  font-family: ${props => props.theme.fonts.title};
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.colors.primary};
`;

const TransportText = styled.p`
  font-family: ${props => props.theme.fonts.body};
  font-size: 1rem;
  line-height: 1.6;
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.5rem;
`;

const ViewKakaoMapButton = styled(motion.a)`
  display: inline-block;
  margin-top: 20px;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  font-family: ${props => props.theme.fonts.body};
  font-size: 1rem;
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #6d3510;
  }
`;

const Location = () => {
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
  
  return (
    <SectionContainer
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
    >
      <Title variants={itemVariants}>오시는 길</Title>
      <LocationContainer>
        <MapContainer variants={itemVariants}>
          <MapPlaceholder>
            <MapText>남산골한옥마을</MapText>
          </MapPlaceholder>
        </MapContainer>
        
        <TransportationContainer variants={itemVariants}>
          <TransportItem variants={itemVariants}>
            <TransportIcon>
              <FontAwesomeIcon icon={faSubway} />
            </TransportIcon>
            <TransportInfo>
              <TransportTitle>지하철</TransportTitle>
              <TransportText>
                3, 4호선 충무로역 2번 출구에서 도보 5분<br />
                6호선 한강진역 1번 출구에서 도보 10분
              </TransportText>
            </TransportInfo>
          </TransportItem>
          
          <TransportItem variants={itemVariants}>
            <TransportIcon>
              <FontAwesomeIcon icon={faBus} />
            </TransportIcon>
            <TransportInfo>
              <TransportTitle>버스</TransportTitle>
              <TransportText>
                간선버스 104, 421, 463, 507번<br />
                지선버스 7012번<br />
                '남산골한옥마을' 정류장 하차
              </TransportText>
            </TransportInfo>
          </TransportItem>
          
          <TransportItem variants={itemVariants}>
            <TransportIcon>
              <FontAwesomeIcon icon={faCar} />
            </TransportIcon>
            <TransportInfo>
              <TransportTitle>자가용</TransportTitle>
              <TransportText>
                네비게이션 '남산골한옥마을' 검색<br />
                주차장: 남산골한옥마을 내 주차장 이용 (유료)
              </TransportText>
            </TransportInfo>
          </TransportItem>
        </TransportationContainer>
        
        <ViewKakaoMapButton 
          variants={itemVariants}
          href="https://map.kakao.com/?urlX=498156&urlY=1129583&urlLevel=3&itemId=8419156&q=%EB%82%A8%EC%82%B0%EA%B3%A8%ED%95%9C%EC%98%A5%EB%A7%88%EC%9D%84&srcid=8419156&map_type=TYPE_MAP"
          target="_blank"
          rel="noopener noreferrer"
        >
          카카오맵에서 보기
        </ViewKakaoMapButton>
      </LocationContainer>
    </SectionContainer>
  );
};

export default Location; 