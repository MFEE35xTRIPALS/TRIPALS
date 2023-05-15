import React, { Component } from 'react';
import "./components/css/style.css";
// import HashTag from './components/HashTag';

import MapComponent from './components/MapComponent';
import { useState, useEffect } from 'react';

function ViewArticle() {
    const [userno, setUserno] = useState('');
    const [articleno, setArticleno] = useState('');
    const [id, setId] = useState('');
    const [nickname, setNickname] = useState('');
    const [avatar, setAvatar] = useState('');
    const [Mtitle, setMtitle] = useState('');
    const [Mcontent, setMcontent] = useState('');
    const [Mlocation, setMlocation] = useState('');
    const [Mimage, setMimage] = useState('');
    const [MVcount, setMVcount] = useState(null);
    const [MLcount, setMLcount] = useState(null);
    const [liked, setLiked] = useState(false);
    const [hashtags, setHashtags] = useState([]);
    const [spots, setSpots] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('http://localhost:3000/guide/?userno=2&articleno=2');
            const data = await response.json();

            setUserno(data.userno);
            setArticleno(data.articleno);
            setId(data.id);
            setNickname(data.nickname);
            setAvatar(data.avatar);
            setMtitle(data.main_title);
            setMcontent(data.main_content);
            setMlocation(data.main_location);
            setMimage(data.main_image);
            setMVcount(data.main_view_count);
            setMLcount(data.main_liked_count);
            setLiked(data.liked);
            setHashtags(data.hashtags);
            setSpots(data.spots);
        }

        fetchData();
    }, []);

    const handleLikeClick = (e) => {
        console.log('kkkk')
        // if (true) {
        //   fetch(`http://localhost:3000/likepost/like?userno=${userno}&articleno=${articleno}`, {
        //     method: 'POST',
        //     body: JSON.stringify({}),
        //     headers: {
        //       'Content-Type': 'application/json',
        //     },
        //   })
        //     .then((response) => response.json())
        //     .then((data) => {
        //       console.log(data);
        //       setLiked(true);
        //     })
        //     .catch((error) => console.error(error));
        //   alert('收藏文章成功');
        // } else {
        //   fetch(`http://localhost:3000/likepost/unlike?userno=${userno}&articleno=${articleno}`, {
        //     method: 'POST',
        //     body: JSON.stringify({}),
        //     headers: {
        //       'Content-Type': 'application/json',
        //     },
        //   })
        //     .then((response) => response.json())
        //     .then((data) => {
        //       console.log(data);
        //       setLiked(false);
        //     })
        //     .catch((error) => console.error(error));
        //   alert('取消收藏文章');
        // }
      };

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
                                                            <h3 id="placeMainTitle"></h3>
                                                            <p>May 01, 2023</p>
                                                            <div className="titlei">
                                                                <i id="likePost" onClick={handleLikeClick} class="fa-regular fa-heart"></i>
                                                                <i id="reportPost" class="fa fa-exclamation-triangle"></i>
                                                            </div>


                                                        </div>

                                                        {/* <hr id="pTagUpHr" className="d-none" /> */}
                                                        <hr id="pTagUpHr" className="d-none" />
                                                        <div id="placeTag">
                                                            {/* <HashTag  data={this.state.hashtags}/> */}

                                                        </div>
                                                        <hr />
                                                        <div id="author">
                                                            <img id="authorPhoto"
                                                                src="http://localhost:3000/useravatar/2.jpg" />

                                                            <p id="authorName"></p>
                                                        </div>
                                                        <hr />
                                                        <p id="main_content"></p>
                                                        <div id="count">
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

export default ViewArticle;






