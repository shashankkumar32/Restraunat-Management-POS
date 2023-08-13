
import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Box, Stack } from '@mui/material';

interface FormData {
  id: number;
  category: string;
  text: string;
  price: number;
}

const ItemForm = () => {
  const [formData, setFormData] = useState<FormData>({
    id: 0,
    category: '',
    text: '',
    price: 0,
  });

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    console.log(formData);

    // try {
    //   const response = await axios.post('/api/submit-form', formData);
    //   console.log(response.data);
    //   // Handle success or show a success message
    // } catch (error) {
    //   console.error(error);
    //   // Handle error or show an error message
    // }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    const { value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      category: value,
    }));
  };

  return (
    <div
      style={{
        background:
          'linear-gradient(45deg, rgb(17, 19, 21), rgb(255, 192, 203), rgb(60, 64, 65))',
        height: '93vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: 'rgba(0,0,0,40%)',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          
        }}
      >
        <Box sx={{backgroundColor:"white",p:2,borderRadius:"10px"}}>
        <Stack>
        <TextField
          label="ID"
          name="id"
          value={formData.id}
          onChange={handleChange}
          // fullWidth
          margin="normal"
          size="small"
          variant="outlined"
          style={{ background: 'white',minWidth:"340px" }} 
        />
        <FormControl variant="outlined" margin="normal">
          <Select
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleCategoryChange}
            style={{ background: 'white',minWidth:"340px"  }} 
            size="small"
          >
            <MenuItem value="Category 1">Category 1</MenuItem>
            <MenuItem value="Category 2">Category 2</MenuItem>
            <MenuItem value="Category 3">Category 3</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Text"
          name="text"
          value={formData.text}
          onChange={handleChange}
        
          margin="normal"
          variant="outlined"
          size="small"
          style={{ background: 'white',minWidth:"340px"  }} 
        />
        <FormControl variant="outlined" margin="normal">
          <OutlinedInput
           style={{ background: 'white' ,minWidth:"340px" }} 
            label="Price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            size="small"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
        </FormControl>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
        </Stack>
        </Box>
      </form>
    </div>
  );
};

export default ItemForm;

