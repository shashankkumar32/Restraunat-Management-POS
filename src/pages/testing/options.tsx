import * as React from "react";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ViewQuiltIcon from "@mui/icons-material/ViewQuilt";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

interface props {
  view: any;
  setView: any;
  checked: any;
}
const HorizontalToggleButtons: React.FC<props> = ({
  view,
  setView,
  checked,
}) => {
  //   const [view, setView] = React.useState("list");

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    nextView: string
  ) => {
    console.log(nextView);
    setView(nextView);
  };

  return (
    <ToggleButtonGroup
      orientation="horizontal"
      value={view}
      exclusive
      onChange={handleChange}
      sx={{
        height: "35px",
        mt: 0.7,
        mr: 2,
        // color: checked ? "#FFFFFF" : "#000000",
        border: !checked ? "solid 0.6px white" : "solide 0.6px black",
      }}
    >
      <ToggleButton value="list" aria-label="list">
        <ViewListIcon
          sx={{
            color: !checked ? "#FFFFFF" : "#000000",
          }}
        />
      </ToggleButton>
      <ToggleButton value="module" aria-label="module">
        <ViewModuleIcon
          sx={{
            color: !checked ? "#FFFFFF" : "#000000",
          }}
        />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
export default HorizontalToggleButtons;
