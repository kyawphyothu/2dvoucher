import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
// import FormLabel from "@mui/material/FormLabel";

export default function CustomToggleButton() {
	return (
		<RadioGroup
			row
			aria-labelledby="demo-row-radio-buttons-group-label"
			name="row-radio-buttons-group"
		>
			{/* <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel> */}
			<FormControlLabel value="mm2d" control={<Radio />} label="MM 2D" />
			<FormControlLabel value="du2d" control={<Radio />} label="Dubai 2D" />
			<FormControlLabel value="ga2d" control={<Radio />} label="GA 2D" />
			<FormControlLabel value="mg2d" control={<Radio />} label="Mega 2D" />
			<FormControlLabel value="3d" control={<Radio />} label="3D" />
		</RadioGroup>
	);
}
