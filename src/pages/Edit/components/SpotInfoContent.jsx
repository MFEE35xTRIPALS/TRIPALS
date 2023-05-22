import styles from "../Edit.module.scss";

const SpotInfoContent = ({ spot, onContentChange }) => {
	const handleContentChange = (event) => {
		const { name, value } = event.target;
		const updatedSpot = { ...spot, [name]: value };
		onContentChange(updatedSpot);
	};

	return (
		<div className={styles["info-content"]}>
			<textarea
				name="content"
				id=""
				placeholder="location content"
				onChange={handleContentChange}
				value={spot.content ? spot.content : ""}
			></textarea>
		</div>
	);
};

export default SpotInfoContent;
