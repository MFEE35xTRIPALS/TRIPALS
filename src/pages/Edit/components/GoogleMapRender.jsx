import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import mapStyles from "./mapStyles.js";
import cityCoordinates from "./cityCoordinates";
import markerIcon from "../../../assets/marker.svg";

const containerStyle = {
	width: "100%",
	height: "85vh",
};

const libraries = ["places"];

const taiwanCenter = {
	lat: 23.6978,
	lng: 120.9605,
};

const customMarkerIcon = {
	url: markerIcon,
	// scaledSize: new window.google.maps.Size(50, 50), // 設定圖檔顯示大小
};

function GoogleMapRender({ selectedCity, spots }) {
	console.log(spots);
	const center = cityCoordinates[selectedCity] || taiwanCenter;
	return (
		<div>
			{/* 其他內容 */}
			<LoadScript
				googleMapsApiKey="AIzaSyAPOMZXMZfyOy1zrlETRf727BEzshgi2oM"
				libraries={libraries}
			>
				<GoogleMap
					mapContainerStyle={containerStyle}
					center={center}
					zoom={15}
					options={{ mapStyles }}
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
							// label={(index + 1).toString()}
							icon={customMarkerIcon}
						/>
					))}
				</GoogleMap>
			</LoadScript>
		</div>
	);
}

export default React.memo(GoogleMapRender);
