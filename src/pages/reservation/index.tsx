import { useState, type ReactElement } from "react";
import { NextPageWithLayout } from "../_app";
import { Box, ListItemText } from "@mui/material";
import PermanentDrawerLeft from "../../../layout/layout";
import BillsPage from "./inc/table";
import StickyHeadTable from "./inc/table";
import Invoice from "./inc/invoice";

const  BillData = [
  {
    _id: "1",
    customerName: "John Doe",
    customerNumber: "1234567890",
    subTotal: 500,
    tax: 50,
    totalAmount: 550,
    date: new Date(),
    cartItems: [
      { name: "Item 1", quantity: 2, price: 100 },
      { name: "Item 2", quantity: 1, price: 300 },
    ],
  },
  {
    _id: "2",
    customerName: "Jane Smith",
    customerNumber: "9876543210",
    subTotal: 700,
    tax: 70,
    totalAmount: 770,
    date: new Date(),
    cartItems: [
      { name: "Item 3", quantity: 3, price: 200 },
      { name: "Item 4", quantity: 2, price: 300 },
    ],
  },
];
const Page: NextPageWithLayout = () => {
  const [checked, setChecked] = useState(true);
  const [deletestatus, setDeleteStatus] = useState(false);
  const handleOpenDelete = () => {
    setDeleteStatus(true);
  };

  return <div style={{ background: "rgb(17,19,21)", height: '97vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

    <StickyHeadTable  handleOpenDelete={handleOpenDelete} checked={checked}/>
    {/* <Invoice/> */}
  </div>
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <PermanentDrawerLeft>{page}</PermanentDrawerLeft>;
};

export default Page;   


