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
  // 動畫
  const [scrollY, setScrollY] = useState(0);


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

  //監聽手繪動畫開始
  // useEffect(() => {
  //   const handleScroll = () => {
  //     setScrollY(window.scrollY);
  //   };

  //   window.addEventListener('scroll', handleScroll);

  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);

  // useEffect(() => {
  //   const shipElement = document.getElementById('ship');
  //   // const waveElement = document.getElementById('wave');

  //   const shipAnimation = shipElement.animate(
  //     [
  //       { transform: 'translate(700px, 50px)' },
  //       { transform: 'translate(0px, 50px)' }
  //     ],
  //     {
  //       duration: 2000,
  //       easing: 'ease-in-out',
  //       fill: 'forwards'
  //     }
  //   );

  //   // const waveAnimation = waveElement.animate(
  //   //   [
  //   //     { transform: 'translate(550px, -5px)' },
  //   //     { transform: 'translate(0px, 0px)' }
  //   //   ],
  //   //   {
  //   //     duration: 1500,
  //   //     easing: 'ease-in-out',
  //   //     fill: 'forwards'
  //   //   }
  //   // );

  //   const handleAnimation = () => {
  //     const shipTop = shipElement.getBoundingClientRect().top;
  //     // const waveTop = waveElement.getBoundingClientRect().top;
  //     const windowHeight = window.innerHeight;

  //     // 設定觸發動畫的閾值，根據需要進行調整
  //     const threshold = windowHeight * 0.75;

  //     if (shipTop < threshold) {
  //       shipAnimation.play();
  //     }

  //     // if (waveTop < threshold) {
  //     //   waveAnimation.play();
  //     // }
  //   };

  //   window.addEventListener('scroll', handleAnimation);

  //   return () => {
  //     window.removeEventListener('scroll', handleAnimation);
  //   };
  // }, []);






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
            和你一起走遍台灣!
          </h4>
        </div>
        <img src="./images/WhiteCloud.png" id="whiteCloud" alt="" />
       
        <svg id="cloud" viewBox="0 0 452 289" fill="none" transform="translate(200, -300)" xmlns="http://www.w3.org/2000/svg">
          <path d="M143.101 119.208C144.642 114.289 140.556 108.52 138.259 104.278C130.221 89.4348 113.952 70.9152 94.7715 71.834C54.7971 73.7489 -2.70333 142.524 47.2023 170.509C55.025 174.896 64.3635 178.923 65.2959 167.308C66.1357 156.846 55.7738 150.433 46.7586 153.28C25.0028 160.15 9.69416 188.089 6.70683 209.312C3.64538 231.062 17.7854 254.525 35.2389 266.709C64.2841 286.986 123.843 289.732 150.28 262.725C154.917 257.989 163.911 246.555 156.146 240.549C148.918 234.959 141.788 245.637 145.127 252.241C157.236 276.189 200.237 281.714 223.839 282.74C253.288 284.019 273.962 273.319 297.885 257.692C316.023 245.843 368.783 203.088 332.051 181.428C321.923 175.455 314.388 179.542 316.064 192.753C319.206 217.522 362.579 214.663 377.673 209.132C404.17 199.422 429.757 179.051 440.201 152.136C448.009 132.016 446.269 117.911 437.844 97.8543C427.662 73.6158 409.033 54.7561 383.833 46.8617C358.4 38.8947 329.283 44.2493 316.605 69.8265C314.47 74.1342 312.947 92.3308 323.508 86.8081C336.927 79.7914 338.99 52.1503 332.919 40.5393C322.998 21.568 297.251 9.30926 276.833 6.52825C258.108 3.97787 239.393 14.9884 228.78 30.0913C219.83 42.8296 211.295 65.5313 225.139 77.6265C235.249 86.4597 237.594 73.3234 235.069 63.5383C230.204 44.691 202.777 36.0039 186.629 31.7062C169.989 27.2773 152.319 37.1642 141.709 49.7603C130.84 62.6635 118.683 82.6271 122.905 100.118C125.17 109.5 139.303 131.573 150.856 125.531" stroke="url(#paint0_linear_1052_1611)" stroke-width="12" stroke-linecap="round" />
          <defs>
            <linearGradient id="paint0_linear_1052_1611" x1="455.133" y1="82.6541" x2="180.034" y2="315.598" gradientUnits="userSpaceOnUse">
              <stop offset="0.047733" stop-color="#00C1FE" />
              <stop offset="1" stop-color="#19E2E2" />
            </linearGradient>
          </defs>
        </svg>
        <svg id="kite" width="1251" height="772" viewBox="0 0 1251 772" fill="none" transform="translate(-150, 1000)" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 474.271C6 467.856 16.6101 462.626 21.262 460.349C32.5429 454.829 43.7075 451.055 55.583 447.47C77.1991 440.944 101.819 448.047 122.736 454.245C146.503 461.287 172.643 470.251 197.706 470.251C216.396 470.251 233.237 469.854 251.533 466.231C268.147 462.941 284.111 456.42 300.073 450.894C335.37 438.676 368.362 419.657 405.791 413.968C439.111 408.903 472.462 407.738 505.85 403.843C537.095 400.198 570.115 400.397 599.656 388.581C614.511 382.639 628.788 378.45 641.943 369.001C644.149 367.416 659.313 360.041 657.279 359.024" stroke="url(#paint0_linear_1062_1617)" stroke-width="11" stroke-linecap="round" />
          <path d="M213.712 401.907C226.595 378.718 262.736 367.511 286.598 361.109C299.744 357.582 312.716 356.344 326.279 356.344C346.071 356.344 364.745 356.92 384.349 359.769C407.347 363.11 426.172 361.924 447.929 354.408C500.067 336.397 549.645 303.307 606.431 301.475C629.075 300.745 651.493 304.709 674.105 304.081C677.939 303.974 685.775 298.484 677.38 304.081" stroke="url(#paint1_linear_1062_1617)" stroke-width="11" stroke-linecap="round" />
          <path d="M137.328 306.761C139.916 296.41 158.674 286.745 167.033 282.342C179.213 275.926 193.295 270.271 206.863 267.303C226.144 263.085 247.044 261.396 266.72 260.156C290.14 258.681 311.39 263.501 334.32 266.559C356.31 269.491 377.317 271.751 399.686 270.281C453.725 266.731 497.161 233.974 548.882 222.038C569.9 217.188 590.719 215.142 612.089 219.06C616.227 219.819 649.239 226.087 649.239 231.717" stroke="url(#paint2_linear_1062_1617)" stroke-width="11" stroke-linecap="round" />
          <path d="M515 562.171C554.278 532.762 602.429 443.887 817.501 499.172C994.5 544.671 1022.59 507.198 1015.51 376.524M1015.51 376.524L941.205 202.382M1015.51 376.524L1176.62 258.082M1015.51 376.524L1110.43 104.259M941.205 202.382L1120.18 93.302L1176.62 258.082M941.205 202.382L1176.62 258.082" stroke="url(#paint3_linear_1062_1617)" stroke-width="8" />
          <defs>
            <linearGradient id="paint0_linear_1062_1617" x1="594.617" y1="359.249" x2="576.067" y2="628.139" gradientUnits="userSpaceOnUse">
              <stop offset="6.79603e-07" stop-color="#1DB8FA" />
              <stop offset="0.259709" stop-color="#2BCDAD" />
              <stop offset="0.864785" stop-color="#92BB2D" />
              <stop offset="0.961183" stop-color="#39B654" />
            </linearGradient>
            <linearGradient id="paint1_linear_1062_1617" x1="636.025" y1="301.581" x2="616.398" y2="535.584" gradientUnits="userSpaceOnUse">
              <stop offset="6.79603e-07" stop-color="#1DB8FA" />
              <stop offset="0.259709" stop-color="#2BCDAD" />
              <stop offset="0.864785" stop-color="#92BB2D" />
              <stop offset="0.961183" stop-color="#39B654" />
            </linearGradient>
            <linearGradient id="paint2_linear_1062_1617" x1="599.853" y1="217.175" x2="585.531" y2="426.619" gradientUnits="userSpaceOnUse">
              <stop offset="6.79603e-07" stop-color="#1DB8FA" />
              <stop offset="0.259709" stop-color="#2BCDAD" />
              <stop offset="0.864785" stop-color="#92BB2D" />
              <stop offset="0.961183" stop-color="#39B654" />
            </linearGradient>
            <linearGradient id="paint3_linear_1062_1617" x1="1132.71" y1="104.448" x2="632.352" y2="666.619" gradientUnits="userSpaceOnUse">
              <stop stop-color="#25DBBA" />
              <stop offset="1" stop-color="#3198F7" />
            </linearGradient>
          </defs>
        </svg>

        {/* <svg id="hat" width="417" height="155" viewBox="0 0 417 155" fill="none" transform="translate(500, 200)">
          <path d="M88.8946 67.2056C79.011 65.9702 110.278 28.8601 115.28 25.3972C120.652 21.678 124.088 14.6786 130.053 11.9255C138.521 8.01691 145.382 5.3291 154.859 5.3291C182.861 5.3291 210.544 16.588 223.982 42.1205C228.926 51.5143 237.733 64.7393 237.733 75.5673C237.733 79.6337 240.619 98.98 245.258 98.98C256.626 98.98 267.492 91.7993 279.541 97.3077C291.642 102.84 296.265 111.578 296.265 124.808C296.265 141.84 265.379 140.589 254.549 143.297C227.558 150.045 199.39 149.15 171.768 149.15C147.507 149.15 121.715 144.372 97.6279 141.16C76.806 138.384 55.9041 138.91 36.1231 129.918C20.4789 122.807 11.6107 121.68 6.11389 104.09C2.14486 91.3891 10.7523 78.9792 23.6734 75.9389C36.6918 72.8758 50.3521 73.895 63.8096 73.895C68.7424 73.895 73.5748 72.2226 78.8606 72.2226C81.3436 72.2226 90.2947 70.5503 83.506 70.5503C72.4033 70.5503 61.6492 68.8779 50.4308 68.8779C48.0101 68.8779 54.6179 68.8787 55.355 68.9709C59.9321 69.543 65.1897 73.2401 69.6627 74.7311C86.6614 80.3974 103.445 82.2567 121.319 82.2567C136.875 82.2567 152.248 83.929 167.866 83.929C180.485 83.929 195.297 85.8959 207.631 83.0928C210.11 82.5293 222.821 81.337 222.31 82.2567C215.169 95.1108 186.333 93.3556 175.485 91.5474C148.645 87.0742 121.976 81.0816 95.1194 76.4964C92.7992 76.1002 84.3894 75.2502 91.6819 75.5673C106.409 76.2076 121.756 84.984 135.72 89.3176C154.194 95.0511 184.021 103.37 203.357 95.6354C207.081 94.1457 221.618 87.2047 209.21 91.5474C182.634 100.849 149.014 94.7787 122.713 88.5744C103.573 84.0594 84.406 74.4464 64.5528 73.895C49.9683 73.4898 70.8936 76.3229 74.5868 77.2396C124.476 89.6235 175.776 107.563 225.19 85.6013C235.383 81.0713 227.045 82.8152 220.266 85.2297C186.081 97.4051 150.182 84.966 115.838 81.6063C104.965 80.5427 93.8781 80.272 82.9485 80.5843C79.5911 80.6802 99.44 86.6451 102.088 87.2737C125.804 92.9041 151.784 94.1154 175.856 90.2467C185.869 88.6376 199.506 88.0107 208.467 83.1857C215.768 79.2544 225.285 80.0119 232.344 75.5673C242.733 69.0262 255.711 57.1716 268.671 57.1716C277.148 57.1716 284.544 60.5163 292.92 60.5163C306.004 60.5163 304.44 49.9248 314.66 44.8149C322.445 40.9224 329.172 49.2016 338.073 45.0936C343.793 42.4534 351.28 42.6711 356.469 40.0766C363.972 36.3251 375.039 28.6433 379.138 21.0305C383.487 12.9546 390.899 7.28236 400.321 9.97449C404.386 11.1359 412.975 8.06179 411.656 12.0185" stroke="url(#paint0_linear_1053_1677)" stroke-width="10" stroke-linecap="round" />
          <defs>
            <linearGradient id="paint0_linear_1053_1677" x1="208.466" y1="5.3291" x2="208.466" y2="149.189" gradientUnits="userSpaceOnUse">
              <stop stop-color="#2BCDAD" />
              <stop offset="1" stop-color="#65C6C6" />
            </linearGradient>
          </defs>
        </svg> */}

        {/* <svg id="flower" width="289" height="357" viewBox="0 0 289 357" fill="none" transform="translate(200, 200)" xmlns="http://www.w3.org/2000/svg">
          <path d="M76.8152 343.181C67.2347 341.897 54.1741 325.729 47.0666 319.495C36.8215 310.509 25.6882 299.918 17.6068 288.687C3.99341 269.769 -1.2689 239.625 22.2279 229.549C41.7609 221.173 67.0829 252.068 69.017 270.729C71.112 290.942 76.946 317.287 88.6568 333.428C119.481 375.914 179.271 333.679 180.791 288.068C181.426 269.003 178.925 254.009 157.396 254.009C135.428 254.009 121.783 269.059 109.452 286.055C104.965 292.239 102.943 297.069 99.632 304.168C98.5729 306.439 84.9021 324.53 84.9021 316.089C84.9021 293.4 99.425 269.927 102.665 247.352C104.533 234.333 110.44 218.481 115.806 206.637C119.354 198.805 122.31 190.41 126.204 183.105C132.032 172.171 143.304 157.122 152.197 148.118C156.356 143.908 166.723 139.348 156.097 136.816C150.415 135.463 139.522 124.013 139.201 117.465C138.164 96.3491 154.805 80.9661 174.292 84.1802C193.779 87.3941 191.188 114.34 191.188 130.005C191.188 141.299 163.214 149.05 154.797 153.691C135.997 164.056 56.02 192.158 56.02 150.904C56.02 119.931 83.304 117.29 102.809 108.486C107.826 106.221 126.806 108.141 118.405 104.925C109.531 101.527 97.6697 102.618 91.2562 93.7785C78.8757 76.7142 75.0215 48.8501 82.1583 28.4478C86.0978 17.1859 103.685 14.3599 113.207 14.3599C125.29 14.3599 130.454 18.899 141.222 23.339C147.251 25.8247 152.246 31.8923 154.797 38.0461C156.792 42.8582 157.921 47.7386 159.418 52.7533C160.791 57.3521 163.822 43.5379 165.194 40.6779C172.667 25.1021 190.711 6 207.94 6C226.654 6 237.977 14.3829 237.977 36.6528C237.977 47.7472 235.69 55.3806 229.602 64.519C218.488 81.1989 222.207 81.0448 239.277 88.2053C250.541 92.9303 278.999 115.42 282.023 130.005C286.575 151.966 274.944 164.277 252.996 164.837C238.898 165.197 228.209 161.225 214.727 159.419C205.476 158.179 220.86 166.16 222.959 170.411C231.022 186.739 220.915 202.806 205.485 206.482C191.13 209.902 175.859 205.752 162.739 201.063C151.164 196.927 144.305 170.208 144.399 170.411" stroke="url(#paint0_linear_1060_1576)" stroke-width="11" stroke-linecap="round" />
          <defs>
            <linearGradient id="paint0_linear_1060_1576" x1="256.277" y1="6.67347" x2="-61.574" y2="661.055" gradientUnits="userSpaceOnUse">
              <stop offset="6.79603e-07" stop-color="#1DB8FA" />
              <stop offset="0.259709" stop-color="#2BCDAD" />
              <stop offset="0.864785" stop-color="#92BB2D" />
              <stop offset="0.961183" stop-color="#39B654" />
            </linearGradient>
          </defs>
        </svg> */}


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
        {/* <svg id="coffee" width="167" height="244" viewBox="0 0 167 244" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M36.0617 145.543C35.8409 143.777 31.4828 142.796 38.2083 140.274C42.5469 138.647 54.8988 134.87 58.8939 138.518C62.8688 142.147 57.7923 152.621 54.4055 155.105C45.9094 161.336 31.4149 154.147 34.5981 143.006C37.8169 131.74 74.4111 132.728 82.7018 136.761C86.5462 138.632 85.0845 143.405 82.3115 145.543C74.0851 151.884 61.0268 154.603 50.8929 153.934C48.2397 153.759 35.6118 151.97 37.2326 146.519C40.2237 136.458 60.7046 132.722 69.1391 131.785C73.7931 131.268 86.2983 129.188 86.8974 136.078C87.9284 147.935 73.2323 152.354 64.1628 155.3C52.805 158.99 35.8962 162.602 24.9383 155.69C14.356 149.016 30.1125 142.937 35.6714 140.371C42.7843 137.089 96.2635 120.556 84.7508 143.006C73.6694 164.615 24.1513 172.712 7.76545 153.739C1.96927 147.028 17.2145 142.168 21.0354 140.664C40.0732 133.172 60.0019 129.223 80.4576 129.834C87.5189 130.044 96.5666 129.56 100.167 136.761C102.865 142.157 104.078 148.47 98.5086 152.568C78.9562 166.956 49.4187 170.437 25.9141 167.985C18.2742 167.188 7.96059 163.68 7.96059 154.324C7.96059 142.209 26.7463 134.768 35.3787 130.712C51.2077 123.274 92.108 107.92 104.948 128.37C111.059 138.101 111.763 146.391 102.607 153.544C86.4738 166.148 59.5928 171.56 39.9646 165.545C29.8256 162.438 0.392433 154.208 12.6441 138.127C29.6643 115.788 73.4721 114.785 98.4111 115.783C108.759 116.197 120.952 122.706 125.244 132.663C128.661 140.591 129.022 150.763 121.341 156.081C102.296 169.265 79.6625 164.76 58.8939 157.837C54.1838 156.267 12.7924 149.001 15.3762 141.25C18.4612 131.995 35.0458 129.327 42.6967 127.199C61.3348 122.016 78.8904 118.486 98.3135 119.296C118.568 120.14 123.205 140.909 109.827 153.544C98.9719 163.796 69.2085 156.991 57.4303 151.592C34.085 140.893 75.5997 130.318 81.9212 128.76C85.8066 127.803 107.94 121.199 106.314 131.492C105.316 137.814 90.696 138.666 86.0192 138.42C63.0336 137.21 38.069 134.294 14.9859 136.859C1.29688 138.38 4.44795 167.764 4.44795 178.815C4.44795 199.701 8.33686 220.431 29.0364 230.237C39.8068 235.338 52.6332 232.952 63.1871 237.75C69.8306 240.769 83.2363 239.232 89.727 236.871C109.146 229.81 114.927 215.297 122.512 198.232C129.189 183.208 127.39 164.603 127.39 148.177C127.39 131.729 127.576 155.945 127.39 160.959C127.241 164.98 121.508 184.454 129.147 181.06C141.85 175.414 166.964 186.62 162.419 202.526C160.001 210.99 124.12 221.549 120.365 214.039" stroke="#C67E13" stroke-width="8" stroke-linecap="round" />
                  <path d="M53.6249 31.3829C52.3786 26.3974 43.0265 32.6835 42.5016 36.0664C40.9278 46.2086 55.3812 48.2146 55.3812 56.8495C55.3812 63.8976 49.7918 68.2656 43.087 68.2656" stroke="url(#paint0_linear_1064_1655)" stroke-width="8" stroke-linecap="round" />
                  <path d="M109.827 6.79405C108.365 0.947132 96.8164 9.15411 95.1912 10.5018C87.8368 16.6006 87.8597 23.4598 90.5076 32.0655C92.9152 39.8901 100.19 47.8408 101.046 55.971C101.726 62.4399 105.097 68.2891 100.167 74.3148C96.5473 78.7393 91.2376 80.8559 88.7513 85.8284" stroke="url(#paint1_linear_1064_1655)" stroke-width="8" stroke-linecap="round" />
                  <path d="M153.735 61.2402C146.654 63.7691 131.625 70.5285 137.928 80.1695C140.69 84.3931 139.065 94.6451 132 97" stroke="url(#paint2_linear_1064_1655)" stroke-width="8" stroke-linecap="round" />
                  <defs>
                    <linearGradient id="paint0_linear_1064_1655" x1="54.1271" y1="29.6059" x2="9.23169" y2="68.2397" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#937978" />
                      <stop offset="0.75" stop-color="#DC9427" />
                      <stop offset="0.9998" stop-color="white" />
                      <stop offset="0.9999" stop-color="white" />
                    </linearGradient>
                    <linearGradient id="paint1_linear_1064_1655" x1="107.794" y1="4.87416" x2="20.0534" y2="63.3321" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#937978" />
                      <stop offset="0.75" stop-color="#DC9427" />
                      <stop offset="0.9998" stop-color="white" />
                      <stop offset="0.9999" stop-color="white" />
                    </linearGradient>
                    <linearGradient id="paint2_linear_1064_1655" x1="152.065" y1="61.3054" x2="114.494" y2="111.298" gradientUnits="userSpaceOnUse">
                      <stop offset="0.265625" stop-color="#AE8583" />
                      <stop offset="0.75" stop-color="#DC9427" />
                      <stop offset="0.9998" stop-color="white" />
                      <stop offset="0.9999" stop-color="white" />
                    </linearGradient>
                  </defs>
                </svg> */}
        <svg id="coffee" width="300" height="445" viewBox="0 0 481 445" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M124.536 10C91.5197 33.1694 45.497 64.2579 37.2028 107.111C30.1469 143.567 100.225 127.88 115.647 125.556C125.049 124.138 237.488 90.4436 247.647 108.222C249.074 110.719 219.187 135.349 216.092 138.444C189.141 165.395 160.287 190.712 129.425 213.111C118.521 221.025 116.019 228.74 107.647 237.111C100.052 244.706 87.0279 248.17 78.3139 254.444C52.3936 273.107 20.9806 316.237 20.9806 349.333C20.9806 381.613 74.2426 365.652 89.425 360.222C158.697 335.45 225.145 287.896 287.869 250C302.192 241.347 373.213 207.595 354.758 178.889C342.787 160.267 298.972 171.819 284.092 176.667C237.916 191.709 190.276 212.009 146.981 234C106.311 254.658 46.5763 279.212 19.425 318C10.4336 330.845 2.53282 349.467 22.3139 353.111C62.8636 360.581 117.905 308.248 149.425 290C184.743 269.553 246.926 247.519 267.647 208.667C275.534 193.879 217.589 222.932 215.203 224.222C179.745 243.399 146.113 263.615 112.536 286C96.9788 296.372 81.5804 304.811 64.9806 313.111C54.8435 318.18 87.9755 315.598 98.9806 312.889C140.647 302.632 186.896 275.167 223.203 252.667C245.764 238.685 182.688 258.869 176.536 262C128.409 286.493 79.5707 316.553 35.425 347.778C20.3274 358.457 14.781 364.395 20.5362 380.222C29.8401 405.808 50.1488 411.713 75.6473 418C119.537 428.822 168.507 438.559 213.869 432.889C276.044 425.117 339.108 385.164 372.092 331.778C392.902 298.095 399.473 247.558 400.536 208.222C400.714 201.646 397.936 189.045 403.203 183.778C417.162 169.818 457.486 161.046 467.869 183.111C488.748 227.478 394.956 314.84 388.536 302" stroke="#825C3A" stroke-width="20" stroke-linecap="round" />
        </svg>

        <svg id="airplane" width="700" height="561" viewBox="0 0 1329 561" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M912 81L1320 9L1288 23.6824M1288 23.6824L980 165L948 101L1100 221L1288 23.6824ZM980 189C961.333 153 901.6 113.8 812 245C700 409 552 481 440 453C350.4 430.6 112 510.333 4 553" stroke="url(#paint0_linear_1085_1527)" stroke-width="17" stroke-linejoin="round" />
          <defs>
            <linearGradient id="paint0_linear_1085_1527" x1="905.5" y1="-125" x2="316.5" y2="553" gradientUnits="userSpaceOnUse">
              <stop stop-color="#36CFCF" />
              <stop offset="0.445676" stop-color="#7AB4E6" />
              <stop offset="1" stop-color="#C497FF" />
            </linearGradient>
          </defs>
        </svg>
        <svg id="hat" width="400" height="582" viewBox="0 0 759 582" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M214 378C193.558 355.002 192.769 312.878 194.889 284.666C199.432 224.211 236.138 170.643 288.667 142.444C350.045 109.493 409.613 102.422 475.333 125.111C490.544 130.362 526.008 140.968 533.111 157.111C536.288 164.332 546 178.504 546 186C546 193.304 511.673 207.391 506 210.889C451.038 244.769 401.358 279.97 354.889 325.333C327.541 352.03 299.92 378.334 272.222 404.666C265.071 411.465 238.889 430.606 238.889 443.333C238.889 453.742 258.792 436.395 267.333 430.444C295.56 410.778 324.32 391.909 352.222 371.777C411.681 328.877 475.474 289.707 541.111 256.889C558.324 248.282 576.11 241.326 594.889 237.111C598.911 236.208 607.666 235.862 610 231.777C631.546 194.072 707.14 166 747.555 166C753.113 166 735.93 168.07 732 172C716.01 187.989 704.087 208.918 689.111 226C663.622 255.073 636.129 281.992 608.667 309.111C594.465 323.135 567.169 337.541 557.111 354C544.571 374.52 524.745 375.403 504.222 378.889C404.678 395.792 302.137 428.584 209.111 466.889C155.764 488.855 103.379 514.022 50.8888 538C43.0954 541.56 10.4443 554.814 10.4443 567.777C10.4443 584.617 145.127 537.967 152.222 536.222C253.91 511.217 340.615 455.767 437.555 420.222C451.926 414.953 511.635 398.73 518 386" stroke="#BB9241" stroke-width="20" stroke-linecap="round" />
          <path d="M310 361.999C310 368.335 306.492 392.431 317.556 389.555C336.661 384.588 345.685 353.543 353.111 337.999C357.402 329.019 360.872 319.953 363.778 310.444C363.843 310.23 368.87 292.434 369.778 292.888C373.985 294.992 373.082 344.14 374.222 351.555C378.155 377.116 407.577 318.845 409.111 315.777C419.469 295.062 430.356 259.421 446.889 242.888C447.854 241.924 449.37 290.643 450.222 295.333C451.567 302.731 464.604 290.749 466 288.888C476.461 274.941 478.899 255.722 486 239.999C488.01 235.549 494 216.978 494 218.444C494 229.407 494 240.37 494 251.333C494 319.964 536.413 192.047 538 192.444C544.242 194.004 565.012 136.449 568.667 128.888C585.896 93.2425 614.396 24.0312 657.111 10.8882C693.814 -0.404945 655.256 123.326 686.444 105.999C731.321 81.0682 713.205 158.397 690 169.999" stroke="#654D1E" stroke-width="20" stroke-linecap="round" />
        </svg>
        <svg id="tulip" width="300" height="400" viewBox="0 0 564 821" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M463.892 785C402.746 624.753 428.842 416.495 554.115 291.222C563.065 282.272 554.166 305.897 553.67 307.667C541.786 350.11 540.808 397.306 535.892 441C524.951 538.261 519.892 637.126 519.892 735C519.892 765.547 514.256 785.642 499.892 810.778C487.997 831.596 447.437 777.133 445.226 773C410.567 708.228 391.745 636.565 355.892 572.111C320.991 509.368 309.18 438.967 273.67 376.556C262.88 357.591 253.266 336.853 240.337 319.222C231.4 307.035 220.296 297.27 214.115 283.222C210.457 274.91 200.957 261.515 199.892 253C197.311 232.351 156.455 242.494 144.781 240.111C52.8248 221.344 19.8924 144.552 19.8924 57.4444C19.8924 46.0133 17.4761 5 35.8924 5C58.935 5 76.5063 5.92191 95.8924 21C110.911 32.6814 135.845 39.941 147.892 55C150.441 58.1862 158.098 60.2707 161.892 63.2222C174.967 73.3915 187.754 98.7592 195.004 113C210.198 142.847 206.372 176.58 219.892 207C223.816 215.829 229.214 222.303 239.892 220.778C264.878 217.208 268.305 164.554 267.892 147.222C267.088 113.445 254.363 47.7568 225.892 23.6667C220.282 18.9197 207.019 20.6041 199.892 21C129.031 24.9367 226.537 259.899 231.67 283C233.471 291.103 242.111 296.993 246.115 305C254.627 322.026 260.928 340.092 267.892 357.889C281.581 392.871 299.203 429.146 309.892 464.778C320.634 500.583 334.136 536.292 351.892 569C359.567 583.137 366.982 597.857 375.892 611.222C381.277 619.299 383.892 639.222 383.892 639.222C383.892 639.222 339.935 591.211 320.115 565.444C305.121 545.953 285.265 530.373 267.892 513C241.549 486.657 216.701 456.109 180.781 442.778C138.483 427.079 94.2554 425 49.8924 425C38.5591 425 27.2258 425 15.8924 425C-0.227559 425 2.86127 422.308 16.5591 427.444C54.9782 441.852 93.5729 450.763 128.781 473C144.553 482.961 155.664 496.159 167.892 509.889C183.595 527.52 201.743 538.6 221.67 550.778C268.819 579.591 311.446 617.61 355.67 650.778C383.428 671.596 401.335 701.58 427.892 721.889C438.325 729.867 463.892 751.569 463.892 765" stroke="#E33E3E" stroke-width="10" stroke-linecap="round" />
        </svg>

      </section>

      <BearLogo />
    </Fragment>
  );
}

export default Home;
