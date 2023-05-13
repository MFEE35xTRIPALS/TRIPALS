import CardSpot from "./CardSpot";
import styles from "./CardMain.module.scss";

const CardContent = () => {
	return (
		<div className={`${styles["edit-card-content"]}`}>
			<div className="accordion accordion-flush" id="accordionContent">
				<CardSpot />
				<CardSpot />
				<CardSpot />
				<CardSpot />
			</div>
		</div>
	);
};

export default CardContent;
