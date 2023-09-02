import * as React from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import SAdminDrawer from "../../components/superadmin/SAdminDrawer";

const drawerWidth = 240;

export default function Main({ children }) {
	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			<AppBar
				position="fixed"
				sx={{
					zIndex: (theme) => theme.zIndex.drawer + 1,
				}}>
				<Toolbar>
					<Typography variant="h6" noWrap component="div">
						{process.env.REACT_APP_NAME}
					</Typography>
				</Toolbar>
			</AppBar>
			{/* superadmin drawer */}
			<SAdminDrawer drawerWidth={drawerWidth} />
			<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
				<Toolbar />
				{children}
			</Box>
		</Box>
	);
}
