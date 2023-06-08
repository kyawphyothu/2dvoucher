// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import {
	Autocomplete,
	CardContent,
	Checkbox,
	FormControl,
	FormControlLabel,
	FormGroup,
	FormLabel,
	Radio,
	RadioGroup,
	TextField,
} from "@mui/material";
import { useRef, useState } from "react";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";

function Add() {
	const [acceptors, setAcceptors] = useState([
		{ label: "မိိမိ အကောင့်", handle: "self" },
		{ label: "Chris", handle: "chris" },
		{ label: "အခြား", handle: "other" },
	]);
	const [betTypes, setBetTypes] = useState([
		{ label: "MM 2D", value: "mm2d" },
		{ label: "3D", value: "3d" },
		{ label: "Dubai 2D", value: "du2d" },
	]);
	const [acceptor, setAcceptor] = useState(acceptors[0]);
	const [betType, setBetType] = useState(betTypes[0]);
	const bets = useRef();

	const { columns, rows } = authorsTableData();
	const { columns: pColumns, rows: pRows } = projectsTableData();

	const handleChangeAcceptor = (event, value) => {
		setAcceptor(value);
	};
	const handleChangeBetType = (event, value) => {
		setBetType(value);
	};

	return (
		<DashboardLayout>
			<DashboardNavbar />
			<MDBox pt={6} pb={3} sx={{ width: { md: "50%" } }}>
				<Grid container spacing={6}>
					<Grid item xs={12}>
						<Card>
							<MDBox p={3}>
								{/* form for adding */}
								<form
									onSubmit={(e) => {
										e.preventDefault();
										console.log(acceptor.handle);
									}}
								>
									<FormControl sx={{ width: "100%" }}>
										<FormLabel>MM 2D ထိုးမည်</FormLabel>
										<FormGroup>
											<Grid
												container
												spacing={3}
												sx={{ marginTop: "5px" }}
												rowSpacing={2}
												columnSpacing={1}
											>
												<Grid
													item
													sx={{ display: "flex", alignItems: "center" }}
													md={12}
													xs={12}
												>
													<Autocomplete
														disablePortal
														id="acceptors"
														options={acceptors}
														sx={{ width: "100%" }}
														value={acceptor}
														defaultValue={acceptor}
														onChange={handleChangeAcceptor}
														renderInput={(params) => (
															<TextField
																{...params}
																label="လက်ခံသူ"
															/>
														)}
													/>
												</Grid>
												{acceptor.handle === "other" && (
													<Grid
														item
														sx={{
															display: "flex",
															alignItems: "center",
														}}
														md={12}
														xs={12}
													>
														<TextField
															id="bettorName"
															label="လက်ခံသူအမည်"
															variant="outlined"
															fullWidth
														/>
													</Grid>
												)}
												<Grid
													item
													sx={{ display: "flex", alignItems: "center" }}
													md={12}
													xs={12}
												>
													<Autocomplete
														disablePortal
														id="types"
														options={betTypes}
														sx={{ width: "100%" }}
														value={betType}
														defaultValue={betType}
														onChange={handleChangeBetType}
														renderInput={(params) => (
															<TextField
																{...params}
																label="အမျိုးအစား"
															/>
														)}
													/>
												</Grid>
												<Grid
													item
													sx={{ display: "flex", alignItems: "center" }}
													md={12}
													xs={12}
												>
													<TextField
														id="bettorName"
														label="ထိုးသားအမည်(အမြဲမလိုအပ်ပါ)"
														variant="outlined"
														helperText="optional"
														fullWidth
													/>
												</Grid>
											</Grid>
											<TextField
												required
												id="outlined-multiline-static"
												label="2D 3D"
												multiline
												rows={4}
												inputRef={bets}
												sx={{ marginY: "20px" }}
												// defaultValue={default2D3D}
											/>
											<Grid container>
												<Grid item xs={12} md={1}>
													<MDButton
														variant="contained"
														color="info"
														fullWidth
														type="submit"
													>
														Calculate
													</MDButton>
												</Grid>
											</Grid>
										</FormGroup>
									</FormControl>
								</form>
								{/* add form end */}
							</MDBox>
						</Card>
					</Grid>
				</Grid>
			</MDBox>
			<MDBox pt={6} pb={3}>
				<Grid container spacing={6}>
					<Grid item xs={12}>
						<Card>
							<MDBox
								mx={2}
								mt={-3}
								py={3}
								px={2}
								variant="gradient"
								bgColor="info"
								borderRadius="lg"
								coloredShadow="info"
							>
								<MDTypography variant="h6" color="white">
									Authors Table
								</MDTypography>
							</MDBox>
							<MDBox pt={3}>
								<DataTable
									table={{ columns, rows }}
									isSorted={false}
									entriesPerPage={false}
									showTotalEntries={false}
									noEndBorder
								/>
							</MDBox>
						</Card>
					</Grid>
					<Grid item xs={12}>
						<Card>
							<MDBox
								mx={2}
								mt={-3}
								py={3}
								px={2}
								variant="gradient"
								bgColor="info"
								borderRadius="lg"
								coloredShadow="info"
							>
								<MDTypography variant="h6" color="white">
									Projects Table
								</MDTypography>
							</MDBox>
							<MDBox pt={3}>
								<DataTable
									table={{ columns: pColumns, rows: pRows }}
									isSorted={false}
									entriesPerPage={false}
									showTotalEntries={false}
									noEndBorder
								/>
							</MDBox>
						</Card>
					</Grid>
				</Grid>
			</MDBox>
			<Footer />
		</DashboardLayout>
	);
}

export default Add;
