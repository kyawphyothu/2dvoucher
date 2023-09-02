import {
	Box,
	Button,
	Divider,
	Fade,
	FormControl,
	InputLabel,
	MenuItem,
	OutlinedInput,
	Select,
	TextField,
	Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { useEffect, useRef, useState } from "react";
import stringToCalculteArr from "../Utils/CalculateFromString/script";

export default function Add() {
	const [acceptors, setAcceptors] = useState([
		{ label: "မိမိ အကောင့်", handle: "self" },
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

	const acceptorNameRef = useRef();
	const bettorNameRef = useRef();
	const betRef = useRef();

	const handleChangeAcceptor = (event) => {
		setAcceptor(...acceptors.filter((i) => i.handle === event.target.value));
	};
	const handleChangeBetType = (e) => {
		setBetType(...betTypes.filter((i) => i.value === e.target.value));
	};
	const handleCalculate = () => {
		const data = {
			acceptor: acceptor.handle,
			acceptorName: acceptor.handle === "other" ? acceptorNameRef.current.value : "",
			bettorName: bettorNameRef.current.value,
			betType: betType.value,
			bet: betRef.current.value,
		};
		const res = stringToCalculteArr(betRef.current.value);
		console.log(res);
	};

	return (
		<Box sx={{ display: "flex", justifyContent: "center" }}>
			<Box
				sx={{
					width: { md: "50%", xs: "90%" },
					backgroundColor: grey[300],
					borderRadius: "20px",
					padding: "30px",
				}}>
				<Typography variant="h5">စာရင်းတင်မည်</Typography>
				<Divider sx={{ marginY: "20px" }} />
				<FormControl fullWidth sx={{ marginBottom: "20px" }}>
					<InputLabel id="acceptor-select">လက္ခံသူ</InputLabel>
					<Select
						labelId="acceptor-select"
						id="acceptor-select-id"
						defaultValue={acceptor.handle}
						value={acceptor.handle}
						label="လက္ခံသူ"
						onChange={handleChangeAcceptor}>
						{acceptors.map((i) => {
							return (
								<MenuItem key={i.handle} value={i.handle}>
									{i.label}
								</MenuItem>
							);
						})}
					</Select>
				</FormControl>
				<Fade in={acceptor.handle === "other"} timeout={500}>
					<TextField
						id="acceptorName"
						label="လက်ခံသူအမည်"
						variant="outlined"
						inputRef={acceptorNameRef}
						fullWidth
					/>
				</Fade>
				<FormControl fullWidth sx={{ marginY: "20px" }}>
					<InputLabel id="betType-select">အမျိုးအစား</InputLabel>
					<Select
						labelId="betType-select"
						id="betType-select-id"
						defaultValue={betType.value}
						value={betType.value}
						label="အမျိုးအစား"
						onChange={handleChangeBetType}>
						{betTypes.map((i) => {
							return (
								<MenuItem key={i.value} value={i.value}>
									{i.label}
								</MenuItem>
							);
						})}
					</Select>
				</FormControl>
				<TextField
					id="bettorName"
					label="ထိုးသားအမည်(အမြဲမလိုအပ်ပါ)"
					variant="outlined"
					helperText="optional"
					inputRef={bettorNameRef}
					fullWidth
				/>
				<TextField
					required
					id="outlined-multiline-static"
					label="ထိုးကွက်များ"
					multiline
					rows={4}
					inputRef={betRef}
					sx={{ marginY: "20px" }}
					fullWidth
				/>
				<Button variant="contained" fullWidth onClick={handleCalculate}>
					Calculate
				</Button>
			</Box>
		</Box>
	);
}
