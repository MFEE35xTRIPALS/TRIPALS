import styles from "./EditNavbar.module.scss";


const EditNavbar = ({
	currentUser,
	setCurrentUser,
	avatarImg,
	onAddSpot,
	onSaveDraft,
	onSaveShow,
	onDeleteAll,
	history
}) => {
	const logout = () => {
		localStorage.removeItem("user");
		setCurrentUser(null);
	};
	return (
		<nav className={`navbar fixed-top ${styles["edit-bar"]}`}>
			<div className="container-fluid justify-space-between">
				<div className="d-flex">
					<button
						type="button"
						className={`btn ${styles["edit-add-location-btn"]}`}
						onClick={onAddSpot}
					>
						新增地點
					</button>
				</div>
				<div className="d-flex">
					<button
						type="button"
						className={`btn ${styles["edit-draft-btn"]}`}
						onClick={onSaveDraft}
					>
						儲存草稿
					</button>
					<button
						type="button"
						className={`btn ${styles["edit-show-btn"]}`}
						onClick={onSaveShow}
					>
						發佈文章
					</button>
					<button
						type="button"
						className={`btn ${styles["edit-delete-btn"]}`}
						onClick={onDeleteAll}
					>
						刪除文章
					</button>
					{currentUser && (
						<div className="dropdown me-auto position-relative">
							<button
								className={`btn dropdown-toggle border-0 ${styles["edit-dropdown-toggle"]}`}
								type="button"
								data-bs-toggle="dropdown"
								aria-expanded="false"
							>
								<div className={styles["image-box"]}>
									<img
										className={styles["edit-user-image"]}
										src={
											avatarImg ||
											"https://pbs.twimg.com/media/FF2jh3VWUAQFCo4?format=jpg&name=4096x4096"
										}
										alt="UserImage"
									/>
								</div>
							</button>
							<ul className={`dropdown-menu ${styles["edit-dropdown-menu"]}`}>
								<li>
									<a
										className={`dropdown-item ${styles["edit-dropdown-item"]}`}
										href="/"
									>
										<i className="fa-solid fa-home"></i>首頁
									</a>
								</li>
								{JSON.parse(currentUser)[0].permission === 1 && (
									<div>
										<li>
											<a
												className={`dropdown-item ${styles["edit-dropdown-item"]}`}
												href="#" onClick={() => { history.push("/client") }}
											>
												<i className="fa-solid fa-user"></i>個人資料
											</a>
										</li>
										<li>
											<a
												className={`dropdown-item ${styles["edit-dropdown-item"]}`}
												href="#" onClick={() => { history.push("/client/Mylikes") }}
											>
												<i className="fa-solid fa-heart"></i>我的收藏
											</a>
										</li>
										<li>
											<a
												className={`dropdown-item ${styles["edit-dropdown-item"]}`}
												href="#" onClick={() => { history.push("/client/Myarticles") }}
											>
												<i className="fa-solid fa-pen-to-square"></i>我的文章
											</a>
										</li>
									</div>
								)}
								{JSON.parse(currentUser)[0].permission === 0 && (
									<li>
										<a
											className={`dropdown-item ${styles["edit-dropdown-item"]}`}
											href="/admin"
										>
											<i className="fa-solid fa-pen-to-square"></i>管理員後台
										</a>
									</li>
								)}
								<li>
									<a
										className={`dropdown-item ${styles["edit-dropdown-item"]}`}
										onClick={logout}
										href="/"
									>
										登出
									</a>
								</li>
							</ul>
						</div>
					)}
					{/* <div className={styles["image-box"]}>
						<img
							className={styles["edit-user-image"]}
							src={
								avatarImg ||
								"https://pbs.twimg.com/media/FF2jh3VWUAQFCo4?format=jpg&name=4096x4096"
							}
							alt="UserImage"
						/>
					</div> */}
				</div>
			</div>
		</nav>
	);
};

export default EditNavbar;
