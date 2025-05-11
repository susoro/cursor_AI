import { useEffect } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

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

const GalleryContainer = styled(motion.div)`
  width: 100%;
  max-width: 90%;
  margin: 0 auto;
  border: 1px solid ${props => props.theme.colors.accent};
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.5);
  
  @media (min-width: 992px) {
    max-width: 900px;
  }
`;

const StyledSwiper = styled(Swiper)`
  width: 100%;
  height: 100%;
  
  .swiper-pagination-bullet {
    background: ${props => props.theme.colors.primary};
  }
  
  .swiper-button-next,
  .swiper-button-prev {
    color: ${props => props.theme.colors.primary};
    
    &::after {
      font-size: 1.5rem;
    }
  }
`;

const SlideImg = styled.img`
  width: 100%;
  height: 450px;
  object-fit: cover;
  border-radius: 5px;
  
  @media (max-width: 768px) {
    height: 350px;
  }
  
  @media (max-width: 576px) {
    height: 250px;
  }
`;

const Caption = styled.p`
  font-family: ${props => props.theme.fonts.body};
  font-size: 1rem;
  color: ${props => props.theme.colors.text};
  margin-top: 1rem;
  text-align: center;
`;

const Gallery = () => {
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
  
  // 갤러리용 이미지 - 실제 프로젝트에서는 실제 이미지 경로로 변경 필요
  const galleryImages = [
    { src: '/images/gallery1.jpg', caption: '첫 만남' },
    { src: '/images/gallery2.jpg', caption: '데이트' },
    { src: '/images/gallery3.jpg', caption: '프로포즈' },
    { src: '/images/gallery4.jpg', caption: '웨딩 촬영' },
    { src: '/images/gallery5.jpg', caption: '함께하는 시간' },
  ];
  
  return (
    <SectionContainer
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
    >
      <Title variants={itemVariants}>갤러리</Title>
      <GalleryContainer variants={itemVariants}>
        <StyledSwiper
          modules={[Pagination, Navigation, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          navigation={true}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
        >
          {galleryImages.map((image, index) => (
            <SwiperSlide key={index}>
              <SlideImg src={image.src} alt={`웨딩 사진 ${index + 1}`} />
              <Caption>{image.caption}</Caption>
            </SwiperSlide>
          ))}
        </StyledSwiper>
      </GalleryContainer>
    </SectionContainer>
  );
};

export default Gallery;