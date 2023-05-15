import { useState, useEffect } from "react";
import styles from "../Edit.module.scss";
import BtnUpload from "./BtnUpload";
import { baseUrl } from "../config";

const CardMainImage = ({ main_articleno, imageUrl }) => {
	const [selectedFile, setSelectedFile] = useState(null);

	// 讀取舊照片
	useEffect(() => {
		if (imageUrl) {
			setSelectedFile(baseUrl + imageUrl);
		}
	}, [imageUrl]);

	// 因為路徑都相同，所以加上時間戳記讓狀態改變
	const handleFileUpload = (updateImgUrl) => {
		const timestamp = Date.now(); // 獲取當前時間戳
		const imageUrl = `${updateImgUrl}?timestamp=${timestamp}`;
		setSelectedFile(imageUrl);
	};

	return (
		<div className={styles["edit-image-content"]}>
			<div
				style={{ backgroundImage: `url(${selectedFile})` }}
				className={styles["edit-image"]}
			>
				<BtnUpload
					main_articleno={main_articleno}
					onFileUpload={handleFileUpload}
				/>
			</div>
		</div>
	);
};

export default CardMainImage;
