import { BrowserRouter, Route, Switch, Routes } from "react-router-dom";
import { useState } from "react";

// bootstrap
import "bootstrap/dist/js/bootstrap.bundle";

//Herry
import Home from "./components/Home";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
// YuTing
import Destination from "./components/Destination";
import Login from "./components/Login";
import Register from "./components/Register";
// Tina
import Guides from "./components/Guides";
import Admin from "./components/Admin";
import Register_test from "./components/Register_test.jsx";
// Xin
import Selfpage from "./components/Selfpage";
import Client from "./components/Client";
// YuKang
import ViewArticle from "./components/ViewArticle";
// Jerry
import Edit from "./pages/Edit/Edit";

import Error from "./components/Error";

// Google Map Script
import { useLoadScript } from "@react-google-maps/api";
const libraries = ["places"];

function App() {
	let [currentUser, setCurrentUser] = useState(localStorage.getItem("user"));
	console.log(localStorage.getItem("user"));
	// currentUser裡是這個[{userno: 12, permission: 1, avatar: "/useravatar/12.png"}]
	let [avatarImg, setavatarImg] = useState(
		currentUser
			? JSON.parse(currentUser)[0].avatar
				? "http://localhost:8000" + JSON.parse(currentUser)[0].avatar
				: "http://localhost:8000/useravatar/pre.png"
			: ""
	);

	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: "AIzaSyAPOMZXMZfyOy1zrlETRf727BEzshgi2oM",
		libraries: libraries,
	});

	if (!isLoaded) {
		return (
			<div className="loader">
				<div className="lds-ellipsis">
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
			</div>
		);
	}

	if (loadError) {
		return <div>載入地圖時發生錯誤</div>;
	}

	return (
		<BrowserRouter>
			<div>
				<Navigation
					avatarImg={avatarImg}
					currentUser={currentUser}
					setCurrentUser={setCurrentUser}
				/>

				<Switch>
					<Route
						path="/"
						render={() => (
							<Home>
								<Navigation
									avatarImg={avatarImg}
									currentUser={currentUser}
									setCurrentUser={setCurrentUser}
								/>
							</Home>
						)}
						exact
					/>
					<Route
						path="/register"
						render={() => (
							<Register>
								<Navigation
									avatarImg={avatarImg}
									currentUser={currentUser}
									setCurrentUser={setCurrentUser}
								/>
							</Register>
						)}
					/>
					<Route
						path="/registertest"
						render={() => (
							<Register_test>
								<Navigation
									avatarImg={avatarImg}
									currentUser={currentUser}
									setCurrentUser={setCurrentUser}
								/>
							</Register_test>
						)}
					/>
					<Route
						path="/login"
						render={(props) => (
							<Login
								{...props}
								setCurrentUser={setCurrentUser}
								setavatarImg={setavatarImg}
								currentUser={currentUser}
							>
								<Navigation
									avatarImg={avatarImg}
									currentUser={currentUser}
									setCurrentUser={setCurrentUser}
								/>
							</Login>
						)}
					/>
					<Route
						path="/guides"
						render={(props) => (
							<Guides
								{...props}
								currentUser={currentUser}
								setCurrentUser={setCurrentUser}
							>
								<Navigation
									avatarImg={avatarImg}
									currentUser={currentUser}
									setCurrentUser={setCurrentUser}
								/>
							</Guides>
						)}
					/>
					<Route
						path="/destination"
						render={(props) => (
							<Destination>
								<Navigation
									avatarImg={avatarImg}
									currentUser={currentUser}
									setCurrentUser={setCurrentUser}
								/>
							</Destination>
						)}
						component={Destination}
					/>
					<Route
						path="/selfpage:authorno"
						render={(props) => (
							<Selfpage
								{...props}
								currentUser={currentUser}
								setCurrentUser={setCurrentUser}
							>
								<Navigation
									avatarImg={avatarImg}
									currentUser={currentUser}
									setCurrentUser={setCurrentUser}
								/>
							</Selfpage>
						)}
					/>
					<Route
						path="/view:articleno"
						render={(props) => (
							<ViewArticle
								{...props}
								currentUser={currentUser}
								setCurrentUser={setCurrentUser}
							>
								<Navigation
									avatarImg={avatarImg}
									currentUser={currentUser}
									setCurrentUser={setCurrentUser}
								/>
							</ViewArticle>
						)}
					/>
					<Route
						path="/admin"
						render={(props) => (
							<Admin
								{...props}
								currentUser={currentUser}
								setCurrentUser={setCurrentUser}
							>
								<Navigation
									avatarImg={avatarImg}
									currentUser={currentUser}
									setCurrentUser={setCurrentUser}
								/>
							</Admin>
						)}
					/>
					<Route
						path="/client"
						render={(props) => (
							<Client
								{...props}
								currentUser={currentUser}
								setCurrentUser={setCurrentUser}
								setavatarImg={setavatarImg}
							>
								<Navigation
									avatarImg={avatarImg}
									currentUser={currentUser}
									setCurrentUser={setCurrentUser}
								/>
							</Client>
						)}
					/>
					<Route
						path="/edit/:articleno"
						render={(props) => (
							<Edit
								{...props}
								avatarImg={avatarImg}
								currentUser={currentUser}
								setCurrentUser={setCurrentUser}
							/>
						)}
					/>
					<Route component={Error} />
				</Switch>
				<Footer />
			</div>
		</BrowserRouter>
	);
}

export default App;
