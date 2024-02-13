import { Stack } from "@mui/material";
import Explorer from "./Explorer";
import Navigationbar from "./Navigationbar";
import Welcomepage from "./Welcomepage";

const Homepage = () => {
  return (
    <Stack direction="column" spacing={8}>
      <Navigationbar />
      <Stack direction={"row"} spacing={4} sx={{ backgroundColor: "#fafafa" }}>
        <Stack sx={{position:"fixed", overflow:"auto"}}><Explorer /></Stack>
        <Welcomepage />
      </Stack>
    </Stack>
  );
};
export default Homepage;
