import {
  Alert,
  Autocomplete,
  Box,
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormGroup,
  Grid,
  IconButton,
  Pagination,
  Paper,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import {
  AddOutlined,
  RefreshOutlined,
  RemoveOutlined,
} from "@mui/icons-material";
import FoodInfo from "./FoodInfo";
import FoodList from "./FoodList";
import DialogRefreshAll from "./DialogRefreshAll";
import DialogAdd from "./DialogAdd";
import api from "../api/api";

const ViewFood = (props) => {
  const [openRefreshAll, setOpenRefreshAll] = React.useState(false);
  const [openAdd, setOpenAdd] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [alertColor, setAlertColor] = React.useState("success");
  const [alertMessage, setAlertMessage] = React.useState("");
  const [categories, setCategories] = React.useState([]);
  const [category, setCategory] = React.useState(null);
  const [foods, setFoods] = React.useState([]);
  const [foodList, setFoodList] = React.useState([]);
  const [food, setFood] = React.useState(null);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(0);
  const [pageDisabled, setPageDisabled] = useState(true);
  const [selectedFood, setSelectedFood] = useState(null);

  useEffect(() => {
    const getCategories = async () => {
      const response = await api.get("/categories");
      if (response.data) {
        setCategories(response.data);
      }
    };
    getCategories();
    const getFoodList = async () => {
      const response = await api.get("/foods");
      if (response.data) {
        setFoodList(response.data);
        setFoods(response.data);
      }
    };
    getFoodList();
    if (props.food) {
      setCategory(props.food.category);
    }
  }, []);

  const getFoods = async () => {
    if (foodList.length > 0) {
        let foodlist = [];
        foodList.map((f) => {
          if ((category == null || f.idCategory == category.id) && (food == null || food.id == f.id)) foodlist.push(f);
        });
        setFoods(foodlist);
    }
  };

  useEffect(() => {
    getFoods();
    if ((category && food && food.idCategory != category.id) || !category)
      setFood(null);
  }, [category]);

  useEffect(() => {
    getFoods();
    if (!category && food) {
      setCategory(categories.find(x => x.id == food.idCategory));
    }
  }, [food]);

  useEffect(() => {
    var maxpage = Math.ceil(foods.length / 6);
    setPageDisabled(maxpage == 1 || food != null);
    setMaxPage(maxpage);
    setPage(1);
  }, [foods]);

  const handleOpenRefreshAll = () => {
    setOpenRefreshAll(true);
  };

  const handleAddFood = (responseData) => {
    if (responseData.success) {
      setAlertColor("success");
      setAlertMessage("Order food success!");
      setOpenAlert(true);
    } else {
      setOpenAlert(true);
      setAlertColor("error");
      setAlertMessage("Order food fail!");
    }
  }

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlert(false);
  };

  const handleRemoveFood = (event, food) => {};

  return (
    <Box>
      <Typography variant="h3" align="center" fontWeight={"medium"}>
        Food List
      </Typography>
      <Divider />
      <Grid container spacing={3} sx={{ mt: "5px" }}>
        <Grid item xs={12} md={5} lg={4}>
          <Autocomplete
            autoComplete
            id="combo-box-category"
            {...{
              options: categories,
              getOptionLabel: (option) => option.name,
            }}
            value={category}
            renderInput={(params) => <TextField {...params} label="Category" />}
            sx={{ backgroundColor: "white" }}
            onChange={(event, newValue) => {
              setCategory(newValue);
            }}
          />
        </Grid>
        <Grid item xs={9} md={5} lg={4}>
          <Autocomplete
            autoComplete
            id="combo-box-food"
            value={food}
            {...{
              options: foods,
              getOptionLabel: (option) => option.name,
            }}
            renderInput={(params) => <TextField {...params} label="Food" />}
            sx={{ backgroundColor: "white" }}
            onChange={(event, newValue) => {
              setFood(newValue);
            }}
          />
        </Grid>
        <Grid item>
          <IconButton
            size="large"
            sx={{ backgroundColor: "white", border: "solid 1px" }}
            onClick={handleOpenRefreshAll}
          >
            <RefreshOutlined fontSize="inherit" />
          </IconButton>
        </Grid>
      </Grid>
      <FoodList
        data={foods.slice((page - 1) * 6, page * 6)}
        addFoodHandler={(event, food) => {
          setOpenAdd(true);
          setSelectedFood(food);
        }}
        removeFoodHandler={handleRemoveFood}
      />
      <Box sx={{display: pageDisabled ? 'none' : 'flex' , mt: '15px', justifyContent: 'center'}}>
        <Pagination  count={maxPage} sx={{display: 'flex'}} color="primary" defaultPage={1} page={page} onChange={(event, page) => {
          setPage(page);
          }}/>
      </Box>
      <Dialog open={openRefreshAll}>
        <DialogRefreshAll handleClose={()=>{setOpenRefreshAll(false);}} />
      </Dialog>
      <Dialog open={openAdd}>
        <DialogAdd handleClose={()=>{setOpenAdd(false);}} handleAdd={handleAddFood} selectedFood={selectedFood}/>
      </Dialog>
      <Snackbar open={openAlert} autoHideDuration={3000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity={alertColor} sx={{ width: "100%" }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ViewFood;
