import CardSpot from "./CardSpot";
import styles from "../Edit.module.scss";

const CardContent = ({ main_articleno, spots, onSpotChange, onDeleteSpot }) => {
	// console.log(main_articleno);
	return (
		<div className={`${styles["edit-card-content"]}`}>
			<div className="accordion accordion-flush" id="accordionContent">
				{spots.map((item) => (
					<CardSpot
						main_articleno={main_articleno}
						key={item.contentno}
						spot={item}
						onSpotChange={(updatedSpot) =>
							onSpotChange(item.contentno, updatedSpot)
						}
						onDeleteSpot={onDeleteSpot}
					/>
				))}
			</div>
		</div>
	);
};

export default CardContent;
