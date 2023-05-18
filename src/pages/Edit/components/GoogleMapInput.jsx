import styles from "../Edit.module.scss";
import React, { useState } from "react";
import { Autocomplete } from "@react-google-maps/api";
// const placesLibrary = ["places"];

const GoogleMapInput = ({ spot, onAddressNameChange, onSetCenter }) => {
	const [searchResult, setSearchResult] = useState(null);
	// 先讓使用者能輸入文字
	const [inputValue, setInputValue] = useState(spot.location_name || "");

	// const { isLoaded } = useLoadScript({
	// 	googleMapsApiKey: "AIzaSyAPOMZXMZfyOy1zrlETRf727BEzshgi2oM",
	// 	libraries: placesLibrary,
	// });

	const onLoad = (autocomplete) => {
		setSearchResult(autocomplete);
	};

	const onPlaceChanged = () => {
		if (searchResult != null) {
			const place = searchResult.getPlace();
			const name = place.name;
			setInputValue(name);
			// const status = place.business_status;
			// const formattedAddress = place.formatted_address;
			// console.log(place);
			// console.log(`Name: ${name}`);
			// console.log(`Business Status: ${status}`);
			// console.log(`Formatted Address: ${formattedAddress}`);
			const updatedAddress = { ...spot, location_name: name };
			// console.log("updatedAddress", updatedAddress);
			onAddressNameChange(updatedAddress);
		} else {
			alert("Please enter text");
		}
	};

	const handleAddressClick = () => {
		// console.log("input:" + inputValue);
		// console.log("searchResult:", searchResult);
		// if (inputValue) return;
		if (searchResult.getPlace()) {
			// console.log("click", searchResult);
			const place = searchResult.getPlace();
			const { lat, lng } = place.geometry.location;
			const address = lat().toString() + "," + lng().toString();
			console.log(address);
			// console.log("經度：", lat());
			// console.log("緯度：", lng());
			const updatedAddress = { ...spot, location: address };
			// 更新地址與經緯度
			onAddressNameChange(updatedAddress);
			// 更新新增圖標的 center
			onSetCenter({ lat: lat(), lng: lng() });
		}
	};

	const handleInputChange = (event) => {
		setInputValue(event.target.value);
	};

	return (
		<>
			<Autocomplete
				className={styles["content-info-gmap"]}
				onPlaceChanged={onPlaceChanged}
				onLoad={onLoad}
				options={{ componentRestrictions: { country: "tw" } }}
				// getOptionLabel={getOptionLabel}
			>
				<input
					type="text"
					placeholder="輸入地址或地點名稱"
					value={inputValue}
					onChange={handleInputChange}
				/>
			</Autocomplete>
			<button
				onClick={handleAddressClick}
				className={`btn ${styles["edit-add-location-btn"]}`}
			>
				新增圖標
			</button>
		</>
	);
};

export default GoogleMapInput;
