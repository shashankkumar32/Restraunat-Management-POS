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
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import SettingsSharpIcon from "@mui/icons-material/SettingsSharp";
import MoreVertSharpIcon from "@mui/icons-material/MoreVertSharp";

interface Column {
  id: "name" | "code" | "population" | "size" | "density";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "code", label: "ISO\u00a0Code", minWidth: 100 },
  {
    id: "population",
    label: "Population",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "size",
    label: "Size\u00a0(km\u00b2)",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "density",
    label: "Density",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toFixed(2),
  },
];

interface Data {
  name: string;
  code: string;
  population: number;
  size: number;
  density: number;
}

function createData(
  name: string,
  code: string,
  population: number,
  size: number
): Data {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  createData("India", "IN", 1324171354, 3287263),
  createData("China", "CN", 1403500365, 9596961),
  createData("Italy", "IT", 60483973, 301340),
  createData("United States", "US", 327167434, 9833520),
  createData("Canada", "CA", 37602103, 9984670),
  createData("Australia", "AU", 25475400, 7692024),
  createData("Germany", "DE", 83019200, 357578),
  createData("Ireland", "IE", 4857000, 70273),
  createData("Mexico", "MX", 126577691, 1972550),
  createData("Japan", "JP", 126317000, 377973),
  createData("France", "FR", 67022000, 640679),
  createData("United Kingdom", "GB", 67545757, 242495),
  createData("Russia", "RU", 146793744, 17098246),
  createData("Nigeria", "NG", 200962417, 923768),
  createData("Brazil", "BR", 210147125, 8515767),
];
interface props {
  checked: any;
  handleOpenDelete: any;
}
const StickyHeadTable: React.FC<props> = ({ checked, handleOpenDelete }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [color, setColor] = React.useState("black");
  React.useEffect(() => {
    checked ? setColor("black") : setColor("#FFFFFF");
  }, [checked]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
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
    <Paper sx={{ width: "1360px" }}>
      <TableContainer sx={{ maxHeight: 540 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow sx={{ borderBottom: "none" }}>
              <TableCell
                sx={{
                  height: "20px",
                  backgroundColor: checked ? "#F6F6F6" : "#121212",
                  borderBottom: checked ? "none" : "solid 1px #353535",
                  color: "#888888",
                }}
                key={"tableId"}
                align={"left"}
                style={{ width: "280px" }}
              >
                Name
              </TableCell>
              <TableCell
                sx={{
                  borderBottom: checked ? "none" : "solid 1px #353535",
                  boxShadow: "inset 5px 4px 2px rgba(0, 0, 0, 0.05)",
                  height: "20px",
                  backgroundColor: checked ? "#F5F5F5" : "#121212",
                  color: "#888888",
                }}
                key={"tableId"}
                align={"left"}
                style={{ width: "40px" }}
              >
                Id
              </TableCell>
              <TableCell
                sx={{
                  borderBottom: checked ? "none" : "solid 1px #353535",
                  boxShadow: "inset 0px 4px 3px 0px rgba(0, 0, 0, 0.05)",
                  height: "20px",
                  backgroundColor: checked ? "#F5F5F5" : "#121212",
                  color: "#888888",
                }}
                key={"tableId"}
                align={"left"}
                style={{ minWidth: "150px" }}
              >
                email
              </TableCell>
              <TableCell
                sx={{
                  borderBottom: checked ? "none" : "solid 1px #353535",
                  boxShadow: "inset -7px 5px 7px 0px rgba(0, 0, 0, 0.05)",
                  height: "20px",
                  backgroundColor: checked ? "#F5F5F5" : "#121212",
                  color: "#888888",
                }}
                key={"tableId"}
                align={"left"}
                style={{ width: "380px", height: "20px" }}
              >
                description
              </TableCell>
              <TableCell
                sx={{
                  borderBottom: checked ? "none" : "solid 1px #353535",
                  boxShadow: " inset -5px 0px 3px 2px rgba(0, 0, 0, 0.05)",
                  backgroundColor: checked ? "#F5F5F5" : "#121212",
                  color: "#888888",
                }}
                key={"tableId"}
                align={"center"}
                style={{ width: "20px", height: "20px" }}
              >
                <SettingsSharpIcon sx={{ color: "grey" }} />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow
                    sx={{ borderBottom: "0px", color: color }}
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.code}
                  >
                    <TableCell
                      sx={{
                        borderBottom: checked ? "none" : "solid 1px #353535",
                        backgroundColor: checked ? "#F6F6F6" : "#121212",
                        color: color,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",

                          backgroundColor: checked ? "#F5F5F5" : "#121212",
                          color: color,
                          fontSize: "14px",
                        }}
                      >
                        <Avatar>H</Avatar>
                        <Typography sx={{ mt: 1, ml: 1 }}>
                          {row.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell
                      sx={{
                        boxShadow: " inset 5px 0px 4px rgba(0, 0, 0, 0.05)",
                        borderBottom: checked ? "none" : "solid 1px #353535",
                        backgroundColor: checked ? "#F5F5F5" : "#121212",
                        color: color,
                        fontSize: "12px",
                      }}
                    >
                      {row.density}
                    </TableCell>
                    <TableCell
                      sx={{
                        borderBottom: checked ? "none" : "solid 1px #353535",
                        backgroundColor: checked ? "#F5F5F5" : "#121212",
                        color: color,
                        fontSize: "12px",
                      }}
                    >
                      {row.population}
                    </TableCell>
                    <TableCell
                      sx={{
                        borderBottom: checked ? "none" : "solid 1px #353535",
                        backgroundColor: checked ? "#F5F5F5" : "#121212",
                        color: color,
                        fontSize: "12px",
                      }}
                    >
                      {row.size}
                    </TableCell>
                    <TableCell
                      sx={{
                        borderBottom: checked ? "none" : "solid 1px #353535",
                        backgroundColor: checked ? "#F5F5F5" : "#121212",
                        color: color,
                        fontSize: "12px",
                      }}
                    >
                      {/* {row.code}
                       */}
                      <IconButton
                        id="basic-button"
                        aria-controls={open ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={handleClick}
                      >
                        <MoreVertSharpIcon sx={{ color: "grey" }} />
                      </IconButton>
                    </TableCell>

                    {/* {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell sx={{   borderBottom: "none",boxShadow: "rgba(0, 0, 0, 0.15) 0.3px 0px"}} key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })} */}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          sx={{
            "& .MuiPaper-root": {
              backgroundColor: checked ? "#F5F5F5" : "#232425",
            },
          }}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem
            sx={{
              backgroundColor: checked ? "#F5F5F5" : "#232425",
              color: checked ? "#2B2B2B" : "rgba(255, 255, 255, 0.7)",
            }}
            onClick={handleOpenDelete}
          >
            Delete
          </MenuItem>
          <MenuItem
            sx={{
              backgroundColor: checked ? "#F5F5F5" : "#232425",
              color: checked ? "#2B2B2B" : "rgba(255, 255, 255, 0.7)",
            }}
            onClick={handleClose}
          >
            My account
          </MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
      </TableContainer>
      <TablePagination
        sx={{
          backgroundColor: checked ? "#F5F5F5" : "#121212",
          color: color,
        }}
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};
export default StickyHeadTable;
