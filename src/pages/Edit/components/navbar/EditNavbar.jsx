import styles from "./EditNavbar.module.scss";

const EditNavbar = () => {
	return (
		<nav className={`navbar ${styles["edit-bar"]}`}>
			<div className="container-fluid justify-content-end">
				<div className="d-flex">
					<button type="button" className={`btn ${styles["edit-draft-btn"]}`}>
						儲存草稿
					</button>
					<button type="button" className={`btn ${styles["edit-show-btn"]}`}>
						發佈文章
					</button>
					<button type="button" className={`btn ${styles["edit-delete-btn"]}`}>
						刪除文章
					</button>
				</div>
				<div className={styles["image-box"]}>
					<img
						className={styles["edit-user-image"]}
						src="./image/user.png"
						alt="UserImage"
					/>
				</div>
			</div>
		</nav>
	);
};

export default EditNavbar;
