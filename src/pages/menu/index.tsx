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
} from "@mui/material";
import PermanentDrawerLeft from "../../../layout/layout";
import Dynamiclistview from "./inc/dynamiclistview";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux"; 
import {
  addToCart,
  hideLoading,
  showLoading,
  deleteFromCart
} from "../../../slice/rootReducer";
import {  useSelector } from 'react-redux';
import TagFacesIcon from '@mui/icons-material/TagFaces';
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

  const AddCartItem = (id:any) => {
    dispatch(addToCart({ _id: id, quantity: 1 }));
  };
  const DeleteCartItem=(id:any)=>{
    dispatch(deleteFromCart({_id:id}))
  }
  const cartItems = useSelector((state:any) => state.cartItems);

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
      text: "Alchol",
      color: "#CFDDDB",
    },
  ];
  return (
    <Box sx={{ display: "flex", mt: 2 }}>
      <Box sx={{ width: "920px" }}>
        <Grid container sx={{ my: 2 }} lg={12}>
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
      <Box sx={{ height: "93vh", backgroundColor: "#111315" }}>
        <Box sx={{ mt: 5,ml:4 }}>
          <Box sx={{ maxHeight: "300px", overflowY: "auto" }}>
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
                  icon={<IconButton>{d.quantity}</IconButton>}
                   onDelete={()=>DeleteCartItem(d._id)}
                   
                />
                 {/* sds
                  </Chip> */}
              </Typography>
            ))}
          </Box>
          <Box
            sx={{
              width: "300px",
              backgroundColor: "#3C4041",
              height: "300px",
              borderRadius: "10px",
              mt: 3,
             
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
                  Total:
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
      >
         <DialogTitle
          id="alert-dialog-title"
          sx={{ borderBottom: "0.3px solid #E4E4E4" }}
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
        {
          JSON.stringify(cartItems)
        }
        <Box
          sx={{ width: 520 }}
          role="presentation"
          onClick={toggleDrawer("right", false)}
          onKeyDown={toggleDrawer("right", false)}
        >
        <Stack>
          {
            cartItems.map((d:any,i:any)=>{

          <Typography sx={{fontSize:"16px",fontWeight:"600px",color:"grey"}}>
           {
            d._id
           } *{
            d.quantity
           }=100
            </Typography>
            })
          }
        </Stack>
        </Box>
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
