import { BorderColor } from "@mui/icons-material";
import React from "react";

export default function BsBadge({ children, color = "primary", sx, variant = "contained" }) {
	return <span style={{ ...style.badge, ...style[color], ...sx }}>{children}</span>;
}

const style = {
	badge: {
		display: "inlineBlock",
		padding: ".25em .4em",
		fontSize: "75%",
		fontWeight: "700",
		lineHeight: "1",
		textAlign: "center",
		whiteSpace: "nowrap",
		verticalAlign: "baseline",
		borderRadius: ".25rem",
	},
	primary: {
		color: "#fff",
		backgroundColor: "#007bff",
	},
	success: {
		color: "#fff",
		backgroundColor: "#28a745",
	},
	error: {
		color: "#fff",
		backgroundColor: "#dc3545",
	},
	warning: {
		color: "#212529",
		backgroundColor: "#ffc107",
	},
	info: {
		color: "#fff",
		backgroundColor: "#17a2b8",
	},
	dark: {
		color: "rgb(209 213 219/1)",
		backgroundColor: "rgb(55 65 81/1"
	}
};
