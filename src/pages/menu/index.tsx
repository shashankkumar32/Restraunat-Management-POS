import { ReactElement, useState } from "react";
import { NextPageWithLayout } from "../_app";
import {
  Box,
  Button,
  Chip,
  Grid,
  ListItemText,
  SwipeableDrawer,
  Stack,
  DialogTitle,
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Divider,
} from "@mui/material";
import PermanentDrawerLeft from "../../../layout/layout";
import Dynamiclistview from "./inc/dynamiclistview";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch,useSelector} from "react-redux"; 
import {
  addToCart,
  hideLoading,
  showLoading, 
  updateCart,
  deleteFromCart
} from "../../../slice/rootReducer";

import TagFacesIcon from '@mui/icons-material/TagFaces';
import { Anchor } from "@mui/icons-material";
type Anchor = "top" | "left" | "bottom" | "right";
const Page: NextPageWithLayout = () => {
  const [select, setSelect] = React.useState('');
  const [list, setList] = useState([]);
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const dispatch = useDispatch();
  const toggleDrawer =
  (anchor: Anchor, open: boolean) =>
  (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event &&
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  // const AddCartItem = (id:any) => {
  //   dispatch(addToCart({ _id: id, quantity: 1 }));
  // };
  const DeleteCartItem=(id:any)=>{
    dispatch(deleteFromCart({_id:id}))
  }
  const handleIncrease = (item:any) => {
    const updatedItem = { ...item, quantity: item.quantity + 1 };
    dispatch(updateCart(updatedItem));
  };

  const handleDecrease = (item:any) => {
    if (item.quantity > 1) {
      const updatedItem = { ...item, quantity: item.quantity - 1 };
      dispatch(updateCart(updatedItem));
    } else {
      dispatch(deleteFromCart({ _id: item._id }));
    }
  };
  const cartItems = useSelector((state:any) => state.cartItems);

  const totalAmount = useSelector((state:any) => state.totalAmount);


  const data = [
    {
      text: "Breakfast",
      color: "#CFDDDB",
    },
    {
      text: "Soups",
      color: "#E4CDEE",
    },
    {
      text: "Pasta",
      color: "#ba68c8",
    },
    {
      text: "Sushi",
      color: "#03a9f4",
    },
    {
      text: "Main Course",
      color: "#ff9800",
    },
    {
      text: "Deserts",
      color: "#4caf50",
    },
    {
      text: "Drinks",
      color: "#CFDDDB",
    },
    {
      text: "Alcohol",
      color: "#CFDDDB",
    },
  ];

  const Data = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      
      <List>
      {
        cartItems.map((item:any,index:any) => (
          <ListItem sx={{width:"420px"}} key={index} disablePadding>
      <ListItemButton >
        <ListItemIcon>
          {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
        </ListItemIcon>
        <ListItemText primary={`${item.quantity}`+ `*`+ `${item._id}`
        } />
      </ListItemButton>
    </ListItem>
   
   ))
  }
      </List>
  <Divider />
    
    </Box>
  )
  return (
    <Box sx={{ display: "flex", mt: 2 }}>
      <Box sx={{ width: "920px" }}>
        <Grid container sx={{ mt: 4,py:2,pl:2,boxShadow:"inset 0 0 10px #3C4041" }} lg={12}>
          {/* <Button onClick={() => AddCartItem()}> state change redux</Button> */}
          {data.map(({ text, color }, index) => (
            <Grid item key={index} lg={3}>
              <Button onClick={() => setSelect(text)} variant="contained">
                <Box
                  sx={{
                    backgroundColor: `${color}`,
                    borderRadius: "10px",
                    p: 1,
                    
                    mt: 1,
                    height: "133px",
                    width: "160px",
                  }}
                >
                  
                  {text}1
                </Box>
              </Button>
            </Grid>
          ))}
        </Grid>
        
        <Dynamiclistview list={list} setList={setList} select={select} />
      </Box>
      <Box sx={{ mt:4,ml:3, backgroundColor: "#111315" ,boxShadow:"rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset"}}>
        <Box sx={{ mt: 5,ml:4 ,pr:3}}>
          <Box sx={{ height: "500px",boxShadow:"inset 0 0 10px #3C4041" ,overflowY: "auto" ,"&::-webkit-scrollbar": {
	  width: 10
    },
    "&::-webkit-scrollbar-track": {
	  backgroundColor: "#111315"
    },
    "&::-webkit-scrollbar-thumb": {
	  backgroundColor: "#FFC0CB",
	  borderRadius: 4
    }}}>
            {cartItems.map((d:any, i:any) => (
              <Typography key={i} variant="body1">
                
     
                <Chip
                  sx={{
                    color: "#FFFFFF",
                    backgroundColor: "#3C4041",
                    my: 1,
                    
                    borderRadius: "10px",
                    display:"flex",
                    justifyContent:"space-between",
                    width: "100%",
                  }}
                  label={d._id}
                  //  onClick={handleClick}
                  icon={<>  <Button onClick={()=>handleIncrease(d)}>Increase</Button><IconButton>{d.quantity}</IconButton> <Button onClick={()=>handleDecrease(d)}>Decrease</Button></>}
                   onDelete={()=>DeleteCartItem(d._id)}
                   
                />
                 {/* sds
                  </Chip> */}
              </Typography>
            ))}
          </Box>
          <Box
            sx={{
              width: "343px",
              backgroundColor: "#3C4041",
              height: "300px",
              borderRadius: "10px",
              mt: 2.,
              mb:2
             
            }}
          >
           &nbsp;&nbsp;&nbsp; order
            <Box>
              <Stack sx={{px:3}}>
                <Typography sx={{ fontSize: "18px", color: "#ffff", mt: 4 }}>
                  {/* {
                    JSON.stringify(cartItems)
                  } */}
                  subTotal:
                  
                </Typography>
                <Typography
                  sx={{
                    fontSize: "12px",
                    color: "#ffff", 
                    mt: 4,
                    borderBottom: "solid 1px grey",
                  }}
                >
                  Tax:
                </Typography>
                <Typography sx={{ fontSize: "12px", color: "#ffff", mt: 4 }}>
                  Total:{totalAmount}
                </Typography>
                <Button   onClick={toggleDrawer("right", true)} sx={{backgroundColor:"white",color:"black",fontSize:"19px",fontWeight:"500",mt:4}}>
                  Place Order
                  </Button>
              </Stack>
              <SwipeableDrawer
        anchor={"right"}
        open={state["right"]}
        onClose={toggleDrawer("right", false)}
        onOpen={toggleDrawer("right", true)}
        sx={{width:"320px"}}
      >
         <DialogTitle
          id="alert-dialog-title"
          sx={{ borderBottom: "0.3px solid #E4E4E4" ,width:"400px"}}
        >
         On your Cart
          <IconButton
            aria-label="close"
            onClick={toggleDrawer("right", false)}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              //   color: (theme) =>  .palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          {/* {open ? (
        ) : null} */}
        </DialogTitle>
        {Data("right")} 
   

        </SwipeableDrawer>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <PermanentDrawerLeft>{page}</PermanentDrawerLeft>;
};

export default Page;
