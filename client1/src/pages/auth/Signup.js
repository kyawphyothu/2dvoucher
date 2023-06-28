import {
	Box,
	Button,
	Checkbox,
	Container,
	FormControlLabel,
	Grid,
	TextField,
	Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { grey } from "@mui/material/colors";

const Signup = () => {
	const navigate = useNavigate();

	return (
		<Container maxWidth="xs">
			<Box
				sx={{
					marginTop: 10,
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
				}}>
				<Typography variant="h4" sx={{ fontWeight: "bold" }}>
					{process.env.REACT_APP_NAME}
				</Typography>
				<Grid
					container
					rowSpacing={2}
					sx={{
						margin: "20px",
						backgroundColor: grey[300],
						padding: "20px 30px",
						borderRadius: "20px",
					}}>
					<Grid
						item
						xs={12}
						sx={{
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							alignItems: "center",
							marginBottom: "10px",
						}}>
						<Typography variant="h6">Create Account</Typography>
					</Grid>
					<Grid item xs={12}>
						<TextField label="Name" type="text" required fullWidth />
					</Grid>
					<Grid item xs={12}>
						<TextField label="Phone" type="text" required fullWidth />
					</Grid>
					<Grid item xs={12}>
						<TextField label="Password" type="password" required fullWidth />
					</Grid>
					<Grid item xs={12}>
						<TextField label="Confirm Password" type="password" required fullWidth />
					</Grid>
					<Grid item xs={12}>
						<FormControlLabel
							control={<Checkbox defaultChecked />}
							label="Remember me"
						/>
					</Grid>
					<Grid item xs={12}>
						<Button type="submit" variant="contained" fullWidth>
							Sign up
						</Button>
					</Grid>
					<Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
						<Typography>Forgot Password</Typography>
					</Grid>
				</Grid>
				<Typography>Already have an account?</Typography>
				<Typography
					component="span"
					onClick={() => navigate("/login")}
					sx={{ textDecoration: "underline", fontWeight: "bold", cursor: "pointer" }}>
					Login
				</Typography>
			</Box>
		</Container>
	);
};

export default Signup;
