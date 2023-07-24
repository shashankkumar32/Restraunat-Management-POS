import { Box, Button, Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  addToCart,
  hideLoading,
  showLoading,
} from "../../../../slice/rootReducer";

interface props {
  select: any;
  list: any;
  setList: any;
}

const Dynamiclistview: React.FC<props> = ({ select, list, setList }) => {
  const [iset, setColor] = useState(true);
  const [arr, setArr] = useState([]);
  const dispatch = useDispatch();

  // const [list, setList] = useState([]);
  const AddCartItem = (id:any,price:any) => {
    dispatch(addToCart({ _id: id, quantity: 1 ,price:price}));
  };
  const onClickfunction = (text: any,price:any) => {
    AddCartItem(text,price)
    list.push(text);
    setList(list);
    iset ? setColor(false) : setColor(true);
    console.log(list, "someyhing");
  };

  const data = [
    {
      "id": 1,
      "category": "Breakfast",
      "text": "Classic American Breakfast",
      "price": 9.99
    },
    {
      "id": 2,
      "category": "Breakfast",
      "text": "Pancakes with Maple Syrup",
      "price": 7.99
    },
    {
      "id": 3,
      "category": "Breakfast",
      "text": "Avocado Toast",
      "price": 6.99
    },
    {
      "id": 4,
      "category": "Breakfast",
      "text": "Eggs Benedict",
      "price": 10.99
    },
    {
      "id": 5,
      "category": "Breakfast",
      "text": "Belgian Waffles",
      "price": 8.99
    },
    {
      "id": 6,
      "category": "Soups",
      "text": "Tomato Basil Soup",
      "price": 5.99
    },
    {
      "id": 7,
      "category": "Soups",
      "text": "Chicken Noodle Soup",
      "price": 6.99
    },
    {
      "id": 8,
      "category": "Soups",
      "text": "Minestrone Soup",
      "price": 6.99
    },
    {
      "id": 9,
      "category": "Soups",
      "text": "Cream of Mushroom Soup",
      "price": 5.99
    },
    {
      "id": 10,
      "category": "Soups",
      "text": "Lentil Soup",
      "price": 5.99
    },
    {
      "id": 11,
      "category": "Pasta",
      "text": "Spaghetti Bolognese",
      "price": 12.99
    },
    {
      "id": 12,
      "category": "Pasta",
      "text": "Fettuccine Alfredo",
      "price": 11.99
    },
    {
      "id": 13,
      "category": "Pasta",
      "text": "Penne Arrabiata",
      "price": 10.99
    },
    {
      "id": 14,
      "category": "Pasta",
      "text": "Shrimp Scampi Linguine",
      "price": 14.99
    },
    {
      "id": 15,
      "category": "Pasta",
      "text": "Lasagna",
      "price": 13.99
    },
    {
      "id": 16,
      "category": "Sushi",
      "text": "California Roll",
      "price": 8.99
    },
    {
      "id": 17,
      "category": "Sushi",
      "text": "Salmon Nigiri",
      "price": 10.99
    },
    {
      "id": 18,
      "category": "Sushi",
      "text": "Tuna Sashimi",
      "price": 12.99
    },
    {
      "id": 19,
      "category": "Sushi",
      "text": "Spicy Tuna Roll",
      "price": 9.99
    },
    {
      "id": 20,
      "category": "Sushi",
      "text": "Rainbow Roll",
      "price": 11.99
    },
    {
      "id": 21,
      "category": "Main Course",
      "text": "Grilled Steak",
      "price": 18.99
    },
    {
      "id": 22,
      "category": "Main Course",
      "text": "Lemon Herb Chicken",
      "price": 15.99
    },
    {
      "id": 23,
      "category": "Main Course",
      "text": "Grilled Salmon",
      "price": 17.99
    },
    {
      "id": 24,
      "category": "Main Course",
      "text": "Vegetarian Stir-Fry",
      "price": 12.99
    },
    {
      "id": 25,
      "category": "Main Course",
      "text": "Braised Lamb Shank",
      "price": 19.99
    },
    {
      "id": 26,
      "category": "Desserts",
      "text": "Chocolate Lava Cake",
      "price": 6.99
    },
    {
      "id": 27,
      "category": "Desserts",
      "text": "New York Cheesecake",
      "price": 5.99
    },
    {
      "id": 28,
      "category": "Desserts",
      "text": "Crème Brûlée",
      "price": 7.99
    },
    {
      "id": 29,
      "category": "Desserts",
      "text": "Tiramisu",
      "price": 6.99
    },
    {
      "id": 30,
      "category": "Desserts",
      "text": "Fruit Tart",
      "price": 5.99
    },
    {
      "id": 31,
      "category": "Drinks",
      "text": "Fresh Orange Juice",
      "price": 3.99
    },
    {
      "id": 32,
      "category": "Drinks",
      "text": "Iced Coffee",
      "price": 4.99
    },
    {
      "id": 33,
      "category": "Drinks",
      "text": "Lemonade",
      "price": 2.99
    },
    {
      "id": 34,
      "category": "Drinks",
      "text": "Hot Tea",
      "price": 2.99
    },
    {
      "id": 35,
      "category": "Drinks",
      "text": "Fruit Smoothie",
      "price": 5.99
    },
    {
      "id": 36,
      "category": "Alcohol",
      "text": "Beer",
      "price": 4.99
    },
    {
      "id": 37,
      "category": "Alcohol",
      "text": "Wine",
      "price": 8.99
    },
    {
      "id": 38,
      "category": "Alcohol",
      "text": "Cocktail",
      "price": 9.99
    },
    {
      "id": 39,
      "category": "Alcohol",
      "text": "Whiskey",
      "price": 12.99
    },
    {
      "id": 40,
      "category": "Alcohol",
      "text": "Vodka",
      "price": 10.99
    },    
  ];
    const data2 = [
    { id: 7, category: "Deserts", text: "Drinks", color: "#CFDDDB" },
    { id: 8, category: "Deserts", text: "Alchol", color: "#CFDDDB" },
    { id: 9, category: "Deserts", text: "Sushi", color: "#03a9f4" },
    { id: 10, category: "Deserts", text: "Main Course", color: "#ff9800" },
    { id: 11, category: "Deserts", text: "Deserts", color: "#4caf50" },
    { id: 12, category: "Deserts", text: "Drinks", color: "#CFDDDB" },
    { id: 13, category: "Deserts", text: "Alchol", color: "#CFDDDB" },
  ];
  return (
    // <Box
    //   sx={{
    //     width: "920px",
    //     // overflowX: "auto",
    //     // "&::-webkit-scrollbar": {
    //     //   width: 10,
    //     //   height: "10px",
    //     // },
    //     // "&::-webkit-scrollbar-track": {
    //     //   backgroundColor: "orange",
    //     // },
    //     // "&::-webkit-scrollbar-thumb": {
    //     //   backgroundColor: "red",
    //     //   borderRadius: 2,
    //     // },
    //   }}
    // >
    <Grid container sx={{ mt: 4,py:2,pl:2,boxShadow:"inset 0 0 10px #3C4041" }} lg={12}>
        {data
          .filter((d) => d.category == select)
          .map(({ text ,price}, index) => (
            // eslint-disable-next-line react/jsx-key,
            <Grid item sx={{mt:2}}key={index} lg={3}>
              <Button
                key={index}
                variant="contained"
                onClick={() => onClickfunction(text,price)}
                sx={{
                  backgroundColor: iset ? "#2d2d2d" : "pink",
                  borderRadius: "10px",
                  mx: 2,

                  height: "133px",
                  width: "160px",
                  borderLeft: "solid 10px pink",
                }}
              >
                {text}
              </Button>
            </Grid>
          ))}
      </Grid>
 
    // </Box>
  );
};

export default Dynamiclistview;
