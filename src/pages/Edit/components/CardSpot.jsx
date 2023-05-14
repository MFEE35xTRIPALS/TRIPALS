import styles from "../Edit.module.scss";
import CardImage from "./CardImage";
import InfoContent from "./InfoContent";

const CardSpot = () => {
	return (
		<div
			className={`accordion-item border-0 ${styles["accordion-item-color"]}`}
		>
			<h2 className="accordion-header">
				<hr />
				<div className={styles["content-title"]}>
					<button className={styles["btn-delete"]} aria-label="Delete">
						<i className="fa-solid fa-circle-xmark"></i>
					</button>
					<span>文章標題</span>
					<button
						className={`accordion-button collapse show d-flex text-center ${styles["edit-accordion-btn"]}`}
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#card-content-1"
						aria-expanded="true"
						aria-controls="card-content-1"
					></button>
				</div>
			</h2>
			<div
				id="card-content-1"
				className="accordion-collapse collapse show"
				data-bs-parent="#accordionContent"
			>
				<div className="accordion-body">
					<CardImage />
					<div className={styles["edit-content-info"]}>
						<div class={styles["content-info-location"]}>
							<input class="" type="text" placeholder="請輸入地址或景點名稱" />
							<button className={`btn ${styles["edit-add-location-btn"]}`}>
								新增地址
							</button>
						</div>
						<div class={styles["content-info-title"]}>
							<input class="" type="text" placeholder="新增景點名稱" />
						</div>
						<InfoContent />
					</div>
				</div>
			</div>
		</div>
	);
};

export default CardSpot;
