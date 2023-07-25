import React, { useState } from "react";
import axios from "axios";
import { Button, Stack, TextField } from "@mui/material";
import { useDispatch,useSelector} from "react-redux"; 


const AddBillForm = () => {
  const [formData, setFormData] = useState({
    customerName: "",
    customerNumber: "",
    totalAmount: "",
    subTotal: "",
    tax: "",
    paymentMode: "",
    cartItems: [],
  });

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const cartItems = useSelector((state:any) => state.cartItems);

  const totalAmount = useSelector((state:any) => state.totalAmount);

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    const final ={...formData,cartItems:cartItems,totalAmount:totalAmount,subTotal:totalAmount,}
    console.log(formData)
    console.log(final)
    // try {
    //   const response = await axios.post("/bills/add", formData);
    //   console.log(response.data); // The response from the server
    //   // Optionally, you can show a success message or perform other actions here
    // } catch (error) {
    //   console.error(error);
    //   // Handle error, show error message, etc.
    // }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack sx={{px:2}}>
      <label>
        Customer Name:
        </label>
        <TextField
        sx={{my:1}}
          type="text"
          name="customerName"

          value={formData.customerName}
          onChange={handleChange}
        />
          <label>
        Customer Number:
        </label>
           <TextField
             sx={{my:1}}
          type="text"
          name="customerNumber"

          value={formData.customerNumber}
          onChange={handleChange}
        />
      {/* Add other input fields for other bill attributes */}
      <Button sx={{}} type="submit">Add Bill</Button>
      </Stack>
    </form>
  );
};

export default AddBillForm;
