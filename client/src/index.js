import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AppContextProvider } from "./AppContextProvider";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme, responsiveFontSizes } from "@mui/material";
import {
	amber,
	blue,
	brown,
	cyan,
	deepOrange,
	deepPurple,
	green,
	indigo,
	lime,
	purple,
	red,
	teal,
	yellow,
} from "@mui/material/colors";

let theme = createTheme({
	palette: {
		mode: "dark",
		background: {
			default: "#1a2035",
			paper: "#1a2035",
		},
		app: {
			color: "#ffffff",
			// background: "#1a2035",
		},
		appbar: {
			background: "#001f3f",
		},
		logo: {
			color: "white",
		},
		type: {
			mm: teal[900],
			"3d": deepPurple[900],
			du: cyan[900],
			mega: deepOrange[900],
			ga: amber[500],
		},
	},
});
theme = responsiveFontSizes(theme);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<AppContextProvider>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</AppContextProvider>
		</ThemeProvider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
