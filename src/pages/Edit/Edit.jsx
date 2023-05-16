import { useState, useEffect } from "react";
import { getValidationRegex } from "./hashtagValidation";
import EditNavbar from "./components/navbar/EditNavbar";
import CardMain from "./components/CardMain";
import CardContent from "./components/CardContent";
import GoogleMapRender from "./components/GoogleMapRender";
import axios from "axios";
import { baseUrl } from "./config";
import { compareData } from "./compareData";
import styles from "./Edit.module.scss";
import "bootstrap/dist/js/bootstrap.bundle";

//定義組件
const Edit = () => {
	const [oldData, setOldData] = useState(null);
	const [mainData, setMainData] = useState(null);
	const [hashtags, setHashtags] = useState(null);
	// const [strHashtags, setStrHashtags] = useState([null]);
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
	const articleID = 38;

	const fetchData = async () => {
		try {
			const response = await axios.get(`${baseUrl}/guide/${articleID}`);

			const {
				main_articleno,
				main_title,
				main_content,
				main_location,
				main_image,
				main_status,
				hashtags,
				spots,
			} = response.data;

			setMainData({
				main_articleno,
				main_title,
				main_content,
				main_location,
				main_image,
				main_status,
				hashtags,
			});

			//將收回來的hashtag先轉換為字串
			setHashtags(hashtags.join(" "));
			// setHashtags([...hashtags]);

			setSpots([...spots]);

			// 先保留原始資料
			setOldData({ ...response.data });
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

	const handleStrHashtagsChange = (updatedHashtags) => {
		setHashtags(updatedHashtags);
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

	// 新增地點
	const handleAddSpot = async () => {
		console.log("articleno:" + mainData.main_articleno);

		axios
			.post(`${baseUrl}/guide/content`, {
				main_articleno: mainData.main_articleno,
			})
			.then((response) => {
				// 新增成功
				alert("新增成功");
				// 執行相應的更新操作
				const newSpot = response.data; // 從回傳的資料中取得新增的地點
				// 從舊資料解構賦值
				setSpots((prevSpots) => [...prevSpots, newSpot]);
				// 一併新增 olddata
				// setOldData({ ...oldData, spots: [...newSpot] });
			})
			.catch((error) => {
				// 新增失敗
				alert("新增失敗");
				console.error("Error adding spot:", error);
			});
	};

	// 刪除地點
	const handleDeleteSpot = async (main_articleno, contentno) => {
		console.log("articleno:" + main_articleno + ",contentno:" + contentno);
		const confirmDelete = window.confirm("確定要刪除此地點嗎？");
		if (confirmDelete) {
			// 發送刪除請求
			axios
				.delete(`${baseUrl}/guide/content`, {
					data: {
						main_articleno: main_articleno,
						contentno: contentno,
					},
				})
				.then((response) => {
					// 刪除成功
					alert("刪除成功");
					// 執行相應的更新操作
					const updatedSpots = spots.filter(
						(spot) => spot.contentno !== contentno
					);
					setSpots(updatedSpots);
					// 一併刪除olddata的spots
					setOldData({ ...oldData, spots: [...updatedSpots] });
				})
				.catch((error) => {
					// 刪除失敗
					alert("刪除失敗");
					console.error("Error deleting spot:", error);
				});
		}
	};

	// hashtag regex from facebook
	const getHashtags = (text) => {
		// const text = "#在地美食 #基隆 #文化探索 #深度旅遊";
		const pattern = getValidationRegex();
		const regex = new RegExp(pattern, "ig");
		// let regex = /(^|\B)#(?![0-9_]+\b)([\w\u4e00-\u9fa5]+)/g;

		const matches = text.match(regex);

		if (matches) {
			return matches;
		}

		return [];
	};

	// 資料整合並打包傳送
	const patchData = (data) => {
		axios
			.patch(`${baseUrl}/guide/`, data)
			.then((response) => {
				// 提交成功，執行相應的操作
				console.log("提交成功");
				// 其他操作
			})
			.catch((error) => {
				// 提交失敗，處理錯誤
				console.error("提交失敗:", error);
				// 其他操作
			});
	};

	// 儲存草稿
	const handleSaveToDraft = async () => {
		// const newData = await setMainData((prevArticle) => ({
		// 	...prevArticle,
		// 	main_status: "draft",
		// }));
		const hashtagsArray = getHashtags(hashtags).map((match) => match.trim());
		const updatedMainData = {
			...mainData,
			main_status: "draft",
			hashtags: hashtagsArray,
			spots: spots,
		};
		setMainData(updatedMainData);
		// console.log("olddata:", oldData);
		// console.log("newdata:", updatedMainData);
		const finalData = compareData(oldData, updatedMainData);
		patchData(finalData);
		// 解構賦值讓oldData也是更新後的資料
		setOldData({ ...updatedMainData });
		// fetchData();
	};

	// 發布文章
	const handleSaveToShow = () => {
		const hashtagsArray = getHashtags(hashtags).map((match) => match.trim());
		const updatedMainData = {
			...mainData,
			main_status: "show",
			hashtags: hashtagsArray,
			spots: spots,
		};
		setMainData(updatedMainData);
		// console.log("olddata:", oldData);
		// console.log("newdata:", updatedMainData);
		const finalData = compareData(oldData, updatedMainData);
		// console.log("finaldata:", finalData);
		patchData(finalData);
		// 解構賦值讓oldData也是更新後的資料
		setOldData({ ...updatedMainData });
		// fetchData();
	};

	// 刪除文章

	return (
		<>
			<EditNavbar
				onAddSpot={handleAddSpot}
				onSaveDraft={handleSaveToDraft}
				onSaveShow={handleSaveToShow}
			/>
			<div className={`container-fluid ${styles["edit-container"]}`}>
				{/* hashtag 有可能是 [] 空陣列 */}
				{mainData && spots ? (
					<div className="row">
						<div className="col-lg-4">
							<div className={styles["edit-card-wrapper"]}>
								<div className={styles["edit-card-container"]}>
									<CardMain
										mainData={mainData}
										onMainDataChange={handleMainDataChange}
										hashtags={hashtags}
										onHashTagChange={handleStrHashtagsChange}
									/>
									<CardContent
										main_articleno={mainData.main_articleno}
										spots={spots}
										onSpotChange={handleSpotChange}
										onDeleteSpot={handleDeleteSpot}
									/>
								</div>
							</div>
						</div>
						<div className="col-lg-8">
							<div>
								<GoogleMapRender
									selectedCity={mainData.main_location}
									spots={spots}
								/>
							</div>

							{/* <div
								style={{
									width: "100%",
									height: "100vh",
									backgroundColor: "black",
								}}
							></div> */}
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
