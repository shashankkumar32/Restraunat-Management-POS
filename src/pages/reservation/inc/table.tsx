

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
  customerNumber: string;
  subTotal: number;
  tax: number;
  totalAmount: number;
  date: Date;
  cartItems: { name: string; quantity: number; price: number }[];
}

interface Props {
  billsData: BillData[];
  checked: boolean;
  handleOpenDelete: () => void;
}

const StickyHeadTable: React.FC<Props> = ({
  billsData,
  checked,
  handleOpenDelete,
}) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [color, setColor] = React.useState("black");
  const [isOpen, setisOpen] = React.useState(false);
  const [invoiceData, setinvoiceData] = React.useState<BillData | undefined>();
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [filteredData, setFilteredData] = React.useState<BillData[]>(billsData);

  const handleSearch = (query: string) => {
    const lowercaseQuery = query.toLowerCase();
    const filteredBillsData = billsData.filter((bill) =>
      bill._id.toLowerCase().includes(lowercaseQuery) ||
      bill.customerName.toLowerCase().includes(lowercaseQuery) ||
      bill.customerNumber.toLowerCase().includes(lowercaseQuery)
    );
    setFilteredData(filteredBillsData);
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
      <Box sx={{ overflowX: "auto" ,backgroundColor:"rgba(0,0,0,40%)",p:2}}>
      <Box sx={{ display: "flex", alignItems: "center", marginBottom: "1rem", }}>
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
        <TableContainer component={Paper} sx={{ minWidth: 750, maxWidth: "100%" }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow sx={{ borderBottom: "none" }}>
                {columns.map((column) => (
                  <TableCell
                    sx={{
                      height: "20px",
                      backgroundColor: checked ? "#F6F6F6" : "#121212",
                      borderBottom: checked ? "none" : "solid 1px #353535",
                      color: "#888888",
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
                    borderBottom: checked ? "none" : "solid 1px #353535",
                    boxShadow: "inset -5px 0px 3px 2px rgba(0, 0, 0, 0.05)",
                    backgroundColor: checked ? "#F5F5F5" : "#121212",
                    color: "#888888",
                  }}
                  key="settings"
                  align="center"
                  style={{ width: "20px", height: "20px" }}
                >
                  <SettingsSharpIcon sx={{ color: "grey" }} />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
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
                      {row.subTotal}
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
                      {row.totalAmount}
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
                      {row.date.toISOString().split("T")[0]}
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
