import * as React from "react";
import dayjs from "dayjs";
// import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import { Box } from "@mui/material";

const DateTimePickers = React.forwardRef((props, ref) => (
	<Box component="form">
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			{/* <DemoContainer components={["MobileDateTimePicker"]}>
        <DemoItem label="Mobile variant" sx={{ color: "red" }}> */}
			<MobileDateTimePicker
				defaultValue={dayjs("2022-04-17T15:30")}
				{...props}
				inputRef={ref}
			/>
			{/* <FormControl>
        <FormGroup>
          <FormControlLabel
            control={
              <MobileDateTimePicker
                defaultValue={dayjs("2022-04-17T15:30")}
                {...props}
                inputRef={ref}
              />
            }
            label="Moble variant"
            labelPlacement="top"
          />
        </FormGroup>
      </FormControl> */}

			{/* </DemoItem>
      </DemoContainer> */}
		</LocalizationProvider>
	</Box>
));

export default DateTimePickers;
