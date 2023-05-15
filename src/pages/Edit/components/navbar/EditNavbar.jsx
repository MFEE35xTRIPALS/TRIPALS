import styles from "./EditNavbar.module.scss";

const EditNavbar = ({ onAddSpot, onSaveDraft, onSaveShow }) => {
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
					<button type="button" className={`btn ${styles["edit-delete-btn"]}`}>
						刪除文章
					</button>
					<div className={styles["image-box"]}>
						<img
							className={styles["edit-user-image"]}
							src="./image/user.png"
							alt="UserImage"
						/>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default EditNavbar;
