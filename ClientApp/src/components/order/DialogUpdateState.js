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
import React, { useState } from "react";
import api from "../api/api";

const DialogUpdateState = (props) => {
  const [select, setSelect] = useState(null);

  const handleUpdate = async () => {
    if (select && props.orders.length > 0){
      const response = await api.post("/update_states", {orders: props.orders, state: select},
      {
        headers: {
          'content-type': 'application/json'
        }
      });
      if (response.data) {
        props.handleUpdate(response.data);
      }
    } else {
      props.handleUpdate({success: false});
    }
    props.handleClose();
  }

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
            value={select}
            onChange={(event, child) => {setSelect(child.props.value);}}
          >
            {
              props.states.map(x => <MenuItem value={x.id}>{x.name}</MenuItem>)
            }
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose}>Cancel</Button>
        <Button onClick={handleUpdate}>Update</Button>
      </DialogActions>
    </>
  );
};

export default DialogUpdateState;
