import Edit from "./pages/Edit/Edit";
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
			<Edit />
		</div>
	);
}

export default App;
