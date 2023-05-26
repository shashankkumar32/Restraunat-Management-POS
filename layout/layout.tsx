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

const drawerWidth = 180;
interface props {
  children: React.ReactNode;
}

const PermanentDrawerLeft: React.FC<props> = ({ children }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Permanent drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,

          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "primary.main",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
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
              <ListItemButton>
                <Link
                  style={{ textDecoration: "none" }}
                  href={`/${text.toLowerCase()}`}
                >
                  <ListItemText sx={{ color: "#ffffff" }} primary={text} />
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
