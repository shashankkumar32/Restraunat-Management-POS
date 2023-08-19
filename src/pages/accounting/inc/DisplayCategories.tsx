import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Container,
  Paper,
} from "@mui/material";

interface Category {
  _id: string;
  text: string;
  color: string;
  icon: string;
}

const CategoriesDisplay: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

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

  return (
    <Container component={Paper} maxWidth="sm" sx={{ padding: 1 }}>
      <Typography variant="h4" gutterBottom>
        Categories
      </Typography>
      <List sx={{height:"300px",overflowY:"auto"}}>
        {categories.map((category) => (
          <ListItem key={category._id}>
            <ListItemText
              primary={category.text}
              secondary={`Color: ${category.color}, Icon: ${category.icon}`}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default CategoriesDisplay;
