import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { Component } from "react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.js";
import BearLogo from "./components/BearLogo.jsx";
import Home from "./pages/Home/Home.jsx";
import Edit from "./pages/Edit/Edit";
import "./components/CSS/Header.scss";
import "./components/CSS/Footer.scss";
import "./components/CSS/Bear.scss";

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
		<BrowserRouter>
			<Routes>
				<Route exact path="/" element={<Home />} />
				<Route exact path="/guide/edit" element={<Edit />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
