import {
	Alert,
	Box,
	Button,
	Checkbox,
	Container,
	FormControlLabel,
	Grid,
	Snackbar,
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
	const { setAuth, setAuthUser } = useContext(AppContext);
	const navigate = useNavigate();

	const [openSnackBar, setOpenSnackBar] = useState(false);
	const [snackBarMsg, setSnackBarMsg] = useState("");
	const [isLoadingBtn, setIsLoadingBtn] = useState(false);

	const handleRef = useRef();
	const passwordRef = useRef();

	const handleLogin = () => {
		(async () => {
			setIsLoadingBtn(true);

			const handle = handleRef.current.value;
			const password = passwordRef.current.value;
			if (!handle || !password) {
				setSnackBarMsg("Require Username & Password");
				setOpenSnackBar(true);
				setIsLoadingBtn(false);
				return false;
			}
			const result = await login(handle, password);
			setIsLoadingBtn(false);
			if (!result) {
				setSnackBarMsg("Incorrect Username Or Password");
				setOpenSnackBar(true);
				return false;
			}
			setAuthUser(result.user);
			setAuth(true);
			navigate("/");
		})();
	};

	const handleCloseSnackBar = () => {
		setOpenSnackBar(false);
	};

	return (
		<Container maxWidth="xs">
			<Box
				sx={{
					// marginTop: 10,
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					height: "100vh"
				}}>
				<Typography variant="h4" sx={{ fontWeight: "bold" }}>
					{process.env.REACT_APP_NAME}
				</Typography>
				<Grid
					container
					rowSpacing={2}
					sx={{
						margin: "20px",
						backgroundColor: grey[300],
						padding: "20px 30px",
						borderRadius: "20px",
					}}>
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
							onClick={handleLogin}
							loading={isLoadingBtn}
							loadingIndicator="Login"
							variant="contained"
							fullWidth>
							<span>Login</span>
						</LoadingButton>
						{/* <Button type="submit" variant="contained" fullWidth onClick={handleLogin}>
							Login
						</Button> */}
					</Grid>
					<Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
						<Typography>Forgot Password</Typography>
					</Grid>
				</Grid>
				<Typography>Do not have an account?</Typography>
				<Typography
					component="span"
					onClick={() => navigate("/signup")}
					sx={{ textDecoration: "underline", fontWeight: "bold", cursor: "pointer" }}>
					Create account
				</Typography>
			</Box>

			<Snackbar
				anchorOrigin={{ vertical: "top", horizontal: "right" }}
				open={openSnackBar}
				autoHideDuration={6000}
				onClose={handleCloseSnackBar}>
				<Alert onClose={handleCloseSnackBar} severity="error" sx={{ width: "100%" }}>
					{snackBarMsg}
				</Alert>
			</Snackbar>
		</Container>
	);
};

export default Login;
