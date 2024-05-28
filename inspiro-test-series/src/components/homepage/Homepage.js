import { Stack, useMediaQuery, useTheme } from "@mui/material";
import Explorer from "./Explorer";
import Navigationbar from "./Navigationbar";
import Welcomepage from "./Welcomepage";
import Appbar from "./Appbar";

const Homepage = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const appbarDrawerWidth = 240; // Width of the Appbar drawer
  const welcomepageMargin = isSmallScreen ? 0 : appbarDrawerWidth;
  return (
    <Stack direction="column" spacing={1}>
      <Stack
        direction="row"
        spacing={1}
        sx={{
          backgroundColor: "#fafafa",
          marginLeft: isSmallScreen ? 0 : appbarDrawerWidth,
          transition: "margin-left 0.3s ease",
        }}
      >
        <Appbar />
        <Stack sx={{ marginLeft: welcomepageMargin }}>
          <Welcomepage />
        </Stack>
      </Stack>
    </Stack>
  );
};
export default Homepage;
