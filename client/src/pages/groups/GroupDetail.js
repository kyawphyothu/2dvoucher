import React, { useContext, useEffect, useState } from "react";
import {
	Box,
	Button,
	Divider,
	FormControl,
	Grid,
	IconButton,
	InputLabel,
	MenuItem,
	Select,
	Skeleton,
	TextField,
	Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import CusDataTable from "../../components/CusDataTable";
import { AppContext } from "../../AppContextProvider";
import { getGroupById } from "../../apiCalls";

export default function GroupDetail() {
	const { id } = useParams();
	const { authUser, snackNoti } = useContext(AppContext);

	const [group, setGroup] = useState({});
	const [isOwner, setIsOwner] = useState(false);
	const [isAdmin, setIsAdmin] = useState(false);
	const [isFetching, setIsFetching] = useState(true);

	useEffect(() => {
		const getGroup = async (id) => {
			const result = await getGroupById(id);

			setIsFetching(false);

			if (!result.ok) {
				return snackNoti({ type: "error", msg: result.msg });
			}

			setGroup(result);

			if (result.owner === authUser.handle) {
				setIsOwner(true);
			} else if (result.admin === authUser.handle) {
				setIsAdmin(true);
			}
		};

		getGroup(id);
	}, []);

	useEffect(() => {
		if(!isOwner && !isAdmin){
			HistoryColumns.push({
				name: "Action",
			})
		}
	}, [])

	const HistoryColumns = [
		{
			name: "Name",
			selector: (row) => row.title,
			sortable: true,
		},
		{
			name: "Total Amt",
			selector: (row) => row.year,
			sortable: true,
		},
	];
	const HistoryData = [
		{
			id: 1,
			title: "Beetlejuice",
			year: "1988",
		},
		{
			id: 2,
			title: "Ghostbusters",
			year: "1984",
		},
	];
	const VoucherColumns = [
		{
			name: "Number",
			selector: (row) => row.title,
			sortable: true,
		},
		{
			name: "Price",
			selector: (row) => row.year,
			sortable: true,
		},
	];
	const VoucherData = [
		{
			id: 1,
			title: "Beetlejuice",
			year: "1988",
		},
		{
			id: 2,
			title: "Ghostbusters",
			year: "1984",
		},
	];

	return (
		<Box>
			<Grid container spacing={3}>
				{/* head */}
				<Grid item xs={12} display="flex" justifyContent="space-between">
					<div style={{ display: "flex", alignItems: "center" }}>
						<IconButton
							onClick={() => {
								window.history.back();
							}}>
							<ArrowBackIosRoundedIcon />
						</IconButton>
						{isFetching ? (
							<Skeleton variant="text" sx={{ fontSize: "1rem", width: "100px" }} />
						) : (
							<Typography variant="h6" sx={{ color: "app.color" }}>
								{group.name}
							</Typography>
						)}
					</div>
					<div>
						<IconButton
							onClick={() => {
								console.log("open group setting");
							}}>
							<SettingsRoundedIcon />
						</IconButton>
					</div>
				</Grid>
				{/* history */}
				<Grid item xs={12} md={8}>
					<Box className="floatingCard">
						<Typography variant="h6">History</Typography>
						<Divider sx={{ marginBottom: 2 }} />
						{/* form */}
						<div
							style={{
								marginBottom: "24px",
								display: "flex",
								justifyContent: "space-between",
								flexWrap: "wrap",
								alignItems: "center",
							}}>
							<FormControl sx={{ m: 1, minWidth: 120, maxWidth: 150 }}>
								<LocalizationProvider dateAdapter={AdapterDayjs}>
									<DatePicker
										defaultValue={dayjs(new Date())}
										slotProps={{ textField: { size: "small" } }}
										label="MM/DD/YYYY"
									/>
								</LocalizationProvider>
							</FormControl>
							<FormControl sx={{ m: 1, minWidth: 120 }} size="small">
								<InputLabel id="demo-select-small-label">Time</InputLabel>
								<Select
									// value={age}
									label="Time"
									// onChange={handleChange}
								>
									<MenuItem value="">
										<em>None</em>
									</MenuItem>
								</Select>
							</FormControl>
							<Button variant="contained" sx={{ m: 1 }} size="small">
								search
							</Button>
						</div>
						{/* datatable */}
						<CusDataTable columns={HistoryColumns} data={HistoryData} expandableRows />
					</Box>
				</Grid>
				{/* Voucher */}
				<Grid item xs={12} md={4}>
					<Box className="floatingCard">
						<Typography variant="h6">Voucher</Typography>
						<Divider sx={{ marginBottom: 2 }} />
						<Typography variant="subtitle1">{"This is Searched Name"}</Typography>
						<CusDataTable columns={VoucherColumns} data={VoucherData} />
					</Box>
				</Grid>
			</Grid>
		</Box>
	);
}
