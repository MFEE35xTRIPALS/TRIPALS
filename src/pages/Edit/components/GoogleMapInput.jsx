import styles from "../Edit.module.scss";
import React, { useState } from "react";
import { Autocomplete, useLoadScript } from "@react-google-maps/api";
const placesLibrary = ["places"];

function GoogleMapInput() {
	const [searchResult, setSearchResult] = useState("Result: none");

	const { isLoaded } = useLoadScript({
		googleMapsApiKey: "AIzaSyAPOMZXMZfyOy1zrlETRf727BEzshgi2oM",
		libraries: placesLibrary,
	});

	function onLoad(autocomplete) {
		setSearchResult(autocomplete);
	}

	function onPlaceChanged() {
		if (searchResult != null) {
			const place = searchResult.getPlace();
			const name = place.name;
			const status = place.business_status;
			const formattedAddress = place.formatted_address;
			console.log(place);
			console.log(`Name: ${name}`);
			console.log(`Business Status: ${status}`);
			console.log(`Formatted Address: ${formattedAddress}`);
		} else {
			alert("Please enter text");
		}
	}

	if (!isLoaded) {
		return <div>Loading...</div>;
	}

	return (
		<Autocomplete
			className={styles["content-info-gmap"]}
			onPlaceChanged={onPlaceChanged}
			onLoad={onLoad}
		>
			<input type="text" placeholder="請輸入地址或景點名稱" />
		</Autocomplete>
	);
}

export default GoogleMapInput;
