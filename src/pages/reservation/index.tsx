import type { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";
import { Box, ListItemText } from "@mui/material";
import PermanentDrawerLeft from "../../../layout/layout";

const Page: NextPageWithLayout = () => {
  return <div style={{ background: 'linear-gradient(45deg, rgb(17,19,21), rgb(255,192,203), rgb(60,64,65))', height: '93vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}></div>
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <PermanentDrawerLeft>{page}</PermanentDrawerLeft>;
};

export default Page;   
