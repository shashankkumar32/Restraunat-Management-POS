import { useState, type ReactElement } from "react";
import { NextPageWithLayout } from "../_app";
import { Box, Grid, ListItemText, Switch } from "@mui/material";
import PermanentDrawerLeft from "../../../layout/layout";
import ItemForm from "./inc/form";
import CategoryBox from "./inc/category";
// import ItemBox from "./inc/Itemform";

import AddItemForm from "./inc/AddItemForm";
import { AnimatePresence, motion } from "framer-motion";
// import Boxitem from "./inc/Itemform";

const Page: NextPageWithLayout = () => {
  const [toggle, setToggle] = useState(false);

  const toggleHandler = () => {
    setToggle(!toggle);
  };
  return <Box sx={{ backgroundColor: "#00000",mt:2,display:"flex",justifyContent:"center",pt:5,pb:8}}> 
  <Grid sx={{display:{lg:"flex" ,md:"block"}}} spacing={2} lg={12} >
  <Switch checked={toggle} onChange={toggleHandler} />

<AnimatePresence mode='wait'>
<motion.div
          key={toggle ? 'componentA' : 'componentB'}
          initial={{ opacity: 0, rotateY: toggle ? 180 : 0, transformOrigin: 'center' }}
          animate={{ opacity: 1, rotateY: 0 }}
          exit={{ opacity: 0, rotateY: toggle ? 0 : 180 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          {toggle ? <AddItemForm/> : <CategoryBox/>  }
        </motion.div>
      </AnimatePresence>
   

  </Grid>
  
  </Box>;
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <PermanentDrawerLeft>{page}</PermanentDrawerLeft>;
};

export default Page;
