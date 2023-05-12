import axios from "axios";
import EditNavbar from "./components/navbar/EditNavbar";
import styles from "./Edit.module.scss";
import "bootstrap/dist/js/bootstrap.bundle";

//定義組件
const Edit = () => {
	return (
		<>
			<EditNavbar />
			<div className={`container-fluid ${styles["edit-container"]}`}>
				<div className="row">
					<div className="col-4">
						<div className={`${styles["edit-card-main"]}`}>
							<div class="accordion accordion-flush" id="accordionMain">
								<div class="accordion-item">
									<h2 class="accordion-header">
										<button
											class="accordion-button collapsed d-flex text-center"
											type="button"
											data-bs-toggle="collapse"
											data-bs-target="#flush-Main"
											aria-expanded="false"
											aria-controls="flush-Main"
										>
											文章標題
										</button>
									</h2>
									<div
										id="flush-Main"
										class="accordion-collapse collapse"
										data-bs-parent="#accordionMain"
									>
										<div class="accordion-body">
											Placeholder content for this accordion, which is intended
											to demonstrate the <code>.accordion-flush</code> class.
											This is the first item's accordion body.
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className={`${styles["edit-card-content"]}`}>
							<div class="accordion accordion-flush" id="accordionContent">
								<div class="accordion-item">
									<h2 class="accordion-header">
										<button
											class="accordion-button collapsed d-flex text-center"
											type="button"
											data-bs-toggle="collapse"
											data-bs-target="#flush-Content-1"
											aria-expanded="false"
											aria-controls="flush-Content-1"
										>
											文章標題
										</button>
									</h2>
									<div
										id="flush-Content-1"
										class="accordion-collapse collapse"
										data-bs-parent="#accordionContent"
									>
										<div class="accordion-body">
											Placeholder content for this accordion, which is intended
											to demonstrate the <code>.accordion-flush</code> class.
											This is the first item's accordion body.
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-8">
						<div
							style={{
								width: "100%",
								height: "500px",
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
