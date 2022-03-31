import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React from "react";

const DialogUpdateState = (props) => {
  return (
    <>
      <DialogTitle>Update state of foods</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please choose the new state of these foods.
        </DialogContentText>
        <FormControl fullWidth sx={{ mt: "15px" }}>
          <InputLabel id="demo-simple-select-label">State</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="State"
            defaultValue={10}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose}>Cancel</Button>
        <Button onClick={props.handleClose}>Update</Button>
      </DialogActions>
    </>
  );
};

export default DialogUpdateState;
