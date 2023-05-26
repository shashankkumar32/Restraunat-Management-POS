import type { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";
import { Box, Button, ListItemText } from "@mui/material";
import PermanentDrawerLeft from "../../../layout/layout";
import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Page: NextPageWithLayout = () => {
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "120px",
    slidesToShow: 3,
    swipeToSlide: true,
    speed: 500,
    rows: 2,
    // slidesPerRow: 2,
  };
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
    <Box sx={{ width: "820px", backgroundColor: "#fff" }}>
      Delivery
      
      <div>
        <h2>Multiple Rows</h2>
        <Slider {...settings}>
          {data.map(({ text, color }, index) => (
            // eslint-disable-next-line react/jsx-key

            // eslint-disable-next-line react/jsx-key
            <>
              <Button
                sx={{
                  backgroundColor: `${color}`,
                  borderRadius: "10px",
                  mx: "20px",

                  height: "140px",
                  width: "160px",
                }}
              >
                <Box
                  sx={{
                    backgroundColor: `#ffff`,
                    borderRadius: "10px",
                    m: 1,
                    width: "10px",
                  }}
                >
                  dfd
                </Box>
                {text}1
              </Button>
              &nbsp;
            </>
          ))}
        </Slider>
      </div>
    </Box>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <PermanentDrawerLeft>{page}</PermanentDrawerLeft>;
};

export default Page;
