import { Alert, Container, Dialog, Divider, Grid, Snackbar, Typography } from "@mui/material";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import api from "../api/api";
import DialogPayment from "./DialogPayment";
import TableInfo from "./TableInfo";

const TableList = (props) => {
  const [tables, setTables] = useState([]);
  const [table, setTable] = useState(null);
  const [tableRender, setTableRender] = useState(null);
  const [openPayment, setOpenPayment] = useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [alertColor, setAlertColor] = React.useState("success");
  const [alertMessage, setAlertMessage] = React.useState("");

  const handleOpenPayment = (tb) => {
    setTable(tb);
    setOpenPayment(true);
  }

  const handleClosePayment = () => {
    setOpenPayment(false);
  }

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlert(false);
  };

  const handlePayment = (responseData) => {
    if (responseData.success) {
      setAlertColor("success");
      setAlertMessage("Update state success!");
      setOpenAlert(true);
      const getTables = async () => {
        const response = await api.get("/tables");
        if (response.data) {
          setTables(response.data);
        }
      };
      getTables();
    } else {
      setOpenAlert(true);
      setAlertColor("error");
      setAlertMessage("Update state fail!");
    }
  };

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
    setTableRender(
      tables.map((table) => {
        return <TableInfo data={table} key={table.id} handleOpenPayment={handleOpenPayment}/>;
      })
    );
  }, [tables]);

  return (
    <Box>
      <Typography variant="h3" align="center" fontWeight={"medium"}>
        Table List
      </Typography>
      <Divider />
      <Grid container spacing={3} sx={{ mt: "5px" }}>
        {tableRender}
      </Grid>
      <Dialog open={openPayment}>
        <DialogPayment
          table={table}
          handleClose={handleClosePayment}
          handlePayment={handlePayment}
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

export default TableList;
