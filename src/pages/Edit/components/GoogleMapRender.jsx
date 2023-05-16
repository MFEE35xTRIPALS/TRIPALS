import React from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import mapStyles from "./mapStyles.js";
import cityCoordinates from "./cityCoordinates";
// import markerIcon from "../../../assets/marker.svg";

const containerStyle = {
	width: "100%",
	height: "85vh",
};

const taiwanCenter = {
	lat: 23.6978,
	lng: 120.9605,
};

// const customMarkerIcon = {
// 	url: markerIcon,
// 	// scaledSize: new window.google.maps.Size(50, 50), // 設定圖檔顯示大小
// };

const GoogleMapRender = ({ selectedCity, spots }) => {
	console.log(selectedCity);
	// const { isLoaded, loadError } = useLoadScript({
	// 	googleMapsApiKey: "AIzaSyAPOMZXMZfyOy1zrlETRf727BEzshgi2oM",
	// 	libraries: placesLibrary,
	// });
	// console.log(spots);

	// 先初始化 center
	let center = cityCoordinates[selectedCity] || taiwanCenter;
	console.log(center);

	const handleMapLoad = (map) => {
		// 創建一個空的經緯度邊界（LatLngBounds）對象：
		const bounds = new window.google.maps.LatLngBounds();

		// 遍歷 spots 陣列，並對於每個物件，提取經緯度並擴展到邊界中，null值不做處理
		let flag = false;
		spots.forEach((spot) => {
			if (spot.location) {
				flag = true;
				console.log("安安");
				const markerPosition = new window.google.maps.LatLng(
					parseFloat(spot.location.split(",")[0]),
					parseFloat(spot.location.split(",")[1])
				);
				bounds.extend(markerPosition);
			}
		});

		// 在所有的 spots 物件都處理完後，獲取邊界的中心點（center）：
		let calculatedCenter = null;
		if (flag) calculatedCenter = bounds.getCenter();
		// console.log("calculatedCenter", calculatedCenter);

		// 如果計算後的 center 有值 就用 calculatedCenter 取代 center
		if (calculatedCenter) {
			center = calculatedCenter;
		}

		console.log("final:" + center);

		map.setCenter(center);
	};

	return (
		<div>
			{/* 其他內容 */}
			{/* <LoadScript
				googleMapsApiKey="AIzaSyAPOMZXMZfyOy1zrlETRf727BEzshgi2oM"
				libraries={libraries}
			> */}
			<GoogleMap
				mapContainerStyle={containerStyle}
				center={center}
				zoom={15}
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
						label={{ text: `${index + 1}`, color: "#fff" }}
						// icon={customMarkerIcon}
					/>
				))}
			</GoogleMap>
			{/* </LoadScript> */}
		</div>
	);
};

export default GoogleMapRender;
