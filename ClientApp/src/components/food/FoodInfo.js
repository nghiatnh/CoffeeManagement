import {
  Box,
  ButtonGroup,
  Card,
  CardContent,
  CardMedia,
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
  RemoveShoppingCartOutlined,
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

const FoodInfo = (props) => {
  const food = props.data;
  return (
    <ThemeProvider theme={theme}>
      <Grid item xs={12} md={6}>
        <Card sx={{ display: "flex", height: '100%'}}>
          <CardMedia
            component="img"
            sx={{ width: 151 }}
            image={food.imageUrl}
            alt="Live from space album cover"
          />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography component="div" variant="h5">
                {food.name}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                Price: {food.price}$
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                State: Remaining
              </Typography>
            </CardContent>
            <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
              <IconButton
                aria-label="add-food"
                onClick={(e) => {
                  props.addFoodHandler(e, food);
                }}
              >
                <AddCircleOutline />
              </IconButton>
              <IconButton
                aria-label="remove-food"
                onClick={(e) => {
                  props.removeFoodHandler(e, food);
                }}
              >
                <RemoveShoppingCartOutlined />
              </IconButton>
            </Box>
          </Box>
        </Card>
      </Grid>
    </ThemeProvider>
  );
};

export default FoodInfo;
