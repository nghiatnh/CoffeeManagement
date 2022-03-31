import { Box, Button, Checkbox, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, FormGroup, TextField } from "@mui/material";
import React from "react";

const DialogRefreshAll = (props) => {
  return (
    <>
      <DialogTitle>Refresh all foods</DialogTitle>
      <DialogContent>
          <DialogContentText>
              Please check the foods you want to refresh.
          </DialogContentText>
        <FormGroup>
            <FormControlLabel control={<Checkbox></Checkbox>} label="Label"></FormControlLabel>
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose}>Cancel</Button>
        <Button onClick={props.handleClose}>Refresh</Button>
      </DialogActions>
    </>
  );
};

export default DialogRefreshAll;
