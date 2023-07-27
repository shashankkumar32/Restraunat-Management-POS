import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Link from "next/link";
import { useRouter } from 'next/router'

const drawerWidth = 140;
interface props {
  children: React.ReactNode;
}

const PermanentDrawerLeft: React.FC<props> = ({ children }) => {
  const[select,setSelect]=React.useState("")
  const router = useRouter()
  const clickHandler=(text:any)=>{
    setSelect(text)
    if (typeof text === 'string') {
      const small = text.toLowerCase();
      // setSelect(small);
      router.push(`/${small}`);
    } else {
      // Handle the case where text is not a string
      // You can throw an error, show an error message, or handle it in any other way.
    }
  //  const  small=text.toLowerCase()
  //   router.push(`/${small}`)
  }
  return (
    <Box sx={{ display: "flex", }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            POS-Billing
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          borderRight:"white solid 10px",
          flexShrink: 0,
     

          "& .MuiDrawer-paper": {
            width: drawerWidth,
            borderRight:"#FFC0CB solid 2px",
            boxSizing: "border-box",
            backgroundColor: "primary.main",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar>dfdf</Toolbar>
        
        <Divider />
        <List sx={{ backgroundColor: "primary.main", color: "primary.light" }}>
          {[
            "Reservation",
            "Table Services",
            "Menu",
            "Delivery",
            "Accounting",
          ].map((text, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton onClick={()=>  clickHandler(text)}sx={{boxShadow:"inset 0.1px 0.2px 0.2px grey",backgroundColor:select==text?"#FFC0CB":"",py:4}}>
                <Link
                  style={{ textDecoration: "none" }}
                  href={`/${text.toLowerCase()}`}
                >
                  <ListItemText sx={{color:select==text?"black":"#ffffff"}} primary={text} />
                </Link>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, bgcolor: "primary.main", p: 3 }}>
        {/* <Toolbar /> */}

        {children}
      </Box>
    </Box>
  );
};

export default PermanentDrawerLeft;
