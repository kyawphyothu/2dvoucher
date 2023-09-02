import { useContext, useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Box, Container, CssBaseline, Fab, LinearProgress } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { AppContext } from "./AppContextProvider";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Header from "./components/Header";
import { Ads } from "./components/Ads";
import NotFound from "./Utils/NotFound";
import { fetchUser } from "./apiCalls";
import UserDrawer from "./components/UserDrawer";
import SnackMessage from "./components/SnackMessage";
import Main from "./pages/superadmin/Main";
import AdminRoutes from "./Utils/SuperAdmin/AdminRoutes";
import UserRoutes from "./Utils/User/UserRoutes";

function App() {
	const { auth, setAuth, authUser, setAuthUser } = useContext(AppContext);
	const location = useLocation();
	const navigate = useNavigate();

	const [isFetchingUser, setIsFetchingUser] = useState(false);

	useEffect(() => {
		(async () => {
			setIsFetchingUser(true);
			const user = await fetchUser();
			setIsFetchingUser(false);
			if (!user._id) return false;
			setAuthUser(user);
			setAuth(true);
		})();
	}, []);

	return auth && authUser.role === "superadmin" ? (
		<Main>
			<Routes>
				{AdminRoutes.map((r) => {
					return <Route key={r.path} path={r.path} element={r.element} />;
				})}
			</Routes>

			<SnackMessage />
		</Main>
	) : (
		<Box>
			<CssBaseline />
			{isFetchingUser ? (
				<LinearProgress />
			) : (
				<>
					{location.pathname !== "/login" && location.pathname !== "/signup" ? (
						<>
							<Header />
							<UserDrawer />
						</>
					) : (
						""
					)}
					<Container maxWidth="md">
						{auth && <Ads />}
						<Box paddingBottom="100px">
							<Routes>
								{auth && (
									<>
										{UserRoutes.map((r) => {
											return (
												<Route
													key={r.path}
													path={r.path}
													element={r.element}
												/>
											);
										})}
									</>
								)}
								<Route
									path="/login"
									element={!auth ? <Login /> : <Navigate to="/" />}
								/>
								<Route
									path="/signup"
									element={!auth ? <Signup /> : <Navigate to="/" />}
								/>

								<Route path="*" element={<NotFound />} />
							</Routes>
						</Box>
						{auth && !["/add", "/login", "/signup"].includes(location.pathname) && (
							<Fab
								color="info"
								sx={{
									position: "fixed",
									bottom: "40px",
									right: "40px",
								}}
								onClick={() => {
									navigate("/add");
								}}>
								<AddIcon />
							</Fab>
						)}

						<SnackMessage />
					</Container>
				</>
			)}
		</Box>
	);
}

export default App;
