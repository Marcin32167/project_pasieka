import React, { useEffect, useRef } from "react";
import Swiper from "swiper";
import "swiper/css";

import slideOne from '../../assets/slajd_1.jpeg';

const HeroSlider = () => {
  const swiperContainerRef = useRef(null);
  const swiperRef = useRef(null); // Dodajemy referencję do Swipera

  useEffect(() => {
    const interleaveOffset = 0.5;

    // Upewnijmy się, że Swiper jest inicjalizowany po załadowaniu komponentu
    const initializeSwiper = () => {
      if (swiperContainerRef.current && !swiperRef.current) {
        swiperRef.current = new Swiper(swiperContainerRef.current, {
          loop: true,
          speed: 1000,
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
            init: function () {
              console.log("Swiper has been initialized!");
            },
            progress: function () {
              const swiper = this;
              for (let i = 0; i < swiper.slides.length; i++) {
                const slideProgress = swiper.slides[i].progress;
                const innerOffset = swiper.width * interleaveOffset;
                const innerTranslate = slideProgress * innerOffset;
                swiper.slides[i].querySelector(".slide-inner").style.transform =
                  `translate3d(${innerTranslate}px, 0, 0)`;
              }
            },
            touchStart: function () {
              const swiper = this;
              for (let i = 0; i < swiper.slides.length; i++) {
                swiper.slides[i].style.transition = "";
              }
            },
            setTransition: function (speed) {
              const swiper = this;
              for (let i = 0; i < swiper.slides.length; i++) {
                swiper.slides[i].style.transition = `${speed}ms`;
                swiper.slides[i].querySelector(".slide-inner").style.transition =
                  `${speed}ms`;
              }
            },
          },
        });
      }
    };

    // Inicjalizuj Swipera po pełnym załadowaniu komponentu
    setTimeout(initializeSwiper, 100);

    return () => {
      if (swiperRef.current && swiperRef.current.destroy) {
        swiperRef.current.destroy(true, true);
      }
    };
  }, []);

  useEffect(() => {
    const sliderBgSetting = document.querySelectorAll(".slide-bg-image");
    sliderBgSetting.forEach((el) => {
      const bgImage = el.getAttribute("data-background");
      if (bgImage) {
        el.style.backgroundImage = `url(${bgImage})`;
      }
    });
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
                  <h2>PRZYŁADOWY TYTUŁ 1</h2>
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
              data-background="https://images.unsplash.com/photo-1579003087287-997fd4d18771?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
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
        <div className="swiper-button-next"></div>
        <div className="swiper-button-prev"></div>
      </div>
    </section>
  );
};

export default HeroSlider;
