import { useRef } from "react";
import styles from "../Edit.module.scss";

const BtnUpload = ({ onFileUpload }) => {
	const fileInputRef = useRef(null);

	const handleButtonClick = () => {
		fileInputRef.current.click();
	};

	const handleInputChange = (event) => {
		const file = event.target.files[0];
		onFileUpload(file);
	};

	return (
		<div>
			<input
				type="file"
				ref={fileInputRef}
				style={{ display: "none" }} // 隱藏的檔案輸入元素
				onChange={handleInputChange}
			/>
			<button className={styles["btn-upload"]} onClick={handleButtonClick}>
				Edit Image
			</button>
		</div>
	);
};

export default BtnUpload;
