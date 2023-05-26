import { useState, useEffect, useRef } from "react";
import { getValidationRegex } from "./hashtagValidation";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import EditNavbar from "./components/navbar/EditNavbar";
import CardMain from "./components/CardMain";
import CardContent from "./components/CardContent";
import GoogleMapRender from "./components/GoogleMapRender";
import axios from "axios";
import useSwaConfirm from "../../components/swaConfirm";
import useSwaAlert from "../../components/swaAlert";
import { baseUrl } from "./config";
import { compareData } from "./compareData";
import styles from "./Edit.module.scss";

//定義組件
const Edit = ({ currentUser, setCurrentUser, avatarImg }) => {
	// const thisUser = currentUser ? JSON.parse(currentUser) : null;
	// const { userno } = thisUser[0];
	// console.log(userno);
	// sweetAlert
	const swaConfirm = useSwaConfirm();
	const swaAlert = useSwaAlert();

	// history
	const history = useHistory();

	const { articleno } = useParams();
	const [oldData, setOldData] = useState(null);
	const [mainData, setMainData] = useState(null);
	const [hashtags, setHashtags] = useState(null);
	// const [strHashtags, setStrHashtags] = useState([null]);
	const [spots, setSpots] = useState([]);
	const [addCenter, setAddcenter] = useState(null);
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
	const articleID = articleno;

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
			swaAlert("沒有找到對應的文章", "", "error", 1500);
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
		console.log("update:", updatedSpots);
		setSpots(updatedSpots);
	};

	// 變更順序
	const handleChangSpotIndex = (updatedSpot) => {
		setSpots(updatedSpot);
	};

	// 新增地點
	const handleAddSpot = async () => {
		// console.log("articleno:" + mainData.main_articleno);
		const prevSpotsLength = spots.length; // 存儲 spots 的長度

		axios
			.post(`${baseUrl}/guide/content`, {
				main_articleno: mainData.main_articleno,
				location_index: prevSpotsLength, //這邊這樣有問題，先記錄 會有相同的location_index紀錄產生
			})
			.then((response) => {
				// 新增成功
				swaAlert("地點新增成功", "", "success", 1500);
				// 執行相應的更新操作
				const newSpot = response.data; // 從回傳的資料中取得新增的地點
				newSpot.location_index = prevSpotsLength + 1; // 設定 location_index
				// 從舊資料解構賦值
				setSpots((prevSpots) => [...prevSpots, newSpot]);
				console.log(spots);
				// 一併新增 olddata
				// setOldData({ ...oldData, spots: [...newSpot] });
			})
			.catch((error) => {
				// 新增失敗
				swaAlert("新增失敗:" + error, "", "error", 1500);
				console.error("新增失敗:", error);
			});
	};

	// 刪除地點
	const handleDeleteSpot = async (main_articleno, contentno) => {
		// console.log("articleno:" + main_articleno + ",contentno:" + contentno);
		// if (spots.length === 1) return alert("最少要保留一個地點");
		if (spots.length === 1)
			return swaAlert("最少要保留一個地點", "", "warning", 1500);
		swaConfirm("確定要刪除此地點嗎？", "", "warning", () => {
			axios
				.delete(`${baseUrl}/guide/content`, {
					data: {
						main_articleno: main_articleno,
						contentno: contentno,
					},
				})
				.then((response) => {
					// 刪除成功
					swaAlert("刪除成功", "", "success", 1500);
					// 執行相應的更新操作
					const updatedSpots = spots.filter(
						(spot) => spot.contentno !== contentno
					);

					// 重新計算 location_index
					const updatedSpotsWithIndex = updatedSpots.map((spot, index) => ({
						...spot,
						location_index: index + 1,
					}));

					// console.log("deleteSpot:", updatedSpots);
					setSpots(updatedSpotsWithIndex);
					// 一併刪除olddata的spots
					// setOldData({ ...oldData, spots: [...updatedSpots] });
				})
				.catch((error) => {
					// 刪除失敗
					swaAlert("刪除失敗:" + error, "", "error", 1500);
					// alert("刪除失敗");
				});
		});
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

	// 將更新資料整合並打包傳送
	const patchData = (data, saveType) => {
		axios
			.patch(`${baseUrl}/guide/`, data)
			.then((response) => {
				// 提交成功，執行相應的操作
				console.log("提交成功");
				swaAlert(saveType, "", "success", 1500, () => {
					history.push(`/view${mainData.main_articleno}`);
				});
				// 其他操作
			})
			.catch((error) => {
				// 提交失敗，處理錯誤
				console.error("提交失敗:", error);
				swaAlert("提交失敗:" + error, "", "error", 1500);
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
		// console.log("finaldata:", finalData);
		patchData(finalData, "草稿儲存成功");
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
		patchData(finalData, "文章發佈成功");
		// 解構賦值讓oldData也是更新後的資料
		setOldData({ ...updatedMainData });
		// fetchData();
	};

	// 刪除文章
	const handleDeleteAll = () => {
		console.log(mainData.main_articleno);
		swaConfirm("刪除文章", "確定要刪除這篇文章嗎？", "warning", () => {
			axios
				.delete(`${baseUrl}/guide/`, {
					data: { main_articleno: mainData.main_articleno },
				})
				.then((response) => {
					// 刪除成功
					swaAlert("刪除成功", "", "success", 1500, () => {
						history.push(`/client/Myarticles`);
					});
					// alert("刪除成功");
				})
				.catch((error) => {
					// 刪除失敗
					swaAlert("刪除失敗:" + error, "", "error", 1500);
					// alert("刪除失敗");
				});
		});
	};

	// 點新增圖標時將 center 移動到選擇的地點
	const handleSetCenter = (center) => {
		setAddcenter(center);
	};

	return (
		<>
			<EditNavbar
				onAddSpot={handleAddSpot}
				onSaveDraft={handleSaveToDraft}
				onSaveShow={handleSaveToShow}
				onDeleteAll={handleDeleteAll}
				avatarImg={avatarImg}
				currentUser={currentUser}
				setCurrentUser={setCurrentUser}
				history={history}
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
										onSetCenter={handleSetCenter}
										onChangeSpotIndex={handleChangSpotIndex}
									/>
								</div>
							</div>
						</div>
						<div className="col-lg-8">
							<div className={styles["googlemap"]}>
								<GoogleMapRender
									selectedCity={mainData.main_location}
									spots={spots}
									addCenter={addCenter}
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
