import React from "react";
import { Avatar, Box, Divider, Stack, Typography } from "@mui/material";
import { formatDistanceToNow } from "date-fns";

export default function Chats() {
	return (
		<Stack spacing={3}>
			{[1, 2, 3, 4].map((i) => {
				return (
					<div
						key={i}
						style={{
							width: "100%",
							display: "flex",
							justifyContent: "space-between",
							cursor: "pointer"
						}}>
						<span style={{ marginRight: "8px" }}>
							<Avatar alt="ttt" src="none" />
						</span>
						<span className="overFlow" style={{ flexGrow: 1 }}>
							<Typography variant="subtitle2">Title</Typography>
							<Typography variant="caption">
								member: latest text of the some of the not of the
							</Typography>
						</span>
						<span>
							<Typography variant="caption" style={{ flexWrap: "nowrap" }}>Jan 12</Typography>
						</span>
					</div>
				);
			})}
		</Stack>
	);
}
