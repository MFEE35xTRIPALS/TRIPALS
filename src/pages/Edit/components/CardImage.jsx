import { useState } from "react";
import styles from "../Edit.module.scss";
import BtnUpload from "./BtnUpload";

const CardImage = () => {
	const [selectedFile, setSelectedFile] = useState(null);
	const handleFileUpload = (file) => {
		const blobURL = URL.createObjectURL(file);
		setSelectedFile(blobURL);
	};
	return (
		<div className={styles["edit-image-content"]}>
			<div
				style={{ backgroundImage: `url(${selectedFile})` }}
				className={styles["edit-image"]}
			>
				<BtnUpload onFileUpload={handleFileUpload} />
			</div>
		</div>
	);
};

export default CardImage;
