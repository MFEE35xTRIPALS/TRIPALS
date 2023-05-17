import React, { Component } from "react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.js";
import BearLogo from "./components/BearLogo.jsx";
import Home from "./pages/Home/Home.jsx";
import Edit from "./pages/Edit/Edit";
import "./components/CSS/Header.scss";
import "./components/CSS/Footer.scss";
import "./components/CSS/Bear.scss";
import "swiper/dist/css/swiper.css";

import { useLoadScript } from "@react-google-maps/api";
const libraries = ["places"];

function App() {
	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: "AIzaSyAPOMZXMZfyOy1zrlETRf727BEzshgi2oM",
		libraries: libraries,
	});

	if (!isLoaded) {
		return <div>Loading...</div>;
	}

	if (loadError) {
		return <div>載入地圖時發生錯誤</div>;
	}
	return (
		<div className="App">
			<Header />
			<BearLogo />
			<Home />
			<Footer />
		</div>
	);
}

export default App;
