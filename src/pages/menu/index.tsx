import { ReactElement, useEffect, useState } from "react";
import "../../styles/Home.module.css";
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
import RemoveIcon from '@mui/icons-material/Remove';
import { useDispatch,useSelector} from "react-redux"; 
import FreeBreakfastIcon from '@mui/icons-material/FreeBreakfast';
import SoupKitchenIcon from '@mui/icons-material/SoupKitchen';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import RiceBowlIcon from '@mui/icons-material/RiceBowl';
import RamenDiningIcon from '@mui/icons-material/RamenDining';
import CakeIcon from '@mui/icons-material/Cake';
import {
  addToCart,
  hideLoading,
  showLoading, 
  updateCart,
  deleteFromCart
} from "../../../slice/rootReducer";

import TagFacesIcon from '@mui/icons-material/TagFaces';
import { Anchor } from "@mui/icons-material";
import AddBillForm from "./inc/billingfor";
import AddIcon from '@mui/icons-material/Add';
import { motion } from "framer-motion";
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
  const [containerHeight, setContainerHeight] = useState("90vh"); // Set initial height

  useEffect(() => {
    // Calculate and set the container height here whenever cart items change
    // For example:
    const height = `${90 + cartItems.length * 60}vh`; // Adjust the value based on your cart items' height
    setContainerHeight(height);
  }, [cartItems]);
  const totalAmount = useSelector((state:any) => state.totalAmount);


  const data = [
    {
      text: "Breakfast",
      color: "rgba(207,221,219,40)",
      icon:<FreeBreakfastIcon sx={{color:"black"}}/>
    },
    {
      text: "Soups",
      color: "rgb(230,208,238,40)",
      icons:<SoupKitchenIcon sx={{color:"black"}}/>
    },
    {
      text: "Pasta",
      color: "rgb(241,200,208)",
      icons:<RamenDiningIcon sx={{color:"black"}}/>
    },
    {
      text: "Sushi",
      color: "rgb(201,202,239)",
      icons:<RiceBowlIcon sx={{color:"black"}}/>
    },
    {
      text: "Main Course",
      color: "rgb(250,193,217)",
      icons:<RestaurantIcon sx={{color:"black"}}/>
    },
    {
      text: "Deserts",
      color: "rgb(229,218,222)",
      icons:<CakeIcon sx={{color:"black"}}/>
    },
    {
      text: "Drinks",
      color: "rgb(241,200,208)",
      icons:<CakeIcon sx={{color:"black"}}/>
    },
    {
      text: "Alcohol",
      color: "rgb(194,233,221)",
      icons:<CakeIcon sx={{color:"black"}}/>
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
    <Box sx={{ display: "flex", mt: 2,height:"140vh"}}>
      <Box sx={{ width:{ lg:"920px",md:"720px",sm:"600px",xs:"300px"} }}>
        <Grid container sx={{ mt: 4,py:2,pl:2,height:{lg:"320px",md:"400px",sm:"500px",xs:"400px"},overflowY:"auto"
          // boxShadow:"inset 0 0 10px #3C4041"
           }} lg={12}>
          {/* <Button onClick={() => AddCartItem()}> state change redux</Button> */}
          {data.map(({ text, color,icons }, index) => (
            <Grid item key={index} lg={3} md={5} sm={6} xs={12}>
              <Button sx={{textTransform:"none"}} onClick={() => setSelect(text)} variant="contained">
                <Box
                  sx={{
                    WebkitBackdropFilter:"blur(8px)",
                    backdropFilter:"blur(8px)",
                    backgroundColor: `${color}`,
                    // backgroundColor: "rgb(228 228 228 / 15%)",
                    borderRadius: "10px",
                    p: 1,
                    boxShadow:"rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
                    mt: 1,
                    height: "120px",
                    width: "180px",
                  }}
                >
                  <Stack>

                  {icons}
                  
                  <Typography sx={{color:"black",fontWeight:500,fontSize:"20px"}}>
                    
                    {text}
                    </Typography>
                  </Stack>
                </Box>
              </Button>
            </Grid>
          ))}
        </Grid>
        
        <Dynamiclistview list={list} setList={setList} select={select} />
      </Box>
      <Box sx={{ mt:4,ml:3,display:{md:"block",xs:"none"} ,backgroundColor: "#111315" ,height:"90vh",boxShadow:"rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset"}}>
        <Box sx={{ mt: 5,ml:4 ,pr:3}}>
          <Box sx={{ 
            maxHeight: "500px",
        

            // boxShadow:"inset 0 0 10px #3C4041"
            //  ,
             overflowY: "auto" ,"&::-webkit-scrollbar": {
	  width: 10
    },
    overflowX:"hidden",
    "&::-webkit-scrollbar-track": {
	  backgroundColor: "#111315"
    },
    "&::-webkit-scrollbar-thumb": {
	  backgroundColor: "#FFC0CB",
	  borderRadius: 4
    }}}>
            {cartItems.map((d:any, i:any) => (
               <motion.div  key={i}initial={{ x: -100 }} animate={{ x: 0 }} exit={{ x: -100 }}>
              <Typography key={i} variant="body1">
                
     
                <Chip
                  sx={{
                    color: "#FFFFFF",
                    backgroundColor: "#3C4041",
                    my: 1,
                    height:"40px",
                    
                    borderRadius: "10px",
                    display:"flex",
                    justifyContent:"space-between",
                    width: "100%",
                  }}
                  label={d._id}
                  //  onClick={handleClick}
                  icon={<> <Box sx={{width:"100px",pl:1}}> <IconButton sx={{backgroundColor:"#FFC0CB",height:"30px",width:"30px"}}onClick={()=>handleIncrease(d)}><AddIcon/></IconButton><IconButton sx={{mx:1 ,backgroundColor:"#fff",height:"30px",width:"30px"}}>{d.quantity}</IconButton> <IconButton sx={{backgroundColor:"#FFC0CB",height:"30px",width:"30px"}} onClick={()=>handleDecrease(d)}><RemoveIcon /></IconButton></Box></>}
                   onDelete={()=>DeleteCartItem(d._id)}
                   
                />
                 {/* sds
                  </Chip> */}
              </Typography>
              </motion.div>
            ))}
          </Box>
          <motion.div initial={{ height: "90vh" }} animate={{ height: containerHeight }} exit={{ height: "90vh" }}>
          <Box
            sx={{
              width: "343px",
              backgroundColor: "#3C4041",
              height: "300px",
              borderRadius: "10px",
              mt: 2.,
              mb:2,
              overflowY:"hidden"
             
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
        <AddBillForm/>

        </SwipeableDrawer>
            </Box>
          </Box>
          </motion.div>
        </Box>
      </Box>
    </Box>
  
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <PermanentDrawerLeft><Box   
  className="custom-scrollbar"
  sx={{
    "&::-webkit-scrollbar": {
      width: "10px",
      display: "none", // Disable default scrollbar on WebKit-based browsers
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "#111315",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#ffc0cb",
      borderRadius: "4px",
    },
    scrollbarWidth: "none", // Disable default scrollbar on Firefox
    msOverflowStyle: "none", // Disable default scrollbar on IE/Edge
    "&::-webkit-scrollbar-button": {
      display: "none", // Hide scrollbar buttons on WebKit-based browsers
    },
    "&::-webkit-scrollbar-corner": {
      backgroundColor: "transparent", // Hide scrollbar corner on WebKit-based browsers
    },
    maxHeight: "140vh",
    overflowY: "auto",
    // "&::-webkit-scrollbar": {
    //   width: 10,
    // },
    // "&::-webkit-scrollbar-track": {
    //   backgroundColor: "#111315",
    // },
    // "&::-webkit-scrollbar-thumb": {
    //   backgroundColor: "#FFC0CB",
    //   borderRadius: 4,
    // },
    backgroundColor:"black"
  }}>{page}</Box></PermanentDrawerLeft>
};

export default Page;
