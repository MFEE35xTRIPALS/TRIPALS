import styles from "../Edit.module.scss";

const MainInfoContent = ({ editContent, onContentChange }) => {
	const handleContentChange = (event) => {
		const newContent = event.target.value;
		onContentChange("main_content", newContent);
	};

	return (
		<div className={styles["info-content"]}>
			<textarea
				name=""
				id=""
				placeholder="Content"
				onChange={handleContentChange}
				value={editContent ? editContent : ""}
			></textarea>
		</div>
	);
};

export default MainInfoContent;
