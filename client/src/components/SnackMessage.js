import { forwardRef, useContext } from "react";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { AppContext } from "../AppContextProvider";

const Alert = forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SnackMessage() {
	const { isSnack, setIsSnack, snackMsg } = useContext(AppContext);

	const handleCloseSnack = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setIsSnack(false);
	};

	return (
		<Snackbar
			anchorOrigin={{ vertical: "top", horizontal: "right" }}
			open={isSnack}
			autoHideDuration={3000}
			onClose={handleCloseSnack}>
			<Alert onClose={handleCloseSnack} severity={snackMsg.type} sx={{ width: "100%" }}>
				{snackMsg.msg}
			</Alert>
		</Snackbar>
	);
}
