import { Button } from "@mui/material";
import React, { useContext } from "react";
import { AppContext } from "../../AppContextProvider";

export default function Dashboard() {
	const { snackNoti } = useContext(AppContext);

	return (
		<div>
			<Button onClick={() => {
        snackNoti({type: "success", msg: "hello"})
      }}>Click</Button>
			<Button onClick={() => {
        snackNoti({type: "error", msg: "some error occur"})
      }}>Click</Button>

		</div>
	);
}
