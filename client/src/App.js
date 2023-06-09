import { useState, useEffect } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation, Redirect } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";

// Material Dashboard 2 React themes
import theme from "assets/theme";

// Material Dashboard 2 React Dark Mode themes
import themeDark from "assets/theme-dark";

// Material Dashboard 2 React routes
import routes from "routes";

// Material Dashboard 2 React contexts
import {
	useMaterialUIController,
	setMiniSidenav,
	setOpenConfigurator,
	setAuth,
	setAuthUser,
} from "context";

import SignIn from "layouts/authentication/sign-in";

// Images
import brandWhite from "assets/images/logo-ct.png";
import brandDark from "assets/images/logo-ct-dark.png";
import Dashboard from "layouts/dashboard";
import { fetchUser } from "apiCalls";
import { Box } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress/LinearProgress";

export default function App() {
	const [isFetchingUser, setIsFetchingUser] = useState(false);

	const [controller, dispatch] = useMaterialUIController();
	const {
		miniSidenav,
		direction,
		layout,
		openConfigurator,
		sidenavColor,
		transparentSidenav,
		whiteSidenav,
		darkMode,
		auth,
		authUser,
	} = controller;
	const [onMouseEnter, setOnMouseEnter] = useState(false);
	const { pathname } = useLocation();

	useEffect(() => {
		(async () => {
			setIsFetchingUser(true);
			const user = await fetchUser();
			setIsFetchingUser(false);
			if (!user) return false;

			setAuthUser(dispatch, user);
			setAuth(dispatch, true);
			return true;
		})();
	}, []);

	// Open sidenav when mouse enter on mini sidenav
	const handleOnMouseEnter = () => {
		if (miniSidenav && !onMouseEnter) {
			setMiniSidenav(dispatch, false);
			setOnMouseEnter(true);
		}
	};

	// Close sidenav when mouse leave mini sidenav
	const handleOnMouseLeave = () => {
		if (onMouseEnter) {
			setMiniSidenav(dispatch, true);
			setOnMouseEnter(false);
		}
	};

	// Change the openConfigurator state
	const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

	// Setting the dir attribute for the body element
	useEffect(() => {
		document.body.setAttribute("dir", direction);
	}, [direction]);

	// Setting page scroll to 0 when changing the route
	useEffect(() => {
		document.documentElement.scrollTop = 0;
		document.scrollingElement.scrollTop = 0;
	}, [pathname]);

	const getRoutes = (allRoutes) =>
		allRoutes.map((route) => {
			if (route.collapse) {
				return getRoutes(route.collapse);
			}

			// if not auth all routes be sign in page
			// if auth and call sign in page redirect dashboard
			if (!auth) {
				return <Route exact path={route.route} element={<SignIn />} key={route.key} />;
			} else if (auth && route.route === "/authentication/sign-in") {
				return (
					<Route
						exact
						path={route.route}
						element={<Navigate to="/dashboard" />}
						key={route.key}
					/>
				);
			} else if (route.route) {
				return <Route exact path={route.route} element={route.component} key={route.key} />;
			}

			return null;
		});

	const configsButton = (
		<MDBox
			display="flex"
			justifyContent="center"
			alignItems="center"
			width="3.25rem"
			height="3.25rem"
			bgColor="white"
			shadow="sm"
			borderRadius="50%"
			position="fixed"
			right="2rem"
			bottom="2rem"
			zIndex={99}
			color="dark"
			sx={{ cursor: "pointer" }}
			onClick={handleConfiguratorOpen}
		>
			<Icon fontSize="small" color="inherit">
				settings
			</Icon>
		</MDBox>
	);

	return isFetchingUser ? (
		<Box>
			<LinearProgress />
		</Box>
	) : (
		<ThemeProvider theme={darkMode ? themeDark : theme}>
			<CssBaseline />
			{layout === "dashboard" && (
				<>
					<Sidenav
						color={sidenavColor}
						brand={
							(transparentSidenav && !darkMode) || whiteSidenav
								? brandDark
								: brandWhite
						}
						brandName={process.env.REACT_APP_NAME}
						routes={routes}
						onMouseEnter={handleOnMouseEnter}
						onMouseLeave={handleOnMouseLeave}
					/>
					<Configurator />
					{configsButton}
				</>
			)}
			{layout === "vr" && <Configurator />}
			<Routes>
				{getRoutes(routes)}
				<Route path="*" element={<Navigate to="/dashboard" />} />
			</Routes>
		</ThemeProvider>
	);
}
