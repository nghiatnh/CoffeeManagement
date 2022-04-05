import {
  Box,
  Button,
  ButtonGroup,
  createTheme,
  Divider,
  Grid,
  IconButton,
  Paper,
  ThemeProvider,
  Typography,
} from "@mui/material";
import React from "react";
import { pink, green, blueGrey, cyan } from "@mui/material/colors";
import {
  AddCircleOutline,
  BorderColorOutlined,
  PaymentOutlined,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

const theme = createTheme({
  palette: {
    cyanColor: {
      main: cyan[300],
      contrastText: cyan[800],
    },
  },
});

const TableInfo = (props) => {

  const handleClickPayment = (table) => {
    props.handleOpenPayment(table);
  }

  const renderEditButton = () => {
    return props.data.state == "Đầy" ? (
      <Link to="/view-order">
        <IconButton aria-label="check-order">
          <BorderColorOutlined sx={{ color: blueGrey[800] }} />
        </IconButton>
      </Link>
    ) : null;
  };

  const renderPaymentButton = () => {
    return props.data.state == "Đầy" ? (
      <Box onClick={() => {handleClickPayment(props.data)}}>
        <IconButton aria-label="payment">
          <PaymentOutlined sx={{ color: blueGrey[800] }} />
        </IconButton>
      </Box>
    ) : null;
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid item xs={12} md={4} lg={3}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: 240,
            backgroundColor:
              props.data.state == "Đầy" ? pink[200] : green[200],
          }}
        >
          <Typography
            align="center"
            component="h2"
            variant="h4"
            fontWeight="bold"
            gutterBottom
          >
            {props.data.name}
          </Typography>

          <Divider />
          <Typography align="left" variant="h6" color={blueGrey[800]}>
            State:{" "}
            <Typography
              align="left"
              variant="overline"
              fontWeight="inherit"
              fontSize="inherit"
            >
              {props.data.state}
            </Typography>
          </Typography>
          <Typography align="left" variant="h6" color={blueGrey[800]}>
            Count orders:{" "}
            <Typography
              align="left"
              variant="overline"
              fontWeight="inherit"
              fontSize="inherit"
            >
              {props.data.countOrder}
            </Typography>
          </Typography>
          <Box sx={{ display: "inline-flex", justifyContent: "center" }}>
            <ButtonGroup disableElevation variant="contained" color="cyanColor">
              <Link to="/view-food">
                <IconButton aria-label="add-food">
                  <AddCircleOutline sx={{ color: blueGrey[800] }} />
                </IconButton>
              </Link>
              {renderEditButton()}
              {renderPaymentButton()}
            </ButtonGroup>
          </Box>
        </Paper>
      </Grid>
    </ThemeProvider>
  );
};

export default TableInfo;
