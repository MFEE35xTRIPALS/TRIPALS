import React, { Component } from 'react';
import "./components/css/style.css";
import MapComponent from './components/MapComponent';

class ViewArticle extends Component {
    state = {
    }

    render() {
        return (
            <div>
                <section id="content">
                    <div className="section-map-wapper">
                        <MapComponent />
                    </div>
                    <section id="content">
                        <div className="section-guide-panel">
                            <div className="section-panel-inner mx-auto">
                                <div className="accordion" id="accordionPanelsStayOpenExample">
                                    <div className="accordion-item">
                                        <h2 className="accordion-header d-md-none" id="panelsStayOpen-headingOne">
                                            <button id="RWDmain_title" className="accordion-button" type="button" data-bs-toggle="collapse"
                                                data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true"
                                                aria-controls="panelsStayOpen-collapseOne">
                                                饒河觀光夜市
                                            </button>
                                        </h2>
                                        <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show"
                                            aria-labelledby="panelsStayOpen-headingOne">
                                            <div className="accordion-body">
                                                <div className="section-panel-intro">
                                                    <div className="image-intro">
                                                        <figure>
                                                            <img src="https://www.travel.taipei/content/images/attractions/282180/1024x768_attractions-image--rznjhetiuoqnzoyqppjgw.jpg"
                                                                alt="" className="image-placeholder" />
                                                        </figure>
                                                        <div id="mainArticle">
                                                            <div id="placeTitle">
                                                                <h3 id="placeMainTitle">饒河觀光夜市</h3>
                                                                <p>May 01, 2023</p>
                                                                <div className="titlei">
                                                                    <i id="likePost" className="fa-regular fa-heart"></i>
                                                                    <i id="reportPost" className="fa fa-exclamation-triangle"></i>
                                                                </div>


                                                            </div>

                                                            <hr id="pTagUpHr" className="d-none" />
                                                            <div id="placeTag">

                                                            </div>
                                                            <hr />
                                                            <div id="author">
                                                                <img id="authorPhoto"
                                                                    src="https://imgs.gvm.com.tw/upload/gallery/20221204/125075.jpg" />

                                                                <p id="authorName"></p>
                                                            </div>
                                                            <hr />
                                                            <p id="main_content"></p>
                                                            <div id="count">
                                                                <p></p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </section>

            </div>
        );
    }
}

export default ViewArticle;
