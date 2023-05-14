import CardSpot from "./CardSpot";
import styles from "../Edit.module.scss";

const CardContent = () => {
	return (
		<div className={`${styles["edit-card-content"]}`}>
			<div className="accordion accordion-flush" id="accordionContent">
				<CardSpot />
			</div>
		</div>
	);
};

export default CardContent;
