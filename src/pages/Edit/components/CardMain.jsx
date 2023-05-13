import styles from "./CardMain.module.scss";

const CardMain = () => {
	return (
		<div className={`${styles["edit-card-main"]}`}>
			<div className="accordion accordion-flush" id="accordionMain">
				<div className={`accordion-item ${styles["accordion-item-color"]}`}>
					<h2 className="accordion-header" id="panelsStayOpen-headingOne">
						<button
							className={`accordion-button collapse show ${styles["edit-accordion-button"]}`}
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
							Placeholder content for this accordion, which is intended to
							demonstrate the <code>.accordion-flush</code> class. This is the
							first item's accordion body.
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CardMain;
