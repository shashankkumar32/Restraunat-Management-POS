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
import { Paper, useMediaQuery, useTheme } from "@mui/material";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArchiveIcon from "@mui/icons-material/Archive";

const drawerWidth = 140;
interface props {
  children: React.ReactNode;
}

const PermanentDrawerLeft: React.FC<props> = ({ children }) => {
  const theme = useTheme();
  const onlyMediumScreen = useMediaQuery(theme.breakpoints.down(600));
  const [value, setValue] = React.useState(0);
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
  return (<>
  {
    !onlyMediumScreen?
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
      <Box component="main" sx={{ flexGrow: 1, bgcolor: "primary.main", p: 3 ,xs: 'block', sm: 'none'}}>
        {/* <Toolbar /> */}

        {children}
      </Box>
    </Box>:
     <Box sx={{ pb: 7 }} >
     <CssBaseline />
     <List>
       sssd
       {children}
     </List>
     <Paper
       sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
       elevation={3}
     >
       <BottomNavigation
         showLabels
         value={value}
         onChange={(event, newValue) => {
           setValue(newValue);
         }}
       >
         <BottomNavigationAction label="Reservation" icon={<RestoreIcon />} />
         <BottomNavigationAction label="Menu" icon={<FavoriteIcon />} />
         <BottomNavigationAction label="Accounting" icon={<ArchiveIcon />} />
       </BottomNavigation>
     </Paper>
   </Box>
  }
   </>
  );
};

export default PermanentDrawerLeft;
