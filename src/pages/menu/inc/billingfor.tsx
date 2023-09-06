import React, { useState } from "react";
import axios from "axios";
import { Box, Button, Stack, TextField } from "@mui/material";
import { useDispatch,useSelector} from "react-redux"; 

import { resetCart } from '../../../../slice/rootReducer'; 


const AddBillForm = (props:any)=> {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    customerName: "",
    customerNumber: Number,
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
    const final ={...formData,cartItems:cartItems,totalAmount:totalAmount,subTotal:totalAmount,tax:10,paymentMode:"Cash"}
    console.log(formData)
    console.log(final)
    try {
      const response = await axios.post("https://backb.onrender.com/api/bills/add-bills", final);
      console.log(response.data); // The response from the server
      // Optionally, you can show a success message or perform other actions here
      dispatch(resetCart());
      setFormData({
        customerName: "",
        customerNumber: Number,
        totalAmount: "",
        subTotal: "",
        tax: "",
        paymentMode: "",
        cartItems: [],
      });
      setTimeout(() => {
        props.onClose();
      }, 0)
    } catch (error) {
      console.error(error);
      // Handle error, show error message, etc.
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack sx={{px:0, backgroundColor:"white",borderRadius:"12px",py:3}}>
      <label>
        Customer Name:
        </label>
        <Box sx={{display:"flex",justifyContent:"center"}}>

        <TextField
        
        sx={{my:1,width:"300px"}}
          type="text"
          name="customerName"

          value={formData.customerName}
          onChange={handleChange}
        />
        </Box>
          <label>
        Customer Number:
        </label>
        <Box sx={{display:"flex",justifyContent:"center"}}>

           <TextField
             sx={{my:1,width:"300px"}}
          type="text"
          name="customerNumber"

          value={formData.customerNumber}
          onChange={handleChange}
        />
</Box>
      {/* Add other input fields for other bill attributes */}
      <Button sx={{}} type="submit">Add Bill</Button>
      </Stack>
    </form>
  );
};

export default AddBillForm;
