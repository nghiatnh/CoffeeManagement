import {
  Autocomplete,
  Box,
  Dialog,
  Divider,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { ModeEditOutline } from "@mui/icons-material";
import DialogUpdateState from "./DialogUpdateState";
import { v4 as uuidv4 } from "uuid";
import { DataGrid } from "@mui/x-data-grid";
import api from "../api/api";

const ViewOrder = (props) => {
  const [openRefreshAll, setOpenRefreshAll] = React.useState(false);
  const [openAdd, setOpenAdd] = React.useState(false);
  const [orders, setOrders] = React.useState([]);
  const [orderDetails, setOrderDetails] = React.useState([]);
  const [tables, setTables] = React.useState([]);
  const [table, setTable] = React.useState(null);
  const [states, setStates] = React.useState([]);
  const [state, setState] = React.useState(null);

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
          table: order.table.name,
          time: order.time_order,
          food: order.food.name,
          state: order.state,
          count: order.count,
        };
      })
    );
  }, [orders]);

  useEffect(() => {
    let items = [];
    orders.map((order) => {
      if ((!table || order.table.id == table.id) && (!state || order.state == state.name))
        items.push({
          id: order.id,
          table: order.table.name,
          time: order.time_order,
          food: order.food.name,
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
          disableColumnFilter
          filterModel={filterModel}
          columns={[
            { field: "table", headerName: "Table", flex: 0.2 },
            { field: "time", headerName: "Time", flex: 0.3, type: "time" },
            { field: "food", headerName: "Food", flex: 1 },
            { field: "count", headerName: "Count", flex: 0.2 },
            { field: "state", headerName: "State", flex: 0.2 },
          ]}
          rows={orderDetails}
        />
      </Box>
      <Dialog open={openRefreshAll}>
        <DialogUpdateState handleClose={handleCloseRefreshAll} />
      </Dialog>
    </Box>
  );
};

const top100Films = [
  { id: uuidv4(), label: "The Shawshank Redemption", year: 1994 },
  { id: uuidv4(), label: "The Godfather", year: 1972 },
  { id: uuidv4(), label: "The Godfather: Part II", year: 1974 },
  { id: uuidv4(), label: "The Dark Knight", year: 2008 },
  { id: uuidv4(), label: "12 Angry Men", year: 1957 },
  { id: uuidv4(), label: "Schindler's List", year: 1993 },
  { id: uuidv4(), label: "Pulp Fiction", year: 1994 },
  {
    id: uuidv4(),
    label: "The Lord of the Rings: The Return of the King",
    year: 2003,
  },
  { id: uuidv4(), label: "The Good, the Bad and the Ugly", year: 1966 },
  { id: uuidv4(), label: "Fight Club", year: 1999 },
  {
    id: uuidv4(),
    label: "The Lord of the Rings: The Fellowship of the Ring",
    year: 2001,
  },
  {
    id: uuidv4(),
    label: "Star Wars: Episode V - The Empire Strikes Back",
    year: 1980,
  },
  { id: uuidv4(), label: "Forrest Gump", year: 1994 },
  { id: uuidv4(), label: "Inception", year: 2010 },
  {
    id: uuidv4(),
    label: "The Lord of the Rings: The Two Towers",
    year: 2002,
  },
];

export default ViewOrder;
