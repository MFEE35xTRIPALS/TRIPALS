import styles from "../Edit.module.scss";
import CardSpotImage from "./CardSpotImage";
import SpotInfoContent from "./SpotInfoContent";

const CardSpot = ({ main_articleno, spot, onSpotChange }) => {
	// console.log(main_articleno);
	const handleInputChange = (event) => {
		const { name, value } = event.target;
		console.log(event.target);
		const updatedSpot = { ...spot, [name]: value };
		onSpotChange(updatedSpot);
	};

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
					<span>{spot.title ? spot.title : ""}</span>
					<button //collapse show
						className={`accordion-button collapsed d-flex text-center ${styles["edit-accordion-btn"]}`}
						type="button"
						data-bs-toggle="collapse"
						data-bs-target={`#card-content-${spot.contentno}`}
						aria-expanded="false" //true
						aria-controls={`card-content-${spot.contentno}`}
					></button>
				</div>
			</h2>
			<div
				id={`card-content-${spot.contentno}`}
				className="accordion-collapse collapse" //show
				data-bs-parent="#accordionContent"
			>
				<div className="accordion-body">
					<CardSpotImage
						main_articleno={main_articleno}
						contentno={spot.contentno}
						imageUrl={spot.image ? spot.image : null}
					/>
					<div className={styles["edit-content-info"]}>
						<div className={styles["content-info-location"]}>
							<input type="text" placeholder="請輸入地址或景點名稱" />
							<button className={`btn ${styles["edit-add-location-btn"]}`}>
								新增地址
							</button>
						</div>
						<div className={styles["content-info-title"]}>
							<input
								name="title"
								type="text"
								placeholder="新增景點名稱"
								value={spot.title ? spot.title : ""}
								onChange={handleInputChange}
							/>
						</div>
						{/* 要再傳一次 onSpotChange 給子層使用 */}
						<SpotInfoContent spot={spot} onContentChange={onSpotChange} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default CardSpot;
