

import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import SettingsSharpIcon from "@mui/icons-material/SettingsSharp";
import MoreVertSharpIcon from "@mui/icons-material/MoreVertSharp";
import Invoice from "./invoice";
import { motion } from "framer-motion";

interface Column {
  id: keyof BillData;
  label: string;
  minWidth?: number;
  align?: "right";
}

const columns: readonly Column[] = [
  { id: "_id", label: "Bill ID", minWidth: 60 },
  { id: "customerName", label: "Customer Name", minWidth: 70 },
  { id: "customerNumber", label: "Customer Number", minWidth: 50 },
  { id: "subTotal", label: "Subtotal", minWidth: 60, align: "right" },
  { id: "tax", label: "Tax", minWidth: 80, align: "right" },
  { id: "totalAmount", label: "Total Amount", minWidth: 60, align: "right" },
  { id: "date", label: "Date", minWidth: 70, align: "right" },
];

interface BillData {
  _id: string;
  customerName: string;
  customerNumber: number; // Changed to number
  totalAmount: number;
  subTotal: number;
  tax: number;
  paymentMode: string;
  cartItems: string[]; // Changed to an array of strings
  date: string; // Changed to string
}

interface Props {
  billsData?: BillData[];
  checked: boolean;
  handleOpenDelete: () => void;
}

