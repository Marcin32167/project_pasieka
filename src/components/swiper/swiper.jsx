import React, { useEffect, useRef, useState } from "react";
import { Swiper } from 'swiper';
import { Pagination, Navigation, Parallax, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/parallax';

import slideOne from '../../assets/slajd_1.jpeg';
import slideTwo from '../../assets/slajd_2.jpeg';

const HeroSlider = () => {
  const ANIMATION_SPEED = 1000;
  const swiperContainerRef = useRef(null);
  const swiperRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const handleSlideChange = () => {
    if (swiperRef.current && !isAnimating) {
      setIsAnimating(true);
      const swiper = swiperRef.current;

      resetSlideStyles();
      setSlideTransition(ANIMATION_SPEED);

      const handleTransitionEnd = () => {
        setIsAnimating(false);
        swiper.slides.forEach(slide =>
            slide.removeEventListener("transitionend", handleTransitionEnd)
        );
      };

      swiper.slides.forEach(slide => {
        slide.addEventListener("transitionend", handleTransitionEnd);
      });
    }
  };

  const resetSlideStyles = () => {
    if (swiperRef.current) {
      swiperRef.current.slides.forEach(slide => {
        slide.style.transition = "none";
        slide.style.transform = "";
        const slideInner = slide.querySelector(".slide-inner");
        if (slideInner) {
          slideInner.style.transition = "none";
          slideInner.style.transform = "";
        }
      });
    }
  };

  const setSlideTransition = (speed) => {
    if (swiperRef.current) {
      swiperRef.current.slides.forEach(slide => {
        slide.style.transition = `transform ${speed}ms ease`;
        const slideInner = slide.querySelector(".slide-inner");
        if (slideInner) {
          slideInner.style.transition = `transform ${speed}ms ease`;
        }
      });
    }
  };

  const nextSlide = () => {
    if (swiperRef.current && !isAnimating) {
      handleSlideChange();
      swiperRef.current.slideNext();
    }
  };

  const prevSlide = () => {
    if (swiperRef.current && !isAnimating) {
      handleSlideChange();
      swiperRef.current.slidePrev();
    }
  };

  useEffect(() => {
    const interleaveOffset = 0.9;

    const initializeSwiper = () => {
      if (swiperContainerRef.current && !swiperRef.current) {
        Swiper.use([Pagination, Navigation, Parallax, Autoplay]);

        swiperRef.current = new Swiper(swiperContainerRef.current, {
          init: false, // Wyłączamy automatyczną inicjalizację
          loop: true,
          speed: ANIMATION_SPEED,
          parallax: true,
          autoplay: {
            delay: 6500,
            disableOnInteraction: false,
          },
          watchSlidesProgress: true,
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
          },
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          on: {
            init: function() {
              // Ustawiamy początkowy stan slajdów
              if (!isInitialized) {
                setTimeout(() => {
                  handleSlideChange();
                  setIsInitialized(true);
                }, 0);
              }
            },
            progress: function () {
              const swiper = this;
              for (let i = 0; i < swiper.slides.length; i++) {
                const slideProgress = swiper.slides[i].progress;
                const innerOffset = swiper.width * interleaveOffset;
                const innerTranslate = slideProgress * innerOffset;
                const slideInner = swiper.slides[i].querySelector(".slide-inner");
                if (slideInner) {
                  slideInner.style.transform = `translate3d(${innerTranslate}px, 0, 0)`;
                }
              }
            },
            touchStart: function () {
              const swiper = this;
              swiper.slides.forEach(slide => {
                slide.style.transition = "none";
              });
            },
            setTransition: function (speed) {
              const swiper = this;
              swiper.slides.forEach(slide => {
                slide.style.transition = `${speed}ms`;
                const slideInner = slide.querySelector(".slide-inner");
                if (slideInner) {
                  slideInner.style.transition = `transform ${speed}ms ease`;
                }
              });
            },
            slideChange: function() {
              handleSlideChange();
            }
          },
        });

        // Ręcznie inicjalizujemy Swiper
        swiperRef.current.init();
      }
    };

    setTimeout(initializeSwiper, 0);

    return () => {
      if (swiperRef.current && swiperRef.current.destroy) {
        swiperRef.current.destroy(true, true);
      }
    };
  }, []);

  return (
      <section className="hero-slider hero-style">
        <div className="swiper-container" ref={swiperContainerRef}>
          <div className="swiper-wrapper">
            <div className="swiper-slide">
              <div
                  className="slide-inner slide-bg-image"
                  style={{ backgroundImage: `url(${slideOne})` }}
              >
                <div className="container">
                  <div data-swiper-parallax="300" className="slide-title">
                    <h2>PRZYKŁADOWY TYTUŁ 1</h2>
                  </div>
                  <div data-swiper-parallax="400" className="slide-text">
                    <p>Przykładowy sub tytuł 2</p>
                  </div>
                  <div className="clearfix"></div>
                  <div data-swiper-parallax="500" className="slide-btns">
                    <a href="#" className="theme-btn-s2">
                      Przycisk 1
                    </a>
                    <a href="#" className="theme-btn-s3">
                      <i className="fas fa-chevron-circle-right"></i> Przycisk 2
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="swiper-slide">
              <div
                  className="slide-inner slide-bg-image"
                  style={{ backgroundImage: `url(${slideTwo})` }}
              >
                <div className="container">
                  <div data-swiper-parallax="300" className="slide-title">
                    <h2>PRZYKŁADOWY TYTUŁ 2</h2>
                  </div>
                  <div data-swiper-parallax="400" className="slide-text">
                    <p>Przykładowy sub tytuł 2</p>
                  </div>
                  <div className="clearfix"></div>
                  <div data-swiper-parallax="500" className="slide-btns">
                    <a href="#" className="theme-btn-s2">
                      Przycisk 1
                    </a>
                    <a href="#" className="theme-btn-s3">
                      <i className="fas fa-chevron-circle-right"></i> Przycisk 2
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="swiper-pagination"></div>
          <div className="swiper-button-next" onClick={nextSlide}></div>
          <div className="swiper-button-prev" onClick={prevSlide}></div>
        </div>
      </section>
  );
};

export default HeroSlider;