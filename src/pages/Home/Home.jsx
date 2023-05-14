import React, { Fragment, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import 'bootstrap/dist/css/bootstrap.min.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Swiper from 'swiper';
import 'swiper/css';
import backgroundImage from './media/popular.jpg';


function Home() {
    useEffect(() => {
      const swiper = new Swiper('.swiper-container', {
        loop: true,
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        loopedSlides: 3,
        coverflowEffect: {
          rotate: 0,
          stretch: 0,
          depth: 200,
          modifier: 1,
          slideShadows: false,
        },
        pagination: {
          el: '.swiper-pagination',
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        on: {
          init: function () {
            syncContentWithTargetDiv(this);
          },
          slideChange: function () {
            syncContentWithTargetDiv(this);
          },
        },
      });
  
      AOS.init();
      AOS.refresh();
  
      return () => {
        swiper.destroy();
      };
    }, []);
  
    const syncContentWithTargetDiv = (swiper) => {
      const activeIndex = swiper.activeIndex;
      const activeSlide = swiper.slides[activeIndex];
      const content1 = activeSlide.querySelector('.swiper-wrapper h1').innerHTML;
      const content2 = activeSlide.querySelector('.popularUser').innerHTML;
      const content3 = activeSlide.querySelector('.likeAndViews').innerHTML;
      document.getElementById('target-div1').innerHTML = content1;
      document.getElementById('target-div2').innerHTML = content2;
      document.getElementById('target-div3').innerHTML = content3;
    };
    return (
        <Fragment>
            <section id="main">
                <div className="divVideo">
                    <video autoplay muted loop>
                        <source src="./media/video01.mp4" type="video/mp4" />
                    </video>
                    <div className="videoContent">
                        <div id="LOGO">
                            <img src="./media/LOGO.svg" alt="logo" />
                        </div>

                        <div className="slogan">
                            <h5>讓旅行成為生命中的豐富色彩，開啟屬於你的旅程。</h5>
                        </div>
                        <div>
                            <button>
                                <a href="#news">START</a>
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            {/* {最新消息} */}
            <section id="news" className="">
                <img id="greenCloud" src="./media/GreemCloud.png" alt="" />
                <div id="news_area">
                    <div className="news-tittle">
                        <h1 id="newsTittle">
                            NEWS
                        </h1>
                    </div>

                    <div className="container">
                        <div data-aos="fade-left" data-aos-duration="1500" className="accordion accordion-flush" id="accordionFlushExample">
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="flush-headingOne">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                        2023/05/31 畢業快樂!!
                                    </button>
                                </h2>
                                <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne"
                                    data-bs-parent="#accordionFlushExample">
                                    <div className="accordion-body">
                                        Placeholder content for this accordion, which is intended to
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="flush-headingTwo">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                                        2023/03/31 系統更新
                                    </button>
                                </h2>
                                <div id="flush-collapseTwo" className="accordion-collapse collapse" aria-labelledby="flush-headingTwo"
                                    data-bs-parent="#accordionFlushExample">
                                    <div className="accordion-body">
                                        Placeholder content for this accordion, which is intended to
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="flush-headingThree">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                                        Accordion Item #3
                                    </button>
                                </h2>
                                <div id="flush-collapseThree" className="accordion-collapse collapse" aria-labelledby="flush-headingThree"
                                    data-bs-parent="#accordionFlushExample">
                                    <div className="accordion-body">
                                        third item's accordion body. Nothing more exciting happening
                                        here in terms of content, but just filling up the space to
                                        make it look, at least at first glance, a bit more
                                        representative of how this would look in a real-world
                                        application.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 關於 */}
            <section id="about">
                <div>
                    <h5 id="hello" data-aos="fade-down" data-aos-duration="1500" data-aos-delay="100">Hello World!</h5>
                </div>
                <div>
                    <img data-aos="zoom-in" data-aos-duration="2000" data-aos-delay="100" src="./media/SeaView.png" id="seaView"
                        alt="" />
                </div>
                <div>
                    <h4 data-aos="fade-up" data-aos-duration="1000" data-aos-delay="100">
                        你好，世界。
                    </h4>
                </div>
                <img src="./media/WhiteCloud.png" id="whiteCloud" alt="" />
            </section>
            {/* 熱門文章 */}
            <section id="popular" style={{ backgroundImage: `url(${backgroundImage})` }}>
    <div data-aos="fade-right" data-aos-offset="300" data-aos-duration="1000" data-aos-easing="ease-in-sine"
      className="popular-title">
      <h1>POPULAR</h1>
    </div>

    <section id="article" className="article">
      <div className="container">
        <br />
        <div id="target-div1"></div>
        <div id="target-div2"></div>
        <div id="target-div3"></div>
        <div data-aos="fade-right" data-aos-offset="300" data-aos-duration="1500" data-aos-easing="ease-in-sine"
          className="swiper-container col-6">
          <div className="swiper-wrapper">
            <div id="slideA" className="swiper-slide">
              <div className="articleA-topText1 d-flex justify-content-center mt-2">
                <h1>文章標題...1</h1>
              </div>

              <div className="articleA-topText2 d-flex justify-content-center">
                <div className="popularUser">
                  <img src="./media/Bear.svg" alt="" />
                  <p>henry_c</p>
                </div>
              </div>

              <div className="articleA-topText3">
                <div className="likeAndViews">
                  <i className="fa-solid fa-heart"></i>414144
                  <i className="fa-regular fa-eye"></i>14894
                </div>
              </div>
            </div>

            <div id="slideB" className="swiper-slide">
              <div className="articleB-topText1 d-flex justify-content-center mt-2">
                <h1>文章標題...2</h1>
              </div>

              <div className="articleB-topText2 d-flex justify-content-center">
                <div className="popularUser">
                  <img src="./media/Bear.svg" alt="" />
                  <p>henry_c</p>
                </div>
              </div>

              <div className="articleB-topText3">
                <div className="likeAndViews">
                  <i className="fa-solid fa-heart"></i>1655665
                  <i className="fa-regular fa-eye"></i>14894
                </div>
              </div>
            </div>

            <div id="slideC" className="swiper-slide">
              <div className="articleC-topText1 d-flex justify-content-center mt-2">
                <h1>文章標題...3</h1>
              </div>
              <div className="articleC-topText2 d-flex justify-content-center">
                <div className="popularUser">
                  <img src="./media/Bear.svg" alt="" />
                  <p>henry_c</p>
                </div>
              </div>

              <div className="articleC-topText3">
                <div className="likeAndViews">
                  <i className="fa-solid fa-heart"></i>45
                  <i className="fa-regular fa-eye"></i>14894
                </div>
              </div>
            </div>
          </div>
          {/* Add Pagination  */}
          <div className="swiper-pagination"></div>
        </div>
         {/* Add Arrows  */}

        <div className="swiper-button-next">
          <i className="fas fa-chevron-right"></i>
        </div>
        <div className="swiper-button-prev">
          <i className="fas fa-chevron-left"></i>
        </div>
      </div>
      <Helmet>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.5.1/js/swiper.min.js"></script>
      </Helmet>
    </section>
  </section>

  {/* 推薦文章 */}
  <section id="recommend">
    <div data-aos="flip-up" data-aos-offset="300" data-aos-duration="1000" data-aos-easing="ease-in-sine"
      className="recommend-tittle">
      <h1>RECOMMEND</h1>
    </div>
    <svg id="ship" className="handwriting" viewBox="0 0 171 308" fill="none" transform="translate(700, 50)">
      <path
        d="M101.807 60.3831C53.1404 105.05 -30.9929 194.783 21.8071 196.383C74.6071 197.983 133.14 197.05 155.807 196.383C163.14 90.3831 167.407 -85.2169 125.807 60.3831C84.2071 205.983 75.6407 234.383 76.3074 240.383C43.6407 229.716 -5.79281 222.783 11.8071 248.383C29.4071 273.983 50.3071 268.883 28.3071 282.883L125.807 302.383L165.807 274.383C165.807 260.383 81.821 239.691 65.8071 237.671"
        stroke="url(#paint0_linear_757_1539)" stroke-width="9" stroke-linecap="round" />
      <defs>
        <linearGradient id="paint0_linear_757_1539" x1="40.5" y1="36.5" x2="128.5" y2="302"
          gradientUnits="userSpaceOnUse">
          <stop stop-color="#4CEBCE" />
          <stop offset="0.354167" stop-color="#5EF2D5" />
          <stop offset="1" stop-color="#3AD2F3" />
        </linearGradient>
      </defs>
    </svg>
    <svg id="wave" className="handwriting" viewBox="0 0 1267 78" fill="none" transform="translate(550, -5)">
      <path
        d="M4 12.842C67.1605 22.6835 212.851 36.4616 290.328 12.842C367.805 -10.7776 485.424 18.4657 534.549 36.0399C569.638 44.4754 670.975 58.816 795.612 48.6932C951.408 36.0399 1136.68 27.6043 1263 74"
        stroke="url(#paint0_linear_757_1540)" stroke-width="8" stroke-linecap="round" />
      <defs>
        <linearGradient id="paint0_linear_757_1540" x1="-10" y1="4.00005" x2="1302" y2="105.5"
          gradientUnits="userSpaceOnUse">
          <stop offset="0.0483313" stop-color="#BAF9EC" stop-opacity="0.86" />
          <stop offset="0.457428" stop-color="#5FF3D6" stop-opacity="0.78" />
          <stop offset="1" stop-color="#43D9F3" />
        </linearGradient>
      </defs>
    </svg>

    <div data-aos="zoom-in" data-aos-offset="100" data-aos-duration="1500" data-aos-easing="ease-in-out"
      data-aos-once="false" className="container">
      <div className="card text-white">
        <img src="./media/recommend-6.png" className="card-img" alt="..." />
        <div className="card-img-overlay">
          <h5 className="card-title">文章標題...</h5>
          <div className="user">
            <img className="avatar" src="./media/Bear.svg" alt="" />
            <p className="card-text">hercyC</p>
          </div>
        </div>
      </div>
      <div className="card text-white">
        <img src="./media/recommend-2.png" className="card-img" alt="..." />
        <div className="card-img-overlay">
          <h5 className="card-title">文章標題...</h5>
          <div className="user">
            <img className="avatar" src="./media/Bear.svg" alt="" />
            <p className="card-text">hercyC</p>
          </div>
        </div>
      </div>
      <div className="card text-white">
        <img src="./media/recommend-8.jpeg" className="card-img" alt="..." />
        <div className="card-img-overlay">
          <h5 className="card-title">文章標題...</h5>
          <div className="user">
            <img className="avatar" src="./media/Bear.svg" alt="" />
            <p className="card-text">hercyC</p>
          </div>
        </div>
      </div>
      <div className="card text-white">
        <img src="./media/recommend-7.png" className="card-img" alt="..." />
        <div className="card-img-overlay">
          <h5 className="card-title">文章標題...</h5>
          <div className="user">
            <img className="avatar" src="./media/Bear.svg" alt="" />
            <p className="card-text">hercyC</p>
          </div>
        </div>
      </div>
      <div className="card text-white">
        <img src="./media/recommend-5.png" className="card-img" alt="..." />
        <div className="card-img-overlay">
          <h5 className="card-title">文章標題...</h5>
          <div className="user">
            <img className="avatar" src="./media/Bear.svg" alt="" />
            <p className="card-text">hercyC</p>
          </div>
        </div>
      </div>
      <div className="card text-white">
        <img src="./media/recommend-1.jpg" className="card-img" alt="..." />
        <div className="card-img-overlay">
          <h5 className="card-title">文章標題...</h5>
          <div className="user">
            <img className="avatar" src="./media/Bear.svg" alt="" />
            <p className="card-text">hercyC</p>
          </div>
        </div>
      </div>
      <div className="card text-white">
        <img src="./media/recommend-4.png" className="card-img" alt="..." />
        <div className="card-img-overlay">
          <h5 className="card-title">文章標題...</h5>
          <div className="user">
            <img className="avatar" src="./media/Bear.svg" alt="" />
            <p className="card-text">hercyC</p>
          </div>
        </div>
      </div>
    </div>
  </section>

        </Fragment>

    )
}


export default Home