const StickyHeadTable: React.FC<Props> = ({ checked, handleOpenDelete }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [color, setColor] = React.useState("black");
  const [isOpen, setisOpen] = React.useState(false);
  const [invoiceData, setinvoiceData] = React.useState<BillData | undefined>();
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [billsData, setBillsData] = React.useState<BillData[]>([]);
  const [filteredData, setFilteredData] = React.useState<BillData[]>(billsData);
  React.useEffect(() => {
    // Simulate fetching data from an API
    const fetchData = async () => {
      try {
        const response = await fetch("https://backb.onrender.com/api/bills/get-bills");
        const data = await response.json();
        setBillsData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  // console.log(billsData)
  React.useEffect(() => {
    const lowercaseQuery = searchQuery.toLowerCase();
    const filteredBillsData = billsData.filter((bill) =>
      bill._id.toLowerCase().includes(lowercaseQuery) ||
      bill.customerName.toLowerCase().includes(lowercaseQuery) ||
      bill.customerNumber.toString().includes(lowercaseQuery)
    );
    setFilteredData(filteredBillsData);
  }, [searchQuery, billsData]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const onOpen = (data: BillData) => {
    setinvoiceData(data);
    setisOpen(true);
  };

  const onClose = () => {
    setisOpen(false);
  };

  React.useEffect(() => {
    checked ? setColor("black") : setColor("#FFFFFF");
  }, [checked]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box sx={{ overflowX: "auto" ,backgroundColor:"#000000",p:4}}>
      <Box sx={{ display: "flex", alignItems: "center", marginBottom: "1rem", pt:5}}>
        
  <TextField
    variant="outlined"
    placeholder="Search"
    value={searchQuery}
    onChange={(e) => {
      setSearchQuery(e.target.value);
      handleSearch(e.target.value);
    }}
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          {/* <SearchIcon /> */} search
        </InputAdornment>
      ),
      sx: { backgroundColor: "rgb(246,246,246)", color: "black" },
    }}
    sx={{ width: "100%" , borderRadius:"50%"}}
  />
</Box>
        <TableContainer component={Paper} sx={{ minWidth: 750, maxWidth: "100%" ,maxHeight:"600px", overflow:"auto"}}>
          <Table stickyHeader aria-label="sticky table" sx={{height:"200px", overflow:"auto"}}>
            <TableHead>
              <TableRow sx={{ borderBottom: "none" }}>
                {columns.map((column) => (
                  <TableCell
                    sx={{
                      height: "20px",
                      backgroundColor:"rgb(60,64,65)",
                      borderBottom: "solid 4px #FFC0CB",
                      color: "#ffffff",
                    }}
                    key={column.id}
                    align={column.align || "left"}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
                <TableCell
                  sx={{
                    borderBottom: "solid 4px #FFC0CB",
                    boxShadow: "inset -5px 0px 3px 2px rgba(0, 0, 0, 0.05)",
                    backgroundColor: "rgb(60,64,65)",
                    color: "#ffffff",
                  }}
                  key="settings"
                  align="center"
                  style={{ width: "20px", height: "20px" }}
                >
                  <SettingsSharpIcon sx={{ color: "grey" }} />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{}}>
              {/* {JSON.stringify(filteredData)} */}
              {/* {} */}
              {filteredData
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row,index) => (
                  <TableRow
                    sx={{ borderBottom: "0px", color: color }}
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row._id}
                  >

                    <TableCell
                      sx={{
                        borderBottom: checked ? "none" : "solid 1px #353535",
                        backgroundColor: checked ? "#F6F6F6" : "#121212",
                        color: color,
                      }}
                      align={columns[0].align || "right"}
                      style={{ minWidth: columns[0].minWidth }}
                    >
                      {row._id}
                    </TableCell>
                    <TableCell
                      sx={{
                        borderBottom: checked ? "none" : "solid 1px #353535",
                        backgroundColor: checked ? "#F6F6F6" : "#121212",
                        color: color,
                      }}
                      align={columns[1].align || "right"}
                      style={{ minWidth: columns[1].minWidth }}
                    >
                      {row.customerName}
                    </TableCell>
                    <TableCell
                      sx={{
                        borderBottom: checked ? "none" : "solid 1px #353535",
                        backgroundColor: checked ? "#F6F6F6" : "#121212",
                        color: color,
                      }}
                      align={columns[2].align || "right"}
                      style={{ minWidth: columns[2].minWidth }}
                    >
                      {row.customerNumber}
                    </TableCell>
                    <TableCell
                      sx={{
                        borderBottom: checked ? "none" : "solid 1px #353535",
                        backgroundColor: checked ? "#F6F6F6" : "#121212",
                        color: color,
                      }}
                      align={columns[3].align || "right"}
                      style={{ minWidth: columns[3].minWidth }}
                    >
                      {row.subTotal?.toFixed(2)}
                    </TableCell>
                    <TableCell
                      sx={{
                        borderBottom: checked ? "none" : "solid 1px #353535",
                        backgroundColor: checked ? "#F6F6F6" : "#121212",
                        color: color,
                      }}
                      align={columns[4].align || "right"}
                      style={{ minWidth: columns[4].minWidth }}
                    >
                      {row.tax}
                    </TableCell>
                    <TableCell
                      sx={{
                        borderBottom: checked ? "none" : "solid 1px #353535",
                        backgroundColor: checked ? "#F6F6F6" : "#121212",
                        color: color,
                      }}
                      align={columns[5].align || "right"}
                      style={{ minWidth: columns[5].minWidth }}
                    >
                      {row.totalAmount?.toFixed(2)}
                    </TableCell>
                    <TableCell
                      sx={{
                        borderBottom: checked ? "none" : "solid 1px #353535",
                        backgroundColor: checked ? "#F6F6F6" : "#121212",
                        color: color,
                      }}
                      align={columns[6].align || "right"}
                      style={{ minWidth: columns[6].minWidth }}
                    >
                      {row.date.toString().split("T")[0]}
                    </TableCell>
                  
                    <TableCell
                      sx={{
                        borderBottom: checked ? "none" : "solid 1px #353535",
                        backgroundColor: checked ? "#F6F6F6" : "#121212",
                        color: color,
                      }}
                      align="right"
                      style={{ minWidth: columns[6].minWidth }}
                    >
                      <Button onClick={() => onOpen(row)}>View</Button>
                    </TableCell>
                
                  </TableRow>
                ))}
            </TableBody>
          </Table>
      <TablePagination
        sx={{
          backgroundColor: checked ? "#F5F5F5" : "#121212",
          color: color,
        }}
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={billsData?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
        </TableContainer>
      </Box>
      <Invoice isOpen={isOpen} onClose={onClose} invoiceData={invoiceData} />
    </>
  );
};

export default StickyHeadTable;
