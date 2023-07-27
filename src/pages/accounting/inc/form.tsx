import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

interface FormData {
  id: number;
  category: string;
  text: string;
  price: number;
}

const ItemForm =()=> {
  const [formData, setFormData] = useState<FormData>({
    id: 0,
    category: '',
    text: '',
    price: 0,
  });

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    console.log(formData)

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

  return (
    <div style={{ background: 'linear-gradient(45deg, rgb(17,19,21), rgb(255,192,203), rgb(60,64,65))', height: '93vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <form onSubmit={handleSubmit} style={{ background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <TextField
          label="ID"
          name="id"
          value={formData.id}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="Category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="Text"
          name="text"
          value={formData.text}
          onChange={handleChange}
          multiline
          rows={4}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="Price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}
export default ItemForm