import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../AppContextProvider";
import { pages, routes } from "../Utils/routesAndPages";
import * as pic from "../assets/profilePic/profilePic";
import UserRoutes from "../Utils/User/UserRoutes";

// const settings = ["Profile", "Setting", "Logout"];

function Header() {
	const { setAuth, setAuthUser, authUser } = React.useContext(AppContext);
	const { toggleDrawer } = React.useContext(AppContext);
	const [anchorElUser, setAnchorElUser] = React.useState(null);

	const navigate = useNavigate();
	const location = useLocation();

	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};
	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};
	const handleLogout = () => {
		localStorage.clear();
		setAuth(false);
		setAuthUser({});
		navigate("/login");
	};

	return (
		<AppBar position="sticky" sx={{ top: 0, backgroundColor: "appbar.background" }}>
			<Container maxWidth="md">
				<Toolbar disableGutters>
					<AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
					<Typography
						variant="h6"
						noWrap
						component="a"
						href="/"
						sx={{
							mr: 2,
							display: { xs: "none", md: "flex" },
							fontFamily: "monospace",
							fontWeight: 700,
							letterSpacing: ".3rem",
							color: "logo.color",
							textDecoration: "none",
						}}>
						{process.env.REACT_APP_NAME.replace(" ", "")}
					</Typography>

					<Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={toggleDrawer(true)}
							color="inherit">
							<MenuIcon />
						</IconButton>
					</Box>
					<AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
					<Typography
						variant="h5"
						noWrap
						component="a"
						href="/"
						sx={{
							mr: 2,
							display: { xs: "flex", md: "none" },
							flexGrow: 1,
							fontFamily: "monospace",
							fontWeight: 700,
							letterSpacing: ".1rem",
							color: "logo.color",
							textDecoration: "none",
						}}>
						{process.env.REACT_APP_NAME.replace(" ", "")}
					</Typography>
					<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
						{UserRoutes.filter((i) => i.type === "drawer").map((r) => {
							return (
								<Button
									key={r.path}
									onClick={() => {
										toggleDrawer(false);
										navigate(r.path);
									}}
									sx={{ my: 2, color: "white", display: "block" }}>
									{r.name}
								</Button>
							);
						})}
					</Box>

					<Box sx={{ flexGrow: 0 }}>
						<Tooltip title="Open settings">
							<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
								<Avatar alt={authUser.name} src={pic[authUser.picture]} />
							</IconButton>
						</Tooltip>
						<Menu
							sx={{ mt: "45px" }}
							id="menu-appbar"
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}>
							<MenuItem
								onClick={() => {
									handleCloseUserMenu();
									navigate("/profile");
								}}>
								<Typography textAlign="center">Profile</Typography>
							</MenuItem>
							<MenuItem
								onClick={() => {
									handleCloseUserMenu();
									navigate("/setting");
								}}>
								<Typography textAlign="center">Setting</Typography>
							</MenuItem>
							<MenuItem
								onClick={() => {
									handleCloseUserMenu();
									handleLogout();
								}}>
								<Typography textAlign="center">Logout</Typography>
							</MenuItem>
						</Menu>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
export default Header;
