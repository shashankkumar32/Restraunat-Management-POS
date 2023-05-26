import { Box, Button } from "@mui/material";
import React, { useState,useEffect } from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import Carousel from 'react-grid-carousel'
interface props{
  select:any
}

const Dynamiclistview:React.FC<props> = ({
  select
}) => {
  const [iset, setColor] = useState(true);
  const [arr,setArr] = useState([]);

  useEffect(()=>{
    let ar=data.filter((d)=>d.text===select)
    setArr(ar)
  },[select])
  const data = [
    { id: 1,category:"Breakfast", text: "Breakfast", color: "#CFDDDB" },
    { id: 2, category:"Breakfast",text: "Soups", color: "#E4CDEE" },
    { id: 3, category:"Breakfast",text: "Pasta", color: "#ba68c8" },
    { id: 4,category:"Breakfast", text: "Sushi", color: "#03a9f4" },
    { id: 5,category:"Breakfast", text: "Main Course", color: "#ff9800" },
    { id: 6, category:"Deserts",text: "Deserts", color: "#4caf50" },
    { id: 7, category:"Deserts",text: "Drinks", color: "#CFDDDB" },
    { id: 8, category:"Deserts",text: "Alchol", color: "#CFDDDB" },
    { id: 9,category:"Deserts", text: "Sushi", color: "#03a9f4" },
    { id: 10,category:"Deserts", text: "Main Course", color: "#ff9800" },
    { id: 11,category:"Deserts", text: "Deserts", color: "#4caf50" },
    { id: 12,category:"Deserts", text: "Drinks", color: "#CFDDDB" },
    { id: 13,category:"Deserts", text: "Alchol", color: "#CFDDDB" },
  ];
  const data2=[   { id: 7, category:"Deserts",text: "Drinks", color: "#CFDDDB" },
  { id: 8, category:"Deserts",text: "Alchol", color: "#CFDDDB" },
  { id: 9,category:"Deserts", text: "Sushi", color: "#03a9f4" },
  { id: 10,category:"Deserts", text: "Main Course", color: "#ff9800" },
  { id: 11,category:"Deserts", text: "Deserts", color: "#4caf50" },
  { id: 12,category:"Deserts", text: "Drinks", color: "#CFDDDB" },
  { id: 13,category:"Deserts", text: "Alchol", color: "#CFDDDB" },]
  return (
    <Box sx={{ width: "920px" }}>
      <div>
      <Carousel cols={2} rows={1} gap={1} loop>
<Carousel.Item>
  <Box sx={{backgroundColor:"#FFFFFF",height:"133px",width:"160px"}}></Box>
  <img width="100%" src="https://picsum.photos/800/600?random=1" />
</Carousel.Item>
<Carousel.Item>
  <img width="100%" src="https://picsum.photos/800/600?random=2" />
</Carousel.Item>
<Carousel.Item>
  <img width="100%" src="https://picsum.photos/800/600?random=3" />
</Carousel.Item>
<Carousel.Item>
  {/* anything you want to show in the grid */}
</Carousel.Item>
{/* ... */}
</Carousel>
{/* 
        <Slider {...settings}>
          {arr.map(({ text, color }, index) => (
           <Box sx={{display:"flex"}}>
              <Button
                key={index}
                variant="contained"
                onClick={() => (color ? setColor(false) : setColor(true))}
                sx={{
                  backgroundColor: iset ? "#2d2d2d" : "pink",
                  borderRadius: "10px",

                  height: "133px",
                  width: "160px",
                  borderLeft: "solid 10px pink",
                }}
              >
                {text}1{JSON.stringify(iset)}
              </Button>
              </Box>
          
          ))}
        </Slider> */}
      </div>
    </Box>
  );
};

export default Dynamiclistview;

