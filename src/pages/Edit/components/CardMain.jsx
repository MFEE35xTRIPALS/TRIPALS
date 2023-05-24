import styles from "../Edit.module.scss";
// import { getValidationRegex } from "./hashtagValidation";
import CardMainImage from "./CardMainImage";
import MainInfoContent from "./MainInfoContent";

const CardMain = ({
	mainData,
	hashtags,
	onMainDataChange,
	onHashTagChange,
}) => {
	// console.log(hashtags);
	const handleTitleChange = (event) => {
		const newTitle = event.target.value;
		onMainDataChange("main_title", newTitle);
	};

	const handleLocationChange = (event) => {
		const newLocation = event.target.value;
		onMainDataChange("main_location", newLocation);
	};

	const handleHashTagChange = (event) => {
		const newStrHashtag = event.target.value;
		onHashTagChange(newStrHashtag);

		// onHashTagChange(hashtagsArray);
	};

	// const strHashtag = hashtags.join(" ");

	return (
		<div className={`${styles["edit-card-main"]}`}>
			<div className="accordion accordion-flush" id="accordionMain">
				<div className={`accordion-item ${styles["accordion-item-color"]}`}>
					<h2 className="accordion-header" id="panelsStayOpen-headingOne">
						<button
							className={`accordion-button collapse show ${styles["edit-accordion-btn"]}`}
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#card-title"
							aria-expanded="true"
							aria-controls="card-title"
						>
							<span
								className={styles["edit-status"]}
								style={{
									backgroundColor:
										mainData.main_status === "draft" ? "#00563B" : "#fab10c",
								}}
							>
								{mainData.main_status === "draft" ? "草稿" : "公開"}
							</span>
							{mainData.main_title ? mainData.main_title : "Untitled"}
						</button>
						<hr />
					</h2>
					<div
						id="card-title"
						className="accordion-collapse collapse show"
						aria-labelledby="panelsStayOpen-headingOne"
					>
						<div className="accordion-body">
							<CardMainImage
								main_articleno={mainData.main_articleno}
								imageUrl={mainData.main_image ? mainData.main_image : null}
							/>
							<div className={styles["edit-main-info"]}>
								<div className={styles["main-info-title"]}>
									<input
										type="text"
										placeholder="Untitled"
										value={
											mainData.main_title === "Untitled"
												? ""
												: mainData.main_title
										}
										onChange={handleTitleChange}
									/>
								</div>
								<div className={styles["main-info-tag"]}>
									<div className={styles["main-info-tag-input"]}>
										<input
											type="text"
											placeholder="#hashtag"
											value={hashtags ? hashtags : ""}
											onChange={handleHashTagChange}
										/>
										<select
											name="location"
											id=""
											value={
												mainData.main_location ? mainData.main_location : ""
											}
											onChange={handleLocationChange}
										>
											<option value="default" hidden disabled>
												選擇地區
											</option>
											<option value="基隆市">基隆市</option>
											<option value="台北市">台北市</option>
											<option value="新北市">新北市</option>
											<option value="桃園市">桃園市</option>
											<option value="新竹市">新竹市</option>
											<option value="新竹縣">新竹縣</option>
											<option value="苗栗縣">苗栗縣</option>
											<option value="台中市">台中市</option>
											<option value="彰化縣">彰化縣</option>
											<option value="南投縣">南投縣</option>
											<option value="雲林縣">雲林縣</option>
											<option value="嘉義市">嘉義市</option>
											<option value="嘉義縣">嘉義縣</option>
											<option value="台南市">台南市</option>
											<option value="高雄市">高雄市</option>
											<option value="屏東縣">屏東縣</option>
											<option value="台東縣">台東縣</option>
											<option value="花蓮縣">花蓮縣</option>
											<option value="宜蘭縣">宜蘭縣</option>
											<option value="澎湖縣">澎湖縣</option>
											<option value="金門縣">金門縣</option>
											<option value="連江縣">連江縣</option>
										</select>
									</div>
								</div>
								<MainInfoContent
									editContent={mainData.main_content}
									onContentChange={onMainDataChange}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CardMain;
