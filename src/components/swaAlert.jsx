import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySweetAlert = withReactContent(Swal);

const useSwaAlert = () => {
	const showAlert = (title, text, icon, timer = null, nextCallback) => {
		MySweetAlert.fire({
			title,
			text,
			icon,
			timer: timer, // 設定 timer 參數
			showConfirmButton: false,
		}).then(() => {
			if (nextCallback) {
				nextCallback();
			}
		});
	};

	return showAlert;
};

export default useSwaAlert;
