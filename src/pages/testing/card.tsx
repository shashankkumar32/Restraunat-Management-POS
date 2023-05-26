import { Avatar, Box, CardContent, Stack, Typography } from "@mui/material";
import React from "react";

interface props {
  checked: any;
}

const Card: React.FC<props> = ({ checked }) => {
  return (
    <Box
      sx={{
        height: "224px",
        width: "334px",
        backgroundColor: checked ? "#EEEEEE" : "#181A1C",
        color: checked ? "#212121" : "#FFFFFF",

        borderRadius: "8px",
      }}
    >
      <Stack>
        <Box sx={{ display: "flex" }}>
          <Avatar
            sx={{
              bgcolor: "Blue",
              mt: 3,
              ml: 3,
              height: "64px",
              width: "64px",
            }}
          >
            OP
          </Avatar>
          <Box sx={{ ml: 2, mt: 4 }}>
            <Typography sx={{ fontSize: "16px", fontWeight: "500", color: "" }}>
              Ronald Richards
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: "400",
                color: checked ? "#212121" : "rgba(255, 255, 255, 0.5)",
              }}
            >
              ronaldrichards@gmail.com
            </Typography>
          </Box>
        </Box>
        <Box sx={{ width: "284px", display: "flex", justifyContent: "center" }}>
          <CardContent>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                display: "flex",
                justifyContent: "center",
                color: checked ? "#212121" : "#FFFFFF",
              }}
            >
              This impressive paella is a perfect party dish and a fun meal to
              cook together with your guests. Add 1 cup of frozen peas along
              with the mussels, if you like.
            </Typography>
          </CardContent>
        </Box>
      </Stack>
    </Box>
  );
};

export default Card;
