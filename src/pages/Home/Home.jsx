import React, { Fragment, useEffect, useState } from "react";
import './css/Home.scss';
import AOS from "aos";
import "aos/dist/aos.css";
import Swiper from "swiper";
import 'swiper/dist/css/swiper.css'
import axios from "axios";

function Home() {
  var url = "http://localhost:8000";
  var [news, setNews] = useState([]);
  var [popular, setPopular] = useState([]);
  var [recommend, setRecommend] = useState([]);
  var [ifFirst, setIfFirst] = useState(false);
  var [showdiv1, setShowdiv1] = useState("");
  var [showdiv2, setShowdiv2] = useState("");
  var [showdiv3, setShowdiv3] = useState("");
  var [showdiv4, setShowdiv4] = useState("");
  // var [showdiv5, setShowdiv5] = useState("");
  useEffect(() => {
    const firstRender = async () => {
      let result = await axios.get(url + "/");
      setNews(result.data[0]);
      setPopular(result.data[1]);
      setShowdiv1(result.data[1][0].title);
      setShowdiv2(result.data[1][0].username);
      setShowdiv3(result.data[1][0].like_count);
      setShowdiv4(result.data[1][0].view_count);
      // setShowdiv5(result.data[1][0].(url + avatar));
      setRecommend(result.data[2]);
      setIfFirst(true);
    };
    firstRender();
  }, []);
  AOS.init();
  AOS.refresh();

  useEffect(() => {
    if (ifFirst) {
      const swiper = new Swiper('.swiper-container', {
        // roundLengths : true,
        loop: true,
        // initialSlide: 1, 指定先顯示誰(索引)
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        // ↑ 預設true為左邊開始
        slidesPerView: "auto",
        loopedSlides: 3,
        coverflowEffect: {
          rotate: 0,
          stretch: 0,
          // 調整卡片彼此黏合度
          depth: 200,
          modifier: 1,
          slideShadows: true,
          // 卡片陰影
        },
        pagination: {
          el: '.swiper-pagination',
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        on: {
          init: function () { },
          slideChange: function () {
            var content1 = this.slides[this.activeIndex].children[0].innerText;
            var content2 = this.slides[this.activeIndex].children[1].innerText;
            var content3 = this.slides[this.activeIndex].children[2].innerText;
            var content4 = this.slides[this.activeIndex].children[3].innerText;

            console.log(content3);
            setShowdiv1(content1);
            setShowdiv2(content2);
            setShowdiv3(content3);
            setShowdiv4(content4);
          },
        },
      });
    }
  }, [ifFirst]);

  return (
    <Fragment>
      <section id="main">
        <div className="divVideo">
          <video autoPlay muted loop>
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
          <div className="news-tittle"
            data-aos="fade-right"
            data-aos-duration="1500"
            >
            <h1 id="newsTittle">NEWS</h1>
          </div>

          <div className="container">
            <div
              data-aos="fade-left"
              data-aos-duration="1500"
              className="accordion accordion-flush"
              id="accordionFlushExample"
            >
              {news.map((newsList, i) => {
                return (
                  <div className="accordion-item" key={i}>
                    <h2 className="accordion-header" id="flush-headingOne">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#flush-collapse${i}`}
                        aria-expanded="false"
                        aria-controls={`flush-collapse${i}`}
                      >
                        {newsList.release} {newsList.title}
                      </button>
                    </h2>
                    <div
                      id={`flush-collapse${i}`}
                      className="accordion-collapse collapse"
                      aria-labelledby="flush-headingOne"
                      data-bs-parent="#accordionFlushExample"
                    >
                      <div className="accordion-body">{newsList.content}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 關於 */}
      <section id="about">
        <div>
          <h5
            id="hello"
            data-aos="fade-down"
            data-aos-duration="1500"
            data-aos-delay="100"
          >
           <br />
           來一場輕旅行吧!
          </h5>
        </div>
        <div>
          <img
            data-aos="zoom-in"
            data-aos-duration="2000"
            data-aos-delay="100"
            src="./media/SeaView.png"
            id="seaView"
            alt=""
          />
        </div>
        <div>
          <h4 data-aos="fade-up" data-aos-duration="1000" data-aos-delay="100">
            Tripals
            <br />
            和你一起走遍台灣
          </h4>
        </div>
        <img src="./media/WhiteCloud.png" id="whiteCloud" alt="" />
      </section>
      {/* 熱門文章 */}
      <section
        id="popular"
        style={{ backgroundImage: "url(./media/popular.jpg)" }}
      >
        <div
          data-aos="fade-right"
          data-aos-offset="300"
          data-aos-duration="1000"
          data-aos-easing="ease-in-sine"
          className="popular-title"
        >
          <h1>POPULAR</h1>
        </div>

        <section id="article" className="article">
          <div className="container">
            <br />
            <div    data-aos="fade-right"
          data-aos-offset="300"
          data-aos-duration="1000"
          data-aos-easing="ease-in-sine" id="target-div1">{showdiv1}</div>
            <div    data-aos="fade-right"
          data-aos-offset="300"
          data-aos-duration="1000"
          data-aos-easing="ease-in-sine" id="target-div2">{showdiv2}</div>
            <div    data-aos="fade-right"
          data-aos-offset="300"
          data-aos-duration="1000"
          data-aos-easing="ease-in-sine" id="target-div3">
              <i className="fa-solid fa-heart"></i> {showdiv3}
              <i className="fa-regular fa-eye"></i> {showdiv4}
            </div>
            <div
              data-aos="fade-right"
              data-aos-offset="300"
              data-aos-duration="1500"
              data-aos-easing="ease-in-sine"
              className="swiper-container col-6"
            >
              <div className="swiper-wrapper">
                {popular.map((article, i) => {
                  return (
                    <div
                      key={article.articleno}
                      id={`slide${i}`}
                      className="swiper-slide"
                      style={{ backgroundImage: `url(${article.image ? url + article.image : "./media/recommend-6.png"})` }}
                    >
                      <div className={`article${i}-topText1 d-flex justify-content-center mt-2`}>
                        <h1>{article.title}</h1>
                      </div>

                      <div className={`article${i}-topText2 d-flex justify-content-center`}>
                        <div className="popularUser">
                          <img
                            src={`${article.avatar ? url + article.avatar : "./media/nana.jpg"}`} alt="userAvatar"
                            style={{
                              width: '3rem',
                              height: '3rem',
                              borderRadius: '50%',
                              overflow: 'hidden',
                              border: "white solid 3px"
                            }} />

                          <p>{article.username}</p>
                        </div>
                      </div>

                      <div className={`article${i}-topText3`}>
                        <div className="likeAndViews">
                          <i className="fa-solid fa-heart"></i>
                          {article.like_count}
                          <i className="fa-regular fa-eye"></i>
                          {article.view_count}
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* <div
                  id="slideB"
                  className="swiper-slide"
                  style={{ backgroundImage: "url(./media/recommend-4.png)" }}
                >
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
                </div> */}

                {/* <div id="slideC" className="swiper-slide">
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
                </div> */}
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
        </section>
      </section>

      {/* 推薦文章 */}
      <section id="recommend">
        <div
          data-aos="flip-up"
          data-aos-offset="300"
          data-aos-duration="1000"
          data-aos-easing="ease-in-sine"
          className="recommend-tittle"
        >
          <h1>RECOMMEND</h1>
        </div>
        <svg
          id="ship"
          className="handwriting"
          viewBox="0 0 171 308"
          fill="none"
          transform="translate(700, 50)"
        >
          <path
            d="M101.807 60.3831C53.1404 105.05 -30.9929 194.783 21.8071 196.383C74.6071 197.983 133.14 197.05 155.807 196.383C163.14 90.3831 167.407 -85.2169 125.807 60.3831C84.2071 205.983 75.6407 234.383 76.3074 240.383C43.6407 229.716 -5.79281 222.783 11.8071 248.383C29.4071 273.983 50.3071 268.883 28.3071 282.883L125.807 302.383L165.807 274.383C165.807 260.383 81.821 239.691 65.8071 237.671"
            stroke="url(#paint0_linear_757_1539)"
            strokeWidth="9"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient
              id="paint0_linear_757_1539"
              x1="40.5"
              y1="36.5"
              x2="128.5"
              y2="302"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4CEBCE" />
              <stop offset="0.354167" stopColor="#5EF2D5" />
              <stop offset="1" stopColor="#3AD2F3" />
            </linearGradient>
          </defs>
        </svg>
        <svg
          id="wave"
          className="handwriting"
          viewBox="0 0 1267 78"
          fill="none"
          transform="translate(550, -5)"
        >
          <path
            d="M4 12.842C67.1605 22.6835 212.851 36.4616 290.328 12.842C367.805 -10.7776 485.424 18.4657 534.549 36.0399C569.638 44.4754 670.975 58.816 795.612 48.6932C951.408 36.0399 1136.68 27.6043 1263 74"
            stroke="url(#paint0_linear_757_1540)"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient
              id="paint0_linear_757_1540"
              x1="-10"
              y1="4.00005"
              x2="1302"
              y2="105.5"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0.0483313" stopColor="#BAF9EC" stopOpacity="0.86" />
              <stop offset="0.457428" stopColor="#5FF3D6" stopOpacity="0.78" />
              <stop offset="1" stopColor="#43D9F3" />
            </linearGradient>
          </defs>
        </svg>

        <div
          data-aos="zoom-in"
          data-aos-offset="100"
          data-aos-duration="1500"
          data-aos-easing="ease-in-out"
          data-aos-once="false"
          className="container"
        >
          {recommend.map((recommendArticle, i) => {
            return (
              <div className="card recommemdCard text-white" key={i}>
                <img src={recommendArticle.image ? url + recommendArticle.image : "./media/recommend-5.png"} className="card-img" alt="..." />
                <div className="card-img-overlay">
                  <h5 className="card-title">{recommendArticle.title}</h5>
                  <div className="user">
                    <img className="avatar" src={recommendArticle.avatar ? url + recommendArticle.avatar : "./media/nana.jpg"} alt="" />
                    <p className="card-text">{recommendArticle.username}</p>
                  </div>
                </div>
              </div>)
          }

          )}

          {/* <div className="card text-white">
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
            <img
              src="./media/recommend-8.jpeg"
              className="card-img"
              alt="..."
            />
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
          </div> */}
        </div>
      </section>
    </Fragment>
  );
}

export default Home;
