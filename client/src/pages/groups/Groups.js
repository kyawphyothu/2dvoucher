import { useContext, useState } from "react";
import {
	Avatar,
	Box,
	Button,
	Divider,
	Grid,
	IconButton,
	Skeleton,
	Stack,
	Tab,
	Tabs,
	Typography,
} from "@mui/material";
import SecurityIcon from "@mui/icons-material/Security";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PeopleIcon from "@mui/icons-material/People";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import MessageRoundedIcon from "@mui/icons-material/MessageRounded";

import { GroupsAds } from "../../components/Ads";
import CreateGroupDialog from "./CreateGroupDialog";
import BsBadge from "../../components/BsBadge";
import "./style.css";
import { getGroups } from "../../apiCalls";
import { AppContext } from "../../AppContextProvider";
import { useNavigate } from "react-router-dom";

export default function Groups() {
	const { snackNoti } = useContext(AppContext);

	const [isOpenCreateDialog, setIsOpenCreateDialog] = useState(false);
	const [groups, setGroups] = useState([]);
	const [tab, setTab] = useState("own");
	const [isFetchingGroups, setIsFetchingGroups] = useState(false);

	const navigate = useNavigate();

	useState(() => {
		const getAllGroups = async () => {
			setIsFetchingGroups(true);

			const result = await getGroups();
			if (result.ok) {
				setGroups(result[0]);
			} else {
				snackNoti({ type: "error", msg: result.msg });
			}

			setIsFetchingGroups(false);
		};

		getAllGroups();
	}, []);

	const handleChange = (event, newValue) => {
		setTab(newValue);
	};

	const openCreateGroupDialog = () => {
		setIsOpenCreateDialog(true);
	};
	const closeCreateGroupDialog = () => {
		setIsOpenCreateDialog(false);
	};

	return (
		<Box>
			<Grid container spacing={3}>
				{/* choose group */}
				<Grid item xs={12}>
					<Box
						className="floatingCard"
						sx={{ display: "flex", justifyContent: "center" }}>
						<Tabs value={tab} onChange={handleChange} aria-label="icon tabs example">
							<Tab icon={<SecurityIcon />} aria-label="own" value="own" />
							<Tab
								icon={<AdminPanelSettingsIcon />}
								aria-label="admin"
								value="admin"
							/>
							<Tab icon={<PeopleIcon />} aria-label="member" value="member" />
						</Tabs>
					</Box>
				</Grid>
				{/* new group & groups */}
				<Grid item xs={12}>
					<Box>
						{/* new group */}
						<div style={{ display: "flex", justifyContent: "end" }}>
							<Button
								variant="contained"
								size="small"
								onClick={() => openCreateGroupDialog()}>
								+အဖွဲ့သစ်
							</Button>
						</div>
						<Divider sx={{ marginY: "16px" }} />
						<GroupsAds />
						{/* groups */}
						<Grid container spacing={3}>
							{isFetchingGroups
								? [1, 2, 3, 4].map((i) => {
										return (
											<Grid item xs={12} sm={4} md={3} key={i}>
												<Stack
													direction="column"
													justifyContent="center"
													alignItems="center"
													textAlign="center">
													<Skeleton
														variant="rounded"
														width="100%"
														height={200}
													/>
												</Stack>
											</Grid>
										);
								  })
								: groups[tab]?.map((g) => {
										return (
											<Grid item xs={12} sm={4} md={3} key={g._id}>
												<Stack
													className="floatingCard"
													direction="column"
													justifyContent="center"
													alignItems="center"
													textAlign="center">
													<Avatar
														alt={g.type}
														src="none"
														sx={{
															backgroundColor: `type.${g.type}`,
															marginBottom: "8px",
														}}
													/>
													<Typography
														className="center-text"
														variant="subtitle1"
														sx={{
															width: "100%",
															marginBottom: "8px",
														}}>
														{g.name}
													</Typography>
													<BsBadge sx={{ marginBottom: "8px" }}>
														{g.type}
													</BsBadge>
													<Typography
														className="center-text"
														variant="body2"
														sx={{ color: "#7B809A" }}>
														{g.owner}
													</Typography>
													<Typography
														className="center-text"
														variant="subtitle2"
														sx={{ color: "#7B809A" }}>
														{g.admin}
													</Typography>
													<div
														style={{
															width: "100%",
															display: "flex",
															justifyContent: "space-evenly",
															margin: "8px 0px",
														}}>
														<IconButton
															variant="outlined"
															size="small"
															onClick={(event) => {
																event.stopPropagation();
																console.log("Clicked Message");
															}}>
															<MessageRoundedIcon />
														</IconButton>
														<IconButton
															variant="outlined"
															size="small"
															color="primary"
															onClick={(event) => {
																event.stopPropagation();
																navigate(`/group/${g._id}`);
															}}>
															<ArrowForwardIosRoundedIcon />
														</IconButton>
													</div>
												</Stack>
											</Grid>
										);
								  })}
						</Grid>
					</Box>
				</Grid>
			</Grid>

			{/* create dialog */}
			{isOpenCreateDialog && (
				<CreateGroupDialog
					isOpenCreateDialog={isOpenCreateDialog}
					setIsOpenCreateDialog={setIsOpenCreateDialog}
					closeCreateGroupDialog={closeCreateGroupDialog}
				/>
			)}
		</Box>
	);
}
