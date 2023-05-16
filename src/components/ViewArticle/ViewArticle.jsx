import React, { Component } from 'react';
import "./components/css/style.css";
// import HashTag from './components/HashTag';
// import { createPopper } from '@popperjs/core';
// import MapComponent from './components/MapComponent';
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api';
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
    const [showPanels, setShowPanels] = useState(false);

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
        function handleWindowSize() {
            setShowPanels(window.innerWidth >= 768);
        }
        window.addEventListener("resize", handleWindowSize);
        handleWindowSize();
        return () => window.removeEventListener("resize", handleWindowSize);

    }, []);
    const AvatarUrl = `http://localhost:3000/${avatar}`;
    const containerStyle = {
        height: '100%'
    };

    // const center = {
    //     lat: 25.033964,
    //     lng: 121.564472
    // };
    const options = {
        disableDefaultUI: true,
        gestureHandling: 'greedy'
    };

    const locations = spots.map(x => {
        const [lat, lng] = x.location.split(",");
        return {
            lat: parseFloat(lat),
            lng: parseFloat(lng)
        };
    });

    console.log(locations);


    const handleLikeClick = (e) => {
        alert("OK");
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
                    <LoadScript
                        googleMapsApiKey="AIzaSyDhO21SyzfdV8hcAc1jvjr6XZSTZdPFlhY"
                    >
                        <GoogleMap
                            mapContainerStyle={containerStyle}
                            center={locations[0]}
                            zoom={16}
                            options={options}
                        >
                            { /* Child components, such as markers, info windows, etc. */}
                            {locations.map((x, i) => (
                                <MarkerF
                                    // icon={{
                                    //     path:
                                    //         "M8 12l-4.7023 2.4721.898-5.236L.3916 5.5279l5.2574-.764L8 0l2.3511 4.764 5.2574.7639-3.8043 3.7082.898 5.236z",
                                    //     fillColor: "yellow",
                                    //     fillOpacity: 0.9,
                                    //     scale: 2,
                                    //     strokeColor: "gold",
                                    //     strokeWeight: 2,
                                    // }}
                                    label={{ text: `${i + 1}`, color: '#fff' }}
                                    key={i}
                                    position={x}
                                />
                            ))}
                            {/* <MarkerF
                                icon={{
                                    path:
                                        "M8 12l-4.7023 2.4721.898-5.236L.3916 5.5279l5.2574-.764L8 0l2.3511 4.764 5.2574.7639-3.8043 3.7082.898 5.236z",
                                    fillColor: "yellow",
                                    fillOpacity: 0.9,
                                    scale: 2,
                                    strokeColor: "gold",
                                    strokeWeight: 2,
                                }}
                                position={center} /> */}
                            <></>
                        </GoogleMap>
                    </LoadScript>
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
                                    <div id="panelsStayOpen-collapseOne" className={`accordion-collapse collapse ${showPanels ? "show" : ""
                                        }`}
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
                                        <h2 className="accordion-header d-md-none" id={`panelsStayOpen-heading${index}`}>
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                                data-bs-target={`#panelsStayOpen-collapse${index}`} aria-expanded="false"
                                                aria-controls={`panelsStayOpen-collapse${index}`}>
                                                {el.title}
                                            </button>
                                        </h2>
                                        <div id={`panelsStayOpen-collapse${index}`} className={`accordion-collapse collapse ${showPanels ? "show" : ""
                                            }`}
                                            aria-labelledby={`panelsStayOpen-heading${index}`}>
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
                                                            <hr />
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






