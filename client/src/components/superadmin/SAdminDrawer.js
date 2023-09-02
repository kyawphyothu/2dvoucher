import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import AdminRoutes from "../../Utils/SuperAdmin/AdminRoutes";
import { useNavigate } from "react-router-dom";
import { logout } from "../../apiCalls";
import { useContext } from "react";
import { AppContext } from "../../AppContextProvider";

export default function SAdminDrawer(props) {
	const { drawerWidth } = props;
	const { setAuth, setAuthUser } = useContext(AppContext);

	const navigate = useNavigate();

	return (
		<Drawer
			variant="permanent"
			sx={{
				width: drawerWidth,
				flexShrink: 0,
				[`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
			}}>
			<Toolbar />
			<Box sx={{ overflow: "auto" }}>
				<List>
					{AdminRoutes.filter((i) => i.type === "drawer").map((r) => (
						<ListItem key={r.path} disablePadding>
							<ListItemButton onClick={() => navigate(r.path)}>
								<ListItemIcon>{r.icon}</ListItemIcon>
								<ListItemText primary={r.name} />
							</ListItemButton>
						</ListItem>
					))}
					<ListItem disablePadding>
						<ListItemButton
							onClick={() => {
								localStorage.clear();
								setAuth(false);
								setAuthUser({});
								navigate("/login");
							}}>
							<ListItemIcon>{<LogoutRoundedIcon />}</ListItemIcon>
							<ListItemText primary="Logout" />
						</ListItemButton>
					</ListItem>
				</List>
			</Box>
		</Drawer>
	);
}
