import * as React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";
import GetAppIcon from "@mui/icons-material/GetApp";
import ReactToPrint from "react-to-print";
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
  

interface InvoiceProps {
  isOpen: boolean;
  onClose: () => void;
  invoiceData?: BillData;
  themeColor?: string;
}

const Invoice: React.FC<InvoiceProps> = ({ isOpen, onClose, invoiceData, themeColor }) => {
  const invoiceRef = React.useRef<any>(null);

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography variant="h6">Invoice</Typography>
      </DialogTitle>
      <DialogContent ref={invoiceRef}>
        <div style={{ backgroundColor: "#222", color: "#fff", padding: "10px" }}>
          <Typography variant="h6" style={{ color: "#fff" }}>
            Invoice Number: {invoiceData?._id}
          </Typography>
          <Typography variant="subtitle1">
            {invoiceData?.date.toDateString()}
          </Typography>
        </div>
        <div style={{ margin: "20px 0", backgroundColor: "#f5f5f5", padding: "10px", border: "1px solid #ccc" }}>
          {/* Customer info content */}
        </div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Item</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {invoiceData?.cartItems.map((d,i)=>
            {return(

                <TableRow key={i}>

            <TableCell key={d.name}>{d.name}</TableCell>
                <TableCell key={d.quantity}>{d.quantity}</TableCell>
                <TableCell key={d.price}>{d.price}</TableCell>
                <TableCell key={i}>{d.price*d.quantity}</TableCell>
                </TableRow>
            )}
            )}
              {/* Table content */}
            </TableBody>
          </Table>
        </TableContainer>
        <div style={{ textAlign: "right", marginTop: "20px" }}>
          <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
            Subtotal: $100
          </Typography>
          <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
            Tax: $10
          </Typography>
          <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
            Total Amount: $110
          </Typography>
        </div>
      </DialogContent>
      <DialogActions>
        <Button startIcon={<PrintIcon />} color="primary" variant="outlined">
          Print
        </Button>
        <ReactToPrint
          trigger={() => (
            <Button startIcon={<GetAppIcon />} color="secondary" variant="outlined">
              Download
            </Button>
          )}
          content={() => invoiceRef.current}
        />
        <Button onClick={onClose} color="inherit" variant="outlined">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Invoice;