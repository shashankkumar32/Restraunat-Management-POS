import type { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";
import { Box, ListItemText } from "@mui/material";
import PermanentDrawerLeft from "../../../layout/layout";
import ItemForm from "./inc/form";

const Page: NextPageWithLayout = () => {
  return <Box sx={{ backgroundColor: "#00000",height:"93vh",mt:2}}><ItemForm/></Box>;
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <PermanentDrawerLeft>{page}</PermanentDrawerLeft>;
};

export default Page;
