import React, { useContext, useEffect, useRef, useState } from "react";
import {
	Avatar,
	Box,
	Button,
	Divider,
	Grid,
	IconButton,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import PersonAddRoundedIcon from "@mui/icons-material/PersonAddRounded";
import PersonRemoveRoundedIcon from "@mui/icons-material/PersonRemoveRounded";
import { AppContext } from "../AppContextProvider";
import {
	acceptRequest,
	block_request,
	getFriend,
	makeFriendRequest,
	unblock,
	undoFriendRequest,
	unfriend,
} from "../apiCalls";
import * as pic from "../assets/profilePic/profilePic";
import { grey } from "@mui/material/colors";
import { LoadingButton } from "@mui/lab";

export default function Friend() {
	const { authUser, snackNoti } = useContext(AppContext);
	const [friend, setFriend] = useState({});
	const [isLoadingAddFriendBtn, setIsLoadingAddFriendBtn] = useState(false);

	const handleRef = useRef();

	useEffect(() => {
		(async () => {
			const result = await getFriend();
			setFriend(result[0]);
		})();
	}, []);

	const sendFriendRequest = async () => {
		setIsLoadingAddFriendBtn(true);
		const handle = handleRef.current.value;

		if (!handle) {
			snackNoti({ type: "error", msg: "Username required!" });
			setIsLoadingAddFriendBtn(false);
			return;
		}
		if (handle === authUser.handle) {
			snackNoti({ type: "error", msg: "Can't make friend yourself" });
			setIsLoadingAddFriendBtn(false);
			return;
		}
		if (friend.friends.some((obj) => obj.handle === handle)) {
			snackNoti({ type: "info", msg: "Already Friend!" });
			setIsLoadingAddFriendBtn(false);
			return;
		}
		if (friend.requests.some((obj) => obj.handle === handle)) {
			snackNoti({ type: "warning", msg: "This user already requested you (Accept ?)!" });
			setIsLoadingAddFriendBtn(false);
			return;
		}
		if (friend.pending.some((obj) => obj.handle === handle)) {
			snackNoti({ type: "info", msg: "Already send request!" });
			setIsLoadingAddFriendBtn(false);
			return;
		}
		if (friend.cancled.some((obj) => obj.handle === handle)) {
			snackNoti({ type: "warning", msg: "You Blocked this user (unblock first)!" });
			setIsLoadingAddFriendBtn(false);
			return;
		}

		const result = await makeFriendRequest(handle);
		setIsLoadingAddFriendBtn(false);
		if (result.ok) {
			snackNoti({ type: "success", msg: result.msg });
			setFriend({ ...friend, pending: [...friend.pending, result.user] });
			handleRef.current.value = "";
		} else {
			snackNoti({ type: "error", msg: result.msg });
		}
	};
	const undoFriendRequestt = async (handle) => {
		const result = await undoFriendRequest(handle);

		if (result.ok) {
			snackNoti({ type: "success", msg: result.msg });
			setFriend({
				...friend,
				pending: friend.pending.filter((i) => i.handle !== result.user),
			});
		} else {
			snackNoti({ type: "error", msg: result.msg });
		}
	};
	const handleAcceptRequest = async (handle) => {
		const result = await acceptRequest(handle);
		if (result.ok) {
			snackNoti({ type: "success", msg: result.msg });
			setFriend({
				...friend,
				requests: friend.requests.filter((i) => i.handle !== handle),
				friends: [...friend.friends, ...friend.requests.filter((i) => i.handle === handle)],
			});
		} else {
			snackNoti({ type: "error", msg: result.msg });
		}
	};
	const handleBlockRequest = async (handle) => {
		const result = await block_request(handle);
		if (result.ok) {
			snackNoti({ type: "success", msg: result.msg });
			setFriend({
				...friend,
				requests: friend.requests.filter((i) => i.handle !== handle),
				cancled: [...friend.cancled, ...friend.requests.filter((i) => i.handle === handle)],
			});
			console.log({
				...friend,
				pending: friend.pending.filter((i) => i.handle !== handle),
				cancled: [...friend.cancled, ...friend.pending.filter((i) => i.handle === handle)],
			});
		} else {
			snackNoti({ type: "error", msg: result.msg });
		}
	};
	const handleUnfriend = async (handle) => {
		const result = await unfriend(handle);
		if (result.ok) {
			snackNoti({ type: "success", msg: result.msg });
			setFriend({ ...friend, friends: friend.friends.filter((i) => i.handle !== handle) });
		} else {
			snackNoti({ type: "error", msg: result.msg });
		}
	};
	const handleUnblock = async (handle) => {
		const result = await unblock(handle);
		if (result.ok) {
			snackNoti({ type: "success", msg: result.msg });
			setFriend({ ...friend, cancled: friend.cancled.filter((i) => i.handle !== handle) });
		} else {
			snackNoti({ type: "error", msg: result.msg });
		}
	};

	return (
		<Box>
			<Grid container spacing={3}>
				{/* add friends */}
				<Grid item xs={12}>
					<div className="floatingCard">
						<Typography variant="subtitle1">Add Friend</Typography>
						<Divider sx={{ marginY: "16px" }} />
						<form
							onSubmit={(e) => {
								e.preventDefault();
								sendFriendRequest();
							}}>
							<div
								style={{
									display: "flex",
									alignItems: "center",
									justifyContent: "space-between",
									gap: "16px",
								}}>
								<TextField label="Username" inputRef={handleRef} fullWidth />
								<LoadingButton
									loading={isLoadingAddFriendBtn}
									variant="contained"
									startIcon={<PersonAddRoundedIcon />}
									type="submit">
									Add
								</LoadingButton>
							</div>
						</form>
					</div>
				</Grid>
				{/* friends */}
				<Grid item xs={12} md={6}>
					<div className="floatingCard">
						<Typography variant="subtitle1">Friends</Typography>
						<Divider sx={{ marginY: 2 }} />
						{friend.friends?.map((f) => {
							return (
								<Stack
									key={f.handle}
									direction="row"
									alignItems="center"
									spacing={3}
									sx={{ marginBottom: 3 }}>
									<Avatar alt="some" src={pic[f.picture]} />
									<Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
										{f.handle}
									</Typography>
									<Button
										variant="outlined"
										color="error"
										size="small"
										onClick={() => {
											handleUnfriend(f.handle);
										}}>
										unfriend
									</Button>
								</Stack>
							);
						})}
					</div>
				</Grid>
				{/* requests */}
				<Grid item xs={12} md={6}>
					<div className="floatingCard">
						<Typography variant="subtitle1">Friend Requests</Typography>
						<Divider sx={{ marginY: 2 }} />
						{friend.requests?.map((f) => {
							return (
								<Stack
									key={f.handle}
									direction="row"
									alignItems="start"
									spacing={3}
									sx={{ marginBottom: 3 }}>
									<Avatar alt="some" src={pic[f.picture]} />
									<Stack direction="column" flexGrow={1} spacing={1}>
										<Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
											{f.handle}
										</Typography>
										<div>
											<Button
												variant="outlined"
												size="small"
												sx={{ marginRight: "16px", color: grey[500] }}
												onClick={() => {
													handleBlockRequest(f.handle);
												}}>
												cancle
											</Button>
											<Button
												variant="contained"
												color="success"
												size="small"
												onClick={() => {
													handleAcceptRequest(f.handle);
												}}>
												accept
											</Button>
										</div>
									</Stack>
								</Stack>
							);
						})}
					</div>
				</Grid>
				{/* pending */}
				<Grid item xs={12} md={6}>
					<div className="floatingCard">
						<Typography variant="subtitle1">Pending</Typography>
						<Divider sx={{ marginY: 2 }} />
						{friend.pending?.map((f) => {
							return (
								<Stack
									key={f.handle}
									direction="row"
									alignItems="center"
									spacing={3}
									sx={{ marginBottom: 3 }}>
									<Avatar alt="some" src={pic[f.picture]} />
									<Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
										{f.handle}
									</Typography>
									<Button
										variant="outlined"
										color="error"
										size="small"
										onClick={() => undoFriendRequestt(f.handle)}>
										cancle
									</Button>
								</Stack>
							);
						})}
					</div>
				</Grid>
				{/* blocked */}
				<Grid item xs={12} md={6}>
					<div className="floatingCard">
						<Typography variant="subtitle1">Blocked</Typography>
						<Divider sx={{ marginY: 2 }} />
						{friend.cancled?.map((f) => {
							return (
								<Stack
									key={f.handle}
									direction="row"
									alignItems="center"
									spacing={3}
									sx={{ marginBottom: 3 }}>
									<Avatar alt="some" src={pic[f.picture]} />
									<Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
										{f.handle}
									</Typography>
									<Button
										variant="outlined"
										color="error"
										size="small"
										onClick={() => {
											handleUnblock(f.handle);
										}}>
										unblock
									</Button>
								</Stack>
							);
						})}
					</div>
				</Grid>
			</Grid>
		</Box>
	);
}
