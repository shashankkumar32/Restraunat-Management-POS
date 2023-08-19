
import { Box, Button, Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  addToCart,
  hideLoading,
  showLoading,
} from "../../../../slice/rootReducer";
import axios from "axios";

interface props {
  select: any;
  list: any;
  setList: any;
}

interface Item {
  id: string;
  category: string;
  text: string;
  price: string;
}

const Dynamiclistview: React.FC<props> = ({ select, list, setList }) => {
  const [iset, setColor] = useState(true);
  const [arr, setArr] = useState([]);
  const dispatch = useDispatch();

  const AddCartItem = (id: any, price: any) => {
    dispatch(addToCart({ _id: id, quantity: 1, price: price }));
  };

  const onClickfunction = (text: any, price: any) => {
    AddCartItem(text, price);
    list.push(text);
    setList(list);
    iset ? setColor(false) : setColor(true);
    console.log(list, "someyhing");
  };

  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    // Fetch item data from the API using Axios
    axios
      .get<Item[]>("https://backb.onrender.com/api/items/get-item")
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
      });
  }, []);

  return (
    <Grid
      container
      sx={{
        mt: 4,
        py: 2,
        pl: 2,
        boxShadow: "inset 0 0 10px #3C4041",
        height: { lg: "320px", md: "400px", sm: "500px", xs: "400px" },
        overflow: "auto",
      }}
      lg={12}
    >
      {items
        .filter((item) => item.category === select)
        .map(({ text, price }, index) => (
          <Grid item sx={{ mt: 2 }} key={index} lg={3} md={5} sm={6} xs={12}>
            <Button
              key={index}
              variant="contained"
              onClick={() => onClickfunction(text, price)}
              sx={{
                backgroundColor: iset ? "#2d2d2d" : "pink",
                borderRadius: "10px",
                mx: 2,
                height: "133px",
                width: "160px",
                borderLeft: "solid 10px pink",
              }}
            >
              <Box>
                <div>{text}</div>
                <div>{`Price: $${price}`}</div>
              </Box>
            </Button>
          </Grid>
        ))}
    </Grid>
  );
};

export default Dynamiclistview;

