import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import GroupsIcon from "@mui/icons-material/Groups";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import { AppContext } from "../AppContextProvider";
import { pages, routes } from "../Utils/routesAndPages";
import { useNavigate } from "react-router-dom";
import UserRoutes from "../Utils/User/UserRoutes";

export default function UserDrawer() {
	const { isOpenDrawer, toggleDrawer } = React.useContext(AppContext);
	const navigate = useNavigate();

	const list = () => (
		<Box
			sx={{ width: 250, display: { xs: "flex", md: "none" } }}
			role="presentation"
			onClick={toggleDrawer(false)}
			onKeyDown={toggleDrawer(false)}>
			<List>
				{UserRoutes.filter((i) => i.type === "drawer").map((r) => {
					return (
						<ListItem key={r.path} disablePadding onClick={() => navigate(r.path)}>
							<ListItemButton>
								<ListItemIcon>{r.icon}</ListItemIcon>
								<ListItemText primary={r.name} />
							</ListItemButton>
						</ListItem>
					);
				})}
			</List>
		</Box>
	);

	return (
		<div>
			<React.Fragment>
				<SwipeableDrawer
					anchor="left"
					open={isOpenDrawer}
					onClose={toggleDrawer(false)}
					onOpen={toggleDrawer(true)}>
					{list()}
				</SwipeableDrawer>
			</React.Fragment>
		</div>
	);
}
