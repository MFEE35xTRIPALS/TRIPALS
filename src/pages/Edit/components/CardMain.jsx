import styles from "../Edit.module.scss";
import CardImage from "./CardImage";
import InfoContent from "./InfoContent";

const CardMain = () => {
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
							文章標題
						</button>
						<hr />
					</h2>
					<div
						id="card-title"
						className="accordion-collapse collapse show"
						aria-labelledby="panelsStayOpen-headingOne"
					>
						<div className="accordion-body">
							<CardImage />
							<div className={styles["edit-main-info"]}>
								<div class={styles["main-info-title"]}>
									<input class="" type="text" placeholder="Title" />
								</div>
								<div class={styles["main-info-tag"]}>
									<div class={styles["main-info-tag-input"]}>
										<span>#</span>
										<input type="text" placeholder="hashtag" />
										<select name="county" id="">
											<option value="" selected disabled hidden>
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
								<InfoContent />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CardMain;
