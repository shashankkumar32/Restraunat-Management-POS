import type { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";
import {
  Box,
  Button,
  Grid,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import PermanentDrawerLeft from "../../../layout/layout";
import Dynamiclistview from "./inc/dynamiclistview";
 import React from 'react'

const Page: NextPageWithLayout = () => {
  const [select,setSelect]=React.useState()
  
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
          {data.map(({ text, color }, index) => (
            <Grid item key={index} lg={3}>
              <Button onClick={()=>setSelect(text)} variant="contained">
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
                  {JSON.stringify(select)}
                  {text}1
                </Box>
              </Button>
            </Grid>
          ))}
        </Grid>
        <Dynamiclistview select={select} />
      </Box>
      <Box sx={{ mt: 5 }}>
        <Stack>
          <Box
            sx={{ width: "300px", height: "20px", backgroundColor: "#ffff" }}
          ></Box>
        </Stack>
        <Box
          sx={{
            width: "300px",
            backgroundColor: "#3C4041",
            height: "300px",
            borderRadius: "10px",
            mt: 3,
          }}
        >
          order
          <Box>
            <Stack>
              <Typography sx={{ fontSize: "18px", color: "#ffff", mt: 4 }}>
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
            </Stack>
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
