import { forwardRef, useRef, useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import { login } from "apiCalls";
import { useMaterialUIController, setAuth, setAuthUser } from "context";
import Snackbar from "@mui/material/Snackbar/Snackbar";
import MuiAlert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import { Save as SaveIcon } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box } from "@mui/material";

const Alert = forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Basic() {
	const [isLoadingBtn, setIsLoadingBtn] = useState(false);
	const [controller, dispatch] = useMaterialUIController();

	const [rememberMe, setRememberMe] = useState(false);
	const [hasError, setHasError] = useState(false);

	const usernamRef = useRef();
	const passwordRef = useRef();

	const handleSetRememberMe = () => setRememberMe(!rememberMe);

	const handleSignIn = () => {
		setIsLoadingBtn(true);
		const username = usernamRef.current.value;
		const password = passwordRef.current.value;
		(async () => {
			const user = await login(username, password);
			setIsLoadingBtn(false);
			if (!user) return setHasError(true);

			setAuth(dispatch, true);
			setAuthUser(dispatch, user);
			return 1;
		})();
	};

	const handleErrorSnackClose = () => {
		setHasError(false);
	};

	return (
		<BasicLayout image={bgImage}>
			<Card>
				<MDBox
					variant="gradient"
					bgColor="info"
					borderRadius="lg"
					coloredShadow="info"
					mx={2}
					mt={-3}
					p={2}
					mb={1}
					textAlign="center"
				>
					<MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
						Sign in
					</MDTypography>
				</MDBox>
				<MDBox pt={4} pb={3} px={3}>
					<MDBox component="form" role="form">
						<MDBox mb={2}>
							<MDInput
								type="username"
								label="Username"
								inputRef={usernamRef}
								fullWidth
							/>
						</MDBox>
						<MDBox mb={2}>
							<MDInput
								type="password"
								label="Password"
								inputRef={passwordRef}
								fullWidth
							/>
						</MDBox>
						<MDBox display="flex" alignItems="center" ml={-1}>
							<Switch checked={rememberMe} onChange={handleSetRememberMe} />
							<MDTypography
								variant="button"
								fontWeight="regular"
								color="text"
								onClick={handleSetRememberMe}
								sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
							>
								&nbsp;&nbsp;Remember me
							</MDTypography>
						</MDBox>
						<MDBox mt={4} mb={1}>
							<MDButton
								variant="gradient"
								color="info"
								fullWidth
								onClick={handleSignIn}
								disabled={isLoadingBtn}
							>
								sign in
								{isLoadingBtn ? (
									<Box sx={{ display: "flex", marginLeft: "12px" }}>
										<CircularProgress size={16} />
									</Box>
								) : (
									""
								)}
							</MDButton>
						</MDBox>
					</MDBox>
				</MDBox>
			</Card>
			<Snackbar
				open={hasError}
				autoHideDuration={6000}
				onClose={handleErrorSnackClose}
				anchorOrigin={{ vertical: "top", horizontal: "right" }}
			>
				<Alert onClose={handleErrorSnackClose} severity="error" sx={{ width: "100%" }}>
					Wrong Username or Password!
				</Alert>
			</Snackbar>
		</BasicLayout>
	);
}

export default Basic;
