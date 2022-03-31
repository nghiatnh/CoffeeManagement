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
import { VisibilityOffOutlined } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import api from "../api/api";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDayjs from "@mui/lab/AdapterDayjs";

const ViewPayment = (props) => {
  const [payments, setPayments] = React.useState([]);
  const [paymentDetails, setPaymentDetails] = React.useState([]);
  const [tables, setTables] = React.useState([]);
  const [table, setTable] = React.useState(null);
  const [customers, setCustomers] = React.useState([]);
  const [customer, setCustomer] = React.useState(null);
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);

  useEffect(() => {
    const getPayments = async () => {
      const response = await api.get("/payments");
      if (response.data) {
        setPayments(response.data);
      }
    };
    getPayments();
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
    const getCustomers = async () => {
      const response = await api.get("/customers");
      if (response.data) {
        setCustomers(response.data);
      }
    };
    getCustomers();
  }, []);

  useEffect(() => {
    setPaymentDetails(
      payments.map((payment) => {
        return {
          id: payment.id,
          table: payment.table.name,
          customer: payment.customer,
          time: payment.pay_time,
          totalPrice: payment.total_price,
        };
      })
    );
  }, [payments]);

  useEffect(() => {
    let items = [];
    payments.map((payment) => {
      if (
        (!table || payment.table.id == table.id) &&
        (!customer || payment.customer.id == customer.id) &&
        (!startDate || new Date(payment.pay_time) >= startDate) &&
        (!endDate || new Date(payment.pay_time) <= endDate)
      )
        items.push({
          id: payment.id,
          table: payment.table.name,
          customer: payment.customer,
          time: payment.pay_time,
          totalPrice: payment.total_price,
        });
    });
    setPaymentDetails(items);
  }, [customer, table]);

  return (
    <Box>
      <Typography variant="h3" align="center" fontWeight={"medium"}>
        Payment List
      </Typography>
      <Divider />
      <Grid container spacing={3} sx={{ mt: "5px" }}>
        <Grid item xs={12} md={6} lg={3}>
          <Autocomplete
            autoComplete
            id="combo-box-table"
            renderInput={(params) => <TextField {...params} label="Table" />}
            sx={{ backgroundColor: "white" }}
            {...{
              options: tables,
              getOptionLabel: (option) => option.name,
            }}
            value={table}
            onChange={(event, newValue) => {
              setTable(newValue);
            }}
          />
        </Grid>
        <Grid item xs={9} md={6} lg={3}>
          <Autocomplete
            autoComplete
            id="combo-box-customer"
            renderInput={(params) => <TextField {...params} label="Customer" />}
            sx={{ backgroundColor: "white" }}
            {...{
              options: customers,
              getOptionLabel: (option) => option.name,
            }}
            value={customer}
            onChange={(event, newValue) => {
              setCustomer(newValue);
            }}
          />
        </Grid>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Grid item xs={9} md={6} lg={3}>
            <DatePicker
              label="Start date"
              value={startDate}
              onChange={(newValue) => {
                setStartDate(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{ width: "100%", backgroundColor: "white" }}
                />
              )}
              inputFormat="DD/MM/YYYY"
            />
          </Grid>
          <Grid item xs={9} md={6} lg={3}>
            <DatePicker
              label="End date"
              value={endDate}
              onChange={(newValue) => {
                setEndDate(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{ width: "100%", backgroundColor: "white" }}
                />
              )}
              inputFormat="DD/MM/YYYY"
            />
          </Grid>
        </LocalizationProvider>
      </Grid>
      <Box sx={{ mt: "10px", height: "400px", backgroundColor: "white" }}>
        <DataGrid
          disableColumnFilter
          columns={[
            { field: "table", headerName: "Table", flex: 0.25 },
            { field: "customer", headerName: "Customer", flex: 0.5 },
            { field: "time", headerName: "Time", flex: 0.25, type: "time" },
            { field: "totalPrice", headerName: "Total price", flex: 0.25 },
            {
              field: "",
              flex: 0.15,
              type: "actions",
              renderCell: (params) => {
                return (
                  <IconButton>
                    {" "}
                    <VisibilityOffOutlined />
                  </IconButton>
                );
              },
            },
          ]}
          rows={paymentDetails}
        />
      </Box>
    </Box>
  );
};

export default ViewPayment;
