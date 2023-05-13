import styles from "../Edit.module.scss";
import CardImage from "./CardImage";

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
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CardMain;
