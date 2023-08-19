import { Box, Chip, Stack } from "@mui/material";
import axios from "axios";
import { motion } from "framer-motion";
// import { Box } from "framer-motion";
import React, { useEffect, useState } from "react";
interface props{
    children:React.ReactNode
}
interface Item {
    id: string;
    category: string;
    text: string;
    price: string;
  }
const Combinercat:React.FC<props>=({
    children
})=>{
    
    const [itemlist,setItemList]=useState<Item[]>([])
    const fetchItems = async () => {
        try {
          const response = await axios.get<Item[]>(
            "https://backb.onrender.com/api/category/get-categories"
          );
        
          setItemList(response.data)
         
        } catch (error) {
          console.error("Error fetching items:", error);
        }
      };
      useEffect(() => {
        fetchItems();
      }, []);

    return(
        <Box sx={{display:"flex",background:"#000000",p:3,mt:3}}>
            <Box sx={{width:"250px",maxHeight:"720px",overflowY:"auto"}}>
            {
                itemlist.map((d,index)=>{
                    return(
                      <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <Stack key={index}>
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
                  label={d.text}
                  //  onClick={handleClick}
              
                   
                />
                        </Stack>
                        </motion.div>
                    )
                })
            }
            </Box>
        <Box>
            {
                children
            }
        </Box>
        </Box>
    )
}
export default Combinercat