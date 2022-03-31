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
  const [count, setCount] = React.useState(0);

  useEffect(() => {
    const getTables = async () => {
      const response = await api.get("/tables");
      if (response.data) {
        setTables(response.data);
      }
    };
    getTables();
  }, []);

  const handleAdd = () => {
    if (table && count > 0){
      alert(table.name + " : " +  count)
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
          <Button>
            <RemoveOutlined size="small" />
          </Button>
          <TextField label="Count" size="small" value={count} onChange={(event)=>{setCount(event.target.value)}} />
          <Button>
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
