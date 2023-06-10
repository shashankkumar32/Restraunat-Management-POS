import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import {
  Box,
  Button,
  DialogTitle,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  SwipeableDrawer,
  Switch,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import StickyHeadTable from "./testing/table";
import CustomDialogBox from "./testing/customDialogBox";
import { SyntheticEvent, useState } from "react";

import SignUp from "./testing/CreateForm/formintegeration";
import Card from "./testing/card";
import HorizontalToggleButtons from "./testing/options";
import { url } from "inspector";
import LightModeIcon from "@mui/icons-material/LightMode";
import BedtimeIcon from "@mui/icons-material/Bedtime";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";

const inter = Inter({ subsets: ["latin"] });
type Anchor = "top" | "left" | "bottom" | "right";

export default function Home() {
  const [query, setQuery] = useState("");
  const [open, SetOpen] = useState(false);
  const [view, setView] = useState("list");
  const [checked, setChecked] = useState(true);
  const [deletestatus, setDeleteStatus] = useState(false);
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const theme = useTheme();
  const onlyMediumScreen = useMediaQuery(theme.breakpoints.down(770));

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

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  const handleOpen = () => {
    SetOpen(true);
  };
  const handleClose = () => {
    SetOpen(false);
  };
  const handleCloseDelete = () => {
    setDeleteStatus(false);
  };
  const handleOpenDelete = () => {
    setDeleteStatus(true);
  };
  return (
    <Box
      sx={{
        height: onlyMediumScreen ? "" : "100vh",
        width: "100vw",
        backgroundColor: checked ? "#F2F2F3" : "#121212",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: checked ? "#FCFCFC" : "#181818",
          height: "43px",
        }}
      >
        <Box sx={{ display: "flex", mt: 1, ml: 3 }}>
          <Box
            sx={{
              height: "24px",
              width: "24px",
              backgroundImage: checked
                ? "url('./logo.png')"
                : "url('./darkLogo.png')",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          ></Box>
          <Box
            sx={{
              mt: 0.6,
              fontSize: "11px",
              fontFamily: "sans-serif",
              fontWeight: "450",
              color: checked ? "#000000" : "#ffffff",
            }}
          >
            iral Nation
          </Box>
        </Box>
        <Box sx={{ display: "flex" }}>
          <LightModeIcon sx={{ mt: 1, color: "grey" }} />
          <Switch
            sx={{ mx: 0.6 }}
            checked={checked}
            onChange={handleSwitchChange}
            inputProps={{ "aria-label": "controlled" }}
          />
          <BedtimeIcon
            sx={{ mt: 1, mr: 2, color: checked ? "#000000" : "#ffffff" }}
          />
        </Box>
      </Box>

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
          Create Profile
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
        <Box
          sx={{ width: 520 }}
          role="presentation"
          onClick={toggleDrawer("right", false)}
          onKeyDown={toggleDrawer("right", false)}
        >
          <SignUp />
        </Box>
        <Box
          sx={{
            bottom: 0,
            position: "fixed",
            height: "40px",
            borderTop: "0.3px solid #E4E4E4",
            width: "100vw",
            // alignItems: "right",
            // float: "left",
          }}
        >
          {" "}
          <Grid lg={12} container>
            <Grid item lg={3}></Grid>
            <Grid item lg={3}>
              <Button
                sx={{
                  backgroundColor: "#3DACFF",
                  color: "white",
                }}
              >
                Create Peofile
              </Button>
            </Grid>
          </Grid>
        </Box>
      </SwipeableDrawer>

      <CustomDialogBox
        Title={"Remove profile"}
        handleClose={handleCloseDelete}
        open={deletestatus}
        checked={checked}
        width={"362px"}
        // height={"px"}
      >
        Removed profile will be deleted permenantly and won’t be available
        anymore.
      </CustomDialogBox>
      <Box sx={{}}>
        <Stack>
          <Box
            sx={{
              display: onlyMediumScreen ? "block" : "flex",
              justifyContent: "center",
              width: "100vw",
              px: { lg: 8, xs: 3 },
              mt: 1,
              mb: 0,
            }}
          >
            <TextField
              sx={{
                "& fieldset": {
                  height: "40px",
                  border: "1px solid #353535",
                  mt: 0.8,
                },
              }}
              fullWidth
              placeholder={"Search in design"}
              onChange={(event: any) => setQuery(event.target.value)}
            />
            {!onlyMediumScreen && (
              <HorizontalToggleButtons
                checked={checked}
                view={view}
                setView={setView}
              />
            )}
            <Box sx={{ width: "100vw" }}>
              <Button
                // onClick={handleOpen}
                onClick={toggleDrawer("right", true)}
                sx={{
                  mt: 0.8,
                  color: "#3DACFF",
                  border: "1px solid #3DACFF",

                  width: "143px",
                  height: "34px",
                  fontSize: "10px",
                }}
                variant="outlined"
              >
                Create Profile
              </Button>
            </Box>
          </Box>
          {view == "list" ? (
            <Box
              sx={{ width: "100vw", display: "flex", justifyContent: "center" }}
            >
              <StickyHeadTable
                checked={checked}
                handleOpenDelete={handleOpenDelete}
              />
            </Box>
          ) : (
            // <Box
            //   sx={{ width: "100vw", display: "flex", justifyContent: "center" }}
            // >
            <Grid container lg={12} spacing={2}>
              <Grid xs={12} lg={3} item>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Card checked={checked} />
                </Box>
              </Grid>
              <Grid xs={12} lg={3} item>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Card checked={checked} />
                </Box>
              </Grid>
              <Grid xs={12} lg={3} item>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Card checked={checked} />
                </Box>
              </Grid>
              <Grid xs={12} lg={3} item>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Card checked={checked} />
                </Box>
              </Grid>
            </Grid>
            // </Box>
          )}
        </Stack>
      </Box>
    </Box>
  );
}
