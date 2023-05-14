import CardSpot from "./CardSpot";
import styles from "../Edit.module.scss";

const CardContent = ({ spots, onSpotChange }) => {
	console.log(spots);
	return (
		<div className={`${styles["edit-card-content"]}`}>
			<div className="accordion accordion-flush" id="accordionContent">
				{spots.map((item) => (
					<CardSpot
						key={item.contentno}
						spot={item}
						onSpotChange={(updatedSpot) =>
							onSpotChange(item.contentno, updatedSpot)
						}
					/>
				))}
			</div>
		</div>
	);
};

export default CardContent;
