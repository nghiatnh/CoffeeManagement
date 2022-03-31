import {
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
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import {
  AddOutlined,
  RefreshOutlined,
  RemoveOutlined,
} from "@mui/icons-material";
import api from "../api/api";
import CustomerList from "./CustomerList";

const ViewCustomer = (props) => {
  const [openRefreshAll, setOpenRefreshAll] = React.useState(false);
  const [openAdd, setOpenAdd] = React.useState(false);
  const [categories, setCategories] = React.useState([]);
  const [category, setCategory] = React.useState(null);
  const [foods, setFoods] = React.useState([]);
  const [foodList, setFoodList] = React.useState([]);
  const [food, setFood] = React.useState(null);

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

  useEffect(() => {
    const getFoods = async () => {
      if (foodList.length > 0) {
        if (category) {
          let foodlist = [];
          foodList.map((food) => {
            if (food.category.id == category.id) foodlist.push(food);
          });
          setFoods(foodlist);
        } else {
          setFoods(foodList);
        }
      }
    };
    getFoods();
    if ((category && food && food.category.id != category.id) || !category)
      setFood(null);
  }, [category]);

  useEffect(() => {
    if (!category && food) {
      setCategory(food.category);
    }
  }, [food]);

  const handleOpenRefreshAll = () => {
    setOpenRefreshAll(true);
  };

  const handleCloseRefreshAll = () => {
    setOpenRefreshAll(false);
  };

  const handleOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  const handleAddFood = (event, food) => {
    handleOpenAdd();
  };

  const handleRemoveFood = (event, food) => {};

  return (
    <Box>
      <Typography variant="h3" align="center" fontWeight={"medium"}>
        Food List
      </Typography>
      <Divider />
      <Grid container spacing={3} sx={{ mt: "5px", justifyContent: "center" }}>
        <Grid item xs={12} md={5} lg={4}>
          <TextField label="Search" fullWidth sx={{backgroundColor: "white"}} />
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
      <CustomerList
        data={food ? [food] : foods.slice(0, 5)}
        addFoodHandler={handleAddFood}
        removeFoodHandler={handleRemoveFood}
      />
      <Box sx={{ display: "flex", mt: "15px", justifyContent: "center" }}>
        <Pagination count={5} sx={{ display: "flex" }} />
      </Box>
      {/* <Dialog open={openRefreshAll}>
          <DialogRefreshAll handleClose={handleCloseRefreshAll} />
        </Dialog>
        <Dialog open={openAdd}>
          <DialogAdd handleClose={handleCloseAdd} />
        </Dialog> */}
    </Box>
  );
};

const top100Films = [
  {
    id: 8136,
    name: "King Cake",
    category: {
      id: 1280507,
      display_name: "Dry Measuring Cups",
      type: "equipment",
      name: "dry_measuring_cups",
    },
    image_url:
      "https://img.buzzfeed.com/thumbnailer-prod-us-east-1/video-api/assets/367792.jpg",
    description:
      "King cake is typically enjoyed during Carnival, beginning with the Epiphany on January 6th and continuing until Fat Tuesday. A small plastic baby is often hidden inside the cake, and the person who receives the slice with the baby is responsible for bringing next year’s cake. Once you serve it, make sure to alert your guests to the choking hazard!",
    price: 90000,
  },
  {
    id: 3069,
    name: "7 Days 7 Pastas",
    category: {
      name: "stove_top",
      id: 65848,
      display_name: "Stove Top",
      type: "appliance",
    },
    image_url:
      "https://img.buzzfeed.com/thumbnailer-prod-us-east-1/video-api/assets/367564.jpg",
    description: null,
    price: 140000,
  },
  {
    id: 8127,
    name: "Fresh Basil & Parmesan Pesto",
    category: {
      name: "vegetarian",
      id: 64469,
      display_name: "Vegetarian",
      type: "dietary",
    },
    image_url:
      "https://img.buzzfeed.com/tasty-app-user-assets-prod-us-east-1/recipes/c4bdaa0c3e0a441d9ab90be8700e9aab.jpeg",
    description: "",
    price: 210000,
  },
  {
    id: 8124,
    name: "Air Fried Soy Chicken With Potatoes",
    category: {
      type: "appliance",
      name: "air_fryer",
      id: 6931167,
      display_name: "Air Fryer",
    },
    image_url:
      "https://img.buzzfeed.com/tasty-app-user-assets-prod-us-east-1/recipes/09d29b155771410f8bceba6c94e00f6c.jpeg",
    description: "",
    price: 200000,
  },
  {
    id: 8113,
    name: "Roasted Moroccan Carrots With Baba Ganoush",
    category: {
      type: "appliance",
      name: "oven",
      id: 65846,
      display_name: "Oven",
    },
    image_url:
      "https://img.buzzfeed.com/tasty-app-user-assets-prod-us-east-1/recipes/f99eecda92ad4aa18d14b5f2130169f4.jpeg",
    description: "",
    price: 100000,
  },
  {
    id: 3051,
    name: "Wave Goodbye To A Boring Lunch!",
    category: {
      display_name: "Stove Top",
      type: "appliance",
      name: "stove_top",
      id: 65848,
    },
    image_url:
      "https://img.buzzfeed.com/thumbnailer-prod-us-east-1/video-api/assets/363468.jpg",
    description:
      "Oh no, the same boring lunch again? Tuna salad, chips, and an apple: it's like you're living Groundhog Day 100 times over! Do you ever wish you had some exciting, something mouth-watering? How about lunches that'll get you excited for mid-day munchies? Look no further than this awesome lineup. With these superstar lunches, you'll never be bored with your meal ever again: we promise!",
    price: 130000,
  },
  {
    id: 8126,
    name: "Seafood Soup (Sopa Marinera)",
    category: {
      id: 64459,
      display_name: "Seafood",
      type: "cuisine",
      name: "seafood",
    },
    image_url:
      "https://img.buzzfeed.com/tasty-app-user-assets-prod-us-east-1/recipes/967676d8e7ee438db163b43ab0d82aa8.jpeg",
    description: "",
    price: 160000,
  },
  {
    id: 8125,
    name: "Salad With Zucchini And Baby Spinach",
    category: {
      id: 64472,
      display_name: "Under 30 Minutes",
      type: "difficulty",
      name: "under_30_minutes",
    },
    image_url:
      "https://img.buzzfeed.com/tasty-app-user-assets-prod-us-east-1/recipes/4a37714f62f7414a8c744cead0d8e3f5.jpeg",
    description: "",
    price: 70000,
  },
  {
    id: 8112,
    name: "Couscous And Turkey Sandwiches",
    category: {
      name: "stove_top",
      id: 65848,
      display_name: "Stove Top",
      type: "appliance",
    },
    image_url:
      "https://img.buzzfeed.com/tasty-app-user-assets-prod-us-east-1/recipes/283df07fd5954ada9fdf288432a71670.png",
    description: "",
    price: 230000,
  },
  {
    id: 8119,
    name: "Fancy Hash Brown",
    category: {
      name: "liquid_measuring_cup",
      id: 1280506,
      display_name: "Liquid Measuring Cup",
      type: "equipment",
    },
    image_url:
      "https://img.buzzfeed.com/tasty-app-user-assets-prod-us-east-1/recipes/421afefe85bf40f98fe2a050917cd708.jpeg",
    description:
      "Inspired by Swiss rösti, this golden, crispy hash brown becomes a canvas for anything your heart desires. Go full-on fancy with high-end ingredients like crème fraîche and trout roe, or keep it simple with a fried egg. ",
    price: 130000,
  },
  {
    id: 8129,
    name: "New Orleans Seafood Filé Gumbo",
    category: {
      name: "stove_top",
      id: 65848,
      display_name: "Stove Top",
      type: "appliance",
    },
    image_url:
      "https://img.buzzfeed.com/thumbnailer-prod-us-east-1/video-api/assets/366796.jpg",
    description:
      "If you’re looking for an authentic Creole-Cajun meal, a warm bowl of gumbo is the perfect way to taste what the cuisine has to offer. This seafood filé gumbo recipe will be in your family for generations to come. Use the scraps from chopping the onion, bell pepper, okra, and celery for the gumbo to make the seafood stock.",
    price: 180000,
  },
  {
    id: 8130,
    name: "Ricotta Toast For Every Season",
    category: {
      name: "food_processor",
      id: 65842,
      display_name: "Food Processor",
      type: "appliance",
    },
    image_url:
      "https://img.buzzfeed.com/thumbnailer-prod-us-east-1/video-api/assets/367129.jpg",
    description:
      "Enjoy whipped ricotta toast all year around, simply by switching up the seasonal toppings–from winter citrus and spring greens to summer berry and fall pear. The Tasty team has these ricotta toast recipes on repeat and we think you will, too. Perfect for an easy breakfast or snack!",
    price: 50000,
  },
  {
    id: 8121,
    name: "Potatoes Fondant",
    category: {
      display_name: "Cast Iron Pan",
      type: "appliance",
      name: "cast_iron_pan",
      id: 65840,
    },
    image_url:
      "https://img.buzzfeed.com/tasty-app-user-assets-prod-us-east-1/recipes/a8c8879cb1d74c91bd2fd59f83f2d7b4.jpeg",
    description:
      "Fondant potatoes, also known as melting potatoes, are a classic French delicacy that seem like something only fancy chefs can whip up, but are actually quite simple to make. Yukon gold potatoes are cut into cylinders, pan-fried until crispy, then transferred to the oven to braise in a buttery herb bath for a crispy-on-the-outside texture that’s deceptively creamy on the inside. Don’t forget to eat the roasted garlic with the potatoes–it's the best part!",
    price: 230000,
  },
  {
    id: 8123,
    name: "Crispy Japanese Sweet Potatoes",
    category: {
      name: "comfort_food",
      id: 64462,
      display_name: "Comfort Food",
      type: "dietary",
    },
    image_url:
      "https://img.buzzfeed.com/tasty-app-user-assets-prod-us-east-1/recipes/62b2c4e370ad4ca4984198b43001daf7.jpeg",
    description: "",
    price: 140000,
  },
  {
    id: 8120,
    name: "Bubble Potato Chips",
    category: {
      id: 64469,
      display_name: "Vegetarian",
      type: "dietary",
      name: "vegetarian",
    },
    image_url:
      "https://img.buzzfeed.com/tasty-app-user-assets-prod-us-east-1/recipes/8e00b770f3c143cca849ff96a8ed0196.jpeg",
    description:
      "The crispy potato chips puff up as they fry so that they are hollow in the middle. They are crazy fun to make and eat and pair well with your favorite dip–we like this zesty bacon-packed crème fraîche!",
    price: 170000,
  },
  {
    id: 8122,
    name: "Sour Cream And Onion Potato Chip Frittata",
    category: {
      name: "bake",
      id: 64492,
      display_name: "Bake",
      type: "method",
    },
    image_url:
      "https://img.buzzfeed.com/tasty-app-user-assets-prod-us-east-1/recipes/140c7642327249b4bbda2770c15ae8e3.jpeg",
    description: "",
    price: 70000,
  },
  {
    id: 8104,
    name: "Lazy Girl 5 Minute Noodles",
    category: {
      name: "vegetarian",
      id: 64469,
      display_name: "Vegetarian",
      type: "dietary",
    },
    image_url:
      "https://img.buzzfeed.com/thumbnailer-prod-us-east-1/64995a7b6143483da4f66ece85f548ab/PBNOODS_FB.jpg",
    description:
      "This lazy lunch packs an absolute punch, uses up cupboard staples, and is pure delicious instant gratification.",
    price: 50000,
  },
  {
    id: 8118,
    name: "One-Bowl Fudgy Brownies As Made By Alexis Deboschnek",
    category: {
      name: "measuring_spoons",
      id: 1280508,
      display_name: "Measuring Spoons",
      type: "equipment",
    },
    image_url:
      "https://img.buzzfeed.com/thumbnailer-prod-us-east-1/video-api/assets/366130.jpg",
    description:
      "Tasty Creator Alexis deBoschnek shares her recipe for one-bowl fudgy brownies from her new cookbook To The Last Bite. They’re everything you want in a brownie: ooey, gooey, salty, and sweet. Chocolate lovers, prepare for melt-in-your-mouth magic!",
    price: 160000,
  },
  {
    id: 8111,
    name: "Saffron Rasmalai",
    category: {
      name: "indulgent_sweets",
      id: 65850,
      display_name: "Indulgent Sweets",
      type: "dietary",
    },
    image_url:
      "https://img.buzzfeed.com/tasty-app-user-assets-prod-us-east-1/recipes/a051055034094cbca09cdf2082d7a032.jpeg",
    description: "",
    price: 150000,
  },
];

export default ViewCustomer;
