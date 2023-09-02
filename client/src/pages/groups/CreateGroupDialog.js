import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useContext, useEffect, useRef, useState } from "react";
import { createGroup, getTypes } from "../../apiCalls";
import { AppContext } from "../../AppContextProvider";
import {
	FormControl,
	FormHelperText,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	Typography,
} from "@mui/material";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import AndroidSwitch from "../../components/AndroidSwitch";

export default function CreateGroupDialog(props) {
	const { isOpenCreateDialog, setIsOpenCreateDialog, closeCreateGroupDialog } = props;
	const { snackNoti, authUser } = useContext(AppContext);

	const [types, setTypes] = useState([]);
	const [selectedType, setSelectedType] = useState("");
	const [selectedAdmin, setSelectedAdmin] = useState("");
	const [autoAccept, setAutoAccept] = useState(false);

	const groupNameRef = useRef("");
	const defaultLimitRef = useRef();
	const defaultZRef = useRef();
	const defaultPercentRef = useRef();

	useEffect(() => {
		const getTypesFunction = async () => {
			const result = await getTypes();
			if (result.ok) {
				setTypes(result);
			} else {
				snackNoti({ type: "error", msg: result.msg });
			}
		};

		getTypesFunction();
	}, []);

	const handleFormSubmit = async () => {
		const data = {
			name: groupNameRef.current.value,
			type: selectedType,
			admin: selectedAdmin,
			setting: {
				defaultLimit: parseInt(defaultLimitRef.current.value) || 0,
				defaultZ: parseInt(defaultZRef.current.value),
				defaultPercent: parseInt(defaultPercentRef.current.value),
			},
			autoAccept,
		};

		const result = await createGroup(data);
		if (result.ok) {
			snackNoti({ type: "success", msg: result.msg });
		} else {
			snackNoti({ type: "error", msg: result.msg });
		}

		closeCreateGroupDialog();
	};
	const toggleAutoAccept = () => {
		setAutoAccept(!autoAccept);
	};

	return (
		<div>
			<Dialog
				open={isOpenCreateDialog}
				onClose={closeCreateGroupDialog}
				scroll="body"
				maxWidth="xs"
				fullWidth>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						handleFormSubmit();
					}}>
					<DialogTitle>Create Group</DialogTitle>
					<DialogContent>
						<TextField
							autoFocus
							margin="dense"
							id="name"
							label="Group Name"
							inputRef={groupNameRef}
							type="text"
							fullWidth
							required
						/>
						<FormControl fullWidth required>
							<InputLabel id="demo-simple-select-label">Types</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={selectedType}
								label="Types"
								onChange={(e) => {
									setSelectedType(e.target.value);
								}}>
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
							<InputLabel id="demo-simple-select-label">Admin</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={selectedAdmin}
								label="Admin"
								onChange={(e) => {
									setSelectedAdmin(e.target.value);
								}}>
								<MenuItem value="">No Admin</MenuItem>
								{authUser.friend?.friends?.map((handle) => {
									return (
										<MenuItem key={handle} value={handle}>
											{handle}
										</MenuItem>
									);
								})}
							</Select>
						</FormControl>
						<TextField
							label="Default Limit per member"
							fullWidth
							type="number"
							inputRef={defaultLimitRef}
							inputProps={{ min: 100 }}
							helperText="Blank for no limit"
						/>
						<TextField
							label="Default Z"
							fullWidth
							required
							type="number"
							inputRef={defaultZRef}
							inputProps={{ min: 1 }}
						/>
						<TextField
							label="Default % per member"
							fullWidth
							required
							type="number"
							inputRef={defaultPercentRef}
							inputProps={{ min: 1 }}
						/>
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
							}}>
							<Typography>Auto Accept</Typography>
							<AndroidSwitch
								defaultChecked={autoAccept}
								onChange={toggleAutoAccept}
							/>
						</div>
					</DialogContent>
					<DialogActions>
						<Button onClick={closeCreateGroupDialog}>Cancel</Button>
						<Button type="submit" variant="contained">
							Create
						</Button>
					</DialogActions>
				</form>
			</Dialog>
		</div>
	);
}
