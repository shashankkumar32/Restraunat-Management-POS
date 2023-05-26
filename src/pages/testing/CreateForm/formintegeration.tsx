// import React from "react";
// import { Formik } from "formik";

// import { SimpleFormBridged } from "./simpleForm";
// import { initialValues } from "./initialvalues";
// // import { validationSchema } from "./validation.js";
// import { handleSubmit } from "./handleSubmit";

// interface props {
//   handleClose: Function;
// }

// const SimpleFormContainer: React.FC<props> = ({ handleClose }) => {
//   const handleSubmit = (values: any, actions: any) => {
//     console.log(values);

//     handleClose();
//   };
//   return (
//     <React.Fragment>
//       <Formik
//         initialValues={initialValues}
//         // validationSchema={validationSchema}
//         onSubmit={handleSubmit}
//       >
//         {(props) => <SimpleFormBridged {...props} />}
//       </Formik>
//     </React.Fragment>
//   );
// };

// export default SimpleFormContainer;
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignUp() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 2 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <Typography sx={{ fontSize: "12px", fontWeight: "400" }}>
                  Image Link
                </Typography>

                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  autoFocus
                  size="small"
                  sx={{
                    "& fieldset": {
                      height: "40px",
                      mt: 0.4,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography sx={{ fontSize: "12px", fontWeight: "400" }}>
                  Image Link
                </Typography>

                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  autoFocus
                  size="small"
                  sx={{
                    "& fieldset": {
                      height: "40px",
                      mt: 0.4,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography sx={{ fontSize: "12px", fontWeight: "400" }}>
                  Image Link
                </Typography>

                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  autoFocus
                  size="small"
                  sx={{
                    "& fieldset": {
                      height: "40px",
                      mt: 0.4,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography sx={{ fontSize: "12px", fontWeight: "400" }}>
                  Image Link
                </Typography>

                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  autoFocus
                  size="small"
                  sx={{
                    "& fieldset": {
                      height: "40px",
                      mt: 0.4,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography sx={{ fontSize: "12px", fontWeight: "400" }}>
                  Image Link
                </Typography>

                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  autoFocus
                  size="small"
                  multiline
                  rows={4}
                  defaultValue="Default Value"
                  sx={{
                    "& fieldset": {
                      mt: 0.4,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{
                    mt: "90px",
                    backgroundColor: "#EEEEEE",
                    display: "flex",
                    justifyContent: "space-evenly",
                  }}
                >
                  <Typography>Verification</Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
