import React, { Fragment, useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Swiper from "swiper";
import "swiper/dist/css/swiper.css";
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
      const swiper = new Swiper(".swiper-container", {
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
          el: ".swiper-pagination",
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        on: {
          init: function () {},
          slideChange: function () {
            var content1 = this.slides[this.activeIndex].children[0].innerText;
            var content2 = this.slides[this.activeIndex].children[1].innerText;
            var content3 =
              this.slides[this.activeIndex].children[2].children[0].children[1]
                .innerText;
            var content4 =
              this.slides[this.activeIndex].children[2].children[0].children[3]
                .innerText;
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
          <video autoPlay muted loop>
            <source src="./images/video01.mp4" type="video/mp4" />
          </video>
        </div>
      </section>

      {/* {最新消息} */}
      <section id="news" className="">
        <img id="greenCloud" src="./images/GreemCloud.png" alt="" />
        <div id="news_area">
          <div
            className="news-tittle"
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
            {" "}
            周末
            <br />
            來一場輕旅行吧
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

      

        <svg
          id="hat"
          width="400"
          height="582"
          transform="translate(100, -350)"
          viewBox="0 0 759 582"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M213.556 377.841C193.113 354.844 192.325 312.719 194.444 284.508C198.987 224.053 235.694 170.485 288.222 142.286C349.601 109.335 409.169 102.264 474.889 124.953C490.1 130.204 525.564 140.81 532.667 156.953C535.844 164.174 545.556 178.346 545.556 185.841C545.556 193.146 511.229 207.233 505.556 210.73C450.594 244.611 400.914 279.812 354.444 325.175C327.096 351.872 299.475 378.176 271.778 404.508C264.626 411.307 238.444 430.448 238.444 443.175C238.444 453.584 258.348 436.237 266.889 430.286C295.116 410.619 323.876 391.751 351.778 371.619C411.236 328.719 475.03 289.549 540.667 256.73C557.88 248.124 575.665 241.168 594.444 236.953C598.467 236.05 607.221 235.704 609.556 231.619C631.102 193.914 706.696 165.841 747.111 165.841C752.669 165.841 735.485 167.912 731.556 171.841C715.566 187.831 703.643 208.759 688.667 225.841C663.178 254.915 635.685 281.833 608.222 308.953C594.02 322.977 566.725 337.383 556.667 353.841C544.127 374.362 524.301 375.245 503.778 378.73C404.234 395.634 301.693 428.425 208.667 466.73C155.32 488.697 102.935 513.864 50.4444 537.841C42.6511 541.401 10 554.656 10 567.619C10 584.458 144.683 537.808 151.778 536.064C253.466 511.058 340.171 455.608 437.111 420.064C451.482 414.794 511.19 398.572 517.556 385.841"
            stroke="#D7AE60"
            stroke-opacity="0.99"
            stroke-width="20"
            stroke-linecap="round"
          />
          <path
            d="M309.556 361.841C309.556 368.177 306.047 392.273 317.111 389.397C336.216 384.429 345.24 353.385 352.667 337.841C356.957 328.861 360.428 319.795 363.333 310.286C363.399 310.072 368.425 292.276 369.333 292.73C373.541 294.834 372.637 343.982 373.778 351.397C377.71 376.957 407.133 318.687 408.667 315.619C419.024 294.904 429.912 259.263 446.445 242.73C447.409 241.765 448.925 290.485 449.778 295.174C451.123 302.572 464.16 290.591 465.556 288.73C476.016 274.782 478.455 255.564 485.556 239.841C487.566 235.391 493.556 216.82 493.556 218.286C493.556 229.249 493.556 240.211 493.556 251.174C493.556 319.806 535.969 191.889 537.556 192.286C543.798 193.846 564.568 136.291 568.222 128.73C585.451 93.0843 613.952 23.873 656.667 10.73C693.37 -0.563148 654.812 123.168 686 105.841C730.876 80.91 712.761 158.238 689.556 169.841"
            stroke="url(#paint0_linear_1099_1500)"
            stroke-width="20"
            stroke-linecap="round"
          />
          <defs>
            <linearGradient
              id="paint0_linear_1099_1500"
              x1="511.31"
              y1="10"
              x2="216.056"
              y2="428.342"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#32FC8F" />
              <stop offset="0.420121" stop-color="#4BE8B9" />
              <stop offset="0.666667" stop-color="#4BCACA" />
              <stop offset="1" stop-color="#FAB10C" />
            </linearGradient>
          </defs>
        </svg>

        <svg
          id="kite"
          width="1251"
          height="772"
          viewBox="0 0 1251 772"
          fill="none"
          transform="translate(-150, 1000)"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 474.271C6 467.856 16.6101 462.626 21.262 460.349C32.5429 454.829 43.7075 451.055 55.583 447.47C77.1991 440.944 101.819 448.047 122.736 454.245C146.503 461.287 172.643 470.251 197.706 470.251C216.396 470.251 233.237 469.854 251.533 466.231C268.147 462.941 284.111 456.42 300.073 450.894C335.37 438.676 368.362 419.657 405.791 413.968C439.111 408.903 472.462 407.738 505.85 403.843C537.095 400.198 570.115 400.397 599.656 388.581C614.511 382.639 628.788 378.45 641.943 369.001C644.149 367.416 659.313 360.041 657.279 359.024"
            stroke="url(#paint0_linear_1062_1617)"
            stroke-width="11"
            stroke-linecap="round"
          />
          <path
            d="M213.712 401.907C226.595 378.718 262.736 367.511 286.598 361.109C299.744 357.582 312.716 356.344 326.279 356.344C346.071 356.344 364.745 356.92 384.349 359.769C407.347 363.11 426.172 361.924 447.929 354.408C500.067 336.397 549.645 303.307 606.431 301.475C629.075 300.745 651.493 304.709 674.105 304.081C677.939 303.974 685.775 298.484 677.38 304.081"
            stroke="url(#paint1_linear_1062_1617)"
            stroke-width="11"
            stroke-linecap="round"
          />
          <path
            d="M137.328 306.761C139.916 296.41 158.674 286.745 167.033 282.342C179.213 275.926 193.295 270.271 206.863 267.303C226.144 263.085 247.044 261.396 266.72 260.156C290.14 258.681 311.39 263.501 334.32 266.559C356.31 269.491 377.317 271.751 399.686 270.281C453.725 266.731 497.161 233.974 548.882 222.038C569.9 217.188 590.719 215.142 612.089 219.06C616.227 219.819 649.239 226.087 649.239 231.717"
            stroke="url(#paint2_linear_1062_1617)"
            stroke-width="11"
            stroke-linecap="round"
          />
          <path
            d="M515 562.171C554.278 532.762 602.429 443.887 817.501 499.172C994.5 544.671 1022.59 507.198 1015.51 376.524M1015.51 376.524L941.205 202.382M1015.51 376.524L1176.62 258.082M1015.51 376.524L1110.43 104.259M941.205 202.382L1120.18 93.302L1176.62 258.082M941.205 202.382L1176.62 258.082"
            stroke="url(#paint3_linear_1062_1617)"
            stroke-width="8"
          />
          <defs>
            <linearGradient
              id="paint0_linear_1062_1617"
              x1="594.617"
              y1="359.249"
              x2="576.067"
              y2="628.139"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="6.79603e-07" stop-color="#1DB8FA" />
              <stop offset="0.259709" stop-color="#2BCDAD" />
              <stop offset="0.864785" stop-color="#92BB2D" />
              <stop offset="0.961183" stop-color="#39B654" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_1062_1617"
              x1="636.025"
              y1="301.581"
              x2="616.398"
              y2="535.584"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="6.79603e-07" stop-color="#1DB8FA" />
              <stop offset="0.259709" stop-color="#2BCDAD" />
              <stop offset="0.864785" stop-color="#92BB2D" />
              <stop offset="0.961183" stop-color="#39B654" />
            </linearGradient>
            <linearGradient
              id="paint2_linear_1062_1617"
              x1="599.853"
              y1="217.175"
              x2="585.531"
              y2="426.619"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="6.79603e-07" stop-color="#1DB8FA" />
              <stop offset="0.259709" stop-color="#2BCDAD" />
              <stop offset="0.864785" stop-color="#92BB2D" />
              <stop offset="0.961183" stop-color="#39B654" />
            </linearGradient>
            <linearGradient
              id="paint3_linear_1062_1617"
              x1="1132.71"
              y1="104.448"
              x2="632.352"
              y2="666.619"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#25DBBA" />
              <stop offset="1" stop-color="#3198F7" />
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
            <div
              data-aos="fade-right"
              data-aos-offset="300"
              data-aos-duration="1000"
              data-aos-easing="ease-in-sine"
              id="target-div1"
            >
              {showdiv1}
            </div>
            <div
              data-aos="fade-right"
              data-aos-offset="300"
              data-aos-duration="1000"
              data-aos-easing="ease-in-sine"
              id="target-div2"
            >
              <img src="" alt="" />
              {showdiv2}
            </div>
            <div
              data-aos="fade-right"
              data-aos-offset="300"
              data-aos-duration="1000"
              data-aos-easing="ease-in-sine"
              id="target-div3"
            >
              <div>
                <i className="fa-solid fa-heart"></i> {showdiv3}
              </div>
              <div id="viewsCount">
                <i className="fa-regular fa-eye"></i> {showdiv4}
              </div>
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
                      style={{
                        backgroundImage: `url(${
                          article.image
                            ? url + article.image
                            : "./images/recommend-6.png"
                        })`,
                      }}
                    >
                      <div
                        className={`article${i}-topText1 d-flex justify-content-center mt-2`}
                      >
                        <h1>{article.title}</h1>
                      </div>

                      <div
                        className={`article${i}-topText2 d-flex justify-content-center`}
                      >
                        <div className="popularUser">
                          <img
                            src={`${
                              article.avatar
                                ? url + article.avatar
                                : "./images/nana.jpg"
                            }`}
                            alt="userAvatar"
                            style={{
                              width: "3rem",
                              height: "3rem",
                              borderRadius: "50%",
                              overflow: "hidden",
                              border: "white solid 3px",
                            }}
                          />

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
            stroke-width="9"
            stroke-linecap="round"
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
              <stop stop-color="#4CEBCE" />
              <stop offset="0.354167" stop-color="#5EF2D5" />
              <stop offset="1" stop-color="#3AD2F3" />
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
            stroke-width="8"
            stroke-linecap="round"
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
              <stop
                offset="0.0483313"
                stop-color="#BAF9EC"
                stop-opacity="0.86"
              />
              <stop
                offset="0.457428"
                stop-color="#5FF3D6"
                stop-opacity="0.78"
              />
              <stop offset="1" stop-color="#43D9F3" />
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
                <img
                  src={
                    recommendArticle.image
                      ? url + recommendArticle.image
                      : "./images/recommend-5.png"
                  }
                  className="card-img"
                  alt="..."
                />
                <div className="card-img-overlay">
                  <h5 className="card-title">{recommendArticle.title}</h5>
                  <div className="user">
                    <img
                      className="avatar"
                      src={
                        recommendArticle.avatar
                          ? url + recommendArticle.avatar
                          : "./images/nana.jpg"
                      }
                      alt=""
                    />
                    <p className="card-text">{recommendArticle.username}</p>
                  </div>
                </div>
              </div>
            );
          })}

        </div>
        
        
      
        <svg
          id="tulip"
          width="300"
          height="400"
          transform="translate(100, -150)"
          viewBox="0 0 564 821"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M463.892 785C402.746 624.753 428.842 416.495 554.115 291.222C563.065 282.272 554.166 305.897 553.67 307.667C541.786 350.11 540.808 397.306 535.892 441C524.951 538.261 519.892 637.126 519.892 735C519.892 765.547 514.256 785.642 499.892 810.778C487.997 831.596 447.437 777.133 445.226 773C410.567 708.228 391.745 636.565 355.892 572.111C320.991 509.368 309.18 438.967 273.67 376.556C262.88 357.591 253.266 336.853 240.337 319.222C231.4 307.035 220.296 297.27 214.115 283.222C210.457 274.91 200.957 261.515 199.892 253C197.311 232.351 156.455 242.494 144.781 240.111C52.8248 221.344 19.8924 144.552 19.8924 57.4444C19.8924 46.0133 17.4761 5 35.8924 5C58.935 5 76.5063 5.92191 95.8924 21C110.911 32.6814 135.845 39.941 147.892 55C150.441 58.1862 158.098 60.2707 161.892 63.2222C174.967 73.3915 187.754 98.7592 195.004 113C210.198 142.847 206.372 176.58 219.892 207C223.816 215.829 229.214 222.303 239.892 220.778C264.878 217.208 268.305 164.554 267.892 147.222C267.088 113.445 254.363 47.7568 225.892 23.6667C220.282 18.9197 207.019 20.6041 199.892 21C129.031 24.9367 226.537 259.899 231.67 283C233.471 291.103 242.111 296.993 246.115 305C254.627 322.026 260.928 340.092 267.892 357.889C281.581 392.871 299.203 429.146 309.892 464.778C320.634 500.583 334.136 536.292 351.892 569C359.567 583.137 366.982 597.857 375.892 611.222C381.277 619.299 383.892 639.222 383.892 639.222C383.892 639.222 339.935 591.211 320.115 565.444C305.121 545.953 285.265 530.373 267.892 513C241.549 486.657 216.701 456.109 180.781 442.778C138.483 427.079 94.2554 425 49.8924 425C38.5591 425 27.2258 425 15.8924 425C-0.227559 425 2.86127 422.308 16.5591 427.444C54.9782 441.852 93.5729 450.763 128.781 473C144.553 482.961 155.664 496.159 167.892 509.889C183.595 527.52 201.743 538.6 221.67 550.778C268.819 579.591 311.446 617.61 355.67 650.778C383.428 671.596 401.335 701.58 427.892 721.889C438.325 729.867 463.892 751.569 463.892 765"
            stroke="#E33E3E"
            stroke-width="10"
            stroke-linecap="round"
          />
        </svg>
      </section>

      <BearLogo />
    </Fragment>
  );
}

export default Home;
