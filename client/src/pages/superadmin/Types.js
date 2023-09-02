import { Button, Divider, FormControl, Grid, Stack, TextField, Typography } from "@mui/material";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import React, { useRef, useState } from "react";

export default function Types() {
	const [noOfResultTimes, setNoOfResultTimes] = useState([""]);
	const [time, setTime] = useState([]);

	const submitCreateType = () => {
		console.log(time);
	};

	return (
		<Grid container>
			{/* left create form */}
			<Grid item xs={4}>
				<div className="floatingCard">
					<Typography variant="h6">Create Type</Typography>
					<Divider sx={{ marginBottom: 2 }} />
					<Stack spacing={3}>
						<TextField label="Name" fullWidth />
						<TextField label="Code" fullWidth />
						<TextField label="Color" type="color" fullWidth />
						<TextField
							type="number"
							label="No. of Result Times"
							defaultValue={1}
							InputProps={{ inputProps: { min: 1 } }}
							onChange={(e) => {
								if (e.target.value < 1) return;

								const newArr = new Array(parseInt(e.target.value)).fill(0);

								setNoOfResultTimes(newArr);
							}}
						/>
						<LocalizationProvider dateAdapter={AdapterDayjs} sx={{ width: "100%" }}>
							{noOfResultTimes.map((i, index) => {
								return (
									<TimePicker
										key={index}
										ampm={false}
										onChange={(e) => {
											const newResult = time;
											newResult[index] = `${e.$H < 10 ? "0" : ""}${e.$H}:${
												e.$m < 10 ? "0" : ""
											}${e.$m}`;

											setTime(newResult);
										}}
									/>
								);
							})}
						</LocalizationProvider>
						<Button
							variant="contained"
							onClick={() => {
								submitCreateType();
							}}>
							save
						</Button>
					</Stack>
				</div>
			</Grid>
			{/* right show table */}
			<Grid item xs={8}></Grid>
		</Grid>
	);
}
