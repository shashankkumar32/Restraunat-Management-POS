import { ReactElement, useEffect, useState } from "react";
import "../../styles/Home.module.css";
import { NextPageWithLayout } from "../_app";
//
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
  DialogContent,
  CircularProgress,
  Skeleton,
  useMediaQuery
,
  Avatar,
  useTheme,
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
  deleteFromCart,
  resetCart 
} from "../../../slice/rootReducer";

import TagFacesIcon from '@mui/icons-material/TagFaces';
import { Anchor } from "@mui/icons-material";
import AddBillForm from "./inc/billingfor";
import AddIcon from '@mui/icons-material/Add';
import { motion } from "framer-motion";
import CustomIcon from "../accounting/inc/customIcon.js";
import axios from "axios";
import { deepOrange } from "@mui/material/colors";
type Anchor = "top" | "left" | "bottom" | "right";
interface Data{
  text:string,
  color:string,
  icons:string
}
interface Category {
  _id: string;
  text: string;
  color: string;
  icon: string;
}
const colordata=[
  "#CFDDDB","#E6D0EE","#C9CAEF","#C2E9DD","#F1C8D0","#FAC1D9","#C2E9DD"
]
const data:Data[] = [
  {
    text: "Breakfast",
    color: "rgba(207,221,219,40)",
    icons:'FreeBreakfast'
  },
  {
    text: "Soups",
    color: "rgb(230,208,238,40)",
    icons:'SoupKitchen'
  },
  {
    text: "Pasta",
    color: "rgb(241,200,208)",
    icons:"RamenDining" 
  },
  {
    text: "Sushi",
    color: "rgb(201,202,239)",
    icons:"RiceBowl" 
  },
  {
    text: "Main Course",
    color: "rgb(250,193,217)",
    icons:"Restaurant" 
  },
  {
    text: "Deserts",
    color: "rgb(229,218,222)",
    icons:"Cake" 
  },
  {
    text: "Drinks",
    color: "rgb(241,200,208)",
    icons:"Cake" 
  },
  {
    text: "Alcohol",
    color: "rgb(194,233,221)",
    icons:"Cake" 
  },
];
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
  const [scrollLimit, setScrollLimit] = useState(1200);

  const handleScroll = () => {
    if (window.scrollY > scrollLimit) {
      window.scrollTo(0, scrollLimit);
    }
  };
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadState,setLoadState]=useState(true)

  useEffect(() => {
    // Fetch category data from the API using Axios
    setLoadState(false)
    axios
      .get<Category[]>("https://backb.onrender.com/api/category/get-categories")
      .then((response) => {
        setCategories(response.data);
        setLoadState(true)
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  useEffect(() => {
    const handleScrollEvent = () => {
      handleScroll();
    };

    window.addEventListener('scroll', handleScrollEvent);

    return () => {
      window.removeEventListener('scroll', handleScrollEvent);
    };
  }, []);

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
  const theme = useTheme();
  const totalAmount = useSelector((state:any) => state.totalAmount);
  const recentOrders = useSelector((state:any) => state.orders);
  const onlyMediumScreen = useMediaQuery(theme.breakpoints.down(1800));



  const Data = (anchor: Anchor) => (
    <Box
      // sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      sx={{width:"370px",backgroundColor:"white",borderRadius:"15px",py:3,my:3}}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      // onKeyDown={toggleDrawer(anchor, false)}
    >
      
      <List sx={{display:"flex",justifyContent:"center"}}>
        <Stack>
          
      {
        cartItems.map((item:any,index:any) => (
          <ListItem sx={{width:"400px"}} key={index} disablePadding>
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
        </Stack>
      </List>
  {/* <Divider /> */}
    
    </Box>
  )
  return (
    <Box sx={{ display: "flex", mt: 2,}}>
      <Box sx={{ width:{ lg:"920px",md:"720px",sm:"600px",xs:"300px"},mx:4 }}>
        <Grid container sx={{ mt: 4,py:2,pl:2,height:{lg:"320px",md:"400px",sm:"500px",xs:"400px"},overflowY:"auto"
          // boxShadow:"inset 0 0 10px #3C4041"
           }} lg={12}>
            {
              loadState?
          <>
          {categories?.map(({ _id, text, color, icon }, index) => (
            <Grid item key={index} lg={3} md={5} sm={6} xs={12}>
                   {/* <motion.div
                initial={{ y: 50, opacity: 0 }} // Initial position below the grid, not visible
                animate={{ y: 0, opacity: 1 }} // Final position in the grid, fully visible
                exit={{ y: 50, opacity: 0 }} // Exit animation
                transition={{ duration: 0.5, delay: index * 0.1 }} // Adjust the delay for staggered appearance
              > */}
                <Button
                  sx={{ textTransform: "none" }}
                  onClick={() => setSelect(text)}
                  variant="contained"
                >
                  <Box
                    sx={{
                      WebkitBackdropFilter: "blur(8px)",
                      backdropFilter: "blur(8px)",
                      backgroundColor: `${color}`,
                      borderRadius: "10px",
                      p: 1,
                      boxShadow:
                        "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
                      mt: 1,
                      height: "120px",
                      width: "180px",
                    }}
                  >
                    <Stack>
                      <CustomIcon iconName={icon} />
                      <Typography
                        sx={{ color: "black", fontWeight: 500, fontSize: "20px" }}
                      >
                        {text}
                      </Typography>
                    </Stack>
                  </Box>
                </Button>
              {/* </motion.div> */}
            </Grid>
          ))}
          </>:
          <Box sx={{   display: 'flex',
          flexWrap: 'wrap',
          alignContent: 'flex-start',justifyContent:"center" ,width:{ lg:"920px",md:"720px",sm:"600px",xs:"300px"}}}>
          <Box sx={{m:1}}>    <Skeleton
        sx={{ bgcolor: 'grey.900' }}
        variant="rectangular"
        width={180}
        height={120}
      /></Box>
                <Box sx={{m:1}}>    <Skeleton
        sx={{ bgcolor: 'grey.900' }}
        variant="rectangular"
        width={180}
        height={120}
      /></Box>
                <Box sx={{m:1}}>    <Skeleton
        sx={{ bgcolor: 'grey.900' }}
        variant="rectangular"
        width={180}
        height={120}
      /></Box>
                <Box sx={{m:1}}>    <Skeleton
        sx={{ bgcolor: 'grey.900' }}
        variant="rectangular"
        width={180}
        height={120}
      /></Box>
                <Box sx={{m:1}}>    <Skeleton
        sx={{ bgcolor: 'grey.900' }}
        variant="rectangular"
        width={180}
        height={120}
      />
      </Box>
                <Box sx={{m:1}}>    <Skeleton
        sx={{ bgcolor: 'grey.900' }}
        variant="rectangular"
        width={180}
        height={120}
      /></Box> 
      </Box>
            }
        </Grid>
        
        <Dynamiclistview list={list} setList={setList} select={select} />
          {
            onlyMediumScreen&&
        <Box sx={{height:"170px",width:"920px",mt:4,overflowX:"auto",display:"flex"}}>
      {recentOrders.map((order:any, index:any) => (
          <Box sx={{width:"315px",backgroundColor:"#000000",border:`solid 1px ${colordata[index]}`,my:2,borderRadius:"12px",height:"80px",display:"flex"}}key={index}>
           <Avatar sx={{ bgcolor: colordata[index],height:"75px",width:"75px" }}>{order.customerName.charAt(0)}</Avatar>
            <Box sx={{}}>
            {/* Render order details here */}
            <Typography>
            {order.customerName}
            </Typography>
            
            {
              order.cartItems.map((d:any,index:any)=><Chip label={d._id} key={index} variant="outlined"/>)
            }
            </Box>
            {/* {JSON.stringify(order.cartItems)} */}
            {/* Add more order details */}
          </Box>
        ))}
      </Box>
          }
      </Box>
      <Box sx={{ mt:3.5,ml:3,display:{md:"block",xs:"none"} ,backgroundColor: "#111315" ,height:"93vh",boxShadow:"rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset"}}>
        <Box sx={{ mt: 3,ml:4 ,pr:3}}>
          <Box sx={{ 
            maxHeight: "450px",
        

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
              mb:1,
              overflowY:"hidden"
             
            }}
          >
           &nbsp;&nbsp;&nbsp; order
            <Box>
              <Stack sx={{px:2}}>
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
                  Total:{totalAmount.toFixed(2)}
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
        // sx={{width:"420px",borderRadius:"50%"}}
        // sx={{backgroundColor:"black"}}
        PaperProps={{
          sx: {
            backgroundColor: "#111315",
            borderRadius:"40px",
            color: "black",
          }
        }}
      >
         {/* <DialogTitle
          id="alert-dialog-title" <label>
        Customer Name:
        </label>
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
        {/* </DialogTitle>  */}
        <DialogContent sx={{width:"420px"}}>
        {Data("right")} 

        <AddBillForm onClose={toggleDrawer("right", false)}/>
        </DialogContent>

        </SwipeableDrawer>
            </Box>
          </Box>
          </motion.div>
        </Box>
      </Box>{
        !onlyMediumScreen&&
      <Box sx={{height:"900px",width:"322px",ml:"10px",mt:4,overflowY:"auto"}}>
      {recentOrders.map((order:any, index:any) => (
          <Box sx={{width:"315px",backgroundColor:"#000000",border:`solid 1px ${colordata[index]}`,my:2,borderRadius:"12px",height:"80px",display:"flex"}}key={index}>
           <Avatar sx={{ bgcolor: colordata[index],height:"75px",width:"75px" }}>{order.customerName.charAt(0)}</Avatar>
            <Box sx={{}}>
            {/* Render order details here */}
            <Typography>
            {order.customerName}
            </Typography>
            
            {
              order.cartItems.map((d:any,index:any)=><Chip label={d._id} key={index} variant="outlined"/>)
            }
            </Box>
            {/* {JSON.stringify(order.cartItems)} */}
            {/* Add more order details */}
          </Box>
        ))}
      </Box>
      }
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
    height: "140vh",
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
