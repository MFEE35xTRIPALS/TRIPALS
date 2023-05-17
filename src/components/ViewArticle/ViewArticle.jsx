import "./components/css/style.css";
// import HashTag from './components/HashTag';
// import { createPopper } from '@popperjs/core';
// import MapComponent from './components/MapComponent';
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api';
import { useState, useEffect, useRef } from 'react';

function ViewArticle(props) {
    // const [userno, setUserno] = useState('');
    // const [articleno, setArticleno] = useState('');

    const userno = props.userno;
    const articleno = props.articleno;
    const [AddTime, setAddtime] = useState(null);
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
    const [showAllTags, setShowAllTags] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`http://localhost:3000/guide/?userno=${userno}&articleno=${articleno}`);
            const data = await response.json();

            // setUserno(data.userno);
            // setArticleno(data.articleno);
            setAddtime(data.add_date);
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

    // 時間改格式
    console.log(AddTime);
    const postdate = new Date(AddTime);
    const Dateoptions = { month: "short", day: "numeric", year: "numeric" };
    const formattedDate = postdate.toLocaleDateString("en-US", Dateoptions);

    const handleLikeClick = (e) => {

        if (liked) {
            fetch(`http://localhost:3000/likepost/unlike?userno=${userno}&articleno=${articleno}`, {
                method: 'POST'
            })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Error unliking post.');
                    }
                })
                .then(data => {
                    setLiked(false);
                    setMLcount(data);
                    document.getElementById('likepost').classList.remove('fa-solid');
                    document.getElementById('likepost').classList.add('fa-regular');
                    alert("取消收藏")
                })
                .catch(error => {
                    console.log('Error unliking post:', error);
                });
        } else {
            fetch(`http://localhost:3000/likepost/like?userno=${userno}&articleno=${articleno}`, {
                method: 'POST'
            })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Error liking post.');
                    }
                })
                .then(data => {
                    setLiked(true);
                    setMLcount(data);
                    document.getElementById('likepost').classList.remove('fa-regular');
                    document.getElementById('likepost').classList.add('fa-solid');
                    alert("收藏成功")
                })
                .catch(error => {
                    console.log('Error liking post:', error);
                });
        }
    };

    let alreadyReport = false;
    const handleConfirmClick = (e) => {
        if (alreadyReport == false) {
            fetch(`http://localhost:3000/likepost/report?articleno=${articleno}`, {
                method: 'POST'
            })
                .then(response => {
                    if (response.ok) {
                        alert("檢舉成功");
                        alreadyReport = true
                    } else {
                        throw new Error('Error report post.');
                    }
                })
                .catch(error => console.error(error));
        } else {
            alert("已檢舉此篇文章")
        }

    }

    const articleItems = useRef([]);

    function handleMarkerClick(i) {
        const targetItem = articleItems.current[i];
        if (targetItem) {
            targetItem.scrollIntoView({ behavior: 'smooth' });
        }
    }

    const handleShowAllTags = () => {
        setShowAllTags(!showAllTags);
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
                                    label={{ text: `${i + 1}`, color: '#fff' }}
                                    key={i}
                                    position={x}
                                    onClick={() => handleMarkerClick(i)}
                                />
                            ))}
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
                                                        <img src={`http://localhost:3000/${Mimage}`}
                                                            alt="" className="image-placeholder" />
                                                    </figure>
                                                    <div id="mainArticle">
                                                        <div id="placeTitle">
                                                            <h3 id="placeMainTitle">{Mtitle}</h3>
                                                            <p>{formattedDate}</p>
                                                            <div className="titlei">
                                                                <i id="likepost" onClick={handleLikeClick} className={`fa-heart ${liked ? "fa-solid" : "fa-regular"}`}
                                                                ></i>
                                                                <i id="reportPost" onClick={handleConfirmClick} className="fa fa-exclamation-triangle"></i>
                                                            </div>


                                                        </div>

                                                        {/* <hr id="pTagUpHr" className="d-none" /> */}
                                                        <hr id="pTagUpHr" className={`${hashtags.length === 0 ? "d-none" : ""}`} />
                                                        <div id="placeTag">
                                                            {/* <HashTag  data={this.state.hashtags}/> */}
                                                            {hashtags.map((item, i) => (
                                                                <button key={i} style={{ display: i < 3 || showAllTags ? 'inline-block' : 'none' }}>{item}</button>
                                                            ))}
                                                            {hashtags.length > 3 && (
                                                                <i onClick={handleShowAllTags} className={`fa ${showAllTags ? "fa-ellipsis-h" : "fa-times-circle"}`}></i>
                                                            )}
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
                                                            <i className="fa-solid fa-heart"></i>
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
                                    <div className="accordion-item placeSpots" key={index} ref={el => articleItems.current[index] = el}>
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
                                                            <img src={`http://localhost:3000/${el.image}`}
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






