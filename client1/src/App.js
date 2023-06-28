import { useContext, useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import { AppContext } from "./AppContextProvider";
import Header from "./components/Header";
import { Box, Container, Fab, LinearProgress } from "@mui/material";
import { Add as AddIcon, Height, Home } from "@mui/icons-material";
import NotFound from "./Utils/NotFound";
import Add from "./pages/Add";
import { fetchUser } from "./apiCalls";

function App() {
	const { auth, setAuth, setAuthUser } = useContext(AppContext);
	const location = useLocation();
	const navigate = useNavigate();

	const [isFetchingUser, setIsFetchingUser] = useState(false);

	useEffect(() => {
		(async () => {
			setIsFetchingUser(true);
			const user = await fetchUser();
			setIsFetchingUser(false);
			if (!user) return false;
			setAuthUser(user);
			setAuth(true);
		})();
	}, []);

	return (
		<Box sx={{ height: "100vh"}}>
			{isFetchingUser ? (
				<LinearProgress />
			) : (
				<>
					{location.pathname !== "/login" && location.pathname !== "/signup" ? (
						<Header />
					) : (
						""
					)}
					<Container sx={{ marginTop: "30px" }}>
						<Routes>
							{auth && (
								<>
									<Route path="/" element={<Home />} />
									<Route path="/add" element={<Add />} />
								</>
							)}
							<Route
								path="/login"
								element={!auth ? <Login /> : <Navigate to="/" />}
							/>
							<Route path="/signup" element={<Signup />} />

							<Route path="*" element={<NotFound />} />
						</Routes>
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
					</Container>
				</>
			)}
		</Box>
	);
}

export default App;
