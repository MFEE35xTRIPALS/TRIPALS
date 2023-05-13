import styles from "../Edit.module.scss";

const CardImage = () => {
	return (
		<div className={styles["edit-image-content"]}>
			<div className={styles["edit-image"]}>
				<button className={styles["btn-upload"]}>Edit Image</button>
			</div>
		</div>
	);
};

export default CardImage;
