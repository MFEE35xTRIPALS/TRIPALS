import axios from "axios";
import EditNavbar from "./components/navbar/EditNavbar";
import CardMain from "./components/CardMain";
import CardContent from "./components/CardContent";
import styles from "./Edit.module.scss";
import "bootstrap/dist/js/bootstrap.bundle";

//定義組件
const Edit = () => {
	return (
		<>
			<EditNavbar />
			<div className={`container-fluid ${styles["edit-container"]}`}>
				<div className="row">
					<div className="col-lg-4">
						<div className={styles["edit-card-container"]}>
							<CardMain />
							<CardContent />
						</div>
					</div>
					<div className="col-lg-8">
						<div
							style={{
								width: "100%",
								height: "80vh",
								backgroundColor: "black",
							}}
						></div>
					</div>
				</div>
			</div>
		</>
	);
};

//輸出組件
export default Edit;
