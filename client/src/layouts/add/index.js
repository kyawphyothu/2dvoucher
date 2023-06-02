/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import {
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
import { useRef } from "react";
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
	const { columns, rows } = authorsTableData();
	const { columns: pColumns, rows: pRows } = projectsTableData();

	const bets = useRef();

	return (
		<DashboardLayout>
			<DashboardNavbar />
			<MDBox pt={6} pb={3}>
				<Grid container spacing={6}>
					<Grid item xs={12}>
						<Card>
							<MDBox p={3}>
								{/* form for adding */}
								<form
									onSubmit={(e) => {
										e.preventDefault();
										console.log("hello");
									}}
								>
									<FormControl sx={{ width: "100%" }}>
										<FormLabel>MM 2D ထိုးမည်</FormLabel>
										<FormGroup>
											<Grid
												container
												spacing={3}
												sx={{ marginTop: "5px" }}
												rowSpacing={1}
												columnSpacing={1}
											>
												<Grid
													item
													sx={{ display: "flex", alignItems: "center" }}
													xs={12}
													md={4}
												>
													<FormControlLabel
														control={<Checkbox />}
														label="အရင်က ထိုးထားဖူးသူ?"
													/>
												</Grid>
												<Grid item xs={12} md={8}>
													<TextField
														fullWidth
														label="Name"
														id="name"
														sx={{ marginY: "20px" }}
													/>
												</Grid>
											</Grid>
											<Card sx={{ marginBottom: "20px" }}>
												<CardContent>
													<RadioGroup
														row
														aria-labelledby="demo-row-radio-buttons-group-label"
														name="row-radio-buttons-group"
														sx={{
															display: "flex",
															justifyContent: "space-evenly",
														}}
														defaultValue="mm2d"
													>
														<FormControlLabel
															value="mm2d"
															control={<Radio />}
															label="MM 2D"
															sx={{
																backgroundColor: "#ffdf0096",
																borderRadius: "20px",
																paddingRight: "10px",
															}}
														/>
														<FormControlLabel
															value="du2d"
															control={<Radio />}
															label="Dubai 2D"
															sx={{
																// backgroundColor: "#ffdf0096",
																border: "1px solid #ffdf0096",
																borderRadius: "20px",
																paddingRight: "10px",
															}}
														/>
														<FormControlLabel
															value="ga2d"
															control={<Radio />}
															label="GA 2D"
															sx={{
																// backgroundColor: "#ffdf0096",
																border: "1px solid #ffdf0096",
																borderRadius: "20px",
																paddingRight: "10px",
															}}
														/>
														<FormControlLabel
															value="mg2d"
															control={<Radio />}
															label="Mega 2D"
														/>
														<FormControlLabel
															value="3d"
															control={<Radio />}
															label="3D"
														/>
													</RadioGroup>
												</CardContent>
											</Card>
											<LocalizationProvider dateAdapter={AdapterDayjs}>
												<MobileDateTimePicker
													defaultValue={dayjs("2022-04-17T15:30")}
												/>
											</LocalizationProvider>
											<TextField
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
														Save
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
