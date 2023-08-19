
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ListItem,
  ListItemText,
  Skeleton,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import zIndex from "@mui/material/styles/zIndex";
import Combiner from "./combiner";

interface Category {
  _id: string;
  text: string;
}

interface Item {
  id: string;
  category: string;
  text: string;
  price: string;
}

const AddItemForm: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [itemlist,setItemList]=useState<Item[]>([])
  const [item, setItem] = useState<Item>({
    id: "",
    category: "",
    text: "",
    price: "",
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get<Category[]>(
          "https://backb.onrender.com/api/category/get-categories"
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get<Item[]>(
        "https://backb.onrender.com/api/items/get-item"
      );
      const nextItemId = String(response.data.length + 1);
      setItemList(response.data)
      setItem((prevItem) => ({ ...prevItem, id: nextItemId }));
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://backb.onrender.com/api/items/add-item",
        item
      );
      console.log("Item added:", response.data);
      fetchItems();
      setItem((prevItem) => ({
        ...prevItem,
        text: "",
        price: "",
      }));
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setItem((prevItem) => ({ ...prevItem, [name]: value }));
  };

  const handleCategoryChange = (
    e: SelectChangeEvent<string>
  ) => {
    const { value } = e.target;
    setItem((prevItem) => ({ ...prevItem, category: value }));
  };

  return (
    <Combiner key={itemlist?1:0}>
      {
        itemlist?

    <Container component={Paper} maxWidth="sm" sx={{ padding: 3,width:"300px" }}>
      <Typography variant="h4" gutterBottom>
        Add Item
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
  name="category"
  value={item.category}
  onChange={handleCategoryChange}
>
                {categories.map((category) => (
                  <MenuItem key={category._id} value={category.text}>
                    {category.text}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Text"
              fullWidth
              name="text"
              value={item.text}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Price"
              fullWidth
              type="number"
              name="price"
              value={item.price}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Add Item
            </Button>
          </Grid>
          <Grid item xs={12} sx={{height:"350px",overflowY:"auto"}}>
          {itemlist.map((itemlist,index) => (
          <ListItem  key={index}>
            <ListItemText
              primary={itemlist.text}
              secondary={`Category: ${itemlist.category}, Price: ${itemlist.price}`}
            />
          </ListItem>
        ))}
                  {/* {
                    JSON.stringify(itemlist)
                  } */}
          </Grid>
        </Grid>
      </form>
    </Container>
        :     <Skeleton
        sx={{ bgcolor: 'grey.900' }}
        variant="rectangular"
        width={310}
        height={720}
      />
      }
    </Combiner>
  );
};

export default AddItemForm;



