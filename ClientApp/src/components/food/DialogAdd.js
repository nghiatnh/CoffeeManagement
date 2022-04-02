import { AddOutlined, RemoveOutlined } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  ButtonGroup,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useEffect } from "react";
import api from "../api/api";

const DialogAdd = (props) => {
  const [tables, setTables] = React.useState([]);
  const [table, setTable] = React.useState(null);
  const [count, setCount] = React.useState(1);

  useEffect(() => {
    const getTables = async () => {
      const response = await api.get("/tables");
      if (response.data) {
        setTables(response.data);
      }
    };
    getTables();
  }, []);

  const handleAdd = async () => {
    if (table && count > 0){
      const response = await api.post("/order_foods", {table: table.id, count: count, food: props.selectedFood.id},
      {
        headers: {
          'content-type': 'application/json'
        }
      });
      if (response.data) {
        props.handleAdd(response.data);
      }
    } else {
      props.handleAdd({success: false});
    }
    props.handleClose();
  };

  return (
    <Box>
      <DialogTitle>Add Food</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To subscribe to this website, please enter your email address here. We
          will send updates occasionally.
        </DialogContentText>
        <Autocomplete
          autoComplete
          size="small"
          id="combo-box-table"
          {...{
            options: tables,
            getOptionLabel: (option) => option.name,
          }}
          value={table}
          renderInput={(params) => <TextField {...params} label="Table" />}
          sx={{ backgroundColor: "white", mt: "15px" }}
          onChange={(event, newValue) => {
            setTable(newValue);
          }}
        />
        <ButtonGroup disableElevation variant="contained" sx={{ mt: "20px" }}>
          <Button onClick={() => {if (count > 1) setCount(count - 1)}}>
            <RemoveOutlined size="small" />
          </Button>
          <TextField InputProps={{readOnly: true, }} label="Count" size="small" value={count} onChange={(event)=>{setCount(parseInt(event.target.value))}} />
          <Button onClick={() => {setCount(count + 1)}}>
            <AddOutlined size="small" />
          </Button>
        </ButtonGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose}>Cancel</Button>
        <Button onClick={handleAdd}>Add</Button>
      </DialogActions>
    </Box>
  );
};

export default DialogAdd;
