import { useRef } from "react";
import styles from "../Edit.module.scss";
import axios from "axios";
import { baseUrl } from "../config";

const BtnUpload = ({ main_articleno, contentno, onFileUpload }) => {
	const fileInputRef = useRef(null);

	const handleButtonClick = () => {
		fileInputRef.current.click();
	};

	// 驗證圖片格式
	const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];

	const handleInputChange = async (event) => {
		let uploadUrl = baseUrl;
		// console.log("main:" + main_articleno + ",contentno:" + contentno);
		const file = event.target.files[0];

		// 驗證檔案類型
		if (!allowedFileTypes.includes(file.type)) {
			alert("只能上傳 jpeg、jpg 或 png 格式的圖片");
			return;
		}

		const formData = new FormData();

		if (main_articleno && contentno) {
			console.log("main:" + main_articleno + ",contentno:" + contentno);
			uploadUrl += "/guide/upload/content";
			formData.append("main_articleno", main_articleno);
			formData.append("contentno", contentno);
			formData.append("contentImage", file);
		} else {
			console.log("main:" + main_articleno);
			uploadUrl += "/guide/upload/main";
			formData.append("main_articleno", main_articleno);
			formData.append("mainImage", file);
		}

		// 添加其他內容到 formData，例如 main_articleno 和 contentno

		try {
			const response = await axios.post(uploadUrl, formData);
			const imagePath = response.data.path; // 假設回應中包含圖片路徑的屬性為 "path"
			onFileUpload(imagePath);
			// alert("上傳成功");
		} catch (error) {
			// console.error("圖片上傳失敗：", error);
			alert("上傳失敗");
		}
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
