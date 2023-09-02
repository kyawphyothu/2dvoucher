import {
	Box,
	Divider,
	FormControl,
	Grid,
	IconButton,
	InputLabel,
	MenuItem,
	Select,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import { LocalizationProvider, MobileDatePicker, MobileTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useContext, useEffect, useRef, useState } from "react";
import { createWinNumber, deleteWinNumberById, getTypes, getWinNumberByType } from "../apiCalls";
import { LoadingButton } from "@mui/lab";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { AppContext } from "../AppContextProvider";

export default function WinNumber() {
	const { snackNoti } = useContext(AppContext);

	const [types, setTypes] = useState([]);
	const [type, setType] = useState("");
	const [searchType, setSearchType] = useState("");
	const [time, setTime] = useState("");
	const [loadingSaveBtn, setLoadingSaveBtn] = useState(false);
	const [winNumbers, setWinNumbers] = useState([]);

	const dateRef = useRef(null);
	const numberRef = useRef("");

	useEffect(() => {
		(async () => {
			const result = await getTypes();

			setTypes(result);
		})();
	}, []);

	const handleChangeType = (e) => {
		setType(e.target.value);
		setTime("");
	};
	const handleChangeTime = (e) => {
		setTime(e.target.value);
	};
	const handleChangeSearchType = async (e) => {
		setSearchType(e.target.value);

		setWinNumbers([]);
		const result = await getWinNumberByType(e.target.value);
		if (result.ok) {
			setWinNumbers(result);
		} else {
			snackNoti({ type: "error", msg: result.msg });
		}
	};
	const saveWinNumber = async () => {
		const data = {
			type: type,
			date: dateRef.current.value,
			time: time,
			number: numberRef.current.value,
		};

		if (!data.type || !data.date || !data.time || !data.number) {
			return snackNoti({ type: "warning", msg: "complete all data!" });
		}
		if (data.number.length < 2) {
			return snackNoti({ type: "warning", msg: "number need 2 digit" });
		}

		setLoadingSaveBtn(true);
		const result = await createWinNumber(data);
		setLoadingSaveBtn(false);
		if (result.ok) {
			if (searchType === data.type) {
				data._id = result.id;
				setWinNumbers((prev) => {
					return [data, ...prev];
				});
			}

			snackNoti({ type: "success", msg: result.msg });
		} else {
			snackNoti({ type: "error", msg: result.msg });
		}
	};
	const deleteWinNumber = async (id) => {
		const result = await deleteWinNumberById(id);

		if (result.ok) {
			snackNoti({ type: "success", msg: result.msg });

			setWinNumbers(() => {
				return winNumbers.filter((wn) => wn._id !== id);
			});
		} else {
			snackNoti({ type: "error", msg: result.msg });
		}
	};

	return (
		<Grid container paddingBottom="100px" spacing={3}>
			{/* left create form */}
			<Grid item xs={12} md={6}>
				<Box className="floatingCard">
					<Typography variant="h6">Create Win Number</Typography>
					<Divider sx={{ marginBottom: 2 }} />
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<Stack spacing={2}>
							<MobileDatePicker label="Date" inputRef={dateRef} />
							<FormControl fullWidth>
								<InputLabel id="demo-simple-select-label">Type</InputLabel>
								<Select
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									value={type}
									label="Type"
									onChange={handleChangeType}>
									{types.map((t) => {
										return (
											<MenuItem key={t._id} value={t.code}>
												{t.name}
											</MenuItem>
										);
									})}
								</Select>
							</FormControl>
							<FormControl fullWidth>
								<InputLabel id="demo-simple-select-label">Time</InputLabel>
								<Select
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									value={time}
									label="Time"
									onChange={handleChangeTime}>
									{types.length &&
										type &&
										types
											.filter((t) => t.code === type)[0]
											.resultTime.map((rt) => {
												return (
													<MenuItem key={rt} value={rt}>
														{rt}
													</MenuItem>
												);
											})}
								</Select>
							</FormControl>
							<TextField
								label="Number"
								inputRef={numberRef}
								type="number"
								required
								inputProps={{ max: 99, min: 0 }}
							/>
							<LoadingButton
								loading={loadingSaveBtn}
								variant="contained"
								onClick={saveWinNumber}>
								save
							</LoadingButton>
						</Stack>
					</LocalizationProvider>
				</Box>
			</Grid>
			{/* right list */}
			<Grid item xs={12} md={6}>
				<Stack spacing={2}>
					<Box sx={{ display: "grid", placeItems: "center" }}>
						<FormControl sx={{ minWidth: 120 }} size="small">
							<InputLabel id="demo-simple-select-label">Type</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={searchType}
								label="Type"
								onChange={handleChangeSearchType}>
								{types.map((t) => {
									return (
										<MenuItem key={t._id} value={t.code}>
											{t.name}
										</MenuItem>
									);
								})}
							</Select>
						</FormControl>
					</Box>
					{winNumbers.map((wn) => {
						return (
							<Box key={wn._id} className="floatingCard">
								<div style={{ display: "flex", justifyContent: "space-between" }}>
									<div>
										<Typography variant="subtitle1">
											{wn.date} {wn.time}
										</Typography>
										<Typography variant="h6">{wn.number}</Typography>
									</div>
									<div>
										<IconButton
											color="error"
											onClick={() => {
												deleteWinNumber(wn._id);
											}}>
											<DeleteRoundedIcon />
										</IconButton>
									</div>
								</div>
							</Box>
						);
					})}
				</Stack>
			</Grid>
		</Grid>
	);
}
