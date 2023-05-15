import { useState, useEffect } from "react";
import { getValidationRegex } from "./hashtagValidation";
import EditNavbar from "./components/navbar/EditNavbar";
import CardMain from "./components/CardMain";
import CardContent from "./components/CardContent";
import axios from "axios";
import styles from "./Edit.module.scss";
import "bootstrap/dist/js/bootstrap.bundle";

//定義組件
const Edit = () => {
	const [mainData, setMainData] = useState(null);
	const [hashtags, setHashtags] = useState(null);
	const [spots, setSpots] = useState([]);
	// console.log(spots);
	// console.log(hashtags);
	useEffect(() => {
		// 在組件加載時從後端獲取資料
		fetchData();
	}, []);

	// useEffect(() => {
	// 	console.log(mainArticle);
	// }, [mainArticle]);
	//39 2
	const articleID = 2;

	const fetchData = async () => {
		try {
			const response = await axios.get(
				`http://localhost:8000/guide/${articleID}`
			);
			const {
				main_articleno,
				main_title,
				main_content,
				main_location,
				main_image,
				hashtags,
				spots,
			} = response.data;

			setMainData({
				main_articleno,
				main_title,
				main_content,
				main_location,
				main_image,
			});
			// setHashtags([...hashtags]);
			setHashtags([hashtags.join(" ")]);
			setSpots([...spots]);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	// 定義處理變更的函數
	const handleMainDataChange = (field, value) => {
		setMainData((prevArticle) => ({
			...prevArticle,
			[field]: value,
		}));
	};

	const getHashtags = (text) => {
		// const text = "#在地美食 #基隆 #文化探索 #深度旅遊";
		const pattern = getValidationRegex();
		const regex = new RegExp(pattern, "ig");
		// let regex = /(^|\B)#(?![0-9_]+\b)([\w\u4e00-\u9fa5]+)/g;

		if (regex.test(text)) {
			return text.match(regex);
		}
	};

	const handleHashtagsChange = (updatedHashtags) => {
		// console.log(updatedHashtags);
		// let regex = getValidationRegex();
		const hashtags = getHashtags(updatedHashtags);

		// setHashtags(updatedHashtags);
		setHashtags(hashtags);
	};

	// 更改地點
	const handleSpotChange = (contentno, updatedSpot) => {
		const updatedSpots = spots.map((spot) => {
			if (spot.contentno === contentno) {
				return updatedSpot;
			}
			return spot;
		});
		setSpots(updatedSpots);
	};

	return (
		<>
			<EditNavbar />
			<div className={`container-fluid ${styles["edit-container"]}`}>
				{mainData && hashtags && spots ? (
					<div className="row">
						<div className="col-lg-4">
							<div className={styles["edit-card-container"]}>
								<CardMain
									mainData={mainData}
									onMainDataChange={handleMainDataChange}
									hashtags={hashtags}
									onHashTagChange={handleHashtagsChange}
								/>
								<CardContent
									main_articleno={mainData.main_articleno}
									spots={spots}
									onSpotChange={handleSpotChange}
								/>
							</div>
						</div>
						<div className="col-lg-8">
							<div
								style={{
									width: "100%",
									height: "100vh",
									backgroundColor: "black",
								}}
							></div>
						</div>
					</div>
				) : (
					<div className={styles["loader"]}>
						<div className={styles["lds-ellipsis"]}>
							<div></div>
							<div></div>
							<div></div>
							<div></div>
						</div>
					</div>
				)}
			</div>
		</>
	);
};

//輸出組件
export default Edit;
