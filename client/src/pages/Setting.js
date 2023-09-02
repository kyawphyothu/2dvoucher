import { Box, Button, Divider, Grid, Stack, TextField, Typography } from "@mui/material";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { getTypes, updateGroupDefault, updateTotalLimit } from "../apiCalls";
import { AppContext } from "../AppContextProvider";
import { LocalizationProvider, MobileTimePicker, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

export default function Setting() {
	const { snackNoti, authUser } = useContext(AppContext);

	const [types, setTypes] = useState([]);
	const [totalLimit, setTotalLimit] = useState({});
	const [groupDefault, setGroupDefault] = useState({});

	const handleChangeTotalLimit = (value, type) => {
		setTotalLimit((prev) => {
			const newValue = { ...prev };
			newValue[type] = parseInt(value);
			return newValue;
		});
	};
	const handleUpdateTotalLimit = async () => {
		const result = await updateTotalLimit(totalLimit);

		if (result.ok) {
			snackNoti({ type: "success", msg: result.msg });
		} else {
			snackNoti({ type: "error", msg: result.msg });
		}
	};

	const handleChangeGroupDefault = (lzp, type, value) => {
		setGroupDefault((prev) => {
			const newValue = { ...prev };

			newValue[lzp][type] = parseInt(value);
			return newValue;
		});
	};
	const handleUpdateeGroupDefault = async () => {
		const result = await updateGroupDefault(groupDefault);

		if (result.ok) {
			snackNoti({ type: "success", msg: result.msg });
		} else {
			snackNoti({ type: "error", msg: result.msg });
		}
	};

	useEffect(() => {
		(async () => {
			const resultTypes = await getTypes();
			setTypes(resultTypes);
		})();
	}, []);

	useEffect(() => {
		setTotalLimit(authUser.setting.limit);
		setGroupDefault({
			defaultLimit: authUser.setting.defaultLimit,
			defaultZ: authUser.setting.defaultZ,
			defaultPercent: authUser.setting.defaultPercent,
		});
	}, [authUser]);

	return (
		<Box>
			<Grid container spacing={3}>
				{/* header */}
				<Grid item xs={12}>
					<Typography variant="h5" color="white">
						Setting
					</Typography>
				</Grid>
				{/* content */}
				{/* total */}
				<Grid item md={6} xs={12}>
					<Box className="floatingCard">
						<div>
							<Typography variant="h6">Total</Typography>
							<Typography variant="subtitle2">(Your Total Limit)</Typography>
						</div>
						<Divider sx={{ marginBottom: 2 }} />
						<Grid container spacing={3}>
							<Grid
								item
								xs={4}
								sx={{ textAlign: "right" }}
								display="flex"
								justifyContent="space-between">
								<div style={{ fontWeight: "bold" }}>Types</div>
							</Grid>
							<Grid item xs={8}>
								<div style={{ fontWeight: "bold" }}>Limit</div>
							</Grid>
							{types.map((type) => {
								return (
									<Fragment key={type.code}>
										<Grid item xs={4}>
											<div>{type.name}</div>
										</Grid>
										<Grid item xs={8}>
											<div>
												<TextField
													size="small"
													id="outlined-basic"
													variant="outlined"
													type="number"
													defaultValue={totalLimit[type.code]}
													onChange={(e) => {
														handleChangeTotalLimit(
															e.target.value,
															type.code
														);
													}}
												/>
											</div>
										</Grid>
									</Fragment>
								);
							})}
							<Grid item xs={12} display="flex" justifyContent="flex-end">
								<Button
									variant="contained"
									onClick={() => {
										handleUpdateTotalLimit();
									}}>
									save
								</Button>
							</Grid>
						</Grid>
					</Box>
				</Grid>
				{/* Group default */}
				<Grid item md={6} xs={12}>
					<Box className="floatingCard">
						<Typography variant="h6">Group Default</Typography>
						<Divider sx={{ marginBottom: 2 }} />
						<Grid container spacing={3}>
							{types.map((type) => {
								return (
									<Fragment key={type.code}>
										<Grid item xs={4}>
											<div>{type.name}</div>
										</Grid>
										<Grid item xs={8}>
											<Stack spacing={2}>
												{Object.entries(groupDefault).map(
													([key, value]) => {
														return (
															<TextField
																key={key}
																size="small"
																id="outlined-basic"
																variant="outlined"
																type="number"
																label={key}
																defaultValue={value[type.code]}
																onChange={(e) => {
																	handleChangeGroupDefault(
																		key,
																		type.code,
																		e.target.value
																	);
																}}
															/>
														);
													}
												)}
											</Stack>
										</Grid>
									</Fragment>
								);
							})}
							<Grid item xs={12} display="flex" justifyContent="flex-end">
								<Button
									variant="contained"
									onClick={() => {
										handleUpdateeGroupDefault();
									}}>
									save
								</Button>
							</Grid>
						</Grid>
					</Box>
				</Grid>
				{/* default close time */}
				<Grid item xs={12} md={12}>
					<Box className="floatingCard">
						<Typography variant="h6">Close Time Default</Typography>
						<Divider sx={{ marginBottom: 2 }} />
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<MobileTimePicker
								defaultValue={dayjs("2022-04-17T15:30")}
								onChange={(e) => {
									console.log(JSON.parse(JSON.stringify(e.$d)));
								}}
							/>
						</LocalizationProvider>
					</Box>
				</Grid>
			</Grid>
		</Box>
	);
}
