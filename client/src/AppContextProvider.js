import { createContext, useState } from "react";

// Create the AuthContext
export const AppContext = createContext();

// Create the AuthContextProvider component
export const AppContextProvider = ({ children }) => {
	const [auth, setAuth] = useState(false);
	const [authUser, setAuthUser] = useState({});
	const [isOpenDrawer, setIsOpenDrawer] = useState(false);
	const [isSnack, setIsSnack] = useState(false);
	const [snackMsg, setSnackMsg] = useState({});

	const toggleDrawer = (open) => (event) => {
		if (event && event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
			return;
		}

		setIsOpenDrawer(open);
	};

	const snackNoti = ({ type, msg }) => {
		if (isSnack) {
			setIsSnack(false);
			setTimeout(() => {
				setIsSnack(true);
				setSnackMsg({ type, msg });
			}, 200);
		} else {
			setIsSnack(true);
			setSnackMsg({ type, msg });
		}
	};

	const authContextValue = {
		//auth
		auth,
		setAuth,
		authUser,
		setAuthUser,
		//drawer
		isOpenDrawer,
		setIsOpenDrawer,
		toggleDrawer,
		//snack
		isSnack,
		setIsSnack,
		snackMsg,
		setSnackMsg,
		snackNoti,
	};

	return <AppContext.Provider value={authContextValue}>{children}</AppContext.Provider>;
};
