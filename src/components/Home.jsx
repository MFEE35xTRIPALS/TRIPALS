import React, { Fragment, useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Swiper from "swiper";
import 'swiper/dist/css/swiper.css'
import axios from "axios";
import BearLogo from "./smallcomponent/BearLogo";

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
            var content3 = this.slides[this.activeIndex].children[2].children[0].children[1].innerText;
            var content4 = this.slides[this.activeIndex].children[2].children[0].children[3].innerText;
            // var content5 = this.slides[this.activeIndex].children[];
            // console.log(content3);
            // console.log(content4);
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
            <source src="./images/video01.mp4" type="video/mp4" />
          </video>
          <div className="videoContent">
            <div id="LOGO">
              <img src="./images/LOGO.svg" alt="logo" />
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
        <img id="greenCloud" src="./images/GreemCloud.png" alt="" />
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
          > 周末
            <br />
            來一場輕旅行吧!
          </h5>
        </div>
        <div>
          <img
            data-aos="zoom-in"
            data-aos-duration="2000"
            data-aos-delay="100"
            src="./images/SeaView.png"
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
        <img src="./images/WhiteCloud.png" id="whiteCloud" alt="" />
        <svg id="cloud" viewBox="0 0 412 338" fill="none" transform="translate(180, 5)">
          <path d="M111.664 154.66C111.664 149.506 106.04 145.222 102.58 141.861C90.4722 130.099 69.4109 117.289 51.3819 123.9C13.8078 137.677 -20.5039 220.496 35.4856 232.284C44.262 234.131 54.3773 235.182 51.7948 223.819C49.4688 213.585 37.6635 210.563 29.9116 215.974C11.2044 229.034 4.94776 260.272 8.44139 281.417C12.0217 303.088 32.5292 321.251 52.827 327.661C86.6056 338.328 144.262 323.144 161.417 289.469C164.425 283.563 169.59 269.963 160.385 266.553C151.816 263.38 148.205 275.7 153.366 281.005C172.079 300.238 214.765 292.655 237.595 286.579C266.08 278.996 282.61 262.605 300.767 240.541C314.534 223.812 352.1 167.24 310.573 157.551C299.123 154.879 293.154 161.032 298.703 173.137C309.106 195.835 349.64 180.141 362.391 170.35C384.773 153.164 403.101 126.075 405.021 97.2688C406.457 75.7349 400.58 62.7946 386.545 46.1738C369.583 26.0873 346.168 13.6587 319.76 13.6587C293.109 13.6587 266.924 27.4727 262.471 55.6702C261.722 60.4192 265.708 78.2389 274.136 69.8117C284.843 59.1046 278.549 32.1105 269.284 22.8455C254.146 7.70729 225.912 3.70591 205.596 7.15572C186.965 10.3194 172.397 26.4213 166.784 44.0061C162.051 58.8376 160.693 83.0524 177.52 90.4561C189.808 95.8631 188.119 82.6265 182.784 74.0438C172.508 57.5125 143.737 57.4217 127.044 58.1475C109.841 58.8955 95.9335 73.6128 89.5741 88.8046C83.0597 104.367 77.4267 127.052 86.6839 142.48C91.65 150.757 111.735 167.595 120.954 158.376" stroke="url(#paint0_linear_1052_1611)" stroke-width="12" stroke-linecap="round" />
          <defs>
            <linearGradient id="paint0_linear_1052_1611" x1="398.5" y1="26.5" x2="205.616" y2="331.03" gradientUnits="userSpaceOnUse">
              <stop offset="0.047733" stop-color="#00C1FE" />
              <stop offset="1" stop-color="#19E2E2" />
            </linearGradient>
          </defs>
        </svg>

        <svg id="hat"width="417" height="155" viewBox="0 0 417 155" fill="none" transform="translate(950, 5)">
          <path d="M88.8946 67.2056C79.011 65.9702 110.278 28.8601 115.28 25.3972C120.652 21.678 124.088 14.6786 130.053 11.9255C138.521 8.01691 145.382 5.3291 154.859 5.3291C182.861 5.3291 210.544 16.588 223.982 42.1205C228.926 51.5143 237.733 64.7393 237.733 75.5673C237.733 79.6337 240.619 98.98 245.258 98.98C256.626 98.98 267.492 91.7993 279.541 97.3077C291.642 102.84 296.265 111.578 296.265 124.808C296.265 141.84 265.379 140.589 254.549 143.297C227.558 150.045 199.39 149.15 171.768 149.15C147.507 149.15 121.715 144.372 97.6279 141.16C76.806 138.384 55.9041 138.91 36.1231 129.918C20.4789 122.807 11.6107 121.68 6.11389 104.09C2.14486 91.3891 10.7523 78.9792 23.6734 75.9389C36.6918 72.8758 50.3521 73.895 63.8096 73.895C68.7424 73.895 73.5748 72.2226 78.8606 72.2226C81.3436 72.2226 90.2947 70.5503 83.506 70.5503C72.4033 70.5503 61.6492 68.8779 50.4308 68.8779C48.0101 68.8779 54.6179 68.8787 55.355 68.9709C59.9321 69.543 65.1897 73.2401 69.6627 74.7311C86.6614 80.3974 103.445 82.2567 121.319 82.2567C136.875 82.2567 152.248 83.929 167.866 83.929C180.485 83.929 195.297 85.8959 207.631 83.0928C210.11 82.5293 222.821 81.337 222.31 82.2567C215.169 95.1108 186.333 93.3556 175.485 91.5474C148.645 87.0742 121.976 81.0816 95.1194 76.4964C92.7992 76.1002 84.3894 75.2502 91.6819 75.5673C106.409 76.2076 121.756 84.984 135.72 89.3176C154.194 95.0511 184.021 103.37 203.357 95.6354C207.081 94.1457 221.618 87.2047 209.21 91.5474C182.634 100.849 149.014 94.7787 122.713 88.5744C103.573 84.0594 84.406 74.4464 64.5528 73.895C49.9683 73.4898 70.8936 76.3229 74.5868 77.2396C124.476 89.6235 175.776 107.563 225.19 85.6013C235.383 81.0713 227.045 82.8152 220.266 85.2297C186.081 97.4051 150.182 84.966 115.838 81.6063C104.965 80.5427 93.8781 80.272 82.9485 80.5843C79.5911 80.6802 99.44 86.6451 102.088 87.2737C125.804 92.9041 151.784 94.1154 175.856 90.2467C185.869 88.6376 199.506 88.0107 208.467 83.1857C215.768 79.2544 225.285 80.0119 232.344 75.5673C242.733 69.0262 255.711 57.1716 268.671 57.1716C277.148 57.1716 284.544 60.5163 292.92 60.5163C306.004 60.5163 304.44 49.9248 314.66 44.8149C322.445 40.9224 329.172 49.2016 338.073 45.0936C343.793 42.4534 351.28 42.6711 356.469 40.0766C363.972 36.3251 375.039 28.6433 379.138 21.0305C383.487 12.9546 390.899 7.28236 400.321 9.97449C404.386 11.1359 412.975 8.06179 411.656 12.0185" stroke="url(#paint0_linear_1053_1677)" stroke-width="10" stroke-linecap="round" />
          <defs>
            <linearGradient id="paint0_linear_1053_1677" x1="208.466" y1="5.3291" x2="208.466" y2="149.189" gradientUnits="userSpaceOnUse">
              <stop stop-color="#2BCDAD" />
              <stop offset="1" stop-color="#65C6C6" />
            </linearGradient>
          </defs>
        </svg>
      </section>
      {/* 熱門文章 */}
      <section
        id="popular"
        style={{ backgroundImage: "url(./images/popular.jpg)" }}
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
            <div data-aos="fade-right"
              data-aos-offset="300"
              data-aos-duration="1000"
              data-aos-easing="ease-in-sine" id="target-div1">{showdiv1}</div>
            <div data-aos="fade-right"
              data-aos-offset="300"
              data-aos-duration="1000"
              data-aos-easing="ease-in-sine" id="target-div2"><img src="" alt="" />{showdiv2}</div>
            <div data-aos="fade-right"
              data-aos-offset="300"
              data-aos-duration="1000"
              data-aos-easing="ease-in-sine" id="target-div3">
              <div><i className="fa-solid fa-heart"></i> {showdiv3}</div>
              <div id="viewsCount"><i className="fa-regular fa-eye"></i> {showdiv4}</div>
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
                      style={{ backgroundImage: `url(${article.image ? url + article.image : "./images/recommend-6.png"})` }}
                    >
                      <div className={`article${i}-topText1 d-flex justify-content-center mt-2`}>
                        <h1>{article.title}</h1>
                      </div>

                      <div className={`article${i}-topText2 d-flex justify-content-center`}>
                        <div className="popularUser">
                          <img
                            src={`${article.avatar ? url + article.avatar : "./images/nana.jpg"}`} alt="userAvatar"
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
                          <span>{article.like_count}</span>
                          <i className="fa-regular fa-eye"></i>
                          <span>{article.view_count}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* <div
                  id="slideB"
                  className="swiper-slide"
                  style={{ backgroundImage: "url(./images/recommend-4.png)" }}
                >
                  <div className="articleB-topText1 d-flex justify-content-center mt-2">
                    <h1>文章標題...2</h1>
                  </div>

                  <div className="articleB-topText2 d-flex justify-content-center">
                    <div className="popularUser">
                      <img src="./images/Bear.svg" alt="" />
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
                      <img src="./images/Bear.svg" alt="" />
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
                <img src={recommendArticle.image ? url + recommendArticle.image : "./images/recommend-5.png"} className="card-img" alt="..." />
                <div className="card-img-overlay">
                  <h5 className="card-title">{recommendArticle.title}</h5>
                  <div className="user">
                    <img className="avatar" src={recommendArticle.avatar ? url + recommendArticle.avatar : "./images/nana.jpg"} alt="" />
                    <p className="card-text">{recommendArticle.username}</p>
                  </div>
                </div>
              </div>)
          }

          )}


          {/* <div className="card text-white">
            <img src="./images/recommend-2.png" className="card-img" alt="..." />
            <div className="card-img-overlay">
              <h5 className="card-title">文章標題...</h5>
              <div className="user">
                <img className="avatar" src="./images/Bear.svg" alt="" />
                <p className="card-text">hercyC</p>
              </div>
            </div>
          </div>
          <div className="card text-white">
            <img
              src="./images/recommend-8.jpeg"
              className="card-img"
              alt="..."
            />
            <div className="card-img-overlay">
              <h5 className="card-title">文章標題...</h5>
              <div className="user">
                <img className="avatar" src="./images/Bear.svg" alt="" />
                <p className="card-text">hercyC</p>
              </div>
            </div>
          </div>
          <div className="card text-white">
            <img src="./images/recommend-7.png" className="card-img" alt="..." />
            <div className="card-img-overlay">
              <h5 className="card-title">文章標題...</h5>
              <div className="user">
                <img className="avatar" src="./images/Bear.svg" alt="" />
                <p className="card-text">hercyC</p>
              </div>
            </div>
          </div>
          <div className="card text-white">
            <img src="./images/recommend-5.png" className="card-img" alt="..." />
            <div className="card-img-overlay">
              <h5 className="card-title">文章標題...</h5>
              <div className="user">
                <img className="avatar" src="./images/Bear.svg" alt="" />
                <p className="card-text">hercyC</p>
              </div>
            </div>
          </div>
          <div className="card text-white">
            <img src="./images/recommend-1.jpg" className="card-img" alt="..." />
            <div className="card-img-overlay">
              <h5 className="card-title">文章標題...</h5>
              <div className="user">
                <img className="avatar" src="./images/Bear.svg" alt="" />
                <p className="card-text">hercyC</p>
              </div>
            </div>
          </div>
          <div className="card text-white">
            <img src="./images/recommend-4.png" className="card-img" alt="..." />
            <div className="card-img-overlay">
              <h5 className="card-title">文章標題...</h5>
              <div className="user">
                <img className="avatar" src="./images/Bear.svg" alt="" />
                <p className="card-text">hercyC</p>
              </div>
            </div>
          </div> */}
        </div>
      </section>

      <BearLogo />
    </Fragment>
  );
}

export default Home;
