import { useState, useEffect } from "react";
import "./CSS/HenryStyle/hamburgers.css";
import axios from "axios";
import { baseUrl } from "../assets/config";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import useSwaAlert from "../components/swaAlert";

const Navigation = ({ currentUser, setCurrentUser, avatarImg, setavatarImg }) => {
	setTimeout(() => {
		localStorage.removeItem("user");
	}, 60 * 60 * 1000);
	// console.log(avatarImg)

	const history = useHistory();
	const swaAlert = useSwaAlert();
	const url = 'http://localhost:8000';

	useEffect(() => {
		const handleNavMouseOver = (event) => {
			event.target.textContent = event.target.getAttribute("data-zh");
		};

		const handleNavMouseOut = (event) => {
			event.target.textContent = event.target.getAttribute("data-en");
		};

		// const handleScroll = () => {
		// 	const navLinks = document.querySelectorAll(".navWord");
		// 	const scrollY = window.scrollY;

		// 	if (scrollY > 900 && scrollY < 3400) {
		// 		navLinks.forEach((link) => {
		// 			link.style.color = "#578F52";
		// 		});
		// 	} else {
		// 		navLinks.forEach((link) => {
		// 			link.style.color = "#ffffff";
		// 		});
		// 	}
		// };

		const handleHamburgerClick = () => {
			const hamburger = document.querySelector(".hamburger");
			hamburger.classList.toggle("is-active");
		};

		const handleNavLinkClick = () => {
			const navContent = document.querySelector("#navbarContent");
			const navToggler = document.querySelector(".navbar-toggler");
			if (navContent.classList.contains("show")) {
				navContent.classList.remove("show");
			}
			if (navToggler.classList.contains("is-active")) {
				navToggler.classList.remove("is-active");
			}
		};

		const navItems = document.querySelectorAll("ul a[data-en]");
		navItems.forEach((item) => {
			item.addEventListener("mouseover", handleNavMouseOver);
			item.addEventListener("mouseout", handleNavMouseOut);
		});

		// window.addEventListener("scroll", handleScroll);

		const hamburger = document.querySelector(".hamburger");
		if (hamburger) {
			hamburger.addEventListener("click", handleHamburgerClick);
		}

		const navToggles = document.querySelectorAll(".nav-link");
		navToggles.forEach((element) => {
			element.addEventListener("click", handleNavLinkClick);
		});
		// const logout = () => {
		// 	localStorage.removeItem("user");
		// 	setCurrentUser(null);
		// };


		return () => {
			navItems.forEach((item) => {
				item.removeEventListener("mouseover", handleNavMouseOver);
				item.removeEventListener("mouseout", handleNavMouseOut);
			});
			// window.removeEventListener("scroll", handleScroll);
			if (hamburger) {
				hamburger.removeEventListener("click", handleHamburgerClick);
			}
			navToggles.forEach((element) => {
				element.removeEventListener("click", handleNavLinkClick);
			});
		};

	}, []);
	const logout = () => {
		// swaAlert('您已登出，歡迎再次登入使用', '', '', 2000);
		localStorage.removeItem("user");
		setCurrentUser(null);
		history.push('/login/else')
	};

	useEffect(() => {
		if (currentUser) {
			async function nav() {
				let result = await axios.get('http://localhost:8000/nav', {
					params: { userno: JSON.parse(currentUser)[0].userno }
				})
				// console.log(result.data.avatar)
				setavatarImg(result.data.avatar ? (url + result.data.avatar + "?temp=" + Math.random()) : url + "/useravatar/pre.png")

			}

			nav();
		}

	}, [])
	// 暫時寫法
	const handleWriteClick = async (e) => {
		e.preventDefault();
		const flag = redirectLogin();

		if (flag) {
			axios
				.post(`${baseUrl}/guide/`, {
					userno: JSON.parse(currentUser)[0].userno,
				})
				.then((response) => {
					console.log("新增文章");
					// window.location = `/edit/${response.data.main_articleno}`;
					history.push(`/edit/${response.data.main_articleno}`);
				})
				.catch((error) => {
					// 新增失敗
					alert("新增失敗");
					console.error("新增失敗:", error);
				});
		}
	};

	// 暫時寫法
	const redirectLogin = () => {
		// console.log(currentUser);
		if (!currentUser) {
			// console.log("沒登入");
			// window.location = "/login";
			history.push(`/login/write`);
			return false;
		} else {
			return true;
		}
	};

	return (
		<header className="fixed-top" id="headerNav">
			<nav className="navbar navbar-expand-lg navbar-light">
				<div className="container-fluid">
					<button
						className="navbar-toggler border-0 hamburger hamburger--squeeze"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarSupportedContent"
						aria-controls="navbarSupportedContent"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="hamburger-box">
							<span className="hamburger-inner"></span>
						</span>
					</button>
					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="navbar-nav me-auto mb-2 mb-lg-0">
							<li className="nav-item">
								<a
									className="navWord"
									href="#"
									onClick={() => { history.push("/guides") }}
									data-en="GUIDE"
									data-zh="旅遊導覽"
								>
									GUIDE
								</a>
							</li>
							<li className="nav-item">
								<a
									className="navWord"
									href="#"
									data-en="WRITE"
									data-zh="寫文章"
									onClick={handleWriteClick}
									style={{ cursor: "pointer" }}
								>
									WRITE
								</a>
							</li>
							<li className="nav-item">
								<a
									className="navWord"
									href="#"
									onClick={() => { history.push("/destination") }}
									data-en="DESTINATIONS"
									data-zh="目的地"
								>
									DESTINATIONS
								</a>
							</li>
						</ul>
					</div>
					{!currentUser && (
						<div className="d-flex ms-auto">
							<a className="navWord" id="house" href="/">
								<i className="fa-solid fa-house"></i>
							</a>

							<button
								onClick={() => {
									history.push("/register")
									// window.location = "/register";
								}}
								className="btn  logInBtn"
							>
								SIGN UP
							</button>
							<button
								onClick={() => {
									history.push("/login/else")
									// window.location = "/login";
								}}
								className="btn  logInBtn"
							>
								LOG IN
							</button>
						</div>
					)}
					{currentUser && (
						<div className="dropdown me-auto">
							<button
								className="btn dropdown-toggle border-0"
								type="button"
								data-bs-toggle="dropdown"
								aria-expanded="false"
							>
								<div className="userImage rounded-circle">
									{avatarImg && <img className="avatar" src={avatarImg} alt="UserImage" />}
								</div>
							</button>
							<ul className="dropdown-menu">
								<li>
									<a className="dropdown-item" href="/">
										<i className="fa-solid fa-home"></i>首頁
									</a>
								</li>
								{JSON.parse(currentUser)[0].permission === 1 && (
									<div>
										<li>
											<a className="dropdown-item" href="#" onClick={() => { history.push("/client") }}>
												<i className="fa-solid fa-user"></i>個人資料
											</a>
										</li>
										<li>
											<a className="dropdown-item" href="#" onClick={() => { history.push("/client/Mylikes") }}>
												<i className="fa-solid fa-heart"></i>我的收藏
											</a>
										</li>
										<li>
											<a className="dropdown-item" href="#" onClick={() => { history.push("/client/Myarticles") }}>
												<i className="fa-solid fa-pen-to-square"></i>我的文章
											</a>
										</li>
									</div>
								)}
								{JSON.parse(currentUser)[0].permission === 0 && (
									<li>
										<a className="dropdown-item" href="#" onClick={() => { history.push("/admin") }} >
											<i className="fa-solid fa-pen-to-square"></i>管理員後台
										</a>
									</li>
								)}
								<li>
									<a className="dropdown-item" onClick={logout} href="">
										登出
									</a>
								</li>
							</ul>
						</div>
					)}
				</div>
			</nav>
		</header>
	);
};

export default Navigation;
