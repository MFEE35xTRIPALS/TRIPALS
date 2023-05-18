import React from "react";
import { useState } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import styles from "../Edit.module.scss";
import mapStyles from "./mapStyles.js";
import cityCoordinates from "./cityCoordinates";
import markerIcon from "../../../assets/marker2.svg";

const containerStyle = {
	width: "100%",
	height: "85vh",
};

const taiwanCenter = {
	lat: 23.6978,
	lng: 120.9605,
};

const GoogleMapRender = ({ selectedCity, spots }) => {
	const [map, setMap] = useState(null);

	// 先初始化 center
	let center = cityCoordinates[selectedCity] || taiwanCenter;
	let zoom = cityCoordinates[selectedCity] ? 14 : 7.8;
	// console.log(center);

	const handleMapLoad = (map) => {
		console.log(map);
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
			console.log("true");
			center = bounds.getCenter();
			map.fitBounds(bounds);

			window.setTimeout(() => {
				zoom = map.getZoom() - 2;
			}, 500); // 延遲 1 秒後獲取縮放級別
		}
		// calculatedCenter = bounds.getCenter();
		// console.log("calculatedCenter", calculatedCenter);

		// 如果計算後的 center 有值 就用 calculatedCenter 取代 center
		// if (calculatedCenter) {
		// 	center = calculatedCenter;
		// }

		// console.log("final:" + center);
		map.setZoom(zoom);
		map.setCenter(center);
	};

	const calculateMarkerSize = () => {
		if (map) {
			const zoomLevel = map.getZoom();
			const scaleFactor = 1;
			const markerSize = 80;

			return Math.ceil(markerSize * Math.pow(scaleFactor, zoomLevel));
		}

		return 80;
	};

	const customMarkerIcon = {
		url: markerIcon,
		scaledSize: new window.google.maps.Size(
			calculateMarkerSize(),
			calculateMarkerSize()
		),
	};

	return (
		<div>
			<GoogleMap
				mapContainerStyle={containerStyle}
				// center={center}
				// zoom={zoom}
				options={{ mapStyles }}
				onLoad={handleMapLoad}
			>
				{spots.map((spot, index) => (
					<Marker
						key={spot.contentno}
						position={
							// 讓 position 是null就好了
							spot.location
								? {
										lat: parseFloat(spot.location.split(",")[0]),
										lng: parseFloat(spot.location.split(",")[1]),
								  }
								: null
						}
						label={{
							text: `${index + 1}`,
							color: "#fff",
							className: styles.markerLabel,
						}}
						icon={customMarkerIcon}
					/>
				))}
			</GoogleMap>
		</div>
	);
};

export default GoogleMapRender;
