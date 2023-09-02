import { useContext, useRef, useState } from "react";
import {
	Box,
	Checkbox,
	Container,
	FormControlLabel,
	Grid,
	TextField,
	Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { signup } from "../../apiCalls";
import { AppContext } from "../../AppContextProvider";
import { LoadingButton } from "@mui/lab";

const Signup = () => {
	const { setAuth, setAuthUser, snackNoti } = useContext(AppContext);
	const navigate = useNavigate();
	const [isLoadingBtn, setIsLoadingBtn] = useState(false);
	const nameRef = useRef();
	const usernameRef = useRef();
	const phoneRef = useRef();
	const passwordRef = useRef();
	const cpasswordRef = useRef();

	const submitSingup = async () => {
		setIsLoadingBtn(true);
		const user = {
			name: nameRef.current.value,
			handle: usernameRef.current.value,
			phone: phoneRef.current.value,
			password: passwordRef.current.value,
		};
		if (user.password !== cpasswordRef.current.value) {
			snackNoti({ type: "error", msg: "password not match!" });
			setIsLoadingBtn(false);
			return;
		}

		const result = await signup(user);
		setIsLoadingBtn(false);
		if (result.ok) {
			setAuthUser(result.user);
			setAuth(true);
		} else {
			snackNoti({ type: "error", msg: result.msg });
		}
	};

	return (
		<Container
			maxWidth="xs"
			sx={{
				display: "flex",
				alignItems: "center",
				minHeight: "100vh",
				justifyContent: "center",
				color: "#cccccc",
				paddingY: "24px",
			}}>
			<Box
				sx={{
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
						submitSingup();
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
								<Typography variant="h6">Create Account</Typography>
							</Grid>
							<Grid item xs={12}>
								<TextField
									label="Name"
									type="text"
									inputRef={nameRef}
									required
									fullWidth
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									label="Username"
									type="text"
									inputRef={usernameRef}
									required
									fullWidth
									helperText="eg: alice"
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									label="Phone"
									type="text"
									inputRef={phoneRef}
									required
									fullWidth
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									label="Password"
									type="password"
									inputRef={passwordRef}
									required
									fullWidth
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									label="Confirm Password"
									type="password"
									inputRef={cpasswordRef}
									required
									fullWidth
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
									<span>Sign up</span>
								</LoadingButton>
								{/* <Button type="submit" variant="contained" fullWidth>
								Sign up
							</Button> */}
							</Grid>
							<Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
								<Typography>Forgot Password</Typography>
							</Grid>
						</Grid>
					</div>
				</form>
				<Typography>Already have an account?</Typography>
				<Typography
					component="span"
					onClick={() => navigate("/login")}
					sx={{ textDecoration: "underline", fontWeight: "bold", cursor: "pointer" }}>
					Login
				</Typography>
			</Box>
		</Container>
	);
};

export default Signup;
