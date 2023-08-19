
const iconNames = [
  'FreeBreakfast',
  'SoupKitchen',
  "RamenDining" ,
  "RiceBowl",
  "Restaurant",
  "Cake" ,



  // 'Fastfood',

];

import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  Container,
  MenuItem,
  Select,
  Box,
} from "@mui/material";
import CategoriesDisplay from "./DisplayCategories";
import Combinercat from "./combinercat";
import CustomIcon from "./customIcon";
import { SelectChangeEvent } from "@mui/material/Select"; // Correct the import path for SelectChangeEvent

// Define the array of colors
const colorOptions = [
  '#1f4068', // Dark Blue
  '#3d5a80', // Navy Blue
  '#5e7f5e', // Teal Blue
  '#7ea3a2', // Aqua Blue
  'rgba(207,221,219,40)',
  'rgb(230,208,238,40)',
  'rgb(241,200,208)',
  'rgb(201,202,239)',
  'rgb(250,193,217)',
  'rgb(229,218,222)',
  'rgb(241,200,208)',

  'rgb(194,233,221)',
  // Shades of Pink
  '#d9bf77', // Pale Pink
  '#ec9192', // Coral Pink
  '#d3a4ff', // Lavender Pink
  '#e6b89c', // Peach Pink

  // Shades of Red
  '#91091e', // Dark Red
  '#c70039', // Crimson Red
  '#f37121', // Tangerine Red
  '#f9bc60', // Mustard Red

  // Shades of Orange
  '#ff5733', // Bright Orange
  '#ff833a', // Tangerine Orange
  '#ffda45', // Canary Orange
  '#ffb6b9', // Pastel Orange

  // Shades of Yellow
  '#e6d362', // Sunflower Yellow
  '#f4eb49', // Lemon Yellow
  '#fff34e', // Pale Yellow
  '#ffec99', // Cream Yellow

  // Shades of Indigo
  '#273c75', // Deep Indigo
  '#4a69bd', // Royal Indigo
  '#8c7ae6', // Periwinkle Indigo
  '#a4b0be', // Steel Indigo

  // Shades of Turquoise
  '#0c2461', // Dark Turquoise
  '#40739e', // Steel Turquoise
  '#679b9b', // Grayish Turquoise
  '#7dd181', // Mint Turquoise
  // Add more colors here
];

const AddCategoryForm: React.FC = () => {
  const [category, setCategory] = useState({
    text: "",
    color: "",
    icon: "",
  });

  const [refreshCategories, setRefreshCategories] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://backb.onrender.com/api/category/add-category",
        category
      );
      console.log("Category added:", response.data);
      setRefreshCategories(!refreshCategories);
      setCategory({
        text: "",
        color: "",
        icon: "", // Reset the icon field
      });
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCategory((prevCategory) => ({
      ...prevCategory,
      [name]: value,
    }));
  };
  const handleIconChange = (e: SelectChangeEvent<string>) => {
    const selectedIcon = e.target.value;
    setCategory((prevCategory) => ({
      ...prevCategory,
      icon: selectedIcon,
    }));
  };
  const handleColorChange = (e: SelectChangeEvent<string>) => {
    const selectedColor = e.target.value;
    setCategory((prevCategory) => ({
      ...prevCategory,
      color: selectedColor,
    }));
  };

  return (
    <Combinercat>
      <Container component={Paper} sx={{ padding: 3, width: "300px", height: "730px" }}>
        <Typography variant="h4" gutterBottom>
          Add Category
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Text"
                fullWidth
                name="text"
                value={category.text}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Select
                label="Color"
                fullWidth
                name="color"
                value={category.color}
                onChange={handleColorChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {colorOptions.map((colorOption, index) => (
                  <MenuItem key={index} value={colorOption}>
                    <Box sx={{backgroundColor:colorOption,pt:0.1}}>  {colorOption}.</Box>
                    {/* {colorOption} */}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12}>
              <Select
                label="Icon"
                fullWidth
                name="icon"
                value={category.icon}
                onChange={handleIconChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {iconNames.map((iconName, index) => (
                  <MenuItem key={index} value={iconName}>
                    <CustomIcon iconName={iconName} />{iconName}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Add Category
              </Button>
            </Grid>
          </Grid>
          <CategoriesDisplay key={refreshCategories ? 1 : 0} />
        </form>
      </Container>
    </Combinercat>
  );
};

export default AddCategoryForm;

