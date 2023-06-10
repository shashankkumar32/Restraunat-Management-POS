import { Box, Button } from "@mui/material";
import React, { useState, useEffect } from "react";

interface props {
  select: any;
  list: any;
  setList: any;
}

const Dynamiclistview: React.FC<props> = ({ select, list, setList }) => {
  const [iset, setColor] = useState(true);
  const [arr, setArr] = useState([]);
  // const [list, setList] = useState([]);
  const onClickfunction = (text: any) => {
    list.push(text);
    setList(list);
    iset ? setColor(false) : setColor(true);
    console.log(list, "someyhing");
  };

  const data = [
    { id: 1, category: "Breakfast", text: "Breakfast", color: "#CFDDDB" },
    { id: 2, category: "Breakfast", text: "Soups", color: "#E4CDEE" },
    { id: 3, category: "Breakfast", text: "Pasta", color: "#ba68c8" },
    { id: 4, category: "Breakfast", text: "Sushi", color: "#03a9f4" },
    { id: 5, category: "Breakfast", text: "Main Course", color: "#ff9800" },
    { id: 6, category: "Deserts", text: "Deserts", color: "#4caf50" },
    { id: 7, category: "Deserts", text: "Drinks", color: "#CFDDDB" },
    { id: 8, category: "Deserts", text: "Alchol", color: "#CFDDDB" },
    { id: 9, category: "Deserts", text: "Sushi", color: "#03a9f4" },
    { id: 10, category: "Deserts", text: "Main Course", color: "#ff9800" },
    { id: 11, category: "Deserts", text: "Deserts", color: "#4caf50" },
    { id: 12, category: "Deserts", text: "Drinks", color: "#CFDDDB" },
    { id: 13, category: "Deserts", text: "Alchol", color: "#CFDDDB" },
  ];
  const data2 = [
    { id: 7, category: "Deserts", text: "Drinks", color: "#CFDDDB" },
    { id: 8, category: "Deserts", text: "Alchol", color: "#CFDDDB" },
    { id: 9, category: "Deserts", text: "Sushi", color: "#03a9f4" },
    { id: 10, category: "Deserts", text: "Main Course", color: "#ff9800" },
    { id: 11, category: "Deserts", text: "Deserts", color: "#4caf50" },
    { id: 12, category: "Deserts", text: "Drinks", color: "#CFDDDB" },
    { id: 13, category: "Deserts", text: "Alchol", color: "#CFDDDB" },
  ];
  return (
    <Box
      sx={{
        width: "920px",
        overflowX: "auto",
        "&::-webkit-scrollbar": {
          width: 10,
          height: "10px",
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "orange",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "red",
          borderRadius: 2,
        },
      }}
    >
      <Box sx={{ display: "flex", width: "920px" }}>
        {data
          .filter((d) => d.text == select)
          .map(({ text, color }, index) => (
            // eslint-disable-next-line react/jsx-key,
            <Box sx={{ display: "flex" }}>
              <Button
                key={index}
                variant="contained"
                onClick={() => onClickfunction(text)}
                sx={{
                  backgroundColor: iset ? "#2d2d2d" : "pink",
                  borderRadius: "10px",
                  mx: 2,

                  height: "133px",
                  width: "160px",
                  borderLeft: "solid 10px pink",
                }}
              >
                {text}1{JSON.stringify(iset)}
              </Button>
            </Box>
          ))}
      </Box>
 
    </Box>
  );
};

export default Dynamiclistview;
