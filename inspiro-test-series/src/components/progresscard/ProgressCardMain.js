import { Stack, useMediaQuery } from "@mui/material";
import Navigationbar from "../homepage/Navigationbar";
import Welcomepage from "../homepage/Welcomepage";
import Explorer from "../homepage/Explorer";
import { useTheme } from "@emotion/react";

const ProgressCardMain = () => {
    const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    return(<Stack direction="column" spacing={8}>
    <Navigationbar />
    {isSmallScreen ? (
      <Welcomepage />
    ) : (
      <Stack direction="row" spacing={4} sx={{ backgroundColor: '#fafafa' }}>
        <Stack sx={{ position: 'fixed', overflow: 'auto' }}>
          <Explorer />
        </Stack>
        
      </Stack>
    )}
  </Stack>)
}
export default ProgressCardMain;