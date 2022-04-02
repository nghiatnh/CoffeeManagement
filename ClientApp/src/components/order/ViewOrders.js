import {
  Alert,
  Autocomplete,
  Box,
  Dialog,
  Divider,
  Grid,
  IconButton,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { ModeEditOutline } from "@mui/icons-material";
import DialogUpdateState from "./DialogUpdateState";
import { v4 as uuidv4 } from "uuid";
import { DataGrid } from "@mui/x-data-grid";
import api from "../api/api";

const ViewOrder = (props) => {
  const [openRefreshAll, setOpenRefreshAll] = React.useState(false);
  const [openAdd, setOpenAdd] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [alertColor, setAlertColor] = React.useState("success");
  const [alertMessage, setAlertMessage] = React.useState("");
  const [orders, setOrders] = React.useState([]);
  const [orderDetails, setOrderDetails] = React.useState([]);
  const [tables, setTables] = React.useState([]);
  const [table, setTable] = React.useState(null);
  const [states, setStates] = React.useState([]);
  const [state, setState] = React.useState(null);
  const [selectionModel, setSelectionModel] = useState([]);

  const [filterModel, setFilterModel] = React.useState({ items: [] });

  useEffect(() => {
    const getOrders = async () => {
      const response = await api.get("/order_details");
      if (response.data) {
        setOrders(response.data);
        console.log(response.data);
      }
    };
    getOrders();
  }, []);

  useEffect(() => {
    const getTables = async () => {
      const response = await api.get("/tables");
      if (response.data) {
        setTables(response.data);
      }
    };
    getTables();
  }, []);

  useEffect(() => {
    const getStates = async () => {
      const response = await api.get("/order_detail_states");
      if (response.data) {
        setStates(response.data);
      }
    };
    getStates();
  }, []);

  useEffect(() => {
    setOrderDetails(
      orders.map((order) => {
        return {
          id: order.id,
          table: order.table,
          time: order.time,
          food: order.food,
          state: order.state,
          count: order.count,
        };
      })
    );
  }, [orders]);

  useEffect(() => {
    let items = [];
    orders.map((order) => {
      if (
        (!table || order.table == table.name) &&
        (!state || order.state == state.name)
      )
        items.push({
          id: order.id,
          table: order.table,
          time: order.time,
          food: order.food,
          state: order.state,
          count: order.count,
        });
    });
    setOrderDetails(items);
  }, [table, state]);

  const handleOpenRefreshAll = () => {
    setOpenRefreshAll(true);
  };

  const handleCloseRefreshAll = () => {
    setOpenRefreshAll(false);
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlert(false);
  };

  const handleUpdate = (responseData) => {
    if (responseData.success) {
      const getOrders = async () => {
        const response = await api.get("/order_details");
        if (response.data) {
          setOrders(response.data);
        }
      };
      getOrders();
      setAlertColor("success");
      setAlertMessage("Update state success!");
      setOpenAlert(true);
    } else {
      setOpenAlert(true);
      setAlertColor("error");
      setAlertMessage("Update state fail!");
    }
    setSelectionModel([]);
  };

  return (
    <Box>
      <Typography variant="h3" align="center" fontWeight={"medium"}>
        Order List
      </Typography>
      <Divider />
      <Grid container spacing={3} sx={{ mt: "5px" }}>
        <Grid item xs={12} md={5} lg={4}>
          <Autocomplete
            autoComplete
            id="combo-box-table"
            {...{
              options: tables,
              getOptionLabel: (option) => option.name,
            }}
            value={table}
            renderInput={(params) => <TextField {...params} label="Table" />}
            sx={{ backgroundColor: "white" }}
            onChange={(event, newValue) => {
              setTable(newValue);
            }}
          />
        </Grid>
        <Grid item xs={9} md={5} lg={4}>
          <Autocomplete
            autoComplete
            id="combo-box-state"
            {...{
              options: states,
              getOptionLabel: (option) => option.name,
            }}
            value={state}
            onChange={(event, newValue) => {
              setState(newValue);
            }}
            renderInput={(params) => <TextField {...params} label="State" />}
            sx={{ backgroundColor: "white" }}
          />
        </Grid>
        <Grid item>
          <IconButton
            size="large"
            sx={{ backgroundColor: "white", border: "solid 1px" }}
            onClick={handleOpenRefreshAll}
          >
            <ModeEditOutline fontSize="inherit" />
          </IconButton>
        </Grid>
      </Grid>
      <Box sx={{ mt: "10px", height: "400px", backgroundColor: "white" }}>
        <DataGrid
          checkboxSelection
          disableSelectionOnClick
          disableColumnFilter
          filterModel={filterModel}
          columns={[
            { field: "table", headerName: "Table", flex: 0.2 },
            { field: "time", headerName: "Time", flex: 0.3, type: "datetime" },
            { field: "food", headerName: "Food", flex: 1 },
            { field: "count", headerName: "Count", flex: 0.2 },
            { field: "state", headerName: "State", flex: 0.2 },
          ]}
          rows={orderDetails}
          onSelectionModelChange={(newSelectionModel) => {
            setSelectionModel(newSelectionModel);
          }}
          selectionModel={selectionModel}
        />
      </Box>
      <Dialog open={openRefreshAll}>
        <DialogUpdateState
          handleClose={handleCloseRefreshAll}
          states={states}
          orders={selectionModel}
          handleUpdate={handleUpdate}
        />
      </Dialog>
      <Snackbar open={openAlert} autoHideDuration={3000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity={alertColor} sx={{ width: "100%" }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ViewOrder;
