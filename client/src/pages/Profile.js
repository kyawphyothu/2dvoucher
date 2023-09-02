import React, { useContext, useRef, useState } from "react";
import {
	Avatar,
	Badge,
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Divider,
	Grid,
	Icon,
	TextField,
	Typography,
} from "@mui/material";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import { AppContext } from "../AppContextProvider";
import * as pic from "../assets/profilePic/profilePic";
import { checkPass, updateProfile } from "../apiCalls";
import { LoadingButton } from "@mui/lab";

export default function Profile() {
	const { authUser, setAuthUser, snackNoti } = useContext(AppContext);

	const [openChooseProfilePic, setOpenChooseProfilePic] = useState(false);
	const [currentPic, setCurrentPic] = useState(authUser.picture);
	const [isUpdateBtnDisable, setIsUpdateBtnDisable] = useState(true);
	const [isPassUpdateBtnDisable, setIsPassUpdateBtnDisable] = useState(true);
	const [isLoadingPassUpdateBtn, setIsLoadingPassUpdateBtn] = useState(false);

	const nameRef = useRef();
	const phoneRef = useRef();
	const currentPassRef = useRef();
	const newPassRef = useRef();
	const cnewPassRef = useRef();

	const handleChooseProfilePic = () => {
		setOpenChooseProfilePic(true);
	};

	const handleChange = (e) => {
		const newName = nameRef.current.value;
		const newPhone = phoneRef.current.value;
		if (newName !== authUser.name || newPhone !== authUser.phone) {
			setIsUpdateBtnDisable(false);
		} else {
			setIsUpdateBtnDisable(true);
		}
	};

	const handleUpdateProfile = async (data) => {
		const result = await updateProfile(data);
		if (result.ok) {
			snackNoti({ type: "success", msg: result.msg });
			setAuthUser({ ...authUser, ...data });
		} else {
			snackNoti({ type: "error", msg: result.msg });
		}
		setIsUpdateBtnDisable(true);
	};

	const handleChangePass = () => {
		if (currentPassRef.current.value && newPassRef.current.value && cnewPassRef.current.value) {
			if (newPassRef.current.value === cnewPassRef.current.value) {
				setIsPassUpdateBtnDisable(false);
			} else {
				setIsPassUpdateBtnDisable(true);
			}
		}
	};

	const handleUpdatePass = async () => {
		setIsLoadingPassUpdateBtn(true);

		const isCorrectPss = await checkPass(currentPassRef.current.value);
		if (!isCorrectPss.match) {
			snackNoti({ type: "error", msg: isCorrectPss.msg });
			setIsLoadingPassUpdateBtn(false);
			return;
		}

		await handleUpdateProfile({ password: newPassRef.current.value });
		currentPassRef.current.value = "";
		newPassRef.current.value = "";
		cnewPassRef.current.value = "";

		setIsPassUpdateBtnDisable(true);
		setIsLoadingPassUpdateBtn(false);
	};

	return (
		<Box>
			<Grid container spacing={3}>
				<Grid item xs={12} md={6}>
					{/* update profile */}
					<div className="floatingCard" style={{ display: "grid", placeItems: "center" }}>
						<Grid container spacing={3}>
							<Grid
								item
								sx={{
									display: "grid",
									placeItems: "center",
								}}
								xs={12}>
								<Badge
									overlap="circular"
									anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
									badgeContent={
										<Icon
											sx={{ cursor: "pointer" }}
											onClick={() => handleChooseProfilePic()}>
											<AddCircleRoundedIcon />
										</Icon>
									}>
									<Avatar
										alt="Remy Sharp"
										src={pic[authUser.picture]}
										sx={{
											width: 100,
											height: 100,
										}}
									/>
								</Badge>
							</Grid>
							<Grid item xs={12}>
								<TextField
									label="Name"
									variant="outlined"
									fullWidth
									required
									defaultValue={authUser.name}
									inputRef={nameRef}
									onChange={handleChange}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									label="Username"
									variant="outlined"
									fullWidth
									disabled
									value={authUser.handle}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									label="Phone"
									variant="outlined"
									fullWidth
									required
									defaultValue={authUser.phone}
									inputRef={phoneRef}
									onChange={handleChange}
								/>
							</Grid>
							<Grid item xs={12} sx={{ display: "flex", justifyContent: "end" }}>
								<LoadingButton
									loading={false}
									disabled={isUpdateBtnDisable}
									variant="contained"
									onClick={() => {
										handleUpdateProfile({
											name: nameRef.current.value,
											phone: phoneRef.current.value,
										});
									}}>
									<span>Updte</span>
								</LoadingButton>
							</Grid>
						</Grid>
					</div>
				</Grid>
				<Grid item xs={12} md={6}>
					{/* update password */}
					<div className="floatingCard">
						<Typography variant="subtitle1">Change Password</Typography>
						<Divider sx={{ marginY: "20px" }} />
						<Grid container spacing={3}>
							<Grid item xs={12}>
								<TextField
									label="Current Password"
									type="password"
									fullWidth
									required
									inputRef={currentPassRef}
									onChange={handleChangePass}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									label="New Password"
									type="password"
									fullWidth
									required
									inputRef={newPassRef}
									onChange={handleChangePass}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									label="Confirm New Password"
									type="password"
									fullWidth
									required
									inputRef={cnewPassRef}
									onChange={handleChangePass}
								/>
							</Grid>
							<Grid item xs={12} sx={{ display: "flex", justifyContent: "end" }}>
								<LoadingButton
									disabled={isPassUpdateBtnDisable}
									loading={isLoadingPassUpdateBtn}
									variant="contained"
									onClick={() => {
										handleUpdatePass();
									}}>
									<span>update</span>
								</LoadingButton>
							</Grid>
						</Grid>
					</div>
				</Grid>
			</Grid>

			{/* choose profile picture */}
			<Dialog
				open={openChooseProfilePic}
				onClose={() => setOpenChooseProfilePic(false)}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
				fullWidth>
				<DialogTitle id="alert-dialog-title">{"Update Profile Picture"}</DialogTitle>
				<Divider />
				<DialogContent>
					<Grid container spacing={2}>
						{pic.names.map((name) => {
							return (
								<Grid item key={name}>
									<Avatar
										alt={name}
										src={pic[name]}
										sx={{
											width: "50px",
											height: "50px",
											border:
												currentPic === name
													? "1px dashed #6bf8ff"
													: "1px solid #000000",
										}}
										onClick={() => {
											setCurrentPic(name);
										}}
									/>
								</Grid>
							);
						})}
					</Grid>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setOpenChooseProfilePic(false)}>Cancle</Button>
					<Button
						variant="contained"
						onClick={() => {
							setOpenChooseProfilePic(false);
							handleUpdateProfile({ picture: currentPic });
						}}>
						Save
					</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
}
