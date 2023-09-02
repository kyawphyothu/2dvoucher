import {
	Box,
	Button,
	Checkbox,
	Container,
	FormControlLabel,
	Grid,
	TextField,
	Typography,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { Link, useNavigate } from "react-router-dom";
import { grey } from "@mui/material/colors";
import { useContext, useRef, useState } from "react";
import { login } from "../../apiCalls";
import { AppContext } from "../../AppContextProvider";

const Login = () => {
	const { setAuth, setAuthUser, snackNoti } = useContext(AppContext);
	const navigate = useNavigate();

	const [isLoadingBtn, setIsLoadingBtn] = useState(false);

	const handleRef = useRef();
	const passwordRef = useRef();

	const handleLogin = () => {
		(async () => {
			setIsLoadingBtn(true);

			const handle = handleRef.current.value;
			const password = passwordRef.current.value;
			if (!handle || !password) {
				snackNoti({ type: "error", msg: "Require Username & Password" });
				setIsLoadingBtn(false);
				return false;
			}
			const result = await login(handle, password);
			setIsLoadingBtn(false);
			if (!result) {
				snackNoti({ type: "error", msg: "Incorrect Username Or Password" });
				return false;
			}
			setAuthUser(result.user);
			setAuth(true);
			navigate("/");
		})();
	};

	return (
		<Box
			// maxWidth="xs"
			sx={{
				display: "flex",
				alignItems: "center",
				minHeight: "calc(100vh - 100px)",
				justifyContent: "center",
				color: "#cccccc",
				paddingY: "24px",
			}}>
			<Box
				sx={{
					maxWidth: "400px",
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
				}}>
				<Typography variant="h4" sx={{ fontWeight: "bold" }}>
					{process.env.REACT_APP_NAME}
				</Typography>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						handleLogin();
					}}>
					<div className="floatingCard">
						<Grid container spacing={3}>
							<Grid
								item
								xs={12}
								sx={{
									display: "flex",
									flexDirection: "column",
									justifyContent: "center",
									alignItems: "center",
									marginBottom: "10px",
								}}>
								<Typography variant="h6">Login</Typography>
							</Grid>
							<Grid item xs={12}>
								<TextField
									label="Username"
									type="text"
									required
									fullWidth
									inputRef={handleRef}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									label="Password"
									type="password"
									required
									fullWidth
									inputRef={passwordRef}
								/>
							</Grid>
							<Grid item xs={12}>
								<FormControlLabel
									control={<Checkbox defaultChecked />}
									label="Remember me"
								/>
							</Grid>
							<Grid item xs={12}>
								<LoadingButton
									size="small"
									type="submit"
									loading={isLoadingBtn}
									loadingIndicator="Login"
									variant="contained"
									fullWidth>
									<span>Login</span>
								</LoadingButton>
							</Grid>
							<Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
								<Typography>Forgot Password</Typography>
							</Grid>
						</Grid>
					</div>
				</form>
				<Typography>Do not have an account?</Typography>
				<Typography
					component="span"
					onClick={() => navigate("/signup")}
					sx={{ textDecoration: "underline", fontWeight: "bold", cursor: "pointer" }}>
					Create account
				</Typography>
			</Box>
		</Box>
	);
};

export default Login;
