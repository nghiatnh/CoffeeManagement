import { AddOutlined, RemoveOutlined } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  ButtonGroup,
  createFilterOptions,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import api from "../api/api";

const DialogPayment = (props) => {
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
    if (table && count > 0) {
      const response = await api.post(
        "/order_foods",
        { table: table.id, count: count, food: props.selectedFood.id },
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );
      if (response.data) {
        props.handleAdd(response.data);
      }
    } else {
      props.handleAdd({ success: false });
    }
    props.handleClose();
  };

  const filterOptions = createFilterOptions({
    matchFrom: "any",
    stringify: (option) => option.name + option.id * 2,
  });

  return (
    <Box>
      <DialogTitle>Payment</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To subscribe to this website, please enter your email address here. We
          will send updates occasionally.
        </DialogContentText>
        <TextField
          size={"small"}
          sx={{ mt: "10px", width: "100%" }}
          InputProps={{
            readOnly: true,
            startAdornment: (
              <InputAdornment position="start">Table: </InputAdornment>
            ),
          }}
          value={"Table 1"}
        />
        <TextField
          size={"small"}
          sx={{ mt: "10px", width: "100%" }}
          InputProps={{
            readOnly: true,
            startAdornment: (
              <InputAdornment position="start">Total price: </InputAdornment>
            ),
          }}
          value={111111}
        />
        <Autocomplete
          autoComplete
          size="small"
          id="combo-box-table"
          {...{
            options: tables,
            getOptionLabel: (option) => option.name,
          }}
          renderOption={(props, option) => {
            console.log(props);
            props.className =
              props.className + " " + props.className + "-apply";
            return (
              <Box {...props} style={{ display: "block" }}>
                <Typography gutterBottom variant="h6" component="div">
                  {option.id}
                </Typography>
                <Typography
                  gutterBottom
                  variant="caption"
                  component="div"
                  sx={{
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                  }}
                >
                  {" "}
                  {option.name +
                    "fkjwbfkjw wefkbwf fjwej wkefkwjef kf wefkwhe kwjefbkwefb kjwbfkjew kwefjbwkef"}
                </Typography>
              </Box>
            );
          }}
          filterOptions={filterOptions}
          value={table}
          renderInput={(params) => {
            console.log(params);
            params.InputProps.startAdornment = (
              <InputAdornment position="start">Customer: </InputAdornment>
            );
            return <TextField {...params} />;
          }}
          sx={{ backgroundColor: "white", mt: "15px" }}
          onChange={(event, newValue) => {
            setTable(newValue);
          }}
        />
        
        <Autocomplete
          autoComplete
          size="small"
          id="combo-box-table"
          {...{
            options: tables,
            getOptionLabel: (option) => option.name,
          }}
          renderOption={(props, option) => {
            console.log(props);
            props.className =
              props.className + " " + props.className + "-apply";
            return (
              <Box {...props} style={{ display: "block" }}>
                <Typography gutterBottom variant="h6" component="div">
                  {option.id}
                </Typography>
                <Typography
                  gutterBottom
                  variant="caption"
                  component="div"
                  sx={{
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                  }}
                >
                  {" "}
                  {option.name +
                    "fkjwbfkjw wefkbwf fjwej wkefkwjef kf wefkwhe kwjefbkwefb kjwbfkjew kwefjbwkef"}
                </Typography>
              </Box>
            );
          }}
          filterOptions={filterOptions}
          value={table}
          renderInput={(params) => {
            console.log(params);
            params.InputProps.startAdornment = (
              <InputAdornment position="start">Discount code: </InputAdornment>
            );
            return <TextField {...params} />;
          }}
          sx={{ backgroundColor: "white", mt: "15px" }}
          onChange={(event, newValue) => {
            setTable(newValue);
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose}>Cancel</Button>
        <Button onClick={handleAdd}>Add</Button>
      </DialogActions>
    </Box>
  );
};

export default DialogPayment;
