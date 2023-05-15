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
    const AvatarUrl = `http://localhost:3000/${avatar}`;
    console.log(spots);

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
                                            {Mtitle}
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
                                                            <h3 id="placeMainTitle">{Mtitle}</h3>
                                                            <p>May 01, 2023</p>
                                                            <div className="titlei">
                                                                <i id="likepost" onClick={handleLikeClick} className="fa-regular fa-heart"></i>
                                                                <i id="reportPost" className="fa fa-exclamation-triangle"></i>
                                                            </div>


                                                        </div>

                                                        {/* <hr id="pTagUpHr" className="d-none" /> */}
                                                        <hr id="pTagUpHr" />
                                                        <div id="placeTag">
                                                            {/* <HashTag  data={this.state.hashtags}/> */}
                                                            {hashtags.map((item, i) => (
                                                                <button key={i}>{item}</button>
                                                            ))}
                                                        </div>
                                                        <hr />
                                                        <div id="author">
                                                            <img id="authorPhoto"
                                                                src={AvatarUrl} />
                                                            <p id="authorName">{nickname}</p>
                                                        </div>
                                                        <hr />
                                                        <p id="main_content">{Mcontent}</p>
                                                        <div id="count">
                                                            <i className="fa-regular fa-heart"></i>
                                                            <p id="displayLC">{MLcount}</p>
                                                            <i className="fa-sharp fa-solid fa-eye"></i>
                                                            <p id="displayVC">{MVcount}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {spots.map((el, index) => (
                                    <div className="accordion-item placeSpots" key={index}>
                                    <h2 className="accordion-header d-md-none" id={`{"panelsStayOpen-heading${index}"}`}>
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                            data-bs-target={`{"#panelsStayOpen-collapse${index}"}`} aria-expanded="false"
                                            aria-controls={`{"panelsStayOpen-collapse${index}"}`}>
                                            {el.title}
                                        </button>
                                    </h2>
                                    <div id={`{"panelsStayOpen-collapse${index}"}`} className="accordion-collapse collapse show"
                                        aria-labelledby={`{"panelsStayOpen-heading${index}"}`}>
                                        <div className="accordion-body">
                                            <div className="section-panel-intro">
                                                <div className="image-intro">
                                                    <figure>
                                                        <img src="https://www.taiwan.net.tw/att/1/big_scenic_spots/pic_154_14.jpg"
                                                            alt="" className="image-placeholder" />
                                                    </figure>
                                                    <div>
            
                                                        <div>
                                                            <h3>{el.title}</h3>
                                                        </div>
                                                        <hr/>
                                                        <div>
                                                            <p>{el.content}</p>
                                                        </div>
            
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </section>

        </div>
    );

}

export default ViewArticle;






