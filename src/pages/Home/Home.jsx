import React, { Fragment, useEffect } from 'react';
// import './css/Home.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Home = () => {
    useEffect(() => {
        AOS.init();
        AOS.refresh();
    }, []);
    return (
        <Fragment>
            <section id="main">
                <div class="divVideo">
                    <video autoplay muted loop>
                        <source src="./media/video01.mp4" type="video/mp4" />
                    </video>
                    <div class="videoContent">
                        <div id="LOGO">
                            <img src="./media/LOGO.svg" alt="logo" />
                        </div>

                        <div class="slogan">
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
            <section id="news" class="">
                <img id="greenCloud" src="./media/GreemCloud.png" alt="" />
                <div id="news_area">
                    <div class="news-tittle">
                        <h1 id="newsTittle">
                            NEWS
                        </h1>
                    </div>

                    <div class="container">
                        <div data-aos="fade-left" data-aos-duration="1500" class="accordion accordion-flush" id="accordionFlushExample">
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="flush-headingOne">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                        2023/05/31 畢業快樂!!
                                    </button>
                                </h2>
                                <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne"
                                    data-bs-parent="#accordionFlushExample">
                                    <div class="accordion-body">
                                        Placeholder content for this accordion, which is intended to
                                    </div>
                                </div>
                            </div>
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="flush-headingTwo">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                                        2023/03/31 系統更新
                                    </button>
                                </h2>
                                <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo"
                                    data-bs-parent="#accordionFlushExample">
                                    <div class="accordion-body">
                                        Placeholder content for this accordion, which is intended to
                                    </div>
                                </div>
                            </div>
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="flush-headingThree">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                                        Accordion Item #3
                                    </button>
                                </h2>
                                <div id="flush-collapseThree" class="accordion-collapse collapse" aria-labelledby="flush-headingThree"
                                    data-bs-parent="#accordionFlushExample">
                                    <div class="accordion-body">
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

        </Fragment>

    )
}


export default Home