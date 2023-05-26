import type { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";
import { Box, ListItemText } from "@mui/material";
import PermanentDrawerLeft from "../../../layout/layout";

const Page: NextPageWithLayout = () => {
  return <Box sx={{ backgroundColor: "#fff" }}>hello world</Box>;
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <PermanentDrawerLeft>{page}</PermanentDrawerLeft>;
};

export default Page;
