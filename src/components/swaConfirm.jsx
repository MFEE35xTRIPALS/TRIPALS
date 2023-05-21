import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySweetAlert = withReactContent(Swal);

const useSwaConfirm = () => {
	const showAlert = (title, text, icon, confirmCallback, cancelCallback) => {
		MySweetAlert.fire({
			title,
			text,
			icon,
			confirmButtonText: "確認",
			cancelButtonText: "取消",
			showCancelButton: true,
		}).then((result) => {
			if (result.isConfirmed) {
				if (confirmCallback) {
					confirmCallback();
				}
			}
		});
	};

	return showAlert;
};

export default useSwaConfirm;
