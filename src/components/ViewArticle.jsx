import { GoogleMap, MarkerF } from "@react-google-maps/api";
import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import markerIcon from "../assets/marker2.svg";
import mapStyles from "../pages/Edit/components/mapStyles";
import axios from "axios";
import BearLogo from "./smallcomponent/BearLogo";
import useSwaAlert from "../components/swaAlert";

function ViewArticle({ currentUser, setCurrentUser }) {
	// swaAlert
	const swaAlert = useSwaAlert();

	const url = "http://localhost:8000";
	const [userno, setuserno] = useState(
		currentUser ? JSON.parse(currentUser)[0].userno : ""
	);
	const { articleno } = useParams();
	const [allData, setAlldata] = useState(null);
	const [AddTime, setAddtime] = useState(null);
	const [id, setId] = useState("");
	const [nickname, setNickname] = useState("");
	const [avatar, setAvatar] = useState("");
	const [Mtitle, setMtitle] = useState("");
	const [Mcontent, setMcontent] = useState("");
	const [Mlocation, setMlocation] = useState("");
	const [Mimage, setMimage] = useState("");
	const [MVcount, setMVcount] = useState(null);
	const [MLcount, setMLcount] = useState(null);
	const [liked, setLiked] = useState(false);
	const [hashtags, setHashtags] = useState([]);
	const [spots, setSpots] = useState([]);
	const [showPanels, setShowPanels] = useState(false);
	const [showAllTags, setShowAllTags] = useState(false);
	console.log(articleno);
	console.log(userno);

	const [map, setMap] = useState(null);

	async function fetchData() {
		// const response = await fetch(
		// 	url + `/guide/?userno=${userno}&articleno=${articleno}`
		// );

		const response = await axios.get(
			url + `/guide/?userno=${userno}&articleno=${articleno}`
		);
		const data = response.data;

		// setUserno(data.userno);
		// setArticleno(data.articleno);
		setAlldata(data);

		setAddtime(data.article_add_date);
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

	useEffect(() => {
		fetchData();
		function handleWindowSize() {
			setShowPanels(window.innerWidth >= 768);
		}
		window.addEventListener("resize", handleWindowSize);
		handleWindowSize();
		console.log("AddTime:" + AddTime);
		return () => window.removeEventListener("resize", handleWindowSize);
	}, []);
	const AvatarUrl = avatar
		? url + `/${avatar}`
		: "http://localhost:8000/useravatar/pre.png";
	const containerStyle = {
		height: "100%",
	};

	// const center = {
	//     lat: 25.033964,
	//     lng: 121.564472
	// };
	const options = {
		styles: mapStyles,
		gestureHandling: "greedy",
		fullscreenControl: false,
		mapTypeControl: false,
	};
	console.log("spot:", spots);

	const locations = spots.map((x) => {
		// console.log("TEST:" + x.location);
		const [lat, lng] = x.location ? x.location.split(",") : "";
		if (lat && lng) {
			return {
				lat: parseFloat(lat),
				lng: parseFloat(lng),
			};
		}
	});

	// 時間改格式
	console.log(AddTime);
	const postdate = new Date(AddTime);
	const Dateoptions = { month: "short", day: "numeric", year: "numeric" };
	const formattedDate = postdate.toLocaleDateString("en-US", Dateoptions);

	const handleLikeClick = (e) => {
		if (liked) {
			fetch(url + `/likepost/unlike?userno=${userno}&articleno=${articleno}`, {
				method: "POST",
			})
				.then((response) => {
					if (response.ok) {
						return response.json();
					} else {
						throw new Error("Error unliking post.");
					}
				})
				.then((data) => {
					setLiked(false);
					setMLcount(data);
					document.getElementById("likepost").classList.remove("fa-solid");
					document.getElementById("likepost").classList.add("fa-regular");
					swaAlert("取消收藏成功", "", "success", 1500);
				})
				.catch((error) => {
					console.log("Error unliking post:", error);
				});
		} else {
			fetch(url + `/likepost/like?userno=${userno}&articleno=${articleno}`, {
				method: "POST",
			})
				.then((response) => {
					if (response.ok) {
						return response.json();
					} else {
						throw new Error("Error liking post.");
					}
				})
				.then((data) => {
					setLiked(true);
					setMLcount(data);
					document.getElementById("likepost").classList.remove("fa-regular");
					document.getElementById("likepost").classList.add("fa-solid");
					swaAlert("收藏成功", "", "success", 1500);
				})
				.catch((error) => {
					console.log("Error liking post:", error);
				});
		}
	};

	let alreadyReport = false;
	const handleConfirmClick = (e) => {
		if (alreadyReport === false) {
			fetch(url + `/likepost/report?articleno=${articleno}`, {
				method: "POST",
			})
				.then((response) => {
					if (response.ok) {
						swaAlert("檢舉成功", "", "success", 1500);
						alreadyReport = true;
					} else {
						throw new Error("Error report post.");
					}
				})
				.catch((error) => console.error(error));
		} else {
			swaAlert("已檢舉此篇文章", "", "warning", 1500);
		}
	};

	const articleItems = useRef([]);

	function handleMarkerClick(i) {
		const targetItem = articleItems.current[i];
		if (targetItem) {
			targetItem.scrollIntoView({ behavior: "smooth" });
		}
	}

	const handleShowAllTags = () => {
		setShowAllTags(!showAllTags);
	};

	let center = locations[0] ? locations[0] : { lat: 23.6978, lng: 120.9605 };

	const customMarkerIcon = {
		url: markerIcon,
		scaledSize: new window.google.maps.Size(80, 80),
	};

	const handleMapLoad = (map) => {
		setMap(map);
		// 創建一個空的經緯度邊界（LatLngBounds）對象：
		const bounds = new window.google.maps.LatLngBounds();

		// 遍歷 spots 陣列，並對於每個物件，提取經緯度並擴展到邊界中，null值不做處理
		let flag = false;
		spots.forEach((spot) => {
			if (spot.location) {
				flag = true;
				const markerPosition = new window.google.maps.LatLng(
					parseFloat(spot.location.split(",")[0]),
					parseFloat(spot.location.split(",")[1])
				);
				bounds.extend(markerPosition);
			}
		});

		// 在所有的 spots 物件都處理完後，獲取邊界的中心點（center）：
		// let calculatedCenter = null;
		if (flag) {
			map.fitBounds(bounds);
			center = bounds.getCenter();
			// 更改中心點
			const latLng = new window.google.maps.LatLng(
				center.lat(),
				center.lng() - 0.02
			);
			center = latLng;
		}
		// 監聽後再更改設置縮放級別與中心點
		window.google.maps.event.addListenerOnce(map, "idle", () => {
			const zoom = map.getZoom() - 1;
			map.setZoom(zoom);
			map.setCenter(center);
		});
	};

	return (
		<div>
			{allData ? (
				<section id="content">
					<div className="section-map-wapper">
						{/* <LoadScript googleMapsApiKey="AIzaSyDhO21SyzfdV8hcAc1jvjr6XZSTZdPFlhY"> */}
						<GoogleMap
							mapContainerStyle={containerStyle}
							// center={locations[0]}
							zoom={13}
							options={options}
							onLoad={handleMapLoad}
						>
							{/* Child components, such as markers, info windows, etc. */}
							{locations.map((x, i) =>
								x ? (
									<MarkerF
										label={{
											text: `${i + 1}`,
											color: "#fff",
											className: "markerLabel",
										}}
										key={i}
										position={x}
										// icon={{
										// 	url: require("../components/img/purple_dot.png"),
										// 	scaledSize: new window.google.maps.Size(50, 50),
										// }}
										icon={customMarkerIcon}
										onClick={() => handleMarkerClick(i)}
									/>
								) : null
							)}
							<></>
						</GoogleMap>
						{/* </LoadScript> */}
					</div>
					<section id="content">
						<div className="section-guide-panel">
							<div className="section-panel-inner mx-auto">
								<div className="accordion" id="accordionPanelsStayOpenExample">
									<div className="accordion-item mainCard">
										<h2
											className="accordion-header d-md-none"
											id="panelsStayOpen-headingOne"
										>
											<button
												id="RWDmain_title"
												className="accordion-button"
												type="button"
												data-bs-toggle="collapse"
												data-bs-target="#panelsStayOpen-collapseOne"
												aria-expanded="true"
												aria-controls="panelsStayOpen-collapseOne"
											>
												{Mtitle}
											</button>
										</h2>
										<div
											id="panelsStayOpen-collapseOne"
											className={`accordion-collapse collapse ${
												showPanels ? "show" : ""
											}`}
											aria-labelledby="panelsStayOpen-headingOne"
										>
											<div className="accordion-body">
												<div className="section-panel-intro">
													<div className="image-intro">
														<figure>
															<img
																src={
																	Mimage
																		? `${url + Mimage}`
																		: "https://fakeimg.pl/600x400/ffffff/?text=No Pictures&font=noto"
																}
																alt=""
																className="image-placeholder"
															/>
														</figure>
														<div id="mainArticle">
															<div id="placeTitle">
																<h3 id="placeMainTitle">{Mtitle}</h3>
																<p>{formattedDate}</p>
																<div className="titlei">
																	<i
																		id="likepost"
																		onClick={handleLikeClick}
																		className={`fa-heart ${
																			liked ? "fa-solid" : "fa-regular"
																		}`}
																	></i>
																	<i
																		id="reportPost"
																		onClick={handleConfirmClick}
																		className="fa fa-exclamation-triangle"
																	></i>
																</div>
															</div>

															{/* <hr id="pTagUpHr" className="d-none" /> */}
															<hr
																id="pTagUpHr"
																className={`${
																	hashtags.length === 0 ? "d-none" : ""
																}`}
															/>
															<div id="placeTag">
																{/* <HashTag  data={this.state.hashtags}/> */}
																{hashtags.map((item, i) => (
																	<button
																		key={i}
																		style={{
																			display:
																				i < 3 || showAllTags
																					? "inline-block"
																					: "none",
																		}}
																	>
																		{item}
																	</button>
																))}
																{hashtags.length > 3 && (
																	<i
																		onClick={handleShowAllTags}
																		className={`fa ${
																			showAllTags
																				? "fa-times-circle"
																				: "fa-ellipsis-h"
																		}`}
																	></i>
																)}
															</div>
															<hr />
															<div id="author">
																<img id="authorPhoto" src={AvatarUrl} />
																<p id="authorName">
																	{nickname ? nickname : id}
																</p>
															</div>
															<hr />
															<pre className="view_pre">{Mcontent}</pre>
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
										<div
											className="accordion-item placeSpots"
											key={index}
											ref={(el) => (articleItems.current[index] = el)}
										>
											<h2
												className="accordion-header d-md-none"
												id={`panelsStayOpen-heading${index}`}
											>
												<button
													className="accordion-button collapsed"
													type="button"
													data-bs-toggle="collapse"
													data-bs-target={`#panelsStayOpen-collapse${index}`}
													aria-expanded="false"
													aria-controls={`panelsStayOpen-collapse${index}`}
												>
													{el.title}
												</button>
											</h2>
											<div
												id={`panelsStayOpen-collapse${index}`}
												className={`accordion-collapse collapse ${
													showPanels ? "show" : ""
												}`}
												aria-labelledby={`panelsStayOpen-heading${index}`}
											>
												<div className="accordion-body">
													<div className="section-panel-intro">
														<div className="image-intro">
															<figure>
																<img
																	src={
																		el.image
																			? `${url + el.image}`
																			: "https://fakeimg.pl/600x400/ffffff/?text=No Pictures&font=noto"
																	}
																	alt=""
																	className="image-placeholder"
																/>
															</figure>
															<div>
																<div>
																	<h3>{el.title}</h3>
																</div>
																<hr />
																<div>
																	<pre className="view_pre">{el.content}</pre>
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
						<BearLogo />
					</section>
				</section>
			) : (
				<div className="loader">
					<div className="lds-ellipsis">
						<div></div>
						<div></div>
						<div></div>
						<div></div>
					</div>
				</div>
			)}
		</div>
	);
}

export default ViewArticle;
