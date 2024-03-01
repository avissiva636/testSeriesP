import { Stack, useMediaQuery, useTheme } from "@mui/material";
import Explorer from "./Explorer";
import Navigationbar from "./Navigationbar";
import Welcomepage from "./Welcomepage";

const Homepage = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Stack direction="column" spacing={8}>
      <Navigationbar />
      {isSmallScreen ? (
        <Welcomepage />
      ) : (
        <Stack direction="row" spacing={4} sx={{ backgroundColor: '#fafafa' }}>
          <Stack sx={{ position: 'fixed', overflow: 'auto' }}>
            <Explorer />
          </Stack>
          <Welcomepage />
        </Stack>
      )}
    </Stack>
  );
};
export default Homepage;
