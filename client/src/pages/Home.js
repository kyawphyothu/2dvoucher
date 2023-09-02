import { useState } from "react";
import {
	Box,
	Button,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	Typography,
} from "@mui/material";

const Home = () => {
	const [types, setTypes] = useState([
		{ code: "mm2d", name: "MM 2D" },
		{ code: "3d", name: "3D" },
	]);
	const [type, setType] = useState("");
	const [hours, setHours] = useState(["12:00", "16:00"]);
	const [hour, setHour] = useState("");

	const handleChangeType = (event) => {
		setType(event.target.value);
	};
	const handleChangeHour = (event) => {
		setHour(event.target.value);
	};

	return (
		<Grid container spacing={3} rowSpacing={0}>
			<Grid item xs={12} md={8}>
				<Box
					className="floatingCard"
					sx={{
						display: "flex",
						alignItems: "center",
						flexWrap: "wrap",
						color: "#ffffff",
					}}>
					<FormControl sx={{ m: 1, minWidth: 100 }} size="small">
						<InputLabel id="demo-select-small-label">Type</InputLabel>
						<Select
							// sx={{ color: "white" }}
							labelId="demo-select-small-label"
							id="demo-select-small"
							value={type}
							label="Age"
							onChange={handleChangeType}>
							<MenuItem value="">
								<em>None</em>
							</MenuItem>
							{types.map((t) => {
								return (
									<MenuItem key={t.code} value={t.code}>
										<em>{t.name}</em>
									</MenuItem>
								);
							})}
						</Select>
					</FormControl>
					<FormControl sx={{ m: 1, minWidth: 100 }} size="small">
						<InputLabel id="demo-select-small-label">Hour</InputLabel>
						<Select
							labelId="demo-select-small-label"
							id="demo-select-small"
							value={hour}
							label="Age"
							onChange={handleChangeHour}>
							<MenuItem value="">
								<em>None</em>
							</MenuItem>
							{hours.map((h, index) => {
								return (
									<MenuItem key={index} value={index}>
										<em>{h}</em>
									</MenuItem>
								);
							})}
						</Select>
					</FormControl>
					<div style={{ flexGrow: 1, display: "flex", justifyContent: "end" }}>
						<Button variant="contained" size="small">
							Search
						</Button>
					</div>
				</Box>
			</Grid>
			<Grid item xs={12} md={4}>
				<Box className="floatingCard">
					<Typography variant="h6">Limit</Typography>
					<Typography sx={{ fontWeight: "bold", color: "#864b00" }}>1,200,000</Typography>
				</Box>
			</Grid>
		</Grid>
	);
};

export default Home;
