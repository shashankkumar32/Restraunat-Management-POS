import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle, { DialogTitleProps } from "@mui/material/DialogTitle";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface props {
  Title: any;
  children?: React.ReactNode;
  handleClose: Function;
  open: any;
  height?: any;
  width?: any;
  otherbutton?: any;
  checked?: any;
}

const CustomDialogBox: React.FC<props> = ({
  children,
  Title,
  handleClose,
  open,
  height,
  width,
  checked,
}) => {
  return (
    <Dialog
      open={open}
      onClose={() => handleClose()}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{ height: height, backgroundColor: checked ? "#121212" : "" }}
    >
      <DialogTitle
        id="alert-dialog-title"
        sx={{ borderBottom: "0.3px solid #E4E4E4" }}
      >
        {Title}
        {open ? (
          <IconButton
            aria-label="close"
            onClick={() => handleClose()}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              //   color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
      <DialogContent sx={{ height: height, width: width }}>
        {children}
      </DialogContent>
      <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="outlined"
          sx={{ mr: 2, border: "none", width: "130px", height: "30px" }}
          onClick={() => handleClose()}
        >
          Cancel
        </Button>

        <Button
          variant="outlined"
          sx={{
            mr: 2,
            backgroundColor: "Red",
            border: "none",
            width: "130px",
            height: "30px",
          }}
          onClick={() => handleClose()}
        >
          delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default CustomDialogBox;
