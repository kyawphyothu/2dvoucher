import { createContext, useState } from "react";

// Create the AuthContext
export const AppContext = createContext();

// Create the AuthContextProvider component
export const AppContextProvider = ({ children }) => {
	const [auth, setAuth] = useState(false);
	const [authUser, setAuthUser] = useState({});

	const authContextValue = {
		auth,
		setAuth,
		authUser,
		setAuthUser,
	};

	return <AppContext.Provider value={authContextValue}>{children}</AppContext.Provider>;
};
