import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Autocomplete,
	Box,
	Button,
	Divider,
	Grid,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React, { useContext, useEffect, useRef, useState } from "react";
import { createCloseDay, deleteCloseDay, getCloseDays, getOwnGroups } from "../apiCalls";
import { LoadingButton } from "@mui/lab";
import { AppContext } from "../AppContextProvider";
import BsBadge from "../components/BsBadge";

export default function CloseDays() {
	const { snackNoti } = useContext(AppContext);

	const [selectedGroups, setSelectedGroups] = useState([]);
	const [ownGroups, setOwnGroups] = useState([]);
	const [closeDays, setCloseDays] = useState([]);
	const [loadingCreateBtn, setLoadingCreateBtn] = useState(false);

	const dateRef = useRef();

	useEffect(() => {
		(async () => {
			const result = await getOwnGroups();

			if (result.ok) {
				setOwnGroups(result);
			} else {
				console.log(result.msg);
			}

			// get close days
			const close_days = await getCloseDays();
			if (close_days.ok) {
				setCloseDays(close_days);
			} else {
				console.log(close_days.msg);
			}
		})();
	}, []);

	const handleChangeSelectGroup = (e, newValue) => {
		setSelectedGroups(newValue);
	};

	const submitCreateCloseDay = async (e) => {
		e.preventDefault();

		const data = {
			date: dateRef.current.value,
			groups: selectedGroups,
			owner: selectedGroups[0]?.owner,
		};

		if (!data.date) return snackNoti({ type: "warning", msg: "please select date!" });
		if (!data.groups.length) return snackNoti({ type: "warning", msg: "please select group!" });

		const isSameDate = closeDays.filter((cd) => cd.date === data.date);
		if (isSameDate.length)
			return snackNoti({ type: "warning", msg: "this date already created!" });

		setLoadingCreateBtn(true);
		const result = await createCloseDay(data);
		setLoadingCreateBtn(false);
		if (result.ok) {
			data._id = result.id;
			setCloseDays([...closeDays, data]);
			snackNoti({ type: "success", msg: result.msg });

			dateRef.current.value = "";
			setSelectedGroups([]);
		} else {
			snackNoti({ type: "error", msg: result.msg });
		}
	};

	const handleDeleteCloseDay = async (e, id) => {
		e.preventDefault();

		try {
			const result = await deleteCloseDay(id);

			if (result.ok) {
				setCloseDays((prev) => {
					return prev.filter((p) => p._id !== id);
				});
				snackNoti({ type: "success", msg: result.msg });
			} else {
				snackNoti({ type: "error", msg: result.msg });
			}
		} catch (e) {
			//
		}
	};

	return (
		<Grid container spacing={3}>
			{/* create form */}
			<Grid item xs={12} md={6}>
				<Box className="floatingCard">
					<Typography variant="h6">Create Close Day</Typography>
					<Divider sx={{ marginBottom: "16px" }} />
					<form>
						<Stack spacing={2}>
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<MobileDatePicker label="Date" inputRef={dateRef} />
							</LocalizationProvider>
							<Autocomplete
								multiple
								id="tags-outlined"
								options={ownGroups}
								getOptionLabel={(option) => `${option.name} | ${option.type}`}
								filterSelectedOptions
								disableCloseOnSelect
								onChange={handleChangeSelectGroup}
								renderInput={(params) => <TextField {...params} label="Groups" />}
							/>
							<LoadingButton
								loading={loadingCreateBtn}
								variant="contained"
								type="submit"
								onClick={submitCreateCloseDay}>
								save
							</LoadingButton>
						</Stack>
					</form>
				</Box>
			</Grid>
			<Grid item xs={12} md={6}>
				<Box>
					<Typography variant="h6">Close Days</Typography>
					<Divider sx={{ marginBottom: "16px" }} />
					{closeDays.map((cd) => {
						return (
							<Accordion key={cd._id}>
								<AccordionSummary
									expandIcon={<ExpandMoreIcon />}
									aria-controls="panel1a-content"
									id="panel1a-header">
									<Typography>{cd.date}</Typography>
								</AccordionSummary>
								<AccordionDetails>
									<Stack
										spacing={2}
										direction="row"
										useFlexGap
										flexWrap="wrap"
										marginBottom={1}>
										{cd.groups.map((g) => {
											return (
												<BsBadge key={g._id} color="dark">
													{g.name} | {g.type}
												</BsBadge>
											);
										})}
									</Stack>
									<div
										style={{
											width: "100%",
											display: "flex",
											justifyContent: "end",
										}}>
										<Button
											size="small"
											color="error"
											onClick={(e) => handleDeleteCloseDay(e, cd._id)}>
											delete
										</Button>
									</div>
								</AccordionDetails>
							</Accordion>
						);
					})}
				</Box>
			</Grid>
		</Grid>
	);
}